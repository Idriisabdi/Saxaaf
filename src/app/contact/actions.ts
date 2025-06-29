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

export async function submitContactFormAction(data: FormValues) {
  const parsedData = formSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: "Invalid form data." };
  }

  try {
    await addDoc(collection(db, "contacts"), {
      ...parsedData.data,
      submittedAt: serverTimestamp(),
    });
    
    return { success: true, message: "Your message has been sent!" };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, message: "An unexpected error occurred while sending your message. Please try again later." };
  }
}
