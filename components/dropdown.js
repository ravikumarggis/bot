"use client";

import { useState } from "react";

export default function Dropdown({
  label,
  placeholder = "Select option",
  options = [],
  value,
  onChange,
  className = "",
}) {
  const [selected, setSelected] = useState(value || "");

  const handleSelect = (e) => {
    const val = e.target.value;
    setSelected(val);
    onChange?.(val);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="text-sm text-gray-400 mb-1 font-medium">
          {label}
        </label>
      )}

      <select
        value={selected}
        onChange={handleSelect}
        className={`bg-[#1a1a25] border border-gray-700 rounded-md px-3 py-2 text-white 
          focus:outline-none focus:border-[#EE3379] cursor-pointer transition-colors 
          ${
            selected
              ? "text-[#EE3379] font-semibold" // 👈 Primary color when selected
              : "text-gray-400"
          }`}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="text-white bg-[#1a1a25] hover:bg-[#EE3379] hover:text-white"
          >
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
