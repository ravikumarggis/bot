"use client";
import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Dropdown from "@/components/dropdown";
import StylesTabs from "@/components/style-tab";
import { useSearchParams } from "next/navigation";
import { updateBotStatus, useGetBot } from "@/queries/bot";
import { useGetKeysExchange } from "@/queries/exchange";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const TradingViewWidget = dynamic(
  () => import("@/components/trading-view-widget"),
  { ssr: false }
);

export default function StartGridBot() {
  const [active, setActive] = useState("Orders");
  const tabs = ["Orders", "Trades", "Logs"];
  const searchParams = useSearchParams();
  const botId = searchParams.get("botId");
  const {
    data: botData,
    isPending: botDataPending,
    refetch: botDataRefetch,
  } = useGetBot({ id: botId });
  const { data: exchangeData, refetch: exchangeDataRefetch } =
    useGetKeysExchange();

  const {
    mutateAsync: updateBotStatusMutate,
    isPending: updatebotStatusPending,
  } = useMutation({
    mutationFn: () => {
      return updateBotStatus({ id: botId, status: botData?.status });
    },
    onSuccess: (data) => {
      botDataRefetch();
      exchangeDataRefetch();
      if (data?.responseCode == 200) {
        toast.success(data?.responseMessage);
      } else {
        toast.error(data?.responseMessage);
      }
    },
    onError: (data) => {
      console.log(data, "err>>");
    },
  });

  const exchangeName = useMemo(() => {
    return exchangeData?.find((item) => item?.id == botData?.exchangeKeyId)
      ?.exchange;
  }, [exchangeData, botData]);

  return (
    <div className="min-h-screen  text-gray-200">
      <div className="">
        <div className="flex flex-col gap-6 py-10">
          {/* MAIN CONTENT (no sidebar) */}
          <main className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Chart & controls (span 2 columns on large screens) */}
            <section className="col-span-1 lg:col-span-2 bg-[#0f0f11] rounded-2xl p-6 shadow-lg border border-[#1b1b1e]">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Start Bot</h1>
              </div>

              <div className="mt-6 grid grid-cols-1 lg:grid-cols-1 gap-6">
                <div className="lg:col-span-2">
                  <div className=" h-[500px]">
                    <TradingViewWidget symbol="BTC/USDT" />
                  </div>

                  <div className=" flex items-start justify-center">
                    <div className="w-full max-w-4xl">
                      <div className=" rounded-2xl shadow-xl ring-1 ring-white/6 overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/5">
                          <StylesTabs
                            tabs={tabs}
                            active={active}
                            setActive={setActive}
                          />
                        </div>

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
                              No {active.toLowerCase()} to display right now.
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
                                <div className="text-sm text-gray-200">
                                  $32,000
                                </div>
                              </div>
                              <div className="mt-2 text-sm text-gray-300">
                                Amount: 0.005
                              </div>
                              <div className="mt-2 text-sm text-amber-400">
                                Status: Open
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block">
                  <div className="bg-[#0b0b0d] border border-[#151518] rounded-xl p-4 text-sm leading-6">
                    <h3 className="font-semibold mb-2">About Grid Bot</h3>
                    <p className="text-gray-400">
                      A fixed price range over which the trading bot will
                      execute buy and sell orders divided into equal grid
                      levels. Choose your price range and grid settings on the
                      right.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Right: Form */}
            <aside className="bg-[#0f0f11] rounded-2xl p-6 shadow-lg border border-[#1b1b1e] ">
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-semibold">
                  {botData?.botName || "--"}
                </div>
                <div className="text-sm text-gray-400">#{botData?.id}</div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between">
                  <div className="text-sm text-gray-400 mb-1">High Price</div>
                  <div className="text-base text-white">
                    Below {botData?.params?.highPrice || 0}
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="text-sm text-gray-400 mb-1">Low Price</div>
                  <div className="text-base text-white">
                    Above {botData?.params?.lowPrice || 0}
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="text-sm text-gray-400 mb-1">
                    Quantity per grid
                  </div>
                  <div className="text-base text-white">
                    {botData?.params?.quantityPerGridUSD || 0}
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="text-sm text-gray-400 mb-1">Grid levels</div>
                  <div className="text-base text-white">
                    {" "}
                    {botData?.params?.gridLevel || 0}
                  </div>
                </div>

                {/* <div className="flex justify-between">
                  <div className="text-sm text-gray-400 mb-1">Investment</div>
                  <div className="text-base text-white">90.54 USDT</div>
                </div> */}

                <div className="flex justify-between">
                  <div className="text-sm text-gray-400 mb-1">
                    Exchange Name
                  </div>
                  <div className="text-base text-white capitalize">
                    {exchangeName || "--"}
                  </div>
                </div>

                <button
                  className="w-full mt-2 py-3 rounded-xl text-white font-semibold bg-pink-600 hover:bg-pink-700 transition-all"
                  onClick={updateBotStatusMutate}
                  disabled={updatebotStatusPending}
                >
                  {updatebotStatusPending ? (
                    "Processing..."
                  ) : (
                    <>
                      {botData?.status == "pending" ||
                      botData?.status == "paused" ||
                      botData?.status == "stopped"
                        ? "Start"
                        : "Stop"}{" "}
                      Bot
                    </>
                  )}
                </button>

                {/* <div className="text-xs text-gray-500 mt-3">
                  Estimated Orders 10 | Required: 100 USDT
                </div> */}
              </div>
            </aside>
          </main>
        </div>
      </div>
    </div>
  );
}
