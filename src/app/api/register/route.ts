import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase/admin';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password required' }, { status: 400 });
  }

  const userDoc = db.collection('users').doc(email);
  const userSnapshot = await userDoc.get();

  if (userSnapshot.exists) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await userDoc.set({
    password: hashedPassword,
    cart: [],
  });

  return NextResponse.json({ message: 'User registered successfully' });
}
