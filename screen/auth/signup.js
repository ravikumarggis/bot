"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Mail, Key, UserPlus } from "lucide-react";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    referral: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});

  // handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // validation
  const validate = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.terms) {
      newErrors.terms = "You must accept the Terms & Conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("✅ Form Submitted:", formData);
      // TODO: call your signup API here
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0F0F17] ">
      <div className="hidden md:flex w-1/2 bg-[#0B0B12] justify-center items-center p-10">
        <div>
          <h1 className="text-3xl font-bold mb-4">
            QUICK, <span className="text-purple-400">SECURE</span> &{" "}
            <span className="text-purple-400">RELIABLE</span>
          </h1>
          <p className="text-gray-400 mb-10">
            Your all-in-one solution for crypto trading and exchange
          </p>

          {/* Image container */}
          <div className="w-full h-64 bg-gradient-to-br from-gray-800 to-black rounded-lg flex justify-center items-center overflow-hidden">
            <img
              src="/assets/auth/wallet.jpeg" // replace with your image path
              alt="Crypto Dashboard"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-semibold mb-2">Sign Up</h2>
          <p className="text-sm text-gray-400 mb-6">
            Already have an account?{" "}
            <a href="/login" className="text-purple-400 hover:underline">
              Log in
            </a>
          </p>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="mb-4 relative">
              <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 pl-10 bg-[#1A1A24] rounded focus:outline-none ${
                  errors.email ? "border border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Referral (optional) */}
            <div className="mb-4 relative">
              <UserPlus
                className="absolute left-3 top-3 text-gray-500"
                size={20}
              />
              <input
                type="text"
                name="referral"
                placeholder="Enter referral code (optional)"
                value={formData.referral}
                onChange={handleChange}
                className="w-full p-3 pl-10 bg-[#1A1A24] rounded focus:outline-none"
              />
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <Key className="absolute left-3 top-3 text-gray-500" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-3 pl-10 pr-10 bg-[#1A1A24] rounded focus:outline-none ${
                  errors.password ? "border border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 flex items-center text-gray-400 hover:text-white ${
                  errors.password ? "bottom-10" : "bottom-3"
                }`}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-4 relative">
              <Key className="absolute left-3 top-3 text-gray-500" size={20} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full p-3 pl-10 pr-10 bg-[#1A1A24] rounded focus:outline-none ${
                  errors.confirmPassword ? "border border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={`absolute right-3 flex items-center text-gray-400 hover:text-white ${
                  errors.confirmPassword ? "bottom-10" : "bottom-3"
                }`}
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="mb-6">
              <label className="flex items-start text-sm cursor-pointer">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="mr-2 mt-1"
                />
                I accept the{" "}
                <a href="#" className="text-purple-400 ml-1 hover:underline">
                  Terms & Conditions
                </a>{" "}
                &{" "}
                <a href="#" className="text-purple-400 ml-1 hover:underline">
                  Privacy Policy
                </a>
              </label>
              {errors.terms && (
                <p className="text-red-500 text-sm mt-1">{errors.terms}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-purple-400 text-white py-3 rounded-lg hover:opacity-90 transition"
            >
              SIGN UP
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center justify-center text-gray-500 text-sm">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              <span className="mx-2">Or</span>
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>

            {/* Google Sign-in */}
            <button
              type="button"
              className="w-full flex items-center justify-center border border-gray-700 py-2 rounded hover:bg-gray-800 transition-colors"
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
                className="w-5 h-5 mr-2"
              />
              Sign up with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
