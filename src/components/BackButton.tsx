'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 px-4 py-2 border border-white/20 text-white hover:bg-white/10 rounded-xl transition-all duration-200"
    >
      <ArrowLeft className="w-5 h-5" />
      <span>Back</span>
    </button>
  );
}
