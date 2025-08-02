// app/plan/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Share, UserPlus, MessageCircle } from "lucide-react";

const PlanPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    planTitle: "",
    location: "",
    time: "",
    vibeCheck: "",
    isPublic: true,
    isClique: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleShare = () => {
    const shareLink = `${window.location.origin}/plan/share?id=${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    navigator.clipboard.writeText(shareLink);
    alert("Plan link copied to clipboard!");
  };

  const handleInviteUsers = () => {
    alert("Invite users feature - this would open a user selection modal");
  };

  const handleJoinChat = () => {
    alert("Join chat feature - this would open the chat for this plan");
  };

  const handlePostPlan = () => {
    // Store plan data and navigate to seal the vibe page
    localStorage.setItem("planData", JSON.stringify(formData));
    router.push("/plan/seal-vibe");
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
          <h1 className="text-white text-lg font-medium">Plan</h1>
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
        {/* Header Text */}
        <div className="text-center mb-8">
          <h2 className="text-white text-2xl font-bold mb-2">
            Touch grass today!
          </h2>
          <p className="text-gray-400">
            Create an NFT, share the moment, let friends mint.
          </p>
        </div>

        {/* Form Container */}
        <div className="border border-gray-600 rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Plan Title */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Plan Title
              </label>
              <input
                type="text"
                value={formData.planTitle}
                onChange={(e) => handleInputChange("planTitle", e.target.value)}
                placeholder="Gamings"
                className="w-full bg-gray-800 text-gray-200 placeholder-gray-500 rounded-lg px-4 py-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Georgia"
                className="w-full bg-gray-800 text-gray-200 placeholder-gray-500 rounded-lg px-4 py-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Time
              </label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
                placeholder="3:00pm"
                className="w-full bg-gray-800 text-gray-200 placeholder-gray-500 rounded-lg px-4 py-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Vibe Check */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Vibe check
              </label>
              <input
                type="text"
                value={formData.vibeCheck}
                onChange={(e) => handleInputChange("vibeCheck", e.target.value)}
                placeholder="How you feeling?"
                className="w-full bg-gray-800 text-gray-200 placeholder-gray-500 rounded-lg px-4 py-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center space-x-3">
              <span className="text-white font-medium">Public</span>
              <button
                onClick={() =>
                  handleInputChange("isPublic", !formData.isPublic)
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.isPublic ? "bg-green-500" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.isPublic ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-white font-medium">Clique</span>
              <button
                onClick={() =>
                  handleInputChange("isClique", !formData.isClique)
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.isClique ? "bg-green-500" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.isClique ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-8">
            <button
              onClick={handleJoinChat}
              className="flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Join chat</span>
            </button>
            <button
              onClick={handlePostPlan}
              className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              Post Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanPage;
