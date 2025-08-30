"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useForgotPasswordMutation } from "@/store/Features/auth/auth-api";
import { BsQuestionDiamond } from "react-icons/bs";


export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword({ email }).unwrap();
      toast.success("Password reset link sent to your email.");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send reset link");
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
  <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900">
    Forgot Password
  </h2>
  <BsQuestionDiamond  className="w-8 h-8 text-purple-500" />
</div>
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-900">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your registered email"
                  className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-md bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-green-500 text-black font-semibold py-2 sm:py-3 rounded-md hover:opacity-90 transition"
              >
                {isLoading ? "Sending..." : "SEND RESET LINK"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
