"use client";
import Link from "next/link";
import { useState} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/store/hook";
import { useLoginMutation } from "@/store/Features/auth/auth-api"; 
import { setUser } from "@/store/Features/auth/auth-slice"; 
import Image from "next/image";



export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await login({ email, password }).unwrap(); 
      dispatch(setUser(user));
      toast.success("Login successful!");
      router.replace(redirectUrl || "/");
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row shadow-lg rounded-lg overflow-hidden">
        <div className="hidden lg:block lg:w-1/2">
          <div className="h-full w-full min-h-[500px] bg-[url('/reg4pic.jpg')] bg-cover bg-center" >
          </div>
        </div>
        <div className="flex flex-col justify-center px-6 py-12 lg:px-12 bg-white/60 backdrop-blur-sm w-full lg:w-1/2">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex items-center justify-center  mb-4">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">
              Login 
            </h2>
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
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white/90 text-black"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white/90 text-black"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-green-500 text-black font-semibold py-2 rounded-md hover:opacity-90 transition"
              >
                {isLoading ? "Logging in..." : "LOGIN"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-black">
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
