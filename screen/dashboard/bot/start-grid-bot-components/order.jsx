import { useGetOrder } from "@/queries/bot";
import React from "react";

const GridBotOrders = ({ botId }) => {
  const { data: orderList, isPending: orderListPending } = useGetOrder({
    id: botId,
  });

  return (
    <div>
      <div className="px-6 py-4">
        <div className="hidden md:grid grid-cols-6 gap-4 text-sm text-gray-400 px-2">
          <div>Side</div>
          <div>Type</div>
          <div>Price</div>
          <div>Amount</div>
          <div>Status</div>
          <div>Status</div>
        </div>

        <div className="mt-8 py-12 flex flex-col items-center justify-center border-t border-white/5">
          <h3 className="text-gray-200 text-xl md:text-2xl font-medium">
            Open and orders
          </h3>
          <p className="mt-3 text-sm text-gray-400">
            {/* No {active.toLowerCase()} to display right now. */}
          </p>

          <button className="mt-8 px-5 py-2 text-sm rounded-full bg-transparent border border-white/6 text-gray-300 hover:bg-white/2">
            Load more
          </button>
        </div>

        <div className="mt-4 space-y-3 md:space-y-0 md:block">
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
        </div>
      </div>
    </div>
  );
};

export default GridBotOrders;
