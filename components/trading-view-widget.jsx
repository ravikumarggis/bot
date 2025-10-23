"use client";
import {
  Chart,
  CandlestickSeries,
  TimeScale,
  TimeScaleFitContentTrigger,
} from "lightweight-charts-react-components";
import ActivityIndicator from "@/components/activity-indicator";
import { useWatchOHLCV } from "@/hooks/useWatchOHLCV";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useGetKeysExchange } from "@/queries/exchange";
const TradingViewWidget = ({ symbol, exchange }) => {
  const { data: exchangeList, isPending: exchangeListPending } =
    useGetKeysExchange();
  const chartContainerRef = useRef(null);

  const exchangeName = useMemo(() => {
    return exchangeList?.find((item) => item?.id == exchange)?.exchange;
  }, [exchangeList, exchange]);

  const ohlcvData = useWatchOHLCV({
    symbol,
    exchange: exchange ? exchangeName : undefined,
  });
  // const tickerData = useWatchTicker({ symbol: symbol });

  const data = useMemo(() => {
    if (ohlcvData?.ohlcvData?.length < 1) {
      return [];
    }
    return (
      ohlcvData?.ohlcvData
        ?.map((item) => {
          const time = Math.floor(item[0] / 1000);
          const open = item[1];
          const high = item[2];
          const low = item[3];
          const close = item[4];
          return { time, open, high, low, close };
        })
        .sort((a, b) => new Date(a.time) - new Date(b.time)) || []
    );
  }, [ohlcvData]);

  if (!ohlcvData?.isConnected || data?.length < 1) {
    return (
      <div className="h-[500px] w-full flex items-center justify-center flex-col">
        <ActivityIndicator isLoading className={"h-14 w-14"} />
        <p>Getting Chart Data...</p>
      </div>
    );
  }

  return (
    <div
      ref={chartContainerRef}
      style={{ width: "100%", height: "500px" }}
      className="bg-black"
    >
      <Chart
        options={{
          width: chartContainerRef?.current?.offsetWidth || 400,
          height: chartContainerRef?.current?.offsetHeight || 400,
          layout: {
            background: { type: "solid", color: "#0F0F0F" },
            textColor: "#ffffff",
          },
          grid: {
            vertLines: { color: "#2B2B2B" },
            horzLines: { color: "#2B2B2B" },
          },
          crosshair: {
            mode: 1,
          },
        }}
      >
        <CandlestickSeries
          data={data}
          upColor="#26a69a"
          downColor="#ef5350"
          borderVisible={false}
          wickUpColor="#26a69a"
          wickDownColor="#ef5350"
        />
        <TimeScale>
          <TimeScaleFitContentTrigger deps={[]} />
        </TimeScale>
      </Chart>
    </div>
  );
};

export default memo(TradingViewWidget);
