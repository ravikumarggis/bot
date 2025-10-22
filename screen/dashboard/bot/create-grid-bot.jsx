"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Dropdown from "@/components/dropdown";
import { useFormik } from "formik";
import * as Yup from "yup";

const TradingViewWidget = dynamic(
  () => import("@/components/trading-view-widget"),
  { ssr: false }
);

export default function CreateGridBot() {
    const router = useRouter()
  const [selectedExchange, setSelectedExchange] = useState("");
  const [chain, setChain] = useState("");

  // ✅ Yup validation schema
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

  // ✅ useFormik hook
  const formik = useFormik({
    initialValues: {
      highPrice: "",
      lowPrice: "",
      quantity: "",
      gridLevels: "",
      botName: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Grid Bot Form Data:", values);
      alert("Grid Bot Created Successfully!");
    },
  });

  return (
    <div className="min-h-screen text-gray-200">
      <div className="">
        <div className="flex flex-col gap-6 py-10">
          <main className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Chart */}
            <section className="col-span-1 lg:col-span-2 bg-[#0f0f11] rounded-2xl p-6 shadow-lg border border-[#1b1b1e]">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Create Grid Bot</h1>
                <div className="flex-col md:flex space-x-4 items-center gap-3">
                  <Dropdown
                    label="Exchange"
                    options={[
                      { label: "Binance", value: "binance" },
                      { label: "Bybit", value: "bybit" },
                    ]}
                    value={selectedExchange || ""}
                    onSelect={(val) => setSelectedExchange(val)}
                    className="w-50"
                  />
                  <Dropdown
                    label="Chain"
                    options={[
                      { label: "BTC/USDT", value: "BTC/USDT" },
                      { label: "ETH/USDT", value: "ETH/USDT" },
                    ]}
                    value={chain || ""}
                    onSelect={(val) => setChain(val)}
                    className="w-50"
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 lg:grid-cols-1 gap-6">
                <div className="lg:col-span-2">
                  <div className="h-[500px]">
                    <TradingViewWidget symbol="NASDAQ:GOOGL" />
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    <div className="bg-[#0b0b0d] border border-[#17171a] rounded-lg p-3">
                      <div className="text-xs text-gray-400">Investment</div>
                      <div className="font-medium mt-1">90.54 USDT</div>
                    </div>
                    <div className="bg-[#0b0b0d] border border-[#17171a] rounded-lg p-3">
                      <div className="text-xs text-gray-400">
                        Estimated Orders
                      </div>
                      <div className="font-medium mt-1">10</div>
                    </div>
                    <div className="bg-[#0b0b0d] border border-[#17171a] rounded-lg p-3">
                      <div className="text-xs text-gray-400">Required</div>
                      <div className="font-medium mt-1">100 USDT</div>
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

            <aside className="bg-[#0f0f11] rounded-2xl p-6 shadow-lg border border-[#1b1b1e]">
              <form onSubmit={formik.handleSubmit}>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg font-semibold">Fast Form</div>
                  <div className="text-sm text-gray-400">Advanced form</div>
                </div>

                <div className="space-y-4">
                  {/* High Price */}
                  <label className="block">
                    <div className="text-xs text-gray-400 mb-1">High Price</div>
                    <input
                      name="highPrice"
                      value={formik.values.highPrice}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-3 bg-[#1A1A24] rounded focus:outline-none"
                      placeholder="Below 144.291"
                    />
                    {formik.touched.highPrice && formik.errors.highPrice && (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.highPrice}
                      </div>
                    )}
                  </label>

                  {/* Low Price */}
                  <label className="block">
                    <div className="text-xs text-gray-400 mb-1">Low Price</div>
                    <input
                      name="lowPrice"
                      value={formik.values.lowPrice}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-3 bg-[#1A1A24] rounded focus:outline-none"
                      placeholder="Above 77665.31"
                    />
                    {formik.touched.lowPrice && formik.errors.lowPrice && (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.lowPrice}
                      </div>
                    )}
                  </label>

                  {/* Quantity per grid */}
                  <label className="block">
                    <div className="text-xs text-gray-400 mb-1">
                      Quantity per grid
                    </div>
                    <input
                      name="quantity"
                      value={formik.values.quantity}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-3 bg-[#1A1A24] rounded focus:outline-none"
                      placeholder="0.0001"
                    />
                    {formik.touched.quantity && formik.errors.quantity && (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.quantity}
                      </div>
                    )}
                  </label>

                  {/* Grid levels */}
                  <label className="block">
                    <div className="text-xs text-gray-400 mb-1">
                      Grid Levels
                    </div>
                    <input
                      name="gridLevels"
                      value={formik.values.gridLevels}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-3 bg-[#1A1A24] rounded focus:outline-none"
                      placeholder="10"
                    />
                    {formik.touched.gridLevels && formik.errors.gridLevels && (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.gridLevels}
                      </div>
                    )}
                  </label>

                  {/* Investment (static display) */}
                  <div className="pt-2">
                    <div className="text-xs text-gray-400 mb-1">Investment</div>
                    <div className="text-xl font-semibold">90.54 USDT</div>
                  </div>

                  {/* Bot name */}
                  <label className="block">
                    <div className="text-xs text-gray-400 mb-1">Bot Name</div>
                    <input
                      name="botName"
                      value={formik.values.botName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-3 bg-[#1A1A24] rounded focus:outline-none"
                      placeholder="Binance"
                    />
                    {formik.touched.botName && formik.errors.botName && (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.botName}
                      </div>
                    )}
                  </label>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 rounded-xl text-white font-semibold"
                    style={{ background: "var(--color-primary)" }}
                  >
                    Create Grid Bot
                  </button>

                  <div className="text-xs text-gray-500 mt-3">
                    Estimated Orders 10 | Required: 100 USDT
                  </div>
                </div>
              </form>
            </aside>
          </main>
        </div>
      </div>
    </div>
  );
}
