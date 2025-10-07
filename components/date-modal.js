"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CustomDatePicker({ value, onChange, placeholder = "Select date" }) {
  const [startDate, setStartDate] = useState(value ? new Date(value) : null);

  const handleChange = (date) => {
    setStartDate(date);
    onChange(date); // send date to parent
  };

  return (
    <div className="relative w-full">
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        placeholderText={placeholder}
        dateFormat="dd-MM-yyyy"
        className="w-full bg-[#1a1a25]  rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#EE3379]"
        calendarClassName="!bg-[#1a1a25] !text-white !border !border-gray-700 !rounded-md"
        popperClassName="z-50"
      />
    </div>
  );
}
