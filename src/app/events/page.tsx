// pages/events.tsx
import React from "react";
import Link from "next/link";
import EventCard from "../../components/EventCard";
import Navbar from "@/components/layout/header";
import eventsList from "@/data/eventsList";

const EventsPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] via-[#2b2b2b] to-black">
      <Navbar />

      <section
        id="events"
        className="flex flex-col items-center justify-start min-h-screen px-6 py-12 text-white"
      >
        {/* Заголовок страницы */}
        <div className="w-full md:w-3/4 lg:w-1/2 flex flex-col items-center text-center gap-6 mb-14">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-amber-400">
            Upcoming Events
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-xl leading-relaxed">
            Don’t miss out on these exciting events! Come and join us for a cup
            of coffee and a good time.
          </p>
        </div>

        {/* Список событий */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full md:w-3/4 lg:w-2/3">
          {eventsList.map((event) => (
            <Link key={event.id} href={`/event/${event.id}`}>
              <EventCard {...event} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
