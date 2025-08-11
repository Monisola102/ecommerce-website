"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignupMutation }from "@/store/Features/auth/auth-api"; 
import { useAppDispatch } from "@/store/hook";
import { setUser } from "@/store/Features/auth/auth-slice";
import { toast } from "react-toastify";
import Image from "next/image";


interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpUser() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [signup, { isLoading }] = useSignupMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const user = await signup({
        name: form.name,
        email: form.email,
        password: form.password,
      }).unwrap();

      dispatch(setUser(user));
      toast.success(`Welcome, ${user.name}!`);

      setTimeout(() => {
        if (user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }, 1500);
    } catch (error: any) {
      toast.error(error?.data?.message || "Signup failed");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <div  className="flex items-center justify-center  mb-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create an Account
        </h2>
     <Image
      src="/shoeShop.png"
      alt="Logo"
      width={38} 
      height={38}
      className="rounded-full mb-2"
    />
    </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a password"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm your password"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </section>
  );
}
