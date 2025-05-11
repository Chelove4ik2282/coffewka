'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import coffeeList from '@/data/coffeeList';
import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';
import { useSession } from 'next-auth/react';

export default function MenuSection() {
  const [selectedSizes, setSelectedSizes] = useState<{ [id: number]: 's' | 'm' | 'b' }>({});
  const [addedIds, setAddedIds] = useState<number[]>([]);
  const [search, setSearch] = useState('');
  const { addToCart } = useCart();
  const { data: session, status } = useSession();

  const handleSizeChange = (id: number, size: 's' | 'm' | 'b') => {
    setSelectedSizes((prev) => ({ ...prev, [id]: size }));
  };

  const handleAddToCart = (coffee: any, size: 's' | 'm' | 'b') => {
    const price = coffee.prices[size];
    addToCart({ id: coffee.id, name: coffee.name, size, price });

    setAddedIds((prev) => [...prev, coffee.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== coffee.id));
    }, 700);
  };

  const filteredCoffeeList = coffeeList.filter((coffee) =>
    coffee.name.toLowerCase().includes(search.toLowerCase())
  );

  const isAuthenticated = !!session;

  return (
    <section id="menu" className="flex flex-col items-center py-20 text-white bg-black">
      {/* Заголовок */}
      <div className="flex items-center justify-center w-full mb-12 px-4">
        <div className="flex-grow border-t border-yellow/20"></div>
        <h2 className="mx-6 text-4xl md:text-5xl font-signature text-amber-400 tracking-widest">MENU</h2>
        <div className="flex-grow border-t border-yellow/20"></div>
      </div>

      {/* Поиск */}
      <div className="w-full max-w-md mb-10 px-4">
        <input
          type="text"
          placeholder="Search coffee..."
          className="w-full px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Карточки кофе */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-6 w-full max-w-7xl">
        {filteredCoffeeList.length > 0 ? (
          filteredCoffeeList.map((coffee) => {
            const size = selectedSizes[coffee.id] || 'm';
            const price = coffee.prices[size];
            const isAdded = addedIds.includes(coffee.id);

            return (
              <div
                key={coffee.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-white/10 hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
              >
                <Link href={`/menu/${coffee.id}`}>
                  <div className="w-full h-48 relative mb-4">
                    <Image
                      src={coffee.image}
                      alt={coffee.name}
                      fill
                      className="object-contain transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-amber-300 mb-2">{coffee.name}</h3>
                </Link>

                {/* Размеры */}
                <div className="flex items-center gap-2 mb-3">
                  {['s', 'm', 'b'].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSizeChange(coffee.id, s as 's' | 'm' | 'b')}
                      className={`px-3 py-1 rounded-full border text-sm uppercase transition-all duration-200 active:scale-90 ${
                        size === s
                          ? 'bg-amber-400 text-black shadow-lg'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Цена и кнопка */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-white">${price.toFixed(2)}</span>

                  {isAuthenticated && (
                    <button
                      onClick={() => handleAddToCart(coffee, size)}
                      className={`relative flex items-center justify-center rounded-full font-semibold transition-all duration-300 ease-in-out
                        active:scale-95 h-10 overflow-hidden
                        ${isAdded ? 'w-10 bg-green-500 text-white' : 'w-36 bg-amber-400 text-black hover:bg-amber-300 hover:shadow-md'}
                      `}
                    >
                      <div
                        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
                          isAdded ? 'opacity-100 scale-110' : 'opacity-0'
                        }`}
                      >
                        <FaCheck className="text-lg" />
                      </div>

                      <span className={`transition-opacity duration-200 ${isAdded ? 'opacity-0' : 'opacity-100'}`}>
                        Add to Cart
                      </span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-white/50 col-span-full text-center">No results found</p>
        )}
      </div>
    </section>
  );
}
