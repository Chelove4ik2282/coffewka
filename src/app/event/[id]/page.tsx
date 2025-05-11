// app/events/[id]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import BackButton from '@/components/BackButton';
import eventsList from '@/data/eventsList';

export default function EventPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();

  const event = eventsList.find(e => e.id === id);
  if (!event) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white px-4 py-12 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-[0_10px_60px_rgba(255,255,255,0.05)] animate-fade-in">
        
        {/* Изображение */}
        <div className="relative w-full h-80 mb-8 rounded-xl overflow-hidden border border-white/10 shadow-lg">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover transition duration-500 ease-in-out hover:scale-105"
          />
        </div>

        {/* Заголовок */}
        <div className="mb-6 text-center">
          <h1 className="text-5xl font-extrabold text-amber-400 drop-shadow-sm mb-2 tracking-tight">
            {event.title}
          </h1>
          <p className="text-sm text-gray-300 italic">{event.date}</p>
        </div>

        {/* Описание */}
        <p className="text-white/90 text-lg leading-relaxed text-center mb-10 max-w-3xl mx-auto">
          {event.text}
        </p>

        {/* Кнопка назад */}
        <div className="flex justify-center">
          <BackButton />
        </div>
      </div>
    </div>
  );
}
