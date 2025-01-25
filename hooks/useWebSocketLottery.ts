import { useState, useEffect, useRef, useCallback } from "react";

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

      console.log("🔄 [WebSocket] Connecting...");
      const socket = new WebSocket(url);
      wsRef.current = socket;

      socket.onopen = () => {
        if (!isMounted) return;

        console.log("✅ [WebSocket] Connected");
        console.log("🔗 [WebSocket URL]:", url);
        setWsStatus("connected");
        if (reconnectTimeoutRef.current)
          clearTimeout(reconnectTimeoutRef.current);
      };

      socket.onmessage = (event) => {
        if (!isMounted) return;

        console.log("📩 [WebSocket] Message received:", event.data);
        messageListeners.current.forEach((listener) => listener(event));
      };

      socket.onerror = () => {
        if (!isMounted) return;

        console.error("❌ [WebSocket] Error occurred");
        setWsStatus("error");
      };

      socket.onclose = () => {
        if (!isMounted) return;

        console.log("❌ [WebSocket] Closed");
        setWsStatus("closed");
        reconnectWebSocket();
      };
    };

    const reconnectWebSocket = () => {
      if (!isMounted) return;

      console.log("🔄 [WebSocket] Reconnecting in 5 seconds...");
      reconnectTimeoutRef.current = setTimeout(() => {
        setupWebSocket();
      }, 5000);
    };

    setupWebSocket();

    return () => {
      console.log("🔌 [WebSocket] Cleaning up...");
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

  const sendPing = useCallback(() => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      console.log("📤 [WebSocket] Sending ping");
      wsRef.current.send(JSON.stringify({ type: "ping" }));
    }
  }, []);

  const subscribeToMessages = useCallback(
    (listener: (event: MessageEvent) => void) => {
      console.log("👂 [WebSocket] Subscribing to messages");
      messageListeners.current.push(listener);
      return () => {
        console.log("❌ [WebSocket] Unsubscribing from messages");
        messageListeners.current = messageListeners.current.filter(
          (l) => l !== listener
        );
      };
    },
    [] // Empty array ensures it's memoized
  );

  return { wsStatus, sendPing, subscribeToMessages };
};
