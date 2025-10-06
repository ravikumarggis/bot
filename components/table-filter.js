"use client";
import { useState } from "react";
import { Calendar } from "lucide-react";

export default function TableFilter({ onFilter, extraFilters = [] }) {
  const [filters, setFilters] = useState({
    search: "",
    from: "",
    to: "",
    status: "",
  });

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({ search: "", from: "", to: "", status: "" });
    onFilter({});
  };

  return (
    <div className="bg-[#12121d] p-4 rounded-xl mb-6 flex flex-wrap gap-4 items-end">
      <div className="flex flex-col w-full md:w-1/4">
        <label className="text-sm text-gray-400 mb-1">Search</label>
        <input
          type="text"
          placeholder="Search by plan name"
          className="bg-[#1a1a25] border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-primary"
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-400 mb-1">From</label>
        <input
          type="date"
          className="bg-[#1a1a25] border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-primary"
          value={filters.from}
          onChange={(e) => handleChange("from", e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-400 mb-1">To</label>
        <input
          type="date"
          className="bg-[#1a1a25] border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-primary"
          value={filters.to}
          onChange={(e) => handleChange("to", e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-400 mb-1">Status</label>
        <select
  className={`bg-[#1a1a25] border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:border-primary ${
    filters.status ? "text-[#EE3379]" : "text-white"
  }`}
  value={filters.status}
  onChange={(e) => handleChange("status", e.target.value)}
>
  <option value="">Select status</option>
  <option value="active">Active</option>
  <option value="inactive">Inactive</option>
</select>

      </div>

      {extraFilters.map(({ key, label, options }) => (
        <div key={key} className="flex flex-col">
          <label className="text-sm text-gray-400 mb-1">{label}</label>
          <select
            className="bg-[#1a1a25] border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-primary"
            onChange={(e) => handleChange(key, e.target.value)}
          >
            <option value="">Select {label}</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      ))}

      <div className="flex gap-2">
        <button
          onClick={handleApply}
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
}
