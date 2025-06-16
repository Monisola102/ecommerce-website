import Link from "next/link";
export default function SignInUser() {
  return (
    <>
      <div className="bg-[url('/regpic.jpg')] bg-cover bg-center min-h-screen pt-[20px]">
        <div className="flex h-auto flex-1 flex-col justify-center px-4 py-[50px] lg:px-8 bg-white/60 backdrop-blur-sm rounded-md max-w-2xl mx-auto ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Welcome Back
            </h2>
            <p className="text-center text-sm sm:text-base md:text-[15px] text-black px-4">
              Sign in to your account to continue.
            </p>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <Link
                      href="/forgot-password"
                      className="font-semibold text-purple-400 hover:text-black"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-purple-400 px-3 py-1.5 text-sm/6 font-semibold text-black shadow-xs hover:bg-white hover:text-purple-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-black">
              Don't have an account?{" "}
              <Link className="text-purple-400 hover:underline" href="/account">
                {" "}
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
