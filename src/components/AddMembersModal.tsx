// components/AddMembersModal.tsx
"use client";

import React, { useState } from "react";
import { Search, Users, UserPlus, X } from "lucide-react";

interface AddMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMembers?: (selectedUsers: string[]) => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isSelected: boolean;
}

const AddMembersModal: React.FC<AddMembersModalProps> = ({
  isOpen,
  onClose,
  onAddMembers,
}) => {
  const [activeTab, setActiveTab] = useState<"all" | "friends">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      isSelected: false,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      isSelected: false,
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      isSelected: false,
    },
    {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      isSelected: false,
    },
  ]);

  const toggleUserSelection = (userId: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isSelected: !user.isSelected } : user
      )
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "friends") {
      // You can add logic here to filter friends only
      return matchesSearch;
    }

    return matchesSearch;
  });

  const selectedUsers = users.filter((user) => user.isSelected);

  const handleDone = () => {
    if (onAddMembers) {
      onAddMembers(selectedUsers.map((user) => user.id));
    }
    onClose();
    // Reset selections
    setUsers((prevUsers) =>
      prevUsers.map((user) => ({ ...user, isSelected: false }))
    );
    setSearchQuery("");
  };

  const handleClose = () => {
    onClose();
    // Reset selections and search
    setUsers((prevUsers) =>
      prevUsers.map((user) => ({ ...user, isSelected: false }))
    );
    setSearchQuery("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="border rounded-2xl w-full max-w-md h-[600px] flex flex-col relative">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-xl font-semibold">Add Members</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-colors ${
                activeTab === "all"
                  ? "border-green-500 bg-green-500/10 text-green-400"
                  : "border-gray-600 text-gray-400 hover:border-gray-500"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>all</span>
            </button>

            <button
              onClick={() => setActiveTab("friends")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-colors ${
                activeTab === "friends"
                  ? "border-green-500 bg-green-500/10 text-green-400"
                  : "border-gray-600 text-gray-400 hover:border-gray-500"
              }`}
            >
              <span>friends</span>
            </button>

            <button className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-600 text-gray-400 hover:border-gray-500 transition-colors">
              <UserPlus className="w-4 h-4" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by wallet, or email"
              className="w-full bg-gray-800 text-gray-200 placeholder-gray-400 rounded-lg pl-12 pr-4 py-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-3">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                  onClick={() => toggleUserSelection(user.id)}
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="text-white font-medium">{user.name}</div>
                    <div className="text-gray-400 text-sm">{user.email}</div>
                  </div>

                  {/* Selection Indicator */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      user.isSelected
                        ? "border-green-500 bg-green-500"
                        : "border-gray-400"
                    }`}
                  >
                    {user.isSelected && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400 py-8">
                <p>No users found</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700">
          <button
            onClick={handleDone}
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
            disabled={selectedUsers.length === 0}
          >
            Done {selectedUsers.length > 0 && `(${selectedUsers.length})`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMembersModal;
