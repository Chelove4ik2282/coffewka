import admin from 'firebase-admin';
import { cert } from 'firebase-admin/app';

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY as string);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: cert(serviceAccount),
  });
}

export const db = admin.firestore();
export const auth = admin.auth();
