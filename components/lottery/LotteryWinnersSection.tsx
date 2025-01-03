'use client';

import { useState, useEffect, useRef } from 'react';
import { useLotteryAuth } from '@/store/useLotteryAuth';
import { LotteryWinnerDataSimplified } from '@/typings/lottery/lottery.types';
import LotteryWinnersList from './winners/LotteryWinnersList';
import LotterySlotCounter from './slotCounter/LotterySlotCounter';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import LotteryCountDownAllert from './countDown/countDownAllert/LotteryCountDownAllert';
import { AnimatePresence, motion } from 'framer-motion';
import AnimatedText from '@/components/common/AnimatedText';

const WEBSOCKET_URL = 'wss://sms.turkmentv.gov.tm/ws/lottery?dst=0506';
const PING_INTERVAL = 25000;
const SLOT_COUNTER_DURATION = 20000;
const RECONNECT_INTERVAL = 5000;

const LotteryWinnersSection = ({ lotteryStatus }: { lotteryStatus: string }) => {
  // UI States
  const [winners, setWinners] = useState<LotteryWinnerDataSimplified[]>([]);
  const [currentNumber, setCurrentNumber] = useState<string>('00-00-00-00-00');
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  const [wsStatus, setWsStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');
  const { width, height } = useWindowSize();
  const { lotteryData } = useLotteryAuth();
  const [isSlotCounterAnimating, setIsSlotCounterAnimating] = useState(false);
  const [winnerSelectingStatus, setWinnerSelectingStatus] = useState<
    'not-selected' | 'is-selecting' | 'selected'
  >('not-selected');
  const [pendingWinner, setPendingWinner] = useState<LotteryWinnerDataSimplified | null>(null);
  // Add new state for display text
  const [displayText, setDisplayText] = useState<string>('...');
  const [winnerText, setWinnerText] = useState<string>('');

  const wsRef = useRef<WebSocket | null>(null);
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(false);
  let reconnectAttempts: number;

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

  useEffect(() => {
    mountedRef.current = true;

    const setupWebSocket = () => {
      if (wsRef.current) return;

      try {
        const socket = new WebSocket(WEBSOCKET_URL);
        wsRef.current = socket;

        socket.addEventListener('open', () => {
          console.log('✅ WebSocket Connected');
          setWsStatus('connected');
          reconnectAttempts = 0; // Reset reconnect attempts
        });

        socket.addEventListener('message', handleWebSocketMessage);

        socket.addEventListener('error', (error) => {
          console.error('❌ WebSocket Error:', error);
          setWsStatus('error');
        });

        socket.addEventListener('close', (event) => {
          console.log('❌ WebSocket Closed:', event);
          console.log(`Code: ${event.code}, Reason: ${event.reason}`);

          setWsStatus('error');

          // Only reconnect if closure is abnormal
          if (event.code !== 1000) {
            reconnectWebSocket();
          }
        });
      } catch (error) {
        console.error('❌ Error creating WebSocket:', error);
        setWsStatus('error');
        reconnectWebSocket();
      }
    };

    const reconnectWebSocket = () => {
      if (!mountedRef.current) return;

      const delay = Math.min(1000 * 2 ** reconnectAttempts, 30000); // Exponential backoff
      reconnectAttempts += 1;

      console.log(`Reconnecting in ${delay / 1000} seconds...`);

      reconnectTimeoutRef.current = setTimeout(() => {
        setupWebSocket();
      }, delay);
    };

    setupWebSocket();

    return () => {
      mountedRef.current = false;

      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
      }

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }

      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, []);

  // WebSocket Message Handler
  const handleWebSocketMessage = async (event: MessageEvent) => {
    if (!mountedRef.current) return;

    try {
      const newWinner = JSON.parse(event.data);
      if (!newWinner || !newWinner.phone || !newWinner.winner_no || !newWinner.ticket) {
        throw new Error('Invalid data format received');
      }

      const winnerData = {
        client: newWinner.phone,
        winner_no: newWinner.winner_no,
        ticket: newWinner.ticket,
      };

      setDisplayText(`${winnerData.winner_no}-nji ýeňiji saýlanýar`);
      setWinnerSelectingStatus('is-selecting');
      setPendingWinner(winnerData);
      setCurrentNumber(winnerData.ticket);

      await new Promise((resolve) => setTimeout(resolve, SLOT_COUNTER_DURATION));

      setDisplayText('The winner is');
      setWinnerText(winnerData.client);
      setWinnerSelectingStatus('selected');
      setIsConfettiActive(true);

      setWinners((prev) => [...prev, winnerData]);

      setTimeout(() => {
        if (mountedRef.current) {
          setIsConfettiActive(false);
          setWinnerSelectingStatus('not-selected');
          setPendingWinner(null);
          setDisplayText('...');
          setWinnerText('');
        }
      }, 10000);
    } catch (error) {
      console.error('Error processing message:', error);
      setDisplayText('Error processing winner');
    }
  };

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
        <div
          className="flex flex-col items-center rounded-[32px] gap-[40px]"
          style={{ background: 'linear-gradient(180deg, #F0ECF4 0%, #E1E0FF 43.5%)' }}>
          <div className="flex items-center justify-center w-full min-h-[240px]">
            {winnerSelectingStatus === 'not-selected' ||
            winnerSelectingStatus === 'is-selecting' ? (
              <AnimatedText
                text={displayText}
                className="text-center flex items-center justify-center text-[100px] leading-[108px] text-[#E65E19]"
              />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <AnimatedText
                  text={displayText}
                  className="text-center text-[56px] leading-[64px] text-[#E65E19]"
                />
                {winnerText && (
                  <AnimatedText
                    text={winnerText}
                    className="text-center text-[80px] leading-[88px] text-[#E65E19]"
                  />
                )}
              </div>
            )}
          </div>
          <div className="z-10">
            <LotterySlotCounter numberString={currentNumber} isAnimating={isSlotCounterAnimating} />
          </div>
          <div className="flex gap-6 rounded-[12px] flex-1 w-full items-center justify-center sm:pb-[62px] pb-[32px] px-4">
            <LotteryWinnersList winners={winners} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LotteryWinnersSection;
