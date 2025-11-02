"use client";
import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Dropdown from "@/components/dropdown";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createBot, useGetSymbolList } from "@/queries/bot"; // <-- import your API function
import { toast } from "sonner";
import { useGetKeysExchange } from "@/queries/exchange";
const TradingViewWidget = dynamic(
  () => import("@/components/trading-view-widget"),
  { ssr: false }
);

const validationSchema = Yup.object({
  highPrice: Yup.number()
    .typeError("High price must be a number")
    .positive("Must be positive")
    .required("High price is required"),
  lowPrice: Yup.number()
    .typeError("Low price must be a number")
    .positive("Must be positive")
    .required("Low price is required"),
  quantity: Yup.number()
    .typeError("Quantity must be a number")
    .positive("Must be positive")
    // .min(5, "Minimum quantity is 5 USD")
    .required("Quantity per grid is required"),
  gridLevels: Yup.number()
    .typeError("Grid levels must be a number")
    .integer("Must be an integer")
    // .min(3, "At least 3 USD grid level")
    .required("Grid levels are required"),
  botName: Yup.string().required("Bot name is required"),
});

export default function CreateGridBot() {
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
    mutationFn: createBot,
    onSuccess: (data) => {
      if (data?.responseCode == 200) {
        toast.success(
          data?.responseMessage || "Grid Bot Created Successfully!"
        );
        router.push(
          `/dashboard/bot/start-grid-bot/?botId= ${encodeURIComponent(
            data.result?.id
          )}`
        );
      } else {
        toast.error(data?.responseMessage);
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to create bot!");
      console.error("Error creating bot:", error);
    },
  });

  const formik = useFormik({
    initialValues: {
      highPrice: "",
      lowPrice: "",
      quantity: "",
      gridLevels: "",
      tpPercent: "2",
      slPercent: "1",
      botName: "",
      adxLessThan20: true,
      rsiBetween40And60: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!selectedExchange || !pair) {
        toast.error("Please select an exchange and pair");
        return;
      }

      const payload = {
        botName: values.botName,
        exchangeKeyId: selectedExchange,
        symbol: pair,
        // status: "running",
        params: {
          highPrice: Number(values.highPrice),
          lowPrice: Number(values.lowPrice),
          gridLevel: Number(values.gridLevels),
          quantityPerGridUSD: Number(values.quantity),
          tpPercent: Number(values.tpPercent),
          slPercent: Number(values.slPercent),
          adxLessThan20: values.adxLessThan20,
          rsiBetween40And60: values.rsiBetween40And60,
        },
        // pausedUntil: "2025-10-10T12:00:00Z",
      };

      await handleCreateBot(payload);
    },
  });

  const Toggle = ({ name, label }) => {
    const value = formik.values[name];

    return (
      <div className="flex items-center justify-between bg-[#191921] border border-[#17171a] rounded-xl p-3">
        <div>
          <div className="text-xs text-gray-400">{label}</div>
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
                    onSelect={(val) => setPair(val)}
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
                  {/* <div className="text-sm text-gray-400">Advanced form</div> */}
                </div>

                <div className="space-y-4">
                  {[
                    {
                      name: "highPrice",
                      label: "High Price in USD",
                      placeholder: "Below 144.291",
                    },
                    {
                      name: "lowPrice",
                      label: "Low Price in USD",
                      placeholder: "Above 77665.31",
                    },
                    {
                      name: "quantity",
                      label: "Quantity per grid in USD",
                      placeholder: "0.0001",
                    },
                    {
                      name: "gridLevels",
                      label: "Grid Levels",
                      placeholder: "10",
                    },
                  ].map((f) => (
                    <label key={f.name} className="block">
                      <div className="text-md text-gray-400 mb-1">
                        {f.label}
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

                  <label className="block">
                    <div className="text-md text-gray-400 mb-1">
                      TP Percent <span className="text-sm">(Optional)</span>
                    </div>
                    <input
                      name="tpPercent"
                      value={formik.values.tpPercent}
                      onChange={formik.handleChange}
                      className="w-full p-3 bg-[#1A1A24] rounded focus:outline-none"
                    />
                  </label>

                  <label className="block">
                    <div className="text-md text-gray-400 mb-1">
                      SL Percent <span className="text-sm">(Optional)</span>
                    </div>
                    <input
                      name="slPercent"
                      value={formik.values.slPercent}
                      onChange={formik.handleChange}
                      className="w-full p-3 bg-[#1A1A24] rounded focus:outline-none"
                    />
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Toggle name="adxLessThan20" label="ADX < 20" />
                    <Toggle name="rsiBetween40And60" label="RSI 40-60" />
                  </div>

                  <label className="block">
                    <div className="text-md text-gray-400 mb-1">Bot Name</div>
                    <input
                      name="botName"
                      value={formik.values.botName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-3 bg-[#1A1A24] rounded focus:outline-none"
                      placeholder="GridBot-1"
                    />
                    {formik.touched.botName && formik.errors.botName && (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.botName}
                      </div>
                    )}
                  </label>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full mt-2 py-3 rounded-xl text-white font-semibold disabled:opacity-50"
                    style={{ background: "var(--color-primary)" }}
                  >
                    {isPending ? "Creating..." : "Create Grid Bot"}
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
