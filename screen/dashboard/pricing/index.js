"use client";
import React, { useMemo, useState } from "react";
import ToggleTabs from "../../../components/toggle-Tabs";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetActiveSubscription } from "@/queries/pricing";
import { formatCurrency, isMonthlyPlan } from "@/utils/index";
import { useUserProfile } from "@/queries/profile";
import clsx from "clsx";

const Pricing = () => {
  const [plan, setPlan] = useState("monthly");
  const router = useRouter();
  const { data: getActiveSubs, isPending: getActiveSubsPending } =
    useGetActiveSubscription({ planType: plan });

  const { data: profile, isPending: profilePending } = useUserProfile();

  const activeSubs = useMemo(() => {
    return profile?.subscriptionDetail?.find(
      (item) => item?.planStatus == "ACTIVE"
    );
  }, [profile]);

  const filterActivePlan = useMemo(() => {
    return getActiveSubs
      ?.filter((item) => item?.amount != 0)
      ?.map((item) => {
        return {
          ...item,
          isCurrentPlan: item?.id == activeSubs?.subscriptionId,
        };
      });
  }, [activeSubs, getActiveSubs]);

  if (getActiveSubsPending || profilePending) {
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
        {filterActivePlan?.map((item, idx) => {
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
                  {isMonthlyPlan(item?.duration) ? "Monthly" : "Yearly"}
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
                {item?.permission?.map((item, idx) => {
                  return (
                    <li
                      className="flex items-center gap-3 text-gray-300"
                      key={idx}
                    >
                      <CheckCircle className="text-primary" size={20} />
                      {item}
                    </li>
                  );
                })}
              </ul>

              <div className="border-t border-gray-700 pt-4 text-sm text-gray-400 mb-6 ">
                {item?.description}
              </div>

              <div className=" w-full flex justify-center items-center ">
                <button
                  className={clsx(
                    ` justify-center items-center mt-2 px-6 py-3 ${
                      item?.isCurrentPlan ? "bg-green-700" : "bg-primary"
                    } text-[white] font-semibold rounded-[10px] shadow hover:opacity-90 transition`
                  )}
                  onClick={() => {
                    if (item?.isCurrentPlan) {
                      return;
                    }
                    router.push(
                      `/dashboard/pricing/confirm-payment?subId=${encodeURIComponent(
                        item.id
                      )}`
                    );
                  }}
                >
                  {item?.isCurrentPlan ? `Active Plan` : `Choose Plan`}
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
