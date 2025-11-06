"use client";

import React, { useEffect, useState, useRef } from "react";

const OTPModal = ({
  isOpen,
  onClose,
  onSubmit,
  title = "Verify Your Email",
  subtitle = "Enter the code below to continue.",
  instructions = "Check your email for the One-Time Password (OTP). Please also look in your spam folder if you don’t see it.",
  length = 4,
  duration = 90,
  isLoading = false,
  resendEnable = true,
}) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const [timer, setTimer] = useState(duration);
  const inputsRef = useRef([]); // <--- added ref for inputs

  useEffect(() => {
    if (isOpen) {
      setOtp(Array(length).fill(""));
      setTimer(duration);
      // focus first input when modal opens
      setTimeout(() => inputsRef.current?.[0]?.focus?.(), 50);
    }
  }, [isOpen, length, duration]);

  useEffect(() => {
    if (timer > 0 && isOpen) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
    // no-op else; don't focus here repeatedly
  }, [timer, isOpen]);

  // helper to update otp state from array of digits
  const updateOtpStateFromArray = (arr) => {
    setOtp(arr.slice(0, length));
  };

  // NOTE: keep signature (index, value) to match your current inputs' onChange
  const handleChange = (index, value) => {
    // allow only single digit or empty
    if (!/^[0-9]?$/.test(value)) return;
    const otpArray = Array.from({ length }, (_, i) => otp[i] || "");
    otpArray[index] = value;
    updateOtpStateFromArray(otpArray);

    // move focus to next input if a digit was entered
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus?.();
      inputsRef.current[index + 1]?.select?.();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      // If current input has a value, clear it
      if (otp[index]) {
        const otpArray = Array.from({ length }, (_, i) => otp[i] || "");
        otpArray[index] = "";
        updateOtpStateFromArray(otpArray);
      } else if (index > 0) {
        // If current is empty, move to previous and clear it
        inputsRef.current[index - 1]?.focus?.();
        const otpArray = Array.from({ length }, (_, i) => otp[i] || "");
        otpArray[index - 1] = "";
        updateOtpStateFromArray(otpArray);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus?.();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1]?.focus?.();
    }
  };

  // Minimal paste handler: paste anywhere and distribute digits from that index
  const handlePaste = (e, startIndex) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text") || "";
    const digits = pasted.replace(/\D/g, "");
    if (!digits) return;

    const otpArray = Array.from({ length }, (_, i) => otp[i] || "");
    for (let i = 0; i < digits.length && startIndex + i < length; i++) {
      otpArray[startIndex + i] = digits[i];
    }

    updateOtpStateFromArray(otpArray);

    // focus next empty or last filled
    const firstEmpty = otpArray.findIndex((c) => c === "");
    setTimeout(() => {
      if (firstEmpty !== -1) {
        inputsRef.current[firstEmpty]?.focus?.();
        inputsRef.current[firstEmpty]?.select?.();
      } else {
        const focusIndex = Math.min(length - 1, startIndex + digits.length - 1);
        inputsRef.current[focusIndex]?.focus?.();
      }
    }, 0);
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
            type="button"
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
            <div className="flex justify-around gap-4">
              {otp?.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  ref={(el) => (inputsRef.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)} // kept parameter order matching handleChange
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onPaste={(e) => handlePaste(e, idx)}
                  className="w-14 h-14 text-center text-white text-xl bg-[#1A1A24] border-2 border-primary rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              ))}
            </div>

            {resendEnable && (
              <div className="text-gray-400 text-sm">{formatTime(timer)}</div>
            )}

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
