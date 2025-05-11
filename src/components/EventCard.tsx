// components/EventCard.tsx
import React from "react";

interface EventCardProps {
  title: string;
  date: string;
  description: string;
  imageUrl: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, date, description, imageUrl }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-xl hover:scale-105 transform transition duration-300">
      <img src={imageUrl} alt={title} className="w-full h-56 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-extrabold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{date}</p>
        <p className="text-base text-gray-700 mt-4">{description}</p>
      </div>
    </div>
  );
};

export default EventCard;
