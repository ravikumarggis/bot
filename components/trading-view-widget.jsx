// components/TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from "react";
import { useWatchOHLCV } from "@/hooks/useWatchOHLCV";
import { useWatchTicker } from "@/hooks/useWatchTicker";

function TradingViewWidget({
  symbol = "BTC/USDT",
  theme = "dark",
  interval = "1m",
}) {
  const containerRef = useRef(null);

  // 🔹 Subscribe to OHLCV & Ticker data
  const ohlcvData = useWatchOHLCV({ symbol, timeframe: interval });

  const tickerData = useWatchTicker({ symbol: symbol });
  console.log(tickerData, "ohlcvData>>");

  return <></>;
}

export default memo(TradingViewWidget);
