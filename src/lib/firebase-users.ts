// lib/firebase-users.ts
import { db } from "./firebase-admin";

type FirebaseUser = {
  email: string;
  password: string;
  cart: number[];
};

export async function findUserByEmail(email: string): Promise<FirebaseUser | null> {
    const docRef = db.collection("users").doc(email);
    const doc = await docRef.get();
  
    console.log(doc);
    if (!doc.exists) return null;
  
    return doc.data() as FirebaseUser;
  }
  
