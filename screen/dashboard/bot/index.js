// import React from 'react'

// const Bot = () => {
//   return (
//     <div>Bot</div>
//   )
// }

// export default Bot

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, Info, Copy } from "lucide-react";
import { IconExchange } from "@tabler/icons-react";
import Dropdown from "../../../components/dropdown";
import { useRouter } from "next/navigation";
import NotActiveSubs from "@/components/no-active-subs";
import CommingSoon from "@/components/comming-soon";
import { useHaveActiveSubscriptions } from "@/queries/payment";
import { useGetBotList } from "@/queries/bot";
import NotActiveBots from "@/components/no-active-bot";
import clsx from "clsx";
const exchangeOptions = [
  { label: "New Grid Bot", value: "/create-grid-bot" },
  { label: "New DCA Bot", value: "New DCA Bot" },
];

export default function Bot() {
  const [showSecret, setShowSecret] = useState(false);
  const [select, setSelect] = useState("");
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const router = useRouter();
  const { data: haveActiveSubs, isPending: haveActiveSubsPending } =
    useHaveActiveSubscriptions();

  const { data: botList, isPending: botListPending } = useGetBotList();
  console.log(botList, "botListbotList");

  const handleOTPSubmit = (code) => {
    console.log("OTP submitted:", code);
    setIsOpen(false);
  };

  const handleSelect = (val) => {
    setSelect(val);
    if (val === "New DCA Bot") {
      setShowComingSoon(true);
      return;
    }

    router.push(`/dashboard/bot/${val}`);
  };

  const getStatus = (item) => {
    return {
      status:
        item?.status == "pending" ||
        item?.status == "paused" ||
        item?.status == "stopped"
          ? "InActive"
          : `Active`,
    };
  };

  // if (!haveActiveSubs) {
  //   return <NotActiveSubs />;
  // }

   

  return (
    <div className="  py-10 text-white">
      <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-1 gap-8">
        <div className="flex">
          <Dropdown
            label="Create New Bot"
            bgColor="#EE3379"
            options={exchangeOptions}
            value={select || ""}
            onSelect={handleSelect}
            className="w-56"
          />
        </div>

        {showComingSoon ? (
          <div className="h-[100%] mt-14 flex items-center justify-center">
            <CommingSoon />
          </div>
        ) : (
          <>
            {botList?.length === 0 ? (
              <div className="mt-20 sm:mt-30 w-full py-12 flex flex-col items-center justify-center ">
                <p className="mt-3 text-xl text-gray-400">No Bot Found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {botList?.map((item, i) => {
                // Move computed value outside useMemo since it's not needed inside map
                const currentAmount =
                item?.params?.gridLevel * 2 * item?.params?.quantityPerGridUSD;
            
                return (
                  <div
                    key={i}
                    className="rounded-2xl p-5 bg-[#0b1229] border-white/10 border shadow-md hover:shadow-blue-500/10 hover:bg-[#121a36] min-h-[120px] cursor-pointer"
                    onClick={() => {
                      router.push(
                        `/dashboard/bot/start-grid-bot/?botId=${encodeURIComponent(
                          item?.id
                        )}`
                      );
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-md bg-[#141420] flex items-center justify-center text-pink-400">
                        <img
                          src="/assets/logo1.png"
                          alt="Qbots Logo"
                          className="w-16 h-12"
                        />
                      </div>
                      <div
                        className={clsx(
                          "text-xs text-white px-2 py-1 rounded",
                          getStatus(item)?.status === "Active"
                            ? "bg-emerald-700/70"
                            : "bg-red-700/70"
                        )}
                      >
                        {getStatus(item)?.status}
                      </div>
                    </div>
            
                    <h4 className="text-lg font-semibold mt-4">
                      {item?.botName || "--"}
                    </h4>
            
                    <div className="flex justify-between mt-4">
                      <div>
                        <h4 className="text-md font-semibold">Investment amount</h4>
                        <p className="text-sm text-gray-300 mt-1">
                          ${currentAmount?.toFixed(2) || "0.00"}
                        </p>
                      </div>
                      <div >
                        <h4 className="text-md font-semibold">Pair</h4>
                        <p className="text-sm text-gray-300 mt-1">
                          {item?.symbol}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            )}
          </>
        )}
      </div>

      <OTPModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleOTPSubmit}
      />
    </div>
  );
}

/* ---------- Small inline components for demonstration --------- */

function OTPModal({ isOpen, onClose, onSubmit }) {
  const [code, setCode] = useState("");
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0c0c11] p-6 rounded-xl w-full max-w-md">
        <h3 className="text-xl font-semibold mb-3">Enter OTP</h3>
        <p className="text-sm text-gray-400 mb-4">
          We sent a 4-digit code to your registered email.
        </p>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="0000"
          className="w-full p-3 bg-[#111217] rounded mb-4"
        />
        <div className="flex gap-3">
          <button
            onClick={() => {
              onSubmit(code);
              setCode("");
            }}
            className="flex-1 bg-gradient-to-r from-[#7b5cff] to-[#ff7ab6] py-2 rounded"
          >
            Verify
          </button>
          <button
            onClick={() => {
              onClose();
              setCode("");
            }}
            className="flex-1 border border-gray-700 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
