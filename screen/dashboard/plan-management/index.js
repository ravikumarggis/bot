"use client";
import { useState } from "react";
import TableFilter from "../../../components/table-filter";
import DataTable from "../../../components/common-table";

export default function PlanManagement() {
  const [filteredData, setFilteredData] = useState([]);

  const columns = [
    { key: "sr", label: "Sr" },
    { key: "planName", label: "Plan Name" },
    { key: "planAmount", label: "Plan Amount" },
    { key: "paidAmount", label: "Paid Amount" },
    { key: "paymentOrderId", label: "Payment Order ID" },
    { key: "duration", label: "Duration" },
    { key: "paymentStatus", label: "Payment Status" },
    { key: "planStatus", label: "Plan Status" },
    { key: "startTime", label: "Start Time" },
    { key: "endTime", label: "End Time" },
    { key: "payAddress", label: "Pay Address" },
  ];

  const dummyData = [
    {
      sr: 1,
      planName: "Free Trial",
      planAmount: 0,
      paidAmount: 0,
      paymentOrderId: "ORD-J36C5529L2",
      duration: "7 DAYS",
      paymentStatus: "Finished",
      planStatus: "INACTIVE",
      startTime: "Sep 24, 2025 8:40 PM",
      endTime: "Oct 1, 2025 8:40 PM",
      payAddress: "...",
    },
  ];

  const handleFilter = (filters) => {
    console.log("Applied Filters:", filters);
    setFilteredData(dummyData); 
  };

  return (
    <div className="p-6 text-white min-h-screen">
      <TableFilter
        onFilter={handleFilter}
        extraFilters={[
          {
            key: "paymentStatus",
            label: "Payment Status",
            options: [
              { label: "Finished", value: "finished" },
              { label: "Pending", value: "pending" },
            ],
          },
        ]}
      />
      <DataTable columns={columns} data={filteredData} />
    </div>
  );
}
