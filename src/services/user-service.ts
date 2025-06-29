'use server';

import admin from 'firebase-admin';
import type { UserRecord } from 'firebase-admin/auth';

export interface AppUser {
  uid: string;
  name: string | null;
  email: string | null;
  createdAt: string;
  lastSignIn: string;
}

try {
  if (!admin.apps.length) {
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountJson) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set.');
    }
    const serviceAccount = JSON.parse(serviceAccountJson);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
} catch (error: any) {
  console.error('Firebase Admin initialization error:', error.message);
}

export async function getUsers(): Promise<AppUser[]> {
  if (!admin.apps.length) {
    throw new Error('Firebase Admin SDK has not been initialized. Check your service account credentials in the environment variables.');
  }

  try {
    const userRecords: UserRecord[] = (await admin.auth().listUsers(100)).users;
    
    const users: AppUser[] = userRecords.map(user => ({
      uid: user.uid,
      name: user.displayName || user.email || 'N/A',
      email: user.email || 'No email provided',
      createdAt: user.metadata.creationTime,
      lastSignIn: user.metadata.lastSignInTime,
    }));

    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Could not fetch user data. Please ensure the service account has the correct permissions.');
  }
}
