"use client";

import React, { useMemo } from "react";
import DashboardHeader from "./dashboardHeader";
import StatCard from "./statCard";
import ProfitChart from "./profitChart";
import CurrentPlan from "./currentPlan";
import { ArrowLeftRight, Receipt, TrendingUp, Wallet } from "lucide-react";
import {
  useGetSubscriptionDetail,
  useHaveActiveSubscriptions,
} from "@/queries/payment";
import NotActiveSubs from "@/components/no-active-subs";
import {
  useAccountDetails,
  useExchangeCount,
  useTotalProfit,
  useTransactionCount,
} from "@/queries/dashboard";
import ActivityIndicator from "@/components/activity-indicator";
export default function Dashboard() {
  const { data: haveActiveSubs, isPending: haveActiveSubsPending } =
    useHaveActiveSubscriptions();
  const { data: accountDetail, isPending: accountDetailPending } =
    useAccountDetails();
  const { data: exchangeCount, isPending: exchangeCountPending } =
    useExchangeCount();
  const { data: trxCount, isPending: trxCountPending } = useTransactionCount();
  const { data: totalProfit, isPending: totalProfitPending } = useTotalProfit();

  const balance = useMemo(() => {
    return accountDetail?.reduce(
      (a, b) => Number(a || 0) + Number(b?.balance?.["USDT"] || 0),
      0
    );
  }, [accountDetail]);

  if (
    haveActiveSubsPending ||
    accountDetailPending ||
    exchangeCountPending ||
    trxCountPending ||
    totalProfitPending
  ) {
    return (
      <div className=" min-h-screen flex flex-col justify-center items-center gap-4">
        <ActivityIndicator isLoading className={"h-12 w-12"} />
        <p className="text-2xl font-semibold">Getting Data...</p>
      </div>
    );
  }

  if (!haveActiveSubs) {
    return <NotActiveSubs />;
  }

  return (
    <div className="min-h-screen  text-white ">
      <div className="max-w-[1600px] mx-auto">
        {/* <DashboardHeader /> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-8">
          <StatCard
            title="Account Balance"
            value={Number(balance)?.toFixed(2) || 0}
            currency="(USDT)"
            subtitle="Lock Balance : 0
Available to Trade : 0"
            icon={Wallet}
          />
          <StatCard
            title="Exchange"
            value={exchangeCount}
            subtitle="Connected Exchange"
            icon={ArrowLeftRight}
          />
          <StatCard
            title="Transactions"
            value={trxCount}
            subtitle="Transactions"
            icon={Receipt}
          />
          <StatCard
            title="Total Profits"
            value={totalProfit}
            currency="(USDT)"
            subtitle="Total Profit"
            icon={TrendingUp}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProfitChart />
          </div>
          <div>
            <CurrentPlan />
          </div>
        </div>
      </div>
    </div>
  );
}
