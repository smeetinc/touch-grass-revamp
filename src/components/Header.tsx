"use client";
import Image from "next/image";
import Logo from "../../public/logo.png";
import { BellRing, CircleUserRound } from "lucide-react";
import { useWallet } from "@/context/WalletProvider";

// src/components/Header.tsx
export default function Header() {
  const { address, isConnected, connect, disconnect } = useWallet();

  return (
    <header className="flex justify-between items-center bg-green-900 text-white px-4 py-3 opacity-95">
      <div className="">
        <Image
          src={Logo}
          alt="touch grass logo"
          className="w-16 h-16 object-contain"
        />
      </div>
      <div className="flex items-center space-x-6">
        <BellRing />
        <CircleUserRound />
        {isConnected ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
            <button
              className="border border-[#32FF3E] text-white cursor-pointer font-semibold px-6 py-2 rounded hover:bg-white hover:text-[#32FF3E]"
              onClick={disconnect}
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            className="border border-[#32FF3E] text-white cursor-pointer font-semibold px-6 py-2 rounded hover:bg-white hover:text-[#32FF3E]"
            onClick={connect}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
}
