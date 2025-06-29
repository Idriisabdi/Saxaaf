'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs, type Timestamp } from 'firebase/firestore';
import { z } from 'zod';

const pageViewSchema = z.object({
  pathname: z.string(),
  sessionId: z.string(),
});

export async function logPageView(data: z.infer<typeof pageViewSchema>) {
  const validatedData = pageViewSchema.safeParse(data);

  if (!validatedData.success) {
    console.error('Invalid page view data');
    return;
  }

  try {
    const pageViewsCollection = collection(db, 'pageViews');
    await addDoc(pageViewsCollection, {
      ...validatedData.data,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error logging page view:', error);
  }
}

export interface PageView {
    id: string;
    pathname: string;
    sessionId: string;
    timestamp: string; // ISO string
}

export async function getPageViews(): Promise<PageView[]> {
    const pageViewsCollection = collection(db, 'pageViews');
    try {
        const snapshot = await getDocs(pageViewsCollection);
        const pageViews: PageView[] = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            pageViews.push({
                id: doc.id,
                pathname: data.pathname,
                sessionId: data.sessionId,
                timestamp: (data.timestamp as Timestamp)?.toDate().toISOString() || new Date().toISOString(),
            });
        });
        return pageViews.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    } catch (error) {
        console.error("Error fetching page views:", error);
        return [];
    }
}
