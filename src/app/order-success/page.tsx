'use client';

import { useRouter } from 'next/navigation';

export default function OrderSuccess() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-semibold text-amber-400 mb-4">Order Success</h2>
        <p className="text-white/60 mb-6">Thank you for your order! We will process it shortly.</p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white font-medium transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
