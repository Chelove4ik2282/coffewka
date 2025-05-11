import { notFound } from 'next/navigation';
import Image from 'next/image';
import coffeeList from '@/data/coffeeList';
import BackButton from '@/components/BackButton';

export default function CoffeePage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();

  const coffee = coffeeList.find(c => c.id === id);
  if (!coffee) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
        <div className="relative w-full h-72 mb-6 rounded-xl overflow-hidden border border-white/10">
          <Image src={coffee.image} alt={coffee.name} fill className="object-contain" />
        </div>

        <h1 className="text-4xl font-extrabold text-amber-400 mb-4">{coffee.name}</h1>

        <p className="text-white/80 mb-6 text-lg">{coffee.description}</p>

        <div className="grid grid-cols-2 gap-6 text-sm text-white/90 mb-6">
          <div>
            <p><span className="font-semibold">☕ Strength:</span> {coffee.strength}</p>
            <p><span className="font-semibold">🌍 Origin:</span> {coffee.origin}</p>
            <p><span className="font-semibold">🕒 Prep Time:</span> {coffee.preparationTime}</p>
          </div>
          <div>
            <p className="font-semibold">💸 Price:</p>
            <ul className="ml-4 list-disc text-white/80">
              <li>Small – ${coffee.prices.s.toFixed(2)}</li>
              <li>Medium – ${coffee.prices.m.toFixed(2)}</li>
              <li>Big – ${coffee.prices.b.toFixed(2)}</li>
            </ul>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-white font-semibold mb-1">📋 Ingredients:</p>
          <ul className="list-disc list-inside text-white/80">
            {coffee.ingredients?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <p className="text-white font-semibold mb-1">📖 Preparation:</p>
          <p className="italic text-white/70">{coffee.recept}</p>
        </div>

        <div className="flex justify-center">
          <BackButton />
        </div>
      </div>
    </div>
  );
}
