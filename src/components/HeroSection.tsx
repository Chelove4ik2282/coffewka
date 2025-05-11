'use client'

import { useState } from "react"
import dynamic from 'next/dynamic'

export default function HeroSection() {
  const [active, setActive] = useState<"order" | "menu">("order")

  const CoffeeModel = dynamic(() => import('@/components/CoffeeModel'), {
    ssr: false,
  })

  const handleToggle = (value: "order" | "menu") => {
    setActive(value)

    if (value === "menu") {
      const menuElement = document.getElementById("menu")
      if (menuElement) {
        menuElement.scrollIntoView({ behavior: "smooth" })
      }

      setTimeout(() => {
        setActive("order")
      }, 1000)
    }
  }

  return (
    <section
      id="home"
      className="flex flex-col items-center justify-start min-h-screen px-6 py-12 text-white"
    >
      {/* Заголовок и описание */}
      <div className="w-full md:w-3/4 lg:w-1/2 flex flex-col items-center text-center gap-6 mb-14">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">The Most</h1>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <h1 className="text-4xl md:text-6xl mt-5 font-signature text-amber-400">Delicious</h1>
          <img
            src="/coffee.png"
            alt="coffee"
            className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] drop-shadow-xl"
          />
          <h1 className="text-4xl md:text-6xl mt-5 font-signature text-amber-400">Coffee</h1>
        </div>

        <p className="text-base md:text-lg text-gray-300 max-w-xl leading-relaxed">
          We’ll make you the most delicious, most unusual, and everyone’s favorite coffee in just 10 minutes —{" "}
          <span className="text-white font-semibold">maybe.</span>
        </p>
      </div>

      {/* Модель кофе */}
      <div className="w-full md:w-2/3 lg:w-1/2 h-[400px] flex justify-center items-center mb-14">
        <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl">
          <CoffeeModel />
        </div>
      </div>

      {/* Переключатель */}
      <div className="py-6 mb-10">
        <div className="relative w-64 h-14 bg-white/10 rounded-full overflow-hidden shadow-inner border border-white/20">
          <div
            className={`absolute top-0 h-full w-1/2 rounded-full bg-white/20 backdrop-blur-md transition-transform duration-300 ${
              active === "menu" ? "translate-x-full" : "translate-x-0"
            }`}
          ></div>

          <div className="relative z-10 flex h-full w-full text-sm font-semibold tracking-wide">
            <button
              onClick={() => handleToggle("order")}
              className={`w-1/2 h-full flex items-center justify-center transition-colors duration-300 ${
                active === "order" ? "text-orange-400" : "text-white"
              }`}
            >
              To Order
            </button>
            <button
              onClick={() => handleToggle("menu")}
              className={`w-1/2 h-full flex items-center justify-center transition-colors duration-300 ${
                active === "menu" ? "text-orange-400" : "text-white"
              }`}
            >
              Menu
            </button>
          </div>
        </div>
      </div>

      {/* Видео процесса */}
      <div className="w-full md:w-3/4 lg:w-1/2 mb-6">
        <p className="text-lg text-gray-300 font-medium mb-3 text-center">Cooking Process:</p>
        <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl border border-white/10">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/jdguVU0F7fs?si=tlHmzszuL8__uMn2"
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div> 
    </section>
  )
}
