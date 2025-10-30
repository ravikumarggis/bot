"use client";
import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Dropdown from "@/components/dropdown";
import StylesTabs from "@/components/style-tab";
import { useRouter, useSearchParams } from "next/navigation";
import { updateBotStatus, useGetBot, useGetBotList } from "@/queries/bot";
import { useGetKeysExchange } from "@/queries/exchange";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { IconTrashXFilled } from "@tabler/icons-react";
import { EditIcon, FileWarning, RefreshCcw, TriangleAlert } from "lucide-react";
import Modal from "@/components/ui/modal";
import { useWatchOHLCV } from "@/hooks/useWatchOHLCV";
import GridBotOrders from "./start-grid-bot-components/order";
import GridBotTrades from "./start-grid-bot-components/trades";
import GridBotLogs from "./start-grid-bot-components/logs";

import GridBotCancelledOrder from "./start-grid-bot-components/cancelled-order";
import { deleteBot } from "@/queries/bot";
import clsx from "clsx";
const TradingViewWidget = dynamic(
  () => import("@/components/trading-view-widget"),
  { ssr: false }
);

export default function StartGridBot() {
  const router = useRouter();
  const [active, setActive] = useState("Orders");
  const tabs = ["Orders", "Trades", "Logs", "Cancelled"];
  const searchParams = useSearchParams();
  const botId = searchParams.get("botId");
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [currentSelectedItem, setCurrentSelectedItem] = useState({});
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

  const ohlcvData = useWatchOHLCV({
    symbol: botData?.symbol,
    exchange: exchangeName ? exchangeName : undefined,
  });
  const currentAmount = useMemo(() => {
    const closePrice =
      ohlcvData?.ohlcvData?.[ohlcvData?.ohlcvData?.length - 1]?.[4];
    const qty = botData?.params?.quantityPerGridUSD;
    return Number(closePrice || 0) * Number(qty || 0);
  }, [ohlcvData, botData]);

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
                    <TradingViewWidget
                      symbol={botData?.symbol}
                      exchange={botData?.exchangeKeyId}
                    />
                  </div>

                  <div className=" flex items-start justify-center mt-12">
                    <div className="w-full max-w-4xl">
                      <div className=" rounded-2xl shadow-xl ring-1 ring-white/6 overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/5">
                          <StylesTabs
                            tabs={tabs}
                            active={active}
                            setActive={setActive}
                          />
                        </div>
                        {active == "Orders" && <GridBotOrders botId={botId} />}
                        {active == "Trades" && <GridBotTrades botId={botId} />}
                        {active == "Logs" && <GridBotLogs botId={botId} />}
                        {active == "Cancelled" && (
                          <GridBotCancelledOrder botId={botId} />
                        )}
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

                {currentAmount > 0 && (
                  <div className="flex justify-between">
                    <div className="text-sm text-gray-400 mb-1">Investment</div>
                    <div className="text-base text-white">
                      {Number(currentAmount)?.toFixed(4)} USDT
                    </div>
                  </div>
                )}

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
                <div className="flex justify-end gap-4">
                  <EditIcon
                    onClick={() => {
                      router.push(
                        `/dashboard/bot/edit-grid-bot?botId=${encodeURIComponent(
                          botId
                        )}`
                      );
                    }}
                    color="red"
                    className="cursor-pointer"
                  />
                  <IconTrashXFilled
                    onClick={() => {
                      setCurrentSelectedItem(null);
                      setDeleteModalState(true);
                    }}
                    color="red"
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </aside>
          </main>
        </div>
      </div>
      {deleteModalState && (
        <DeleteModal
          open={deleteModalState}
          setOpen={setDeleteModalState}
          botId={botId}
        />
      )}
    </div>
  );
}

const DeleteModal = ({ open, setOpen, botId }) => {
  const router = useRouter();
  const { refetch } = useGetBotList();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => {
      return deleteBot({ id: botId });
    },
    onSuccess: (data) => {
      if (data?.responseCode == 200) {
        toast.success(data?.responseMessage);
        router.replace("/dashboard/bot");
      } else {
        toast.error(data?.responseMessage);
      }
      setOpen(false);
      if (refetch) {
        refetch();
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.responseMessage);
      setOpen(false);
      if (refetch) {
        refetch();
      }
    },
  });

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="flex items-center justify-center flex-col">
        <div className="flex items-center gap-4">
          <TriangleAlert />

          <p className="font-semibold text-2xl">Confirmation</p>
        </div>
        <p className="mt-6 text-xl">
          Are you sure you want to delete this bot?
        </p>
        <p className="mt-2">
          Deleting this bot will permanently remove all orders and profile
          history. This action can't be undone.
        </p>
        <div className="w-full mt-4 flex flex-row gap-4 ">
          <button
            className="bg-gray-300 w-full flex justify-center items-center h-10 rounded text-black"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 w-full flex justify-center items-center h-10 rounded"
            onClick={mutateAsync}
            disabled={isPending}
          >
            {isPending ? `Processing...` : `Confirm`}
          </button>
        </div>
      </div>
    </Modal>
  );
};
