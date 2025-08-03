"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Share, UserPlus } from "lucide-react";
import AddMembersModal from "@/components/AddMembersModal";
import { useAuth } from "@/context/AuthContext";

interface Clique {
  id: string;
  name: string;
  memberCount: number;
}

const CliquePage = () => {
  const { walletAddress } = useAuth();
  const [addMembers, setAddMembers] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [cliques, setCliques] = useState<Clique[]>([]);

  useEffect(() => {
    const fetchCliques = async () => {
      if (!walletAddress) return;

      try {
        const res = await fetch(`/api/clique?walletAddress=${walletAddress}`);
        const data = await res.json();

        const mapped = data.cliques.map((clique: any) => ({
          id: clique._id,
          name: clique.name,
          memberCount: clique.members.length,
        }));

        setCliques(mapped);
      } catch (err) {
        console.error("Error fetching cliques", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCliques();
  }, [walletAddress]);

  const handleShare = () => {
    // Generate referral link logic
    const referralLink = `${window.location.origin}/invite?ref=${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied to clipboard!");
  };

  const handleInviteUsers = () => {
    // Logic to invite existing app users to clique
    setAddMembers(true);
  };

  const handleCliqueClick = (clique: Clique) => {
    // Store selected clique and navigate to detail page
    localStorage.setItem("selectedClique", JSON.stringify(clique));
    router.push(`/clique/${clique.id}`);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-green-600 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => router.back()}
            className="text-white hover:bg-green-700 p-1 rounded transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white text-lg font-medium">Clique Name</h1>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleShare}
            className="text-white hover:bg-green-700 p-2 rounded transition-colors"
          >
            <Share className="w-5 h-5" />
          </button>
          <button
            onClick={handleInviteUsers}
            className="text-white hover:bg-green-700 p-2 rounded transition-colors"
          >
            <UserPlus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="space-y-4">
          {cliques.map((clique) => (
            <div key={clique.id} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {clique.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <button
                onClick={() => handleCliqueClick(clique)}
                className="text-white text-lg hover:text-green-400 transition-colors"
              >
                {clique.name}
              </button>
            </div>
          ))}
        </div>
        <div>
          <AddMembersModal
            isOpen={addMembers}
            onClose={() => setAddMembers(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default CliquePage;
