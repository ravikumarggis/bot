"use client";

import React, { useEffect, useState } from "react";

const OTPModal = ({
  isOpen,
  onClose,
  onSubmit,
  title = "Verify Your Email",
  subtitle = "Enter the code below to continue.",
  instructions = "Check your email for the One-Time Password (OTP). Please also look in your spam folder if you don’t see it.",
  length = 6,
  duration = 90,
  isLoading = false,
}) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const [timer, setTimer] = useState(duration);

  useEffect(() => {
    if (isOpen) {
      setOtp(Array(length).fill(""));
      setTimer(duration);
    }
  }, [isOpen, length, duration]);

  useEffect(() => {
    if (timer > 0 && isOpen) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer, isOpen]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < length - 1) {
      const next = document.getElementById(`otp-${index + 1}`);
      if (next) next.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      if (prev) prev.focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m} m : ${s} s`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isOtpComplete && onSubmit) {
      onSubmit(otp.join(""));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-md bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 w-8 h-8 flex items-center justify-center rounded hover:bg-gray-700"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 text-center">
          <p className="text-gray-400 mb-1">{subtitle}</p>
          <p className="text-gray-500 text-sm mb-6">{instructions}</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-4">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className="w-14 h-14 text-center text-white text-xl bg-[#1A1A24] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              ))}
            </div>

            <div className="text-gray-400 text-sm">{formatTime(timer)}</div>

            <button
              type="submit"
              disabled={!isOtpComplete || isLoading}
              className={`w-full py-3 rounded-[10px] text-white font-semibold transition-all ${
                isOtpComplete
                  ? "bg-primary hover:opacity-90"
                  : "bg-primary opacity-50 cursor-not-allowed"
              }`}
            >
              {isLoading ? "Processing.." : `Submit`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
