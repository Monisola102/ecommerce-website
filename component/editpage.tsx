"use client";

import { useState, useEffect } from "react";
import {
  useFetchUserQuery,
  useUpdateUserProfileMutation,
} from "@/store/Features/auth/auth-api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const { data, isLoading: isFetching } = useFetchUserQuery();
  const user = data?.data; 

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    shippingAddress: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        shippingAddress: {
          street: user.shippingAddress?.street ?? "",
          city: user.shippingAddress?.city ?? "",
          state: user.shippingAddress?.state ?? "",
          zip: user.shippingAddress?.zip ?? "",
        },
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData).unwrap();
      toast.success("Profile updated successfully!");
      router.push("/account/profile");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  if (isFetching) return <p className="text-center p-6">Loading profile...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div className="space-y-2">
          <p className="font-medium">Shipping Address</p>
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={formData.shippingAddress.street}
            onChange={handleAddressChange}
            className="w-full border rounded-lg px-3 py-2 mb-2"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.shippingAddress.city}
            onChange={handleAddressChange}
            className="w-full border rounded-lg px-3 py-2 mb-2"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.shippingAddress.state}
            onChange={handleAddressChange}
            className="w-full border rounded-lg px-3 py-2 mb-2"
          />
          <input
            type="text"
            name="zip"
            placeholder="Zip Code"
            value={formData.shippingAddress.zip}
            onChange={handleAddressChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
        >
          {isLoading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
