"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Dropdown from "@/components/dropdown";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createBot, updateBot, useGetBot } from "@/queries/bot";
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
    .required("Quantity per grid is required"),
  gridLevels: Yup.number()
    .typeError("Grid levels must be a number")
    .integer("Must be an integer")
    .min(1, "At least 1 grid level")
    .required("Grid levels are required"),
  botName: Yup.string().required("Bot name is required"),
});

export default function EditGridBot() {
  const searchParams = useSearchParams();
  const botId = searchParams.get("botId");
  const router = useRouter();
  const {
    data: botData,
    isPending: botDataPending,
    refetch: botDataRefetch,
  } = useGetBot({ id: botId });

  const [selectedExchange, setSelectedExchange] = useState("");

  const [pair, setPair] = useState("");

  useEffect(() => {
    setSelectedExchange(botData?.exchangeKeyId);
    setPair(botData?.symbol);
  }, [botData]);
  const { data: exchangeList, isPending: exchangeListPending } =
    useGetKeysExchange();

  const { mutateAsync: handleCreateBot, isPending } = useMutation({
    mutationFn: updateBot,
    onSuccess: (data) => {
      if (data?.responseCode == 200) {
        toast.success(
          data?.responseMessage || "Grid Bot Created Successfully!"
        );
        router.push(
          `/dashboard/bot/start-grid-bot/?botId= ${encodeURIComponent(botId)}`
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
      highPrice: botData?.params?.highPrice || "",
      lowPrice: botData?.params?.lowPrice || "",
      quantity: botData?.params?.quantityPerGridUSD || "",
      gridLevels: botData?.params?.gridLevel || "",
      tpPercent: botData?.params?.tpPercent || "",
      slPercent: botData?.params?.slPercent || "",
      botName: botData?.botName || "",
      adxLessThan20: botData?.params?.adxLessThan20,
      rsiBetween40And60: botData?.params?.rsiBetween40And60,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      if (!selectedExchange || !pair) {
        toast.error("Please select an exchange and pair");
        return;
      }

      const payload = {
        botId: botId,
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
      <div className="flex items-center justify-between bg-[#0b0b0d] border border-[#17171a] rounded-xl p-3">
        <div>
          <div className="text-xs text-gray-400">{label}</div>
          <div className="font-medium mt-1">{value ? "Yes" : "No"}</div>
        </div>
        <button
          type="button"
          onClick={() => formik.setFieldValue(name, !value)}
          className={`px-3 py-1 rounded-full font-semibold focus:outline-none transition-shadow ${
            value ? "bg-primary" : "shadow-[0_0_0_4px_rgba(244,63,94,0.06)]"
          }`}
          aria-pressed={value}
        >
          {value ? "ON" : "OFF"}
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
                <h1 className="text-3xl font-bold">Edit Grid Bot</h1>
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
                    disabled
                  />
                  <Dropdown
                    label="Pair"
                    options={[
                      { label: "BTC/USDT", value: "BTC/USDT" },
                      { label: "ETH/USDT", value: "ETH/USDT" },
                    ]}
                    value={pair || ""}
                    onSelect={(val) => setPair(val)}
                    className="w-50"
                    disabled
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 lg:grid-cols-1 gap-6">
                <div className="lg:col-span-2">
                  <div className="h-[500px]">
                    <TradingViewWidget symbol={pair || "NASDAQ:GOOGL"} />
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
                      label: "High Price",
                      placeholder: "Below 144.291",
                    },
                    {
                      name: "lowPrice",
                      label: "Low Price",
                      placeholder: "Above 77665.31",
                    },
                    {
                      name: "quantity",
                      label: "Quantity per grid",
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
                    {isPending ? "Editing..." : "Edit Grid Bot"}
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
