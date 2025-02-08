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

      const socket = new WebSocket(url);
      wsRef.current = socket;

      socket.onopen = () => {
        if (!isMounted) return;

        setWsStatus("connected");
        if (reconnectTimeoutRef.current)
          clearTimeout(reconnectTimeoutRef.current);
      };

      socket.onmessage = (event) => {
        if (!isMounted) return;

        messageListeners.current.forEach((listener) => listener(event));
      };

      socket.onerror = () => {
        if (!isMounted) return;

        setWsStatus("error");
      };

      socket.onclose = () => {
        if (!isMounted) return;

        setWsStatus("closed");
        reconnectWebSocket();
      };
    };

    const reconnectWebSocket = () => {
      if (!isMounted) return;

      reconnectTimeoutRef.current = setTimeout(() => {
        setupWebSocket();
      }, 5000);
    };

    setupWebSocket();

    return () => {
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
      wsRef.current.send(JSON.stringify({ type: "ping" }));
    }
  }, []);

  const subscribeToMessages = useCallback(
    (listener: (event: MessageEvent) => void) => {
      messageListeners.current.push(listener);
      return () => {
        messageListeners.current = messageListeners.current.filter(
          (l) => l !== listener
        );
      };
    },
    [] // Empty array ensures it's memoized
  );

  return { wsStatus, sendPing, subscribeToMessages };
};
