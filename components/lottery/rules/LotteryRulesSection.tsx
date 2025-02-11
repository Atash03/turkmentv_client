"use client";
import { useWebsocketLottery } from "@/hooks/useWebSocketLottery";
import { useEffect, useState } from "react";

interface IProps {
  show?: boolean;
  data?: any;
}

const WEBSOCKET_URL = "wss://sms.turkmentv.gov.tm/ws/lottery?dst=";

const LotteryRulesSection = ({ show = true, data }: IProps) => {
  const [messageQueue, setMessageQueue] = useState<any[]>([]); // Queue for incoming WebSocket messages
  const [isProcessing, setIsProcessing] = useState<boolean>(false); // Track if a message is being processed
  const { subscribeToMessages } = useWebsocketLottery(
    `${WEBSOCKET_URL}${data?.data.sms_number}`
  );
  const [totalParticipants, setTotalParticipants] = useState<number>(
    data ? data?.data?.bije_count : 0
  );

  // Subscribe to WebSocket messages
  useEffect(() => {
    const unsubscribe = subscribeToMessages((event) => {
      // Add new message to the queue
      setMessageQueue((prevQueue) => {
        return [...prevQueue, JSON.parse(event.data)];
      });
    });

    return () => unsubscribe();
  }, [subscribeToMessages]);

  // Process queue when a new message is added
  useEffect(() => {
    if (!isProcessing && messageQueue.length > 0) {
      processQueue();
    }
  }, [messageQueue, isProcessing]);

  // Process a single message from the queue
  const processQueue = async () => {
    if (isProcessing || messageQueue.length === 0) return;

    setIsProcessing(true); // Lock processing
    const message = messageQueue[0]; // Get the first message in the queue

    if (!message?.winner_no) {
      setTotalParticipants(totalParticipants + 1);
    }

    setMessageQueue((prevQueue) => prevQueue.slice(1)); // Remove the processed message from the queue
    setIsProcessing(false); // Unlock processing
  };

  return (
    <section>
      <div className="container">
        <div className="flex flex-col md:gap-8 gap-6">
          <h2 className="md:font-heading-1-regular sm:text-[32px] text-[26px] sm:leading-[40px] leading-[34px]">
            Düzgünleri:
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col  bg-lightSurfaceContainer sm:py-4 md:px-8 sm:px-6 py-3 px-4 rounded-[12px] w-full">
              <ul className="list-disc flex flex-col md:gap-4 gap-2 pl-[16px]">
                {data?.data.rules?.map((item: any, i: number) => (
                  <li className="font-small-regular" key={i}>
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-lightSurfaceContainer flex items-center gap-4 px-4 py-[12px] rounded-[12px]">
              <h1 className="md:font-heading-5-regular sm:text-[20px] text-[18px] sm:leading-[24px] leading-[28px]">
                Gatnaşyjylaryň sany:
              </h1>
              <p className="text-[24px]">{totalParticipants}</p>
            </div>
          </div>

          {show && (
            <div className="flex flex-col md:gap-4 sm:gap-2 gap-4 bg-lightSurfaceContainer sm:py-4 md:px-8 sm:px-6 py-3 px-4 rounded-[12px] w-full">
              <h3 className="md:font-heading-5-regular sm:text-[20px] text-[18px] sm:leading-[24px] leading-[28px]">
                Siziň bijeli sanynyz:
              </h3>
              <ul className="flex flex-col items-center md:gap-4 gap-2">
                {data?.user_lottery_numbers.map((item: any, i: number) => (
                  <li
                    className="text-[24px] text-[#46464F] md:text-[48px] lg:text-[80px] list-none"
                    key={i}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LotteryRulesSection;
