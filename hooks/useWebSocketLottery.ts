import { useState, useEffect, useRef } from "react";

export const useWebsocketLottery = (
  url: string,
  reconnectInterval: number = 20000
) => {
  const [wsStatus, setWsStatus] = useState<
    "connecting" | "connected" | "error"
  >("connecting");
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const setupWebSocket = () => {
      const socket = new WebSocket(url);
      wsRef.current = socket;

      socket.addEventListener("open", () => setWsStatus("connected"));
      socket.addEventListener("error", () => setWsStatus("error"));
      socket.addEventListener("close", () => reconnectWebSocket());
    };

    const reconnectWebSocket = () => {
      reconnectTimeoutRef.current = setTimeout(() => {
        setupWebSocket();
      }, reconnectInterval);
    };

    setupWebSocket();

    return () => {
      if (reconnectTimeoutRef.current)
        clearTimeout(reconnectTimeoutRef.current);
      if (wsRef.current) wsRef.current.close();
    };
  }, [url, reconnectInterval]);

  const sendMessage = (message: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
    }
  };

  return { wsStatus, sendMessage };
};
