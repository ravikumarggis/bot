// components/TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from "react";

function TradingViewWidget({ symbol = "NASDAQ:AAPL", theme = "dark", interval = "D" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // ensure we run only in browser
    if (!containerRef.current || typeof window === "undefined") return;

    // clear any previous content
    containerRef.current.innerHTML = "";

    const wrapper = document.createElement("div");
    wrapper.className = "tradingview-widget-container";

    const widgetDiv = document.createElement("div");
    widgetDiv.className = "tradingview-widget-container__widget";
    wrapper.appendChild(widgetDiv);

    const copyrightDiv = document.createElement("div");
    copyrightDiv.className = "tradingview-widget-copyright";
    copyrightDiv.innerHTML =
      `<a href="https://www.tradingview.com/symbols/${symbol.replace(":", "-")}/" target="_blank" rel="noopener nofollow">
         <span class="blue-text">${symbol.split(":").pop()} stock chart</span>
       </a><span class="trademark"> by TradingView</span>`;
    wrapper.appendChild(copyrightDiv);

    // create script tag with config JSON as text
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.type = "text/javascript";

    // config object. Modify keys if you want different default config.
    const config = {
      allow_symbol_change: true,
      calendar: false,
      details: false,
      hide_side_toolbar: true,
      hide_top_toolbar: false,
      hide_legend: false,
      hide_volume: false,
      hotlist: false,
      interval,
      locale: "en",
      save_image: true,
      style: "1",
      symbol,
      theme,
      timezone: "Etc/UTC",
      backgroundColor: "#0F0F0F",
      gridColor: "rgba(242, 242, 242, 0.06)",
      watchlist: [],
      withdateranges: false,
      compareSymbols: [],
      studies: [],
      autosize: true
    };

    // The TradingView embed expects the config JSON as the script's text content
    script.innerHTML = JSON.stringify(config);

    wrapper.appendChild(script);
    containerRef.current.appendChild(wrapper);

    // cleanup on unmount
    return () => {
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, [symbol, theme, interval]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        // recommended responsive behavior:
        // use min-height or aspect-ratio depending on design needs
    //  minHeight: "60vh",
        height: "100%",
     
       
      }}
      className="tv-widget-outer height-full flex"
    />
  );
}

export default memo(TradingViewWidget);
