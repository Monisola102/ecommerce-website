"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/store/hook";
import { useLoginMutation } from "@/store/Features/auth/auth-api";
import { setUser } from "@/store/Features/auth/auth-slice";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await login({ email, password }).unwrap();
      dispatch(setUser(user));
      toast.success("Login successful!");
      console.log("All accessible cookies:", document.cookie);
      router.replace(redirectUrl || "/");
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row shadow-lg rounded-lg overflow-hidden">
        {/* Left Image */}
        <div className="hidden lg:block lg:w-1/2">
          <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-full w-full bg-[url('/reg4pic.jpg')] bg-cover bg-center" />
        </div>

        {/* Form Section */}
        <div className="flex flex-col justify-center px-4 py-8 sm:px-6 md:px-10 lg:px-12 bg-white/60 backdrop-blur-sm w-full lg:w-1/2">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex items-center justify-center mb-4 gap-2">
              <h2 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2">
                Login
                <Image
                  src="/shoeShop.png"
                  alt="Logo"
                  width={28}
                  height={28}
                  className="rounded-full"
                />
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm sm:text-base font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-md bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password with Eye Toggle */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm sm:text-base font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-md bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-900"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link
                  href="/account/forgot-password"
                  className="text-sm text-purple-500 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-green-500 text-black font-semibold py-2 sm:py-3 rounded-md hover:opacity-90 transition"
              >
                {isLoading ? "Logging in..." : "LOGIN"}
              </button>
            </form>

            {/* Redirect */}
            <p className="mt-6 text-center text-sm sm:text-base text-black">
              Don't have an account?{" "}
              <Link href="/sign-in" className="hover:underline text-purple-400">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
