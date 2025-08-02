"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import { useListAccounts } from "@0xsequence/connect";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import CreateCliqueModal from "@/components/CreateCliqueModal";

export default function HomePage() {
  const { walletAddress, email, isAuthenticated } = useAuth();
  const { data, isLoading, error, refetch } = useListAccounts();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please sign in to continue");
      router.push("/");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen  text-white relative">
      <main className="flex flex-col w-full">
        <Header />
        <div className="w-full items-center justify-center px-4 py-8">
          {isAuthenticated ? (
            <div>
              {/* Your homepage content */}
              <button onClick={() => setIsModalOpen(true)}>
                Create Clique
              </button>

              <CreateCliqueModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            </div>
          ) : (
            <Hero />
          )}
        </div>
      </main>
    </div>
  );
}
