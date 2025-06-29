'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const formSchema = z.object({
  name: z.string().min(2, "Name is required.").max(50),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(2, "Subject is required.").max(100),
  message: z.string().min(10, "Message must be at least 10 characters.").max(2000),
});

type FormValues = z.infer<typeof formSchema>;

// Simple sanitizer to prevent XSS by escaping HTML tags.
const sanitize = (text: string) => {
    if (!text) return "";
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

const spamKeywords = ['crypto', 'forex', 'investment', 'free money', 'SEO service', 'marketing service'];

const containsSpam = (text: string) => {
    if (!text) return false;
    const lowercasedText = text.toLowerCase();
    return spamKeywords.some(keyword => lowercasedText.includes(keyword));
}


export async function submitContactFormAction(data: FormValues) {
  const parsedData = formSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: "Invalid form data." };
  }
  
  const { name, email, subject, message } = parsedData.data;
  
  if (containsSpam(name) || containsSpam(subject) || containsSpam(message)) {
    return { success: false, message: "Your message appears to be spam and was blocked." };
  }

  const sanitizedData = {
    name: sanitize(name),
    email: sanitize(email),
    subject: sanitize(subject),
    message: sanitize(message),
  };

  try {
    await addDoc(collection(db, "contacts"), {
      ...sanitizedData,
      submittedAt: serverTimestamp(),
    });
    
    return { success: true, message: "Your message has been sent!" };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, message: "An unexpected error occurred while sending your message. Please try again later." };
  }
}
