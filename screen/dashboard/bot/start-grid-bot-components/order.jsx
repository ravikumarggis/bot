import { cancelOrder, useGetOrder } from "@/queries/bot";
import React, { useMemo, useState } from "react";
import { formatCurrency } from "@/utils/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { RefreshCcw } from "lucide-react";
import clsx from "clsx";
const GridBotOrders = ({ botId }) => {
  const [currentDeletingItem, setCurrentDeletingItem] = useState("");
  const queryclient = useQueryClient();
  const {
    data: orderList,
    isPending: orderListPending,
    refetch,
  } = useGetOrder({
    id: botId,
    filter: "PENDING",
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ orderID }) => {
      return cancelOrder({ id: orderID });
    },
    onSuccess: (data) => {
      if (data?.responseCode == 200) {
        toast.success(data?.responseMessage);
      } else {
        toast.error(data?.responseMessage);
      }
      refetch();
      queryclient.invalidateQueries({ queryKey: ["getOrder"] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.responseMessage);
      refetch();
      queryclient.invalidateQueries({ queryKey: ["getOrder"] });
    },
  });

  return (
    <div>
      <div className="px-6 py-4 h-96 overflow-auto">
        {!orderListPending && orderList?.data?.length == 0 && (
          <div className="mt-8 py-12 flex flex-col items-center justify-center border-t border-white/5">
            <h3 className="text-gray-200 text-xl md:text-2xl font-medium">
              Open and orders
            </h3>
            <p className="mt-3 text-sm text-gray-400">
              No orders to display right now.
            </p>

            <button
              className="mt-8 px-5 py-2 text-sm rounded-full bg-transparent border border-white/6 text-gray-300 hover:bg-white/2"
              onClick={refetch}
            >
              {orderListPending ? `Refreshing..` : `Refresh`}
            </button>
          </div>
        )}
        {!orderListPending && orderList?.data?.length > 0 && (
          <table className="table w-full text-sm text-gray-400 ">
            <thead>
              <tr className="text-left">
                <th className="px-2 py-2">Side</th>
                <th className="px-2 py-2">Type</th>
                <th className="px-2 py-2">Price</th>
                <th className="px-2 py-2">Amount</th>
                <th className="px-2 py-2">Status</th>
                <th className="px-2 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {orderList?.data?.map((item, idx) => {
                return (
                  <tr
                    className="text-gray-300 border-t border-gray-700"
                    key={idx}
                  >
                    <td className="px-2 py-2">{item?.side || "--"}</td>
                    <td className="px-2 py-2">{item?.type || "--"}</td>
                    <td className="px-2 py-2">
                      {formatCurrency({ amount: item?.price, currency: "USD" })}
                    </td>
                    <td className="px-2 py-2">
                      {item?.quantity}{" "}
                      {String(item?.symbol)?.split("/")?.[0] || "--"}
                    </td>
                    <td className="px-2 py-2">{item?.status || "--"}</td>
                    <td
                      className="px-2 py-2 text-red-500 cursor-pointer"
                      onClick={() => {
                        if (isPending) {
                          return;
                        }
                        setCurrentDeletingItem(item?.id);
                        mutateAsync({ orderID: item?.id });
                      }}
                    >
                      {isPending && currentDeletingItem == item?.id
                        ? `Cancelling`
                        : `Cancel`}
                    </td>
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

export default GridBotOrders;
