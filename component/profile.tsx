"use client";

import React, { useEffect } from "react";
import { useFetchUserQuery } from "@/store/Features/auth/auth-api";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: userResponse, isLoading, isError } = useFetchUserQuery();
  const router = useRouter();

  const user = userResponse?.data;

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login?redirect=/account/profile");
    }
  }, [user, isLoading, router]);

  if (isLoading) return <p className="text-center p-6">Loading profile...</p>;
  if (isError || !user) return null;

  // Role badge color
  const roleColor = user.role === "admin"
    ? "bg-red-100 text-red-700"
    : user.role === "moderator"
    ? "bg-blue-100 text-blue-700"
    : "bg-green-100 text-green-700";

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6 sm:p-8 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 md:mb-0">
            My Profile
          </h1>
          <button className="px-5 py-2 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">
            Edit Profile
          </button>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-gray-500 font-medium">Name</p>
            <p className="text-gray-800 text-lg font-semibold">{user.name}</p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-500 font-medium">Email</p>
            <p className="text-gray-800 text-lg font-semibold">{user.email}</p>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <p className="text-gray-500 font-medium">Role</p>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${roleColor}`}>
              {user.role || "User"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
