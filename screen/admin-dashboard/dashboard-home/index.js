"use client";

import React from "react";

import StatCard from "./statCard";

import { ArrowLeftRight, Receipt, TrendingUp, User, Wallet } from "lucide-react";
import {
  useGetAdminDashboard
} from "@/queries/admin";
import NotActiveSubs from "@/components/no-active-subs";
export default function Dashboard() {


 const {data  :dashboardCount} = useGetAdminDashboard()
 

  return (
    <div className="min-h-screen  text-white ">
      <div className="mx-auto">
       

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Account Balance"
            value={dashboardCount?.accountBalance}
            currency="(USDT)"
            subtitle="Lock Balance : 10
Available to Trade : 100"
            icon={Wallet}
          />
          <StatCard
            title="Exchange"
            value={dashboardCount?.exchangeConnectedCount}
            subtitle="Connected Exchange"
            icon={ArrowLeftRight}
          />
          <StatCard
            title="Transactions"
            value={dashboardCount?.transactionCount}
            subtitle="Transactions"
            icon={Receipt}
          />
          <StatCard
            title="Total Bots"
            value={dashboardCount?.noOfBot}
            currency="Bots"
            subtitle="Total Bots"
            icon={TrendingUp}
          />
          <StatCard
            title="Users"
            value={dashboardCount?.userCounts}
           
            subtitle="Total Users"
            icon={User}
          />
        </div>

       
      </div>
    </div>
  );
}
