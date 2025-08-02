"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Share, UserPlus, Upload } from "lucide-react";
import MemoryMintedModal from "@/components/MemoryMintedModal";

interface PlanData {
  planTitle: string;
  location: string;
  time: string;
  vibeCheck: string;
  isClique: boolean;
}

const SealVibePage = () => {
  const router = useRouter();
  const [planData, setPlanData] = useState<PlanData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadPlanData = () => {
      try {
        const storedPlan = localStorage.getItem("planData");
        if (storedPlan) {
          setPlanData(JSON.parse(storedPlan));
        } else {
          // Fallback data if no stored plan
          setPlanData({
            planTitle: "Gaming Session",
            location: "Georgia",
            time: "3:00pm",
            vibeCheck: "Energetic",
            isClique: false,
          });
        }
      } catch (error) {
        console.error("Error loading plan data:", error);
        // Set fallback data
        setPlanData({
          planTitle: "Gaming Session",
          location: "Georgia",
          time: "3:00pm",
          vibeCheck: "Energetic",
          isClique: false,
        });
      } finally {
        setIsLoading(false);
      }
    };

    // Add a small delay to ensure localStorage is available
    const timer = setTimeout(loadPlanData, 100);
    return () => clearTimeout(timer);
  }, []);

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

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleMintMemory = () => {
    if (uploadedFile) {
      setShowModal(true);
    } else {
      alert("Please upload a memory first!");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pb-20">
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
        </div>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    );
  }

  if (!planData) {
    return (
      <div className="min-h-screen pb-20">
        <div className="bg-green-600 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.push("/plan")}
              className="text-white hover:bg-green-700 p-1 rounded transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-white text-lg font-medium">Plan</h1>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-6">
          <div className="text-white text-center">
            <p>No plan data found.</p>
            <button
              onClick={() => router.push("/plan")}
              className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Create New Plan
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
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
              Seal The Vibe
            </h2>
            <p className="text-gray-400">
              Upload a snap, tag your crew, and mint this moment forever.
            </p>
          </div>

          {/* Form Container */}
          <div className="border border-gray-600 rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Plan Title */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Plan Title
                </label>
                <input
                  type="text"
                  value={planData.planTitle}
                  readOnly
                  className="w-full bg-gray-800 text-gray-200 rounded-lg px-4 py-3 border border-gray-600"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={planData.location}
                  readOnly
                  className="w-full bg-gray-800 text-gray-200 rounded-lg px-4 py-3 border border-gray-600"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Time
                </label>
                <input
                  type="text"
                  value={planData.time}
                  readOnly
                  className="w-full bg-gray-800 text-gray-200 rounded-lg px-4 py-3 border border-gray-600"
                />
              </div>

              {/* Vibe Check */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Vibe check
                </label>
                <input
                  type="text"
                  value={planData.vibeCheck}
                  readOnly
                  className="w-full bg-gray-800 text-gray-200 rounded-lg px-4 py-3 border border-gray-600"
                />
              </div>
            </div>

            {/* Clique Toggle */}
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-white font-medium">Clique</span>
              <div
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  planData.isClique ? "bg-green-500" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    planData.isClique ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </div>
            </div>

            {/* File Upload Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? "border-green-500 bg-green-500/10"
                  : "border-gray-600 hover:border-gray-500"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/*,video/*"
                onChange={handleFileInput}
              />

              {uploadedFile ? (
                <div className="text-green-400">
                  <div className="mb-2">✓ {uploadedFile.name}</div>
                  <button
                    onClick={() => setUploadedFile(null)}
                    className="text-gray-400 text-sm hover:text-white"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="text-gray-400">
                  <Upload className="w-8 h-8 mx-auto mb-2" />
                  <p className="mb-2">Drag or upload memory</p>
                  <label
                    htmlFor="file-upload"
                    className="text-green-400 hover:text-green-300 cursor-pointer"
                  >
                    Choose file
                  </label>
                </div>
              )}
            </div>

            {/* Mint Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleMintMemory}
                className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                Mint Memory
              </button>
            </div>
          </div>
        </div>
      </div>

      <MemoryMintedModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default SealVibePage;
