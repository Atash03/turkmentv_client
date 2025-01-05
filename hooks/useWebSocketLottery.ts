import { useState, useEffect, useRef } from "react";

export const useWebsocketLottery = (url: string) => {
  const [wsStatus, setWsStatus] = useState<
    "connecting" | "connected" | "error" | "closed"
  >("connecting");
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messageListeners = useRef<((event: MessageEvent) => void)[]>([]);

  useEffect(() => {
    let isMounted = true;

    const setupWebSocket = () => {
      if (!isMounted) return;

      console.log("🔄 Connecting to WebSocket...");
      const socket = new WebSocket(url);
      wsRef.current = socket;

      socket.onopen = () => {
        if (!isMounted) return;

        console.log("✅ WebSocket connected");
        setWsStatus("connected");
        if (reconnectTimeoutRef.current)
          clearTimeout(reconnectTimeoutRef.current);
      };

      socket.onmessage = (event) => {
        if (!isMounted) return;

        console.log("📩 Message received:", event.data);
        messageListeners.current.forEach((listener) => listener(event));
      };

      socket.onerror = () => {
        if (!isMounted) return;

        console.error("❌ WebSocket error");
        setWsStatus("error");
      };

      socket.onclose = () => {
        if (!isMounted) return;

        console.log("❌ WebSocket closed");
        setWsStatus("closed");
        reconnectWebSocket();
      };
    };

    const reconnectWebSocket = () => {
      if (!isMounted) return;

      console.log("🔄 Reconnecting to WebSocket...");
      reconnectTimeoutRef.current = setTimeout(() => {
        setupWebSocket();
      }, 5000);
    };

    setupWebSocket();

    return () => {
      console.log("🔌 Cleaning up WebSocket connection...");
      isMounted = false;

      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [url]);

  const sendPing = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      console.log("📤 Sending ping");
      wsRef.current.send(JSON.stringify({ type: "ping" }));
    }
  };

  const subscribeToMessages = (listener: (event: MessageEvent) => void) => {
    messageListeners.current.push(listener);
    return () => {
      messageListeners.current = messageListeners.current.filter(
        (l) => l !== listener
      );
    };
  };

  return { wsStatus, sendPing, subscribeToMessages };
};
