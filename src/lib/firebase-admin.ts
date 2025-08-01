
import { initializeApp, cert, getApps, App } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { getStorage } from 'firebase-admin/storage';

const serviceAccount = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

let adminApp: App;

if (!getApps().length) {
  adminApp = initializeApp({
    credential: cert(serviceAccount as any),
    databaseURL: `https://${serviceAccount.projectId}-default-rtdb.firebaseio.com`,
    storageBucket: storageBucket,
  });
} else {
  adminApp = getApps()[0];
}

export const db = getDatabase(adminApp);
export const storage = getStorage(adminApp);
