"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  resendOTPSignup,
  verifyLoginOtp,
  VerifySignupOtp,
} from "@/queries/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { setCookie } from "cookies-next";

const OtpScreen = () => {
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(0);
    const [resendDisabled, setResendDisabled] = useState(false);
    const inputsRef = useRef([]);
    const router = useRouter();
    const searchParams = useSearchParams();
  
    const email = searchParams.get("email");
    const {
      mutateAsync: VerifySignupOtpMutate,
      isPending: VerifySignupOtpMutatePending,
    } = useMutation({
      mutationFn: async () => {
        return verifyLoginOtp({
          email: email,
          otp: otp,
        });
      },
      onSuccess: (data) => {
        if (data?.data?.responseCode == 200) {
          router.push(`/dashboard/settings/confirm-password?email=${encodeURIComponent(email)}`);
        } else {
          toast.error(data?.data?.responseMessage);
        }
      },
      onError: (err) => {
        console.log(err, "err>>>");
      },
    });
    const {
      mutateAsync: resendOTPSignupMutate,
      isPending: resendOTPSignupMutatePending,
    } = useMutation({
      mutationFn: async () => {
        return resendOTPSignup({
          email: email,
        });
      },
      onSuccess: (data) => {
        if (data?.data?.responseCode == 200) {
          toast.success(data?.data?.responseMessage);
        } else {
          toast.error(data?.data?.responseMessage);
        }
      },
      onError: (err) => {
        console.log(err, "err>>>");
      },
    });
  
    useEffect(() => {
      const storedTime = sessionStorage.getItem("otpTimer");
      if (storedTime) {
        const remaining = parseInt(storedTime, 10) - Date.now();
        if (remaining > 0) {
          startTimer(Math.ceil(remaining / 1000));
        }
      }
    }, []);
  
    const handleChange = (value, index) => {
      if (/^[0-9]?$/.test(value)) {
        const otpArray = otp.split("");
        otpArray[index] = value;
        const newOtp = otpArray.join("");
        setOtp(newOtp);
  
        if (value && index < 5) {
          inputsRef.current[index + 1]?.focus();
        }
      }
    };
  
    const handleKeyDown = (e, index) => {
      if (e.key === "Backspace") {
        if (otp[index]) {
          const otpArray = otp.split("");
          otpArray[index] = "";
          setOtp(otpArray.join(""));
        } else if (index > 0) {
          inputsRef.current[index - 1]?.focus();
        }
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (otp.length !== 4) {
        alert("Please enter the complete 4-digit OTP.");
        return;
      }
      VerifySignupOtpMutate();
      console.log("OTP Submitted (string):", otp);
      console.log("OTP Submitted (number):", Number(otp));
    };
  
    const resendOtp = () => {
      console.log("OTP resent!");
      startTimer(30);
      resendOTPSignupMutate();
    };
  
    const startTimer = (seconds) => {
      setResendDisabled(true);
      setTimer(seconds);
      const endTime = Date.now() + seconds * 1000;
      sessionStorage.setItem("otpTimer", endTime);
  
      const interval = setInterval(() => {
        const remaining = Math.ceil((endTime - Date.now()) / 1000);
        if (remaining <= 0) {
          clearInterval(interval);
          setTimer(0);
          setResendDisabled(false);
          sessionStorage.removeItem("otpTimer");
        } else {
          setTimer(remaining);
        }
      }, 1000);
    };
  return (
    <div className="flex  h-[100%]">
       <div className="w-full  flex justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-semibold mb-2">OTP Verification</h2>
          <p className="text-sm text-gray-400 mb-3">
            Enter the 4-digit code to continue.
          </p>
          <p className="text-sm mb-6">
            Check your email for the One-Time Password (OTP). Also look in your
            spam folder if you don’t see it.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="flex justify-between mb-6">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  type="text"
                  maxLength="1"
                  value={otp[i] || ""}
                  onChange={(e) => handleChange(e.target.value, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="w-12 h-12 text-center text-xl bg-[#1A1A24] text-white rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-primary font-semibold text-white py-3 rounded-[10px] hover:opacity-90 transition-opacity"
              disabled={VerifySignupOtpMutatePending}
            >
              {VerifySignupOtpMutatePending ? `Verifying OTP` : `Verify OTP`}
            </button>

            <div className="mt-6 flex flex-col items-center">
              <button
                type="button"
                onClick={resendOtp}
                disabled={resendDisabled}
                className={`text-primary font-medium ${
                  resendDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:underline"
                }`}
              >
                {resendDisabled ? `Resend OTP in ${timer}s` : "Resend OTP"}
              </button>
            </div>

            
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpScreen;
