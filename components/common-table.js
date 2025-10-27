"use client";

import clsx from "clsx";

export default function CommonTable({ columns, data, className }) {
  const getStatusColor = (value) => {
    if (!value) return "text-gray-400";
    const lower = value.toLowerCase();
    if (lower === "active") return "text-green-500 ";
    if (lower === "inactive") return "text-red-500 ";
    return "text-gray-300";
  };

  return (
    <div
      className={clsx(
        "overflow-x-auto bg-[#12121d] rounded-xl border border-gray-800"
      )}
    >
      <table
        className={clsx(
          "min-w-full text-left text-sm text-gray-300",
          className
        )}
      >
        <thead className="bg-[#1a1a25] text-gray-400 uppercase text-xs">
          <tr>
            {columns.map((col) => (
              <th key={col?.key} className="px-4 py-3 font-medium">
                {col?.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data?.map((row, idx) => (
              <tr
                key={idx}
                className="border-t border-gray-800 hover:bg-[#1a1a2a] transition"
              >
                {columns.map((col) => {
                  const cellValue = row[col?.key];

                  // Apply color styling if this is the "status" column
                  const cellClass =
                    col.key === "status"
                      ? getStatusColor(cellValue)
                      : "text-gray-300";

                  return (
                    <td key={col?.key} className={`px-4 py-3 ${cellClass}`}>
                      {cellValue}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-gray-500"
              >
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
