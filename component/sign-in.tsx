"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/store/hook";
import { useSignupMutation } from "@/store/Features/auth/auth-api";
import { setUser } from "@/store/Features/auth/auth-slice";
import Link from "next/link";
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
        if (user.role === "admin") router.push("/admin");
        else router.push("/");
      }, 1500);
    } catch (error: any) {
      toast.error(error?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row shadow-lg rounded-lg overflow-hidden">
        {/* Left image */}
        <div className="hidden lg:block lg:w-1/2">
          <div className="h-full w-full min-h-[500px] bg-[url('/reg4pic.jpg')] bg-cover bg-center" />
        </div>

        {/* SignUp Form */}
        <div className="flex flex-col justify-center px-6 py-12 lg:px-12 bg-white/60 backdrop-blur-sm w-full lg:w-1/2">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex items-center justify-center mb-4 gap-2">
              <h2 className="text-2xl font-bold text-center text-gray-900">Create Account</h2>
              <Image
                src="/shoeShop.png"
                alt="Logo"
                width={38}
                height={38}
                className="rounded-full mb-2"
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white/90 text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white/90 text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white/90 text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white/90 text-black"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-green-500 text-black font-semibold py-2 rounded-md hover:opacity-90 transition"
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-black">
              Already have an account?{" "}
              <Link href="/login" className="hover:underline text-purple-400">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
