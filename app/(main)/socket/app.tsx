import { useEffect, useState } from 'react';

interface Message {
  data: string;
}

const WebSocketComponent: React.FC = () => {
  const [message, setMessage] = useState();
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const ws = new WebSocket('ws://localhost:8080/ws');
    setSocket(ws);

    // Event listener for messages received from server
    ws.onmessage = (event: MessageEvent) => {
      console.log('Received from server:', event.data);
      setMessage(event.data);
    };

    // Handle WebSocket errors
    ws.onerror = (error: Event) => {
      console.error('WebSocket error:', error);
    };

    // Cleanup the WebSocket connection on component unmount
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h1>TypeScript WebSocket Example</h1>
    </div>
  );
};

export default WebSocketComponent;
