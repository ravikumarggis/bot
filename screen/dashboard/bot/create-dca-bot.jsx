"use client";
import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Dropdown from "@/components/dropdown";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createBot, createDCABots, useGetSymbolList } from "@/queries/bot"; // <-- import your API function
import { toast } from "sonner";
import { useGetKeysExchange } from "@/queries/exchange";
import { Info } from "lucide-react";
import { useWatchOHLCV } from "@/hooks/useWatchOHLCV";
const TradingViewWidget = dynamic(
  () => import("@/components/trading-view-widget"),
  { ssr: false }
);

const validationSchema = Yup.object({
  portfolioUsd: Yup.number()
    .typeError("Portfolio USD must be a number")
    .positive("Must be positive")
    .required("Portfolio USD is required"),
  perBuyPct: Yup.number()
    .typeError("Buy percent must be a number")
    .positive("Must be positive")
    .required("Buy percent is required"),
  maxEntries: Yup.number()
    .typeError("Max Entries must be a number")
    .positive("Must be positive")
    .required("Max Entries is required"),
  minOrderUsd: Yup.number()
    .typeError("Min order must be a number")
    .positive("Must be positive")
    .required("Min order is required"),
  maxAllocPct: Yup.number()
    .typeError("Max allocation must be a number")
    .positive("Must be positive")
    .required("Max allocation is required"),
  stopLossPct: Yup.number()
    .typeError("Stop loss percent must be a number")
    .integer("Must be an integer")
    .required("Stop loss percent are required"),
  takeProfitPct: Yup.number()
    .typeError("Take profit percent must be a number")
    .integer("Must be an integer")
    .required("Take profit percent are required"),
});

export default function CreateDCABot() {
  const router = useRouter();
  const [selectedExchange, setSelectedExchange] = useState("");
  const [pair, setPair] = useState("");
  const { data: exchangeList, isPending: exchangeListPending } =
    useGetKeysExchange();

  const exchangeName = useMemo(() => {
    return exchangeList?.find((item) => item?.id == selectedExchange)?.exchange;
  }, [exchangeList, selectedExchange]);

  const { data: pairData, isPending: pairDataPending } = useGetSymbolList({
    exchange: exchangeName,
  });

  const { mutateAsync: handleCreateBot, isPending } = useMutation({
    mutationFn: createDCABots,
    onSuccess: (data) => {
      if (data?.id) {
        toast.success(data?.responseMessage || "DCA Bot Created Successfully!");
        router.push(
          `/dashboard/bot/start-dca-bot/?botId= ${encodeURIComponent(data?.id)}`
        );
      } else {
        toast.error(data?.responseMessage || "Failed to create bot!");
      }
    },
    onError: (error) => {
      console.log(error, "errorerror");

      toast.error(
        error?.response?.data?.responseMessage || "Failed to create bot!"
      );
      console.error("Error creating bot:", error);
    },
  });

  const formik = useFormik({
    initialValues: {
      portfolioUsd: "",
      perBuyPct: "",
      maxEntries: 10,
      minOrderUsd: "",
      maxAllocPct: "",
      stopLossPct: "",
      takeProfitPct: "",
      enableIndicators: false,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      if (!selectedExchange || !pair) {
        toast.error("Please select an exchange and pair");
        return;
      }

      const payload = {
        pair: pair,

        portfolioUsd: Number(values.portfolioUsd),
        perBuyPct: Number(values.perBuyPct),
        maxEntries: Number(values.maxEntries),
        takeProfitPct: Number(values.takeProfitPct),
        stopLossPct: Number(values.stopLossPct),
        minOrderUsd: Number(values.minOrderUsd),
        maxAllocPct: Number(values.maxAllocPct),
        enableIndicators: values.enableIndicators ? 1 : 0,
      };

      await handleCreateBot(payload);
    },
  });

  const Toggle = ({ name, label, tooltip }) => {
    const value = formik.values[name];

    return (
      <div className="flex items-center justify-between bg-[#191921] border border-[#17171a] rounded-xl p-3">
        <div>
          <div className="flex flex-row gap-2">
            <div className="text-xs text-gray-400">{label}</div>
            <div className="relative group">
              <Info
                size={16}
                className="text-gray-400 cursor-pointer hover:text-gray-200"
              />
              <div className="absolute left-1/2 -translate-x-1/2 top-6 hidden group-hover:block bg-gray-800 text-gray-200 text-xs p-2 rounded-md shadow-lg w-64 z-10">
                {tooltip}
              </div>
            </div>
          </div>
          <div className="font-medium mt-1">{value ? "Yes" : "No"}</div>
        </div>

        <button
          type="button"
          onClick={() => formik.setFieldValue(name, !value)}
          aria-pressed={value}
          className="relative inline-flex h-7 w-14 cursor-pointer rounded-full transition-colors duration-300 focus:outline-none"
          style={{
            backgroundColor: value ? "#ee3379" : "#151518",
            boxShadow: !value
              ? "0 0 0 4px rgba(244,63,94,0.06)"
              : "0 0 10px rgba(225,29,72,0.4)",
          }}
        >
          <span
            className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white transform transition-transform duration-300 ${
              value ? "translate-x-7" : ""
            }`}
            style={{
              boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
            }}
          />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen text-gray-200">
      <div className="">
        <div className="flex flex-col gap-6 py-10">
          <main className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="col-span-1 lg:col-span-2 bg-[#0f0f11] rounded-2xl p-6 shadow-lg border border-[#1b1b1e]">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Create Grid Bot</h1>
                <div className="flex-col md:flex space-x-4 items-center gap-3">
                  <Dropdown
                    label="Exchange"
                    options={exchangeList?.map((item) => {
                      return {
                        label: item?.exchange,
                        value: item?.id,
                        icon: item?.icon,
                      };
                    })}
                    value={selectedExchange || ""}
                    onSelect={(val) => setSelectedExchange(val)}
                    className="w-50"
                  />
                  <Dropdown
                    label="Pair"
                    options={pairData?.map((item) => {
                      return {
                        label: item?.symbol,
                        value: item?.symbol,
                      };
                    })}
                    value={pair || ""}
                    disabled={!selectedExchange}
                    onSelect={(val) => {
                      setPair(val);
                    }}
                    className="w-50"
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 lg:grid-cols-1 gap-6">
                <div className="lg:col-span-2">
                  <div className="h-[500px]">
                    <TradingViewWidget
                      symbol={pair || "BTC/USDT"}
                      exchange={selectedExchange}
                    />
                  </div>
                </div>
              </div>
            </section>

            <aside className="bg-[#0f0f11] rounded-2xl p-6 shadow-lg border border-[#1b1b1e]">
              <form onSubmit={formik.handleSubmit}>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg font-semibold">Fast Form</div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      name: "portfolioUsd",
                      label: "Portfolio USD",
                      tooltipInfo:
                        "Capital allocated to the bot. Used as the base for risk and position sizing calculations. (in USD).",
                      placeholder: "Enter the higher range",
                    },
                    {
                      name: "perBuyPct",
                      label: "Buy %",
                      tooltipInfo:
                        "Percentage of portfolioUsd allocated to each buy order. Determines the per-entry order size.",
                      placeholder: "Enter the lower range",
                    },
                    {
                      name: "maxEntries",
                      label: "Max Enteries",
                      tooltipInfo:
                        "Maximum allowed number of DCA/ladder entries. Limits how many times the bot can average into a position. ( 3 only).",
                      placeholder: "10",
                    },
                    {
                      name: "takeProfitPct",
                      label: "Take Profit %",
                      tooltipInfo:
                        "% Profit percentage at which the bot automatically closes all open positions.",
                      placeholder: "10",
                    },
                    {
                      name: "stopLossPct",
                      label: "Stop Loss %",
                      tooltipInfo:
                        "% Loss percentage at which the bot force-closes the position to prevent further drawdown.",
                      placeholder: "10",
                    },
                    {
                      name: "minOrderUsd",
                      label: "Min order (USD)",
                      tooltipInfo:
                        "Minimum order value in USD allowed by the exchange. Orders smaller than this threshold are rejected or not placed.",
                      placeholder: "10",
                    },
                    {
                      name: "maxAllocPct",
                      label: "Max Allocation %",
                      tooltipInfo:
                        "Hard cap on the total percentage of portfolioUsd the bot can allocate across filled entries. Ensures maximum exposure limit.",
                      placeholder: "10",
                    },
                  ].map((f) => (
                    <label key={f.name} className="block">
                      <div className="flex items-center gap-2 text-md text-gray-400 mb-1">
                        <span>{f.label}</span>

                        {f.tooltipInfo && (
                          <div className="relative group">
                            <Info
                              size={16}
                              className="text-gray-400 cursor-pointer hover:text-gray-200"
                            />
                            <div className="absolute left-1/2 -translate-x-1/2 top-5 hidden group-hover:block bg-gray-800 text-gray-200 text-xs p-2 rounded-md shadow-lg w-64 z-10">
                              {f.tooltipInfo}
                            </div>
                          </div>
                        )}
                      </div>
                      <input
                        name={f.name}
                        value={formik.values[f.name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full p-3 bg-[#1A1A24] rounded focus:outline-none"
                        placeholder={f.placeholder}
                      />
                      {formik.touched[f.name] && formik.errors[f.name] && (
                        <div className="text-red-500 text-xs mt-1">
                          {formik.errors[f.name]}
                        </div>
                      )}
                    </label>
                  ))}

                  <div>
                    <Toggle
                      name="enableIndicators"
                      label="Indicator"
                      tooltip={
                        "Enables or disables technical indicator filters (e.g., RSI, EMA, MACD) 1 = enabled, 0 = disabled."
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full mt-2 py-3 rounded-xl text-white font-semibold disabled:opacity-50"
                    style={{ background: "var(--color-primary)" }}
                  >
                    {isPending ? "Creating..." : "Create DCA Bot"}
                  </button>
                </div>
              </form>
            </aside>
          </main>
        </div>
      </div>
    </div>
  );
}
