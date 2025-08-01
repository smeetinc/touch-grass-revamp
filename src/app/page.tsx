"use client";
import Image from "next/image";
import Hero from "@/components/Hero";
import { useState } from "react";

export default function HomePage() {
  const [connected, setConnected] = useState(true);
  console.log("Google Client ID:", process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

  return (
    <div className="min-h-screen  text-white relative">
      <main className="flex flex-col items-center justify-center px-4 py-8">
        {connected ? <Hero /> : null}
      </main>
    </div>
  );
}
