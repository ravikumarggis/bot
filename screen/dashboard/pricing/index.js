"use client";
import React, { useState } from "react";
import ToggleTabs from "../../../components/toggle-Tabs";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetActiveSubscription } from "@/queries/pricing";
import { formatCurrency } from "@/utils/index";

const Pricing = () => {
  const [plan, setPlan] = useState("monthly");
  const router = useRouter();

  const { data: getActiveSubs, isPending: getActiveSubsPending } =
    useGetActiveSubscription({ planType: plan });

  if (getActiveSubsPending) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-center">
        <ToggleTabs
          options={[
            { label: "Monthly", value: "monthly" },
            { label: "Yearly", value: "yearly" },
          ]}
          active={plan}
          onChange={setPlan}
        />
      </div>

      <div className="flex flex-row flex-wrap">
        {getActiveSubs?.map((item, idx) => {
          return (
            <div
              key={idx}
              className="relative bg-gradient-to-b from-[#1b1b2f] to-[#141424] rounded-3xl p-8 w-full max-w-sm shadow-lg border border-purple-800/30 m-2 md:m-10"
            >
              {item?.isSpecialOffer && (
                <div className="absolute top-10 left-[-20px] bg-gradient-to-r from-purple-600 to-pink-500 text-xs font-semibold px-4 py-1 rounded-r-full transform -rotate-45 origin-left">
                  🔥 Special Offer
                </div>
              )}

              <div className="text-center mb-4">
                <span className="bg-purple-600/20 text-primary text-sm px-4 py-1 rounded-full">
                  {plan === "monthly" ? "Monthly" : "Yearly"}
                </span>
              </div>

              <div className="text-center mb-6">
                <p className="text-gray-500 line-through text-lg">
                  {formatCurrency({
                    amount: item?.displayAmount,
                    currency: item?.currency,
                  })}
                </p>
                <p className="text-5xl font-bold">
                  {formatCurrency({
                    amount: item?.amount,
                    currency: item?.currency,
                  })}
                </p>
              </div>

              <ul className="space-y-4 mb-6">
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="text-primary" size={20} />
                  Duration:{" "}
                  {plan === "monthly"
                    ? `${item?.duration} MONTH`
                    : `${item?.duration} MONTHS`}
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="text-primary" size={20} />
                  Exchanges: {item?.exchange || ""}
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="text-primary" size={20} />
                  Profit Cap:{" "}
                  {formatCurrency({
                    amount: item?.profitCap,
                    currency: item?.currency,
                  })}
                </li>
              </ul>

              <div className="border-t border-gray-700 pt-4 text-sm text-gray-400 mb-6">
                {item?.description}
              </div>

              <div className=" w-full flex justify-center items-center">
                <button
                  className=" justify-center items-center mt-2 px-6 py-3 bg-primary text-[white] font-semibold rounded-[10px] shadow hover:opacity-90 transition"
                  onClick={() => {
                    router.push(
                      `/dashboard/pricing/confirm-payment?subId=${encodeURIComponent(
                        item.id
                      )}`
                    );
                  }}
                >
                  Choose Plan
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pricing;
