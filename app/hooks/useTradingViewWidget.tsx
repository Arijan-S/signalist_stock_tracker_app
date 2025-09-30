"use client";

import { useEffect, useRef } from "react";

const useTradingViewWidget = (
  scriptUrl: string,
  config: Record<string, unknown>,
  height = 600
) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (containerRef.current.dataset.loaded) return;
    // Ensure the container has an explicit height so the widget renders
    containerRef.current.style.height = `${height}px`;

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify(config);

    // Append the script into the container (TradingView looks for sibling widget div)
    containerRef.current.appendChild(script);
    containerRef.current.dataset.loaded = "true";

    return () => {
      if (containerRef.current) {
        // Clean up the injected script without nuking the widget markup
        while (containerRef.current.lastChild) {
          containerRef.current.removeChild(containerRef.current.lastChild);
        }
        delete containerRef.current.dataset.loaded;
      }
    };
  }, [scriptUrl, config, height]);

  return containerRef;
};

export default useTradingViewWidget;
