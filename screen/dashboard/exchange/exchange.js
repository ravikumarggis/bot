"use client";
import { IconExchange } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import OTPInput from "../../../components/otp-modal"

export default function Exchange() {
    const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-[100%]  text-white px-4 ">
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="w-20 h-20 bg-[#1a1a25] rounded-full flex items-center justify-center mb-6">
          <IconExchange size={42} className="text-[#a68bff]" />
        </div>

        <h1 className="text-3xl font-semibold mb-3">Exchange</h1>

        <p className="text-lg text-gray-400 mb-2">
          Add your first exchange account!
        </p>

        <p className="text-gray-500 mb-8 leading-relaxed">
          You haven&apos;t created or added any exchange accounts yet. Use the
          button below to add an account for trading.
        </p>

        <button className="px-8 py-3 bg-primary  font-semibold  text-white  rounded-[10px]  shadow-lg " onClick={()=>{
           
            router.push("/dashboard/exchange/add-exchange")
        }}>
          Add New Exchange
        </button>
      </div>
      <OTPInput
  length={6}
  duration={120}
  title="2-Step Verification"
  subtitle="Enter the 6-digit code sent to your phone."
  onSubmit={(otp) => console.log("OTP received:", otp)}
/>

     
    </div>
  );
}
