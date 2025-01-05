import { useState, useEffect, useRef } from "react";
import { useLotteryAuth } from "@/store/useLotteryAuth";
import { LotteryWinnerDataSimplified } from "@/typings/lottery/lottery.types";
import LotteryWinnersList from "./winners/LotteryWinnersList";
import LotterySlotCounter from "./slotCounter/LotterySlotCounter";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";
import AnimatedText from "@/components/common/AnimatedText";
import { useWebsocketLottery } from "@/hooks/useWebSocketLottery";

const WEBSOCKET_URL = "wss://sms.turkmentv.gov.tm/ws/lottery?dst=0506";
const SLOT_COUNTER_DURATION = 20000;
const RECONNECT_INTERVAL = 5000;

const LotteryWinnersSection = ({
  lotteryStatus,
}: {
  lotteryStatus: string;
}) => {
  // UI States
  const [winners, setWinners] = useState<LotteryWinnerDataSimplified[]>([]);
  const [currentNumber, setCurrentNumber] = useState<string>();
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  const { width, height } = useWindowSize();
  const { lotteryData } = useLotteryAuth();
  const [winnerSelectingStatus, setWinnerSelectingStatus] = useState<
    "not-selected" | "is-selecting" | "selected"
  >("not-selected");
  const [pendingWinner, setPendingWinner] =
    useState<LotteryWinnerDataSimplified | null>(null);
  const [displayText, setDisplayText] = useState<string>("...");
  const [winnerText, setWinnerText] = useState<string>("");

  // WebSocket Hook
  const { wsStatus } = useWebsocketLottery(WEBSOCKET_URL);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (lotteryData?.data.winners) {
      const simplifiedWinners = lotteryData.data.winners.map((winner) => ({
        client: winner.client,
        winner_no: winner.winner_no,
        ticket: winner.ticket,
      }));
      setWinners(simplifiedWinners);
      setCurrentNumber(
        lotteryData.data.winners.at(-1)?.ticket || "00-00-00-00-00"
      );
    }
  }, [lotteryData]);

  useEffect(() => {
    const handleWebSocketMessage = async (event: MessageEvent) => {
      if (!event?.data) return;

      console.log("📩 Message received:", event.data);

      const newWinner = JSON.parse(event.data);
      if (
        !newWinner ||
        !newWinner.phone ||
        !newWinner.winner_no ||
        !newWinner.ticket
      ) {
        console.error("❌ Invalid data format received");
        return;
      }

      console.log("🎉 New winner selected:", newWinner);

      const winnerData = {
        client: newWinner.phone,
        winner_no: newWinner.winner_no,
        ticket: newWinner.ticket,
      };

      setDisplayText(`${winnerData.winner_no}-nji ýeňiji saýlanýar`);
      setWinnerSelectingStatus("is-selecting");
      setPendingWinner(winnerData);
      setCurrentNumber(winnerData.ticket);

      await new Promise((resolve) =>
        setTimeout(resolve, SLOT_COUNTER_DURATION)
      );

      setDisplayText("The winner is");
      setWinnerText(winnerData.client);
      setWinnerSelectingStatus("selected");
      setIsConfettiActive(true);

      setWinners((prev) => [...prev, winnerData]);

      setTimeout(() => {
        setIsConfettiActive(false);
        setWinnerSelectingStatus("not-selected");
        setPendingWinner(null);
        setDisplayText("...");
        setWinnerText("");
      }, 10000);
    };

    if (wsStatus === "connected" && !wsRef.current) {
      console.log("✅ WebSocket connected");
      wsRef.current = new WebSocket(WEBSOCKET_URL);
      wsRef.current.addEventListener("message", handleWebSocketMessage);

      wsRef.current.addEventListener("error", (error) => {
        console.error("❌ WebSocket error:", error);
      });

      wsRef.current.addEventListener("close", (event) => {
        console.log("❌ WebSocket closed:", event);
      });

      // Set up ping to keep connection alive
      const pingInterval = setInterval(() => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          console.log("📤 Sending ping");
          wsRef.current.send(JSON.stringify({ type: "ping" }));
        }
      }, RECONNECT_INTERVAL);

      // Cleanup on unmount
      return () => {
        console.log("🔌 Cleaning up WebSocket connection");
        if (wsRef.current) {
          wsRef.current.close();
          wsRef.current = null;
        }
        clearInterval(pingInterval);
      };
    } else if (wsStatus === "connecting") {
      console.log("🔄 WebSocket connecting...");
    } else if (wsStatus === "error") {
      console.log("❗ WebSocket error detected");
    }
  }, [wsStatus]);

  return (
    <section>
      {wsStatus === "error" && (
        <div className="text-red-500 text-center mb-2">
          Websocket connection error.
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
          />
        </div>
      )}
      <div className="container">
        <div
          className="flex flex-col items-center rounded-[32px] gap-[40px]"
          style={{
            background: "linear-gradient(180deg, #F0ECF4 0%, #E1E0FF 43.5%)",
          }}
        >
          <div className="flex items-center justify-center w-full min-h-[240px]">
            {winnerSelectingStatus === "not-selected" ||
            winnerSelectingStatus === "is-selecting" ? (
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
            {currentNumber && (
              <LotterySlotCounter
                numberString={currentNumber}
                isAnimating={false}
              />
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
