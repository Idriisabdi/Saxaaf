'use server';

import { z } from 'zod';

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

  // In a real application, you would handle the form submission here,
  // e.g., send an email, save to a database, etc.
  console.log("Form submitted successfully:", parsedData.data);
  
  // Simulate a successful submission
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: true, message: "Your message has been sent!" };
}
