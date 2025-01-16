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
import { AnimatePresence, motion } from 'framer-motion';

const WEBSOCKET_URL = 'wss://sms.turkmentv.gov.tm/ws/lottery?dst=0506';
const SLOT_COUNTER_DURATION = 30000;

const LotteryWinnersSection = ({ lotteryStatus }: { lotteryStatus: string }) => {
  const [winners, setWinners] = useState<LotteryWinnerDataSimplified[]>([]);
  const [currentNumber, setCurrentNumber] = useState<string>('00-00-00-00-00');
  const [startNumber, setStartNumber] = useState<string>('00-00-00-00-00');
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  const { lotteryData } = useLotteryAuth();
  const [winnerSelectingStatus, setWinnerSelectingStatus] = useState<
    'not-selected' | 'is-selecting' | 'selected'
  >('not-selected');
  const [pendingWinner, setPendingWinner] = useState<LotteryWinnerDataSimplified | null>(null);
  const [topText, setTopText] = useState<string>('Bije az wagtdan başlaýar');
  const [bottomText, setBottomText] = useState<string>('');

  // WebSocket Hook
  const { wsStatus, subscribeToMessages } = useWebsocketLottery(WEBSOCKET_URL);

  useEffect(() => {
    if (lotteryData) {
      if (lotteryData?.data.winners.length > 0) {
        const simplifiedWinners = lotteryData.data.winners.map((winner) => ({
          client: winner.client,
          winner_no: winner.winner_no,
          ticket: winner.ticket,
        }));
        setWinners(simplifiedWinners);
        // setCurrentNumber(lotteryData.data.winners.at(-1)?.ticket || '00-00-00-00-00');
        setWinnerSelectingStatus('selected');
        setTopText(`${lotteryData.data.winners.at(-1)?.winner_no}-nji ýeňiji`);
        setBottomText(lotteryData.data.winners.at(-1)?.client || '');
        setIsConfettiActive(true);
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

      setIsConfettiActive(false);
      setTopText(`${winnerData.winner_no}-nji ýeňiji saýlanýar`);
      setBottomText('...');
      setWinnerSelectingStatus('is-selecting');
      setPendingWinner(winnerData);
      setCurrentNumber(winnerData.ticket);

      setTimeout(() => {
        setTopText(`${winnerData.winner_no}-nji ýeňiji`);
        setBottomText(winnerData.client);
        setWinnerSelectingStatus('selected');
        setIsConfettiActive(true);
        setWinners((prev) => [...prev, winnerData]);
      }, SLOT_COUNTER_DURATION);
    });

    return () => {
      unsubscribe();
    };
  }, [subscribeToMessages]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsConfettiActive(false);
  //     setTopText(`${1}-nji ýeňiji saýlanýar`);
  //     setBottomText('...');
  //     setWinnerSelectingStatus('is-selecting');
  //     // setPendingWinner(winnerData);
  //     setCurrentNumber('55-44-33-22-11');

  //     setTimeout(() => {
  //       setTopText('Ýeniji');
  //       setBottomText('99361245555');
  //       setWinnerSelectingStatus('selected');
  //       setIsConfettiActive(true);
  //       // setWinners((prev) => [...prev, winnerData]);
  //     }, SLOT_COUNTER_DURATION);
  //   }, 10000);

  //   setTimeout(() => {
  //     setIsConfettiActive(false);
  //     setTopText(`${1}-nji ýeňiji saýlanýar`);
  //     setBottomText('...');
  //     setWinnerSelectingStatus('is-selecting');
  //     // setPendingWinner(winnerData);
  //     setCurrentNumber('11-22-33-44-55');

  //     setTimeout(() => {
  //       setTopText('Ýeniji');
  //       setBottomText('99361245555');
  //       setWinnerSelectingStatus('selected');
  //       setIsConfettiActive(true);
  //       // setWinners((prev) => [...prev, winnerData]);
  //     }, SLOT_COUNTER_DURATION);
  //   }, SLOT_COUNTER_DURATION + 20000);
  // }, []);

  return (
    <section>
      {wsStatus === 'error' && (
        <div className="text-red-500 text-center mb-2">Websocket connection error.</div>
      )}
      <Confetti showConfetti={isConfettiActive} numberOfPieces={300} />{' '}
      <div className="container">
        <div
          className="flex flex-col items-center rounded-[32px] gap-[40px]"
          style={{
            background: 'linear-gradient(180deg, #F0ECF4 0%, #E1E0FF 43.5%)',
          }}>
          <AnimatePresence>
            <div className="flex items-center justify-center w-full sm:min-h-[240px] pt-6">
              {winnerSelectingStatus === 'not-selected' ? (
                // <TextMaskReveal
                //   text={topText}
                //   className="text-center flex items-center justify-center text-[100px] leading-[108px] text-[#E65E19]"
                //   duration={0.5}
                // />
                <AnimatedText
                  key={topText}
                  text={topText}
                  className="text-center flex items-center justify-center md:text-[80px] sm:text-[56px] text-[24px] leading-[120%] text-[#E65E19]"
                  duration={0.4}
                />
              ) : (
                <motion.div
                  variants={{
                    enter: {
                      transition: { staggerChildren: 1, delayChildren: 0.5 },
                    },
                    exit: {
                      transition: {
                        staggerChildren: 0.05,
                        staggerDirection: -1,
                      },
                    },
                  }}
                  className="flex flex-col items-center justify-center">
                  {/* <TextMaskReveal
                  text={topText}
                  className="text-center text-[56px] leading-[64px] text-[#E65E19]"
                  duration={0.4}
                /> */}
                  <AnimatedText
                    key={topText}
                    text={topText}
                    className="text-center sm:text-[56px] text-[24px] w-full leading-[120%] text-[#E65E19]"
                    duration={0.4}
                  />
                  {bottomText && (
                    // <TextMaskReveal
                    //   text={bottomText}
                    //   className="text-center text-[80px] leading-[88px] text-[#E65E19]"
                    //   duration={0.4}
                    //   startDelay={3}
                    // />
                    <AnimatedText
                      key={bottomText}
                      text={bottomText}
                      className="text-center sm:text-[80px] text-[32px] leading-[120%] text-[#E65E19]"
                      duration={0.4}
                      // characterDelay={2}
                    />
                  )}
                </motion.div>
              )}
            </div>
          </AnimatePresence>

          <div className="z-10">
            {currentNumber && <LotterySlotCounter numberString={currentNumber} />}
          </div>
          <div className="flex gap-6 rounded-[12px] flex-1 w-full items-center justify-center sm:pb-[62px] pb-[32px] px-4">
            {winners.length > 0 && <LotteryWinnersList winners={winners} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LotteryWinnersSection;
