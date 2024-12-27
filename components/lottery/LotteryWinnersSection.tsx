'use client';

import { useState, useEffect, useRef } from 'react';
import { useLotteryAuth } from '@/store/useLotteryAuth';
import { LotteryWinnerDataSimplified } from '@/typings/lottery/lottery.types';
import LotteryWinnersList from './winners/LotteryWinnersList';
import LotterySlotCounter from './slotCounter/LotterySlotCounter';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const WEBSOCKET_URL = 'wss://sms.turkmentv.gov.tm/ws/lottery?dst=0506';
const PING_INTERVAL = 25000;

const LotteryWinnersSection = () => {
  // UI States
  const [winners, setWinners] = useState<LotteryWinnerDataSimplified[]>([]);
  const [currentNumber, setCurrentNumber] = useState<string>('00-00-00-00-00');
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const [wsStatus, setWsStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');
  const { width, height } = useWindowSize();
  const { lotteryData } = useLotteryAuth();

  // Refs
  const wsRef = useRef<WebSocket | null>(null);
  const pingIntervalRef = useRef<NodeJS.Timeout>();
  const mountedRef = useRef(false);

  // Initialize winners from lottery data
  useEffect(() => {
    if (lotteryData?.data.winners) {
      const simplifiedWinners = lotteryData.data.winners.map((winner) => ({
        client: winner.client,
        winner_no: winner.winner_no,
        ticket: winner.ticket,
      }));
      setWinners(simplifiedWinners);
      setCurrentNumber(lotteryData.data.winners.at(-1)?.ticket || '00-00-00-00-00');
    }
  }, [lotteryData]);

  // Handle WebSocket connection
  useEffect(() => {
    // Set mounted flag
    mountedRef.current = true;

    const setupWebSocket = () => {
      // Don't create a new connection if one already exists
      if (
        wsRef.current?.readyState === WebSocket.OPEN ||
        wsRef.current?.readyState === WebSocket.CONNECTING
      ) {
        return;
      }

      try {
        const socket = new WebSocket(WEBSOCKET_URL);
        wsRef.current = socket;

        socket.addEventListener('open', () => {
          if (!mountedRef.current) return;
          console.log('WebSocket Connected');
          setWsStatus('connected');

          // Setup ping interval
          pingIntervalRef.current = setInterval(() => {
            if (socket.readyState === WebSocket.OPEN) {
              socket.send(JSON.stringify({ type: 'ping' }));
            }
          }, PING_INTERVAL);
        });

        socket.addEventListener('message', (event) => {
          if (!mountedRef.current) return;
          console.log('Message received:', event.data);

          try {
            const newWinner = JSON.parse(event.data);
            const winnerData = {
              client: newWinner.client,
              winner_no: newWinner.winner_no,
              ticket: newWinner.ticket,
            };

            setWinners((prev) => [...prev, winnerData]);
            setCurrentNumber(newWinner.ticket);
            setIsConfettiActive(true);
            setTimeout(() => {
              if (mountedRef.current) {
                setIsConfettiActive(false);
              }
            }, 5000);
          } catch (error) {
            console.error('Error processing message:', error);
          }
        });

        socket.addEventListener('error', (error) => {
          if (!mountedRef.current) return;
          console.error('WebSocket Error:', error);
          setWsStatus('error');
        });

        socket.addEventListener('close', () => {
          if (!mountedRef.current) return;
          console.log('WebSocket Closed');
          setWsStatus('error');

          if (pingIntervalRef.current) {
            clearInterval(pingIntervalRef.current);
          }
        });
      } catch (error) {
        console.error('Error creating WebSocket:', error);
        setWsStatus('error');
      }
    };

    // Delay the initial connection
    const initTimeout = setTimeout(setupWebSocket, 100);

    // Cleanup function
    return () => {
      mountedRef.current = false;
      clearTimeout(initTimeout);

      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
      }

      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []); // Empty dependency array

  return (
    <section>
      {wsStatus === 'error' && (
        <div className="text-red-500 text-center mb-2">
          Connection error. Please refresh the page.
        </div>
      )}

      {isConfettiActive && (
        <div className="fixed top-0 left-0 z-50">
          <ReactConfetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={1000}
            tweenDuration={10000}
            run={true}
            colors={[
              'linear-gradient(45deg, #5D5D72, #8589DE)',
              'linear-gradient(45deg, #E1E0FF, #575992)',
              '#8589DE',
              '#575992',
              '#E1E0FF',
              '#BA1A1A',
            ]}
          />
        </div>
      )}

      <div className="container">
        <div className="flex flex-col items-center">
          <div className="-mb-[90px] z-10">
            <LotterySlotCounter numberString={currentNumber} />
          </div>
          <div className="flex gap-6 bg-lightPrimaryContainer rounded-[12px] flex-1 w-full items-center justify-center pt-[122px] pb-[62px]">
            <LotteryWinnersList winners={winners} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LotteryWinnersSection;
