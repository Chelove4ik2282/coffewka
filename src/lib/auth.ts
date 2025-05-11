export const JWT_MAX_AGE = 60 * 5; // 5 минут
export const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 дней

// lib/auth.ts
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import { setDoc, doc } from 'firebase/firestore';

export async function registerUser(email: string, password: string) {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;

  // сохранить в Firestore
  await setDoc(doc(db, 'users', user.uid), {
    email: user.email,
    createdAt: new Date(),
  });

  return user;
}

export async function loginUser(email: string, password: string) {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res.user;
}
