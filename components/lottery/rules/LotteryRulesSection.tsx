"use client";
import { useWebsocketLottery } from "@/hooks/useWebSocketLottery";
import clsx from "clsx";
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
          <div
            className={clsx(
              "grid gap-6",
              show ? "md:grid-cols-3" : "md:grid-cols-2"
            )}
          >
            <div className="flex flex-col">
              <h2 className="md:font-heading-1-regular text-[22px] sm:leading-[40px] leading-[34px]">
                Düzgünleri:
              </h2>
              <div className="flex flex-1 flex-col  bg-lightSurfaceContainer sm:py-4 md:px-8 sm:px-6 py-3 px-4 rounded-[12px] w-full">
                <ul className="list-disc flex flex-col md:gap-4 gap-2 pl-[16px]">
                  {data?.data.rules?.map((item: any, i: number) => (
                    <li className="font-small-regular" key={i}>
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col">
              <h1 className="md:font-heading-1-regular text-[22px] sm:leading-[40px] leading-[34px]">
                Gatnaşyjylaryň sany:
              </h1>
              <div className="bg-lightSurfaceContainer flex flex-1 items-center justify-center gap-4 px-4 py-[12px] rounded-[12px]">
                <p
                  className={clsx(
                    data?.data.rules?.length > 3
                      ? "text-[28px] sm:text-[56px] md:text-[80px]"
                      : "text-[24px]"
                  )}
                >
                  {totalParticipants}
                </p>
              </div>
            </div>

            {show && (
              <div className="flex flex-col">
                <h3 className="md:font-heading-1-regular text-[22px] sm:leading-[40px] leading-[34px]">
                  Siziň bijeli sanyňyz:
                </h3>
                <ul className="flex flex-col flex-1 md:gap-4 gap-2 bg-lightSurfaceContainer sm:py-4 md:px-8 sm:px-6 py-3 px-4 rounded-[12px] w-full">
                  {data?.user_lottery_numbers.map((item: any, i: number) => (
                    <li
                      className="text-[24px] text-[#46464F] list-none"
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
      </div>
    </section>
  );
};

export default LotteryRulesSection;
