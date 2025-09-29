"use client";

import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0F0F17] text-white">
      {/* Left Section (Hidden on small screens) */}
      <div className="hidden md:flex w-1/2 bg-[#0B0B12] justify-center items-center p-10">
        <div>
          <h1 className="text-3xl font-bold mb-4">
            QUICK, <span className="text-purple-400">SECURE</span> &{" "}
            <span className="text-purple-400">RELIABLE</span>
          </h1>
          <p className="text-gray-400 mb-10">
            Your all-in-one solution for crypto trading and exchange
          </p>
          <div className="w-full h-64 bg-gradient-to-br from-gray-800 to-black rounded-lg flex justify-center items-center">
            <div className="w-24 h-24 bg-purple-500 rounded-full opacity-70" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-2">Login</h2>
          <p className="text-sm text-gray-400 mb-6">
            Don’t have an account?{" "}
            <a href="#" className="text-purple-400 hover:underline">
              Sign Up
            </a>
          </p>

          <form>
            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-4 bg-[#1A1A24] rounded focus:outline-none"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-2 bg-[#1A1A24] rounded focus:outline-none"
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm mb-6">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-purple-400 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-purple-400 text-white py-3 rounded hover:opacity-90 transition-opacity"
            >
              LOGIN
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center justify-center text-gray-500 text-sm">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              <span className="mx-2">Or</span>
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>

            {/* Google Sign-In */}
            <button
              type="button"
              className="w-full flex items-center justify-center border border-gray-700 py-2 rounded hover:bg-gray-800 transition-colors"
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
                className="w-5 h-5 mr-2"
              />
              Sign in with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
