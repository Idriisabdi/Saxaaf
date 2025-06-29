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
  priority: 'high' | 'medium' | 'low';
  date: string; // ISO string
  leadScore?: number;
  rationale?: string;
  nextSteps?: string;
}

function determinePriority(score: number): 'high' | 'medium' | 'low' {
    if (score >= 75) return 'high';
    if (score >= 40) return 'medium';
    return 'low';
}

export async function addLead(
  input: AssessLeadInput,
  assessment: AssessLeadOutput
): Promise<string> {
  const leadsCollection = collection(db, 'leads');
  const docRef = await addDoc(leadsCollection, {
    type: 'Consultation',
    companyName: input.companyName,
    industry: input.industry,
    companySize: input.companySize,
    leadDescription: input.leadDescription,
    leadScore: assessment.leadScore,
    rationale: assessment.rationale,
    nextSteps: assessment.nextSteps,
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
        priority: data.priority || 'low',
        date: (data.date as Timestamp)?.toDate().toISOString() || new Date().toISOString(),
        leadScore: data.leadScore,
        rationale: data.rationale,
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
