import { useState, useEffect } from "react";
import { useLotteryAuth } from "@/store/useLotteryAuth";
import { LotteryWinnerDataSimplified } from "@/typings/lottery/lottery.types";
import LotteryWinnersList from "./winners/LotteryWinnersList";
import LotterySlotCounter from "./slotCounter/LotterySlotCounter";
import AnimatedText from "@/components/common/AnimatedText";
import { useWebsocketLottery } from "@/hooks/useWebSocketLottery";
import Confetti from "../common/Confetti";
import { AnimatePresence, motion } from "framer-motion";

const WEBSOCKET_URL = "wss://sms.turkmentv.gov.tm/ws/lottery?dst=";
const SLOT_COUNTER_DURATION = 30000;

const LotteryWinnersSection = ({
  lotteryStatus,
}: {
  lotteryStatus: string;
}) => {
  const [winners, setWinners] = useState<LotteryWinnerDataSimplified[]>([]);
  const [currentNumber, setCurrentNumber] = useState<string>("00-00-00-00-00");
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  const { lotteryData } = useLotteryAuth();
  const [winnerSelectingStatus, setWinnerSelectingStatus] = useState<
    "not-selected" | "is-selecting" | "selected"
  >("not-selected");
  const [pendingWinner, setPendingWinner] =
    useState<LotteryWinnerDataSimplified | null>(null);
  const [topText, setTopText] = useState<string>("Bije az wagtdan başlaýar");
  const [bottomText, setBottomText] = useState<string>("");

  const [messageQueue, setMessageQueue] = useState<
    LotteryWinnerDataSimplified[]
  >([]); // Queue for incoming WebSocket messages
  const [isProcessing, setIsProcessing] = useState<boolean>(false); // Track if a message is being processed

  const { wsStatus, subscribeToMessages } = useWebsocketLottery(
    `${WEBSOCKET_URL}${lotteryData?.data.sms_number}`
  );

  // Simulate WebSocket message for testing
  const simulateMessage = () => {
    const dummyWinner: LotteryWinnerDataSimplified = {
      phone: `9936${Math.floor(10000000 + Math.random() * 90000000)}`, // Generate random client number
      winner_no: winners.length + 1, // Increment winner number
      ticket: `${Math.floor(Math.random() * 99)
        .toString()
        .padStart(2, "0")}-${Math.floor(Math.random() * 99)
        .toString()
        .padStart(2, "0")}-${Math.floor(Math.random() * 99)
        .toString()
        .padStart(2, "0")}-${Math.floor(Math.random() * 99)
        .toString()
        .padStart(2, "0")}-${Math.floor(Math.random() * 99)
        .toString()
        .padStart(2, "0")}`, // Generate random ticket
    };

    console.log("📩 Simulated Message:", dummyWinner); // Log the simulated message
    setMessageQueue((prevQueue) => [...prevQueue, dummyWinner]);
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     simulateMessage();
  //   }, 20000); // Trigger every 10 seconds

  //   return () => clearInterval(interval); // Clean up interval on unmount
  // }, []);

  // Initialize winners from lottery data
  useEffect(() => {
    console.log("🎟️ Lottery Data:", lotteryData);

    if (lotteryData && lotteryData.data.winners.length > 0) {
      const simplifiedWinners = lotteryData.data.winners.map((winner) => ({
        phone: winner.client,
        winner_no: winner.winner_no,
        ticket: winner.ticket,
      }));
      setWinners(simplifiedWinners);

      const lastWinner = simplifiedWinners[simplifiedWinners.length - 1];
      setWinnerSelectingStatus("selected");
      setTopText(`${lastWinner.winner_no}-nji ýeňiji`);
      setBottomText(lastWinner.phone);
      setIsConfettiActive(true);
    }
  }, [lotteryData]);

  // Subscribe to WebSocket messages
  useEffect(() => {
    const unsubscribe = subscribeToMessages((event) => {
      try {
        const newWinner: LotteryWinnerDataSimplified = JSON.parse(event.data);
        console.log("📩 WebSocket Message Received:", newWinner); // Log the parsed message

        // Add new message to the queue
        setMessageQueue((prevQueue) => {
          console.log("📥 Adding to Queue:", newWinner);
          return [...prevQueue, newWinner];
        });
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    });

    return () => unsubscribe();
  }, [subscribeToMessages]);

  // Process queue when a new message is added
  useEffect(() => {
    console.log("📋 Current Message Queue:", messageQueue);

    if (!isProcessing && messageQueue.length > 0) {
      processQueue();
    }
  }, [messageQueue, isProcessing]);

  // Process a single message from the queue
  const processQueue = async () => {
    if (isProcessing || messageQueue.length === 0) return;

    setIsProcessing(true); // Lock processing
    const message = messageQueue[0]; // Get the first message in the queue

    console.log("⚙️ Processing Message:", message); // Debug Log 4: Log the message being processed

    try {
      await handleMessage(message); // Process the message
    } catch (error) {
      console.error("Error processing message:", error);
    }

    setMessageQueue((prevQueue) => prevQueue.slice(1)); // Remove the processed message from the queue
    setIsProcessing(false); // Unlock processing
  };

  // Handle the logic for processing a single WebSocket message
  const handleMessage = async (winner: LotteryWinnerDataSimplified) => {
    console.log("⬇️ Updating Top and Bottom Text:", winner); // Debug Log 5: Log winner data before setting states
    setIsConfettiActive(false);
    setTopText(`${winner.winner_no}-nji ýeňiji saýlanýar`);
    setBottomText("...");
    setWinnerSelectingStatus("is-selecting");
    setPendingWinner(winner);
    setCurrentNumber(winner.ticket);

    // Wait for the animation duration
    await new Promise((resolve) => setTimeout(resolve, SLOT_COUNTER_DURATION));

    // Finalize winner selection
    setTopText(`${winner.winner_no}-nji ýeňiji`);
    setBottomText(winner.phone);
    console.log("⬇️ Finalized Bottom Text:", winner.phone); // Debug Log 6: Log the final bottomText update

    setWinnerSelectingStatus("selected");
    setIsConfettiActive(true);

    // Add the winner to the list
    setWinners((prevWinners) => [...prevWinners, winner]);
    // Wait for the animation duration
    await new Promise((resolve) => setTimeout(resolve, 5000));
  };

  return (
    <section>
      {wsStatus === "error" && (
        <div className="text-red-500 text-center mb-2">
          Websocket connection error.
        </div>
      )}
      <Confetti showConfetti={isConfettiActive} numberOfPieces={300} />

      {/* Simmulation Button */}
      {/* <div className="w-full flex justify-center py-4">
        <button
          onClick={simulateMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Simulate Message
        </button>
      </div> */}

      <div className="container">
        <div
          className="flex flex-col items-center rounded-[32px] gap-[40px]"
          style={{
            background: "linear-gradient(180deg, #F0ECF4 0%, #E1E0FF 43.5%)",
          }}
        >
          <AnimatePresence>
            <div className="flex items-center justify-center w-full sm:min-h-[240px] pt-6">
              {winnerSelectingStatus === "not-selected" ? (
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
                  className="flex flex-col items-center justify-center"
                >
                  <AnimatedText
                    key={topText}
                    text={topText}
                    className="text-center sm:text-[56px] text-[24px] w-full leading-[120%] text-[#E65E19]"
                    duration={0.4}
                  />
                  {bottomText && (
                    <AnimatedText
                      key={bottomText}
                      text={bottomText}
                      className="text-center sm:text-[80px] text-[32px] leading-[120%] text-[#E65E19]"
                      duration={0.4}
                    />
                  )}
                </motion.div>
              )}
            </div>
          </AnimatePresence>

          <div className="z-10">
            {currentNumber && (
              <LotterySlotCounter numberString={currentNumber} />
            )}
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
