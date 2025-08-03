// components/AddMembersModal.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Search, Users, UserPlus, X } from "lucide-react";

interface AddMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  cliqueId: string;
  currentMembers: string[]; // wallet addresses
  onMembersAdded?: () => void;
}

interface User {
  _id: string;
  walletAddress: string;
  email?: string;
  username?: string;
  isSelected: boolean;
}

const AddMembersModal: React.FC<AddMembersModalProps> = ({
  isOpen,
  onClose,
  cliqueId,
  currentMembers,
  onMembersAdded,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();

        const filtered = data.users
          .filter((user: any) => !currentMembers.includes(user.walletAddress))
          .map((user: any) => ({
            ...user,
            isSelected: false,
          }));

        setUsers(filtered);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, [isOpen, currentMembers]);

  const toggleSelect = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, isSelected: !u.isSelected } : u))
    );
  };

  const handleDone = async () => {
    const selectedWallets = users
      .filter((u) => u.isSelected)
      .map((u) => u.walletAddress);

    if (selectedWallets.length === 0) return;

    try {
      await fetch(`/api/clique/${cliqueId}/add-member`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ members: selectedWallets }),
      });

      onClose();
      onMembersAdded?.();
    } catch (err) {
      console.error("Failed to add members:", err);
      alert("Something went wrong");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.walletAddress?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/70">
      <div className="bg-[#111] w-full max-w-md rounded-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Add Members</h2>
          <X onClick={onClose} className="text-white cursor-pointer" />
        </div>

        {/* Search */}
        <div className="px-6 py-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users..."
              className="w-full bg-gray-800 text-white rounded px-10 py-2 border border-gray-700"
            />
          </div>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto px-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between py-2 border-b border-gray-800"
              >
                <div>
                  <p className="text-white text-sm font-medium">
                    {user.username || user.walletAddress.slice(0, 8)}...
                  </p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
                <button
                  onClick={() => toggleSelect(user._id)}
                  className={`px-3 py-1 rounded text-sm ${
                    user.isSelected
                      ? "bg-green-600 text-white"
                      : "border border-gray-600 text-gray-400"
                  }`}
                >
                  {user.isSelected ? "Selected" : "Add"}
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-6">No users found</p>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <button
            disabled={!users.some((u) => u.isSelected)}
            onClick={handleDone}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            Add Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMembersModal;
