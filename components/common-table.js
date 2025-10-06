"use client";

export default function CommonTable({ columns, data }) {
  return (
    <div className="overflow-x-auto bg-[#12121d] rounded-xl border border-gray-800">
      <table className="min-w-full text-left text-sm text-gray-300">
        <thead className="bg-[#1a1a25] text-gray-400 uppercase text-xs">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-medium">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, idx) => (
              <tr
                key={idx}
                className="border-t border-gray-800 hover:bg-[#1a1a2a] transition"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    {row[col.key]}
                  </td>
                ))}
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
