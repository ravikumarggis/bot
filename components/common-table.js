"use client";
import { useRouter } from "next/navigation";

export default function CommonTable({ columns, data }) {


  
  const router = useRouter();

  const getStatusColor = (value) => {
    if (!value) return "text-gray-400";
    const lower = value.toLowerCase();
    if (lower === "active") return "text-green-500 font-semibold";
    if (lower === "inactive") return "text-red-500 font-semibold";
    return "text-gray-300";
  };

  return (
    <div
      className={
        "overflow-x-auto bg-[#12121d] rounded-xl border border-gray-800"
      }
    >
      <table
        className={
          "min-w-full text-left text-sm text-gray-300"
        }
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
                  if (col.key === "actions") {
                    return (
                      <td key={col.key} className="px-4 py-3">
                        <button
                          className="px-3 py-1 rounded-md bg-primary text-black font-medium"
                          onClick={() =>

                          {  console.log(cellValue,"iuhuihuiniunh")
                            
                            router.push(`/userlist-view?id=${encodeURIComponent(data?.id)}`)}
                          }
                        >
                          View
                        </button>
                      </td>
                    );
                  }

                  
                  const cellClass =
                    col.key === "status"
                      ? getStatusColor(cellValue)
                      : "text-gray-300";

                  return (
                    <td key={col.key} className={`px-4 py-3 ${cellClass}`}>
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
