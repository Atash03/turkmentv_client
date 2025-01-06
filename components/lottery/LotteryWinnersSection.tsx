import { useState, useEffect } from 'react';
import { useLotteryAuth } from '@/store/useLotteryAuth';
import { LotteryWinnerDataSimplified } from '@/typings/lottery/lottery.types';
import LotteryWinnersList from './winners/LotteryWinnersList';
import LotterySlotCounter from './slotCounter/LotterySlotCounter';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import AnimatedText from '@/components/common/AnimatedText';
import { useWebsocketLottery } from '@/hooks/useWebSocketLottery';
import Confetti from '../common/Confetti';

const WEBSOCKET_URL = 'wss://sms.turkmentv.gov.tm/ws/lottery?dst=0506';
const SLOT_COUNTER_DURATION = 100000;

const LotteryWinnersSection = ({ lotteryStatus }: { lotteryStatus: string }) => {
  const [winners, setWinners] = useState<LotteryWinnerDataSimplified[]>([]);
  const [currentNumber, setCurrentNumber] = useState<string>();
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  const { width, height } = useWindowSize();
  const { lotteryData } = useLotteryAuth();
  const [winnerSelectingStatus, setWinnerSelectingStatus] = useState<
    'not-selected' | 'is-selecting' | 'selected'
  >('not-selected');
  const [pendingWinner, setPendingWinner] = useState<LotteryWinnerDataSimplified | null>(null);
  const [topText, setTopText] = useState<string>('Ýeňiji saýlanmady');
  const [bottomText, setBottomText] = useState<string>('');

  // WebSocket Hook
  const { wsStatus, subscribeToMessages } = useWebsocketLottery(WEBSOCKET_URL);

  console.log(winners);

  useEffect(() => {
    if (lotteryData) {
      if (lotteryData?.data.winners.length > 0) {
        const simplifiedWinners = lotteryData.data.winners.map((winner) => ({
          client: winner.client,
          winner_no: winner.winner_no,
          ticket: winner.ticket,
        }));
        setWinners(simplifiedWinners);
        setCurrentNumber(lotteryData.data.winners.at(-1)?.ticket || '00-00-00-00-00');
        setWinnerSelectingStatus('selected');
        setTopText('Ýeniji');
        setBottomText(lotteryData.data.winners.at(-1)?.client || '');
      }
    }
  }, [lotteryData]);

  useEffect(() => {
    const unsubscribe = subscribeToMessages((event) => {
      const newWinner = JSON.parse(event.data);
      if (!newWinner || !newWinner.phone || !newWinner.winner_no || !newWinner.ticket) {
        console.error('❌ Invalid data format received');
        return;
      }

      const winnerData = {
        client: newWinner.phone,
        winner_no: newWinner.winner_no,
        ticket: newWinner.ticket,
      };

      setTopText(`${winnerData.winner_no}-nji(y) ýeňiji saýlanýar`);
      setBottomText('...');
      setWinnerSelectingStatus('is-selecting');
      setPendingWinner(winnerData);
      setCurrentNumber(winnerData.ticket);

      setTimeout(() => {
        setTopText('Ýeniji');
        setBottomText(winnerData.client);
        setWinnerSelectingStatus('selected');
        setIsConfettiActive(true);
        setWinners((prev) => [...prev, winnerData]);
        setTimeout(() => {
          setIsConfettiActive(false);
          // setPendingWinner(null);
        }, 5000);
      }, SLOT_COUNTER_DURATION + 500);
    });

    return () => {
      unsubscribe();
    };
  }, [subscribeToMessages]);

  return (
    <section>
      {wsStatus === 'error' && (
        <div className="text-red-500 text-center mb-2">Websocket connection error.</div>
      )}
      {isConfettiActive && <Confetti infinite={false} numberOfPieces={1000} />}
      <div className="container">
        <div
          className="flex flex-col items-center rounded-[32px] gap-[40px]"
          style={{
            background: 'linear-gradient(180deg, #F0ECF4 0%, #E1E0FF 43.5%)',
          }}>
          <div className="flex items-center justify-center w-full min-h-[240px]">
            {winnerSelectingStatus === 'not-selected' ? (
              <AnimatedText
                text={topText}
                className="text-center flex items-center justify-center text-[100px] leading-[108px] text-[#E65E19]"
              />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <AnimatedText
                  text={topText}
                  className="text-center text-[56px] leading-[64px] text-[#E65E19]"
                />
                {bottomText && (
                  <AnimatedText
                    text={bottomText}
                    className="text-center text-[80px] leading-[88px] text-[#E65E19]"
                  />
                )}
              </div>
            )}
          </div>
          <div className="z-10">
            {currentNumber && (
              <LotterySlotCounter numberString={currentNumber} isAnimating={false} />
            )}
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
