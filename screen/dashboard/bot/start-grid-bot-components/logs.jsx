import { useGetLogList, useGetOrder } from "@/queries/bot";
import React, { useMemo } from "react";
import { formatCurrency } from "@/utils/index";
const GridBotLogs = ({ botId }) => {
  const { data: orderList, isPending: orderListPending } = useGetLogList({
    id: botId,
  });

  return (
    <div>
      <div className="px-6 py-4">
        {!orderListPending && orderList?.data?.length == 0 && (
          <div className="mt-8 py-12 flex flex-col items-center justify-center border-t border-white/5">
            <h3 className="text-gray-200 text-xl md:text-2xl font-medium">
              Logs
            </h3>
            <p className="mt-3 text-sm text-gray-400">
              No logs to display right now.
            </p>
          </div>
        )}
        {!orderListPending && orderList?.data?.length > 0 && (
          <table className="hidden md:table w-full text-sm text-gray-400">
            <thead>
              <tr className="text-left">
                <th className="px-2 py-2">Level</th>
                <th className="px-2 py-2">Source</th>
                <th className="px-2 py-2">Message</th>
                <th className="px-2 py-2">BotInstanceId</th>
              </tr>
            </thead>
            <tbody>
              {orderList?.data?.map((item, idx) => {
                return (
                  <tr
                    className="text-gray-300 border-t border-gray-700"
                    key={idx}
                  >
                    <td className="px-2 py-2">{item?.level || "--"}</td>
                    <td className="px-2 py-2">{item?.source || "--"}</td>
                    <td className="px-2 py-2">{item?.message || "--"}</td>
                    <td className="px-2 py-2">{item?.botInstanceId || "--"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {/* <div className="mt-4 space-y-3 md:space-y-0 md:block">
          <div className="md:hidden bg-white/3 rounded p-3">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium text-gray-100">
                Buy • Limit
              </div>
              <div className="text-sm text-gray-200">$32,000</div>
            </div>
            <div className="mt-2 text-sm text-gray-300">Amount: 0.005</div>
            <div className="mt-2 text-sm text-amber-400">Status: Open</div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default GridBotLogs;
