import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  type Timestamp,
} from 'firebase/firestore';
import type { AssessLeadInput, AssessLeadOutput } from '@/ai/flows/assess-lead';

export interface Lead {
  id: string;
  type: 'Consultation' | 'Contact';
  companyName?: string;
  name?: string;
  industry?: string;
  priority: 'high' | 'medium' | 'low';
  date: string; // ISO string
  leadScore?: number;
  nextSteps?: string;
}

const sanitize = (text: string | undefined) => {
    if (!text) return "";
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

const spamKeywords = ['crypto', 'forex', 'investment', 'free money', 'SEO service', 'marketing service'];

const containsSpam = (text: string | undefined) => {
    if (!text) return false;
    const lowercasedText = text.toLowerCase();
    return spamKeywords.some(keyword => lowercasedText.includes(keyword));
};

function determinePriority(score: number): 'high' | 'medium' | 'low' {
    if (score >= 75) return 'high';
    if (score >= 40) return 'medium';
    return 'low';
}

export async function addLead(
  input: AssessLeadInput,
  assessment: AssessLeadOutput
): Promise<string> {

  // Spam check for all major text fields
  const isSpam = [
    input.companyName,
    input.industry,
    input.businessModel,
    input.targetAudience,
    input.challenges,
    input.goals,
    input.onlinePresence,
    input.competitors
  ].some(field => containsSpam(field));

  if (isSpam) {
    // We can throw an error to be caught by the client form.
    throw new Error("Submission blocked due to spam-like content.");
  }
  
  const leadsCollection = collection(db, 'leads');

  const docRef = await addDoc(leadsCollection, {
    // Input data from the form (sanitized)
    type: 'Consultation',
    companyName: sanitize(input.companyName),
    industry: sanitize(input.industry),
    companySize: sanitize(input.companySize),
    businessModel: sanitize(input.businessModel),
    targetAudience: sanitize(input.targetAudience),
    challenges: sanitize(input.challenges),
    goals: sanitize(input.goals),
    onlinePresence: sanitize(input.onlinePresence) || '',
    competitors: sanitize(input.competitors) || '',

    // Assessment data from the AI
    leadScore: assessment.leadScore,
    strategicSummary: assessment.strategicSummary,
    swotAnalysis: assessment.swotAnalysis,
    recommendedServices: assessment.recommendedServices,
    nextSteps: assessment.nextSteps,
    
    // Metadata
    priority: determinePriority(assessment.leadScore),
    date: serverTimestamp(),
  });
  return docRef.id;
}

export async function getLeads(): Promise<Lead[]> {
  const leadsCollection = collection(db, 'leads');
  const q = query(leadsCollection, orderBy('date', 'desc'));
  
  try {
    const querySnapshot = await getDocs(q);
    const leads: Lead[] = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        leads.push({
        id: doc.id,
        type: data.type || 'Contact',
        companyName: data.companyName,
        name: data.name,
        industry: data.industry,
        priority: data.priority || 'low',
        date: (data.date as Timestamp)?.toDate().toISOString() || new Date().toISOString(),
        leadScore: data.leadScore,
        // For dashboard view, only basic info is needed.
        // The full data is in Firestore but not pulled here for performance.
        nextSteps: data.nextSteps, 
        });
    });
    return leads;
  } catch (error) {
    console.error("Error fetching leads: ", error);
    // Return empty array on error to prevent crashing the admin page,
    // which can happen if Firestore rules are not set up correctly.
    return [];
  }
}
