"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Share, UserPlus } from "lucide-react";

interface Clique {
  id: string;
  name: string;
  memberCount: number;
}

const CliqueDetailPage = () => {
  const router = useRouter();
  const [clique, setClique] = useState<Clique | null>(null);

  useEffect(() => {
    // Get selected clique from localStorage or fetch from API
    const selectedClique = localStorage.getItem("selectedClique");
    if (selectedClique) {
      setClique(JSON.parse(selectedClique));
    }
  }, []);

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
    alert("Invite users feature - this would open a user selection modal");
  };

  if (!clique) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

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
        <div className="bg-green-600 rounded-full px-4 py-2 inline-block">
          <span className="text-white font-medium">I'm game!</span>
        </div>

        {/* Additional clique detail content */}
        <div className="mt-8">
          <h2 className="text-white text-xl font-semibold mb-4">
            {clique.name}
          </h2>
          <p className="text-gray-400">Members: {clique.memberCount}</p>

          {/* Add more clique details here */}
          <div className="mt-8 text-gray-400">
            <p>Clique activities and interactions will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CliqueDetailPage;
