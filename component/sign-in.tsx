"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/store/hook";
import { useSignupMutation } from "@/store/Features/auth/auth-api";
import { setUser } from "@/store/Features/auth/auth-slice";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      toast.success(`Welcome, ${user.name}{"\u2764\uFE0F"}! `);

      setTimeout(() => {
        if (user.role === "admin") router.push("/admin");
        else router.push("/");
      }, 1200);
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

        {/* Signup Form */}
        <div className="flex flex-col justify-center px-6 py-12 lg:px-12 bg-white/60 backdrop-blur-sm w-full lg:w-1/2">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex items-center justify-center mb-4 gap-2">
              <h2 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2">
                Create Account
                <Image
                  src="/shoeShop.png"
                  alt="Logo"
                  width={28}
                  height={28}
                  className="rounded-full"
                />
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Name
                </label>
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

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Email
                </label>
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

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white/90 text-black pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white/90 text-black pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Button */}
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
