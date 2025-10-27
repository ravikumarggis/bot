"use client";
import { useState, useEffect, useMemo } from "react";
import CustomDatePicker from "../../../components/date-modal";
import Dropdown from "../../../components/dropdown";
import DataTable from "../../../components/common-table";
import {
  useGetSubscriptionDetail,
  useHaveActiveSubscriptions,
} from "@/queries/payment";
import NotActiveSubs from "@/components/no-active-subs";
import moment from "moment";
import ActivityIndicator from "@/components/activity-indicator";

export default function PlanManagement() {
  const [filters, setFilters] = useState({
    search: "",
    from: "",
    to: "",
    status: "",
  });

  const { data: haveActiveSubs, isPending: haveActiveSubsPending } =
    useHaveActiveSubscriptions();
  const { data: subsData, isPending: subsDataPending } =
    useGetSubscriptionDetail();

  const columns = [
    { key: "sr", label: "Sr" },
    { key: "planName", label: "Plan Name" },
    { key: "planAmount", label: "Plan Amount" },
    { key: "paidAmount", label: "Paid Amount" },
    { key: "paymentOrderId", label: "Payment Order ID" },
    { key: "duration", label: "Duration" },
    { key: "planStatus", label: "Plan Status" },
    { key: "startTime", label: "Start Time" },
    { key: "endTime", label: "End Time" },
  ];

  // 🧩 Format API data
  const formattedSubsData = useMemo(() => {
    if (!subsData) return [];

    return subsData.map((item, index) => ({
      sr: index + 1,
      planName: item?.subscriptionDetail?.name || "--",
      planAmount: item?.subscriptionDetail?.displayAmount || 0,
      paidAmount: item?.amount || 0,
      paymentOrderId: item?.orderId || "--",
      duration: `${item?.subscriptionDetail?.duration || 0} DAYS`,

      planStatus: item?.subscriptionDetail?.status || "--",
      startTime: item?.createdAt ? moment(item?.createdAt).format("lll") : "--",
      endTime: item?.endDate ? moment(item?.endDate).format("lll") : "--",
    }));
  }, [subsData]);

  const filteredData = useMemo(() => {
    if (!formattedSubsData) return [];

    let data = [...formattedSubsData];

    if (filters.search) {
      data = data.filter((item) =>
        item.planName?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.from) {
      const fromDate = new Date(filters.from);
      data = data.filter((item) => new Date(item.startTime) >= fromDate);
    }

    if (filters.to) {
      const toDate = new Date(filters.to);
      data = data.filter((item) => new Date(item.endTime) <= toDate);
    }

    if (filters.status) {
      data = data.filter(
        (item) => item.planStatus.toLowerCase() === filters.status.toLowerCase()
      );
    }

    return data;
  }, [filters, formattedSubsData]);

  const TableFilter = ({ filters, setFilters }) => {
    const statusOptions = [
      { label: "Active", value: "ACTIVE" },
      { label: "Expired", value: "EXPIRED" },
    ];

    const handleChange = (key, value) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleReset = () => {
      setFilters({
        search: "",
        from: "",
        to: "",
        status: "",
      });
    };

    return (
      <div className="bg-[#12121d] p-4 rounded-xl mb-6 flex flex-wrap gap-4 items-end">
        <div className="flex flex-col w-full md:w-1/4">
          <label className="text-sm text-gray-400 mb-1">Search</label>
          <input
            type="text"
            placeholder="Search by plan name"
            className="bg-[#1a1a25] rounded-md px-3 py-2 text-white focus:outline-none focus:border-primary"
            value={filters.search || ""}
            onChange={(e) => handleChange("search", e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-400 mb-1">From</label>
          <CustomDatePicker
            value={filters.from}
            onChange={(date) => handleChange("from", date)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-400 mb-1">To</label>
          <CustomDatePicker
            value={filters.to}
            onChange={(date) => handleChange("to", date)}
          />
        </div>

        <Dropdown
          label="Plan Status"
          options={statusOptions}
          value={filters.status}
          onSelect={(val) => handleChange("status", val)}
          className="w-56"
        />

        <div className="flex gap-2">
          <button
            onClick={() => {}} // no manual apply needed since useMemo auto updates
            className="bg-primary px-6 py-2 rounded-md font-semibold"
          >
            Apply
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-700 px-6 py-2 rounded-md font-semibold"
          >
            Reset
          </button>
        </div>
      </div>
    );
  };

  if (subsDataPending) {
    return (
      <div className=" min-h-screen flex flex-col justify-center items-center gap-4">
        <ActivityIndicator isLoading className={"h-12 w-12"} />
        <p className="text-2xl font-semibold">Getting Data...</p>
      </div>
    );
  }

  if (!haveActiveSubs && !haveActiveSubsPending) {
    return <NotActiveSubs />;
  }

  return (
    <div className="p-6 text-white min-h-screen">
      <TableFilter filters={filters} setFilters={setFilters} />
      <DataTable columns={columns} data={filteredData} />
    </div>
  );
}
