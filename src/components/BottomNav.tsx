"use client";

import { Home, Users2, Plus, MessageCircle, User } from "lucide-react";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-4 left-0 w-full flex justify-around items-center px-6">
      {[Home, Users2, Plus, MessageCircle, User].map((Icon, index) => (
        <button
          key={index}
          className="bg-green-700 hover:bg-green-600 p-3 rounded-full text-white shadow-md transition"
        >
          <Icon size={20} />
        </button>
      ))}
    </nav>
  );
}
