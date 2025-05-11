// pages/about.tsx
import Navbar from "@/components/layout/header";
import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] via-[#2b2b2b] to-black"> <Navbar />
    <section id="about" className="flex flex-col items-center justify-start min-h-screen px-6 py-12 text-white">
      {/* Заголовок */}
      <div className="w-full md:w-3/4 lg:w-1/2 flex flex-col items-center text-center gap-6 mb-14">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-amber-400">About Us</h1>
        <p className="text-base md:text-lg text-gray-300 max-w-xl leading-relaxed">
          Behind every cup of coffee, there's a story. And ours is just as rich as our roast.
        </p>
      </div>

      {/* Контент */}
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Изображение */}
        <div className="w-full h-72 md:h-96 rounded-xl overflow-hidden shadow-xl border border-white/10">
          <img
            src="/coffee-shop.jpg"
            alt="Our Coffee Shop"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Текст */}
        <div className="text-gray-200 space-y-4">
          <h2 className="text-2xl font-bold text-white">The Heart of Coffeewka</h2>
          <p>
            We're a team of passionate baristas, artists, and dreamers who believe coffee is more than just a drink —
            it’s a ritual. Our journey started in a tiny corner café, and now we’re proud to share our signature blends
            and cozy vibes with the world.
          </p>
          <p>
            Every bean is carefully selected, roasted with love, and brewed with precision. Whether you're here for a
            morning pick-me-up or a quiet moment, you’re part of our story.
          </p>
        </div>
      </div>

      {/* Дополнительный текст / блок */}
      <div className="w-full mt-16 max-w-4xl text-center">
        <h3 className="text-xl font-semibold text-amber-300 mb-2">More Than Coffee</h3>
        <p className="text-gray-400">
          We host workshops, tastings, and events that bring people together — all over a great cup of coffee. Keep an
          eye on our events section to join the next experience!
        </p>
      </div>
    </section>
    </div>
  );
};

export default AboutPage;
