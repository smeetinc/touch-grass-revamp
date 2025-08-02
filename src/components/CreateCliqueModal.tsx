"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LiaTimesCircleSolid } from "react-icons/lia";
import { FaTimesCircle } from "react-icons/fa";

interface CreateCliqueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCliqueModal: React.FC<CreateCliqueModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [cliqueName, setCliqueName] = useState("");
  const router = useRouter();

  const handleCreateClique = (e: React.FormEvent) => {
    e.preventDefault();
    if (cliqueName.trim()) {
      // Store clique name in localStorage or send to API
      localStorage.setItem("currentClique", cliqueName.trim());
      router.push("/clique");
      onClose();
      setCliqueName("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0   flex items-center justify-center p-4 z-50">
      <div className="rounded-2xl p-8 w-full max-w-md border ">
        <div onClick={onClose} className="w-full flex justify-end">
          <FaTimesCircle className="font-bold  w-8 h-8 text-white" />
        </div>

        <form onSubmit={handleCreateClique} className="space-y-6">
          <div className="mt-6">
            <input
              type="text"
              value={cliqueName}
              onChange={(e) => setCliqueName(e.target.value)}
              placeholder="Clique Name"
              className="w-full  text-gray-200 placeholder-gray-400 rounded-lg px-4 py-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer text-gray-200 rounded-lg px-6 py-3 border border-gray-600 hover:bg-gray-600 transition-colors font-medium"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCliqueModal;
