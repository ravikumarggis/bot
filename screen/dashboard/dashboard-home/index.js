"use client";

import React from "react";
import DashboardHeader from "./dashboardHeader"
import StatCard from "./statCard"
import ProfitChart from "./profitChart"
import CurrentPlan from "./currentPlan"
import { ArrowLeftRight, Receipt, TrendingUp, Wallet } from "lucide-react";

export default function Dashboard() {


  return (
    <div className="min-h-screen  text-white ">
    <div className="max-w-[1600px] mx-auto">
      <DashboardHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Account Balance"
          value="0"
          currency="(USDT)"
          subtitle="Lock Balance : 0
Available to Trade : 0"
          icon={Wallet}
        />
        <StatCard
          title="Exchange"
          value="0"
          subtitle="Connected Exchange"
          icon={ArrowLeftRight}
        />
        <StatCard
          title="Transactions"
          value="0"
          subtitle="Transactions"
          icon={Receipt}
        />
        <StatCard
          title="Total Profits"
          value="0"
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
