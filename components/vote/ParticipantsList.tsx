"use client";
import React, { useContext, useEffect, useState } from "react";
import GradientTitle from "./GradientTitle";
import ParticipantCard from "./ParticipantCard";
import { v4 } from "uuid";
import { IAllVotes, VotingItem } from "@/models/allVotes.model";
import { Queries } from "@/api/queries";
import Loader from "../Loader";
import VoteContext from "@/context/VoteContext";
import PageBage from "./PageBage";
import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";
import Countdown from "./Countdown";
import Link from "next/link";
import Confetti from "../common/Confetti";
import { useRouter, useSearchParams } from "next/navigation";

interface IParams {
  vote_id?: string;
  all?: boolean;
}

interface ISocketMessage {
  voting_id: number;
  voting_item_id: number;
  client_id: number;
  message: string;
  date: string;
}

const ParticipantsList = ({ vote_id, all }: IParams) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState<IAllVotes>();
  const [participantsData, setParticipantsData] = useState<VotingItem[]>([]);
  const [voteStatus, setVoteStatus] = useState<string>();
  const [eventStatus, setEventStatus] = useState<string>("Not started");
  const [manualClose, setManualClose] = useState(false); // Track manual closure

  const [winnersCount, setWinnersCount] = useState<number>(0);

  // States realted to web socket
  const [smsNumber, setSmsNumber] = useState<string | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const mobile = useMediaQuery("(max-width: 768px)");

  const { setVoteDescription } = useContext(VoteContext).voteDescriptionContext;

  useEffect(() => {
    const id = searchParams.get("d");
    if (id) {
      Queries.getVoteByUUID(id).then((res) => {
        setData(res);
        setParticipantsData(res.data.voting_items);
        setVoteDescription(res.data.description);
        setVoteStatus(res.data.status);
        setSmsNumber(res.data.sms_number);
      });
    } else if (vote_id) {
      Queries.getVote(vote_id).then((res) => {
        setData(res);
        setParticipantsData(res.data.voting_items);
        setVoteDescription(res.data.description);
        setVoteStatus(res.data.status);
        setSmsNumber(res.data.sms_number);
      });
    } else if (all) {
      Queries.getAllVotes().then((res) => {
        setData(res);
        setParticipantsData([...res.data.voting_items]);
        setVoteDescription(res.data.description);
        setVoteStatus(res.data.status);
        setSmsNumber(res.data.sms_number);
      });
    } else {
      router.push("/vote/active");
    }

    if (participantsData) {
      winnersCountHandle(participantsData);
    }
  }, []);

  useEffect(() => {
    let socket: WebSocket | null = null;
    let reconnectTimeout: NodeJS.Timeout | null = null;
    let pingInterval: NodeJS.Timeout | null = null;

    const connectWebSocket = () => {
      try {
        // Only connect if manualClose is false
        if (!manualClose) {
          socket = new WebSocket(
            `wss://sms.turkmentv.gov.tm/ws/voting?dst=${smsNumber}`
          );
          setSocket(socket);

          socket.onopen = () => {
            console.log("WebSocket is connected");
            setIsConnected(true);

            pingInterval = setInterval(() => {
              if (socket?.readyState === WebSocket.OPEN) {
                try {
                  socket.send(JSON.stringify({ type: "ping" }));
                } catch (error) {
                  console.error("Error sending ping:", error);
                }
              }
            }, 25000); // Ping every 25 seconds
          };

          socket.onmessage = (event) => {
            try {
              const message = JSON.parse(event.data);
              handleWebSocketMessage(message);
            } catch (error) {
              console.error("Error processing message:", error);
            }
          };

          socket.onerror = (error) => {
            console.error("WebSocket error:", error);

            if (!manualClose && !reconnectTimeout) {
              reconnectTimeout = setTimeout(() => {
                console.log("Attempting to reconnect WebSocket after error...");
                connectWebSocket();
              }, 5000); // Reconnect after 5 seconds
            }
          };

          socket.onclose = () => {
            console.log("WebSocket is closed");
            setIsConnected(false);

            if (pingInterval) {
              clearInterval(pingInterval);
            }

            // Clean up resources on close
            if (reconnectTimeout) {
              clearTimeout(reconnectTimeout);
            }
          };
        }
      } catch (error) {
        console.error("WebSocket connection error:", error);
      }
    };

    // WebSocket connection only if eventStatus is 'Started'
    if (smsNumber && eventStatus === "Started" && !manualClose) {
      connectWebSocket();
    }

    return () => {
      if (socket) {
        setManualClose(true); // Mark it as a manual close
        socket.close();
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
      if (pingInterval) {
        clearInterval(pingInterval);
      }
    };
  }, [smsNumber, eventStatus, manualClose]); // Add manualClose to dependencies

  const handleWebSocketMessage = (message: ISocketMessage) => {
    setParticipantsData((prevVotingItems) => {
      if (!prevVotingItems) return [];

      // Update the corresponding voting item
      const updatedItems = prevVotingItems.map((item, index) =>
        item.id === message.voting_item_id
          ? { ...item, votes_count: item.votes_count + 1 }
          : item
      );

      // Sort the updated items array by votes_count in descending order
      return updatedItems.sort((a, b) => b.votes_count - a.votes_count);
    });
  };

  const addVotes = () => {
    setParticipantsData((prevVotingItems) => {
      if (!prevVotingItems) return [];

      // Update the corresponding voting item
      const updatedItems = prevVotingItems.map((item, index) =>
        index === 1 ? { ...item, votes_count: item.votes_count + 1 } : item
      );

      console.log("votes updated");
      console.log(updatedItems.sort((a, b) => b.votes_count - a.votes_count));
      // Sort the updated items array by votes_count in descending order
      return updatedItems.sort((a, b) => b.votes_count - a.votes_count);
    });
  };

  const winnersCountHandle = (winners: VotingItem[]) => {
    let count = 0;
    winners.map((winner) => {
      if (
        winner.votes_percents === 100 &&
        winner.votes_count === winners[0].votes_count
      ) {
        count++;
        setWinnersCount(count);
      }
    });
    return count;
  };

  const hasVotes = participantsData.some((item) => item.votes_count > 0);

  if (data) {
    if (!data?.data) {
      return (
        <div className="py-12">
          <GradientTitle title={"No voting to show on the site"} size="big" />
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-[20px] sm:gap-[40px] w-full items-center">
        {data.data.description ? (
          <PageBage title={data.data.description} />
        ) : null}

        {eventStatus === "Finished" && <Confetti />}

        {data.data.banner ? (
          <div className="relative w-full md:min-h-[150px] md:h-auto h-[100px] ">
            {mobile ? (
              <Image
                fill
                src={
                  data.data.banner_mobile !== null
                    ? data.data.banner_mobile
                    : data.data.banner
                }
                alt={data.data.title}
                unselectable="off"
                unoptimized
                className="rounded-[40px]"
              />
            ) : (
              <Image
                fill
                src={data.data.banner}
                alt={data.data.title}
                unselectable="off"
                unoptimized
                className="rounded-[40px]"
              />
            )}
          </div>
        ) : null}

        <div className="flex flex-col gap-[10px] sm:gap-[20px] w-full items-center">
          {/* {data.data.title ? <GradientTitle title={data.data.title} size="big" /> : null} */}

          {data.data.ends_at && data.data.starts_at ? (
            <Countdown
              endsAt={data.data.ends_at}
              startsAt={data.data.starts_at}
              setVoteStatus={setVoteStatus}
              setEventStatus={setEventStatus}
              eventStatus={eventStatus}
            />
          ) : null}

          <div className="flex w-full flex-col items-center gap-[10px] sm:gap-[20px]">
            {winnersCount > 1 ? (
              <GradientTitle title="победители" size="small" />
            ) : null}

            {participantsData && participantsData[0].votes_count > 0 ? (
              <div className="flex flex-col items-center overflow-hidden bg-fillNavyBlue rounded-[10px] sm:rounded-[30px] max-w-[940px] w-full px-[5px] py-[20px] sm:p-[20px] sm:gap-[20px] gap-[10px]">
                {participantsData.map((participant, index) =>
                  participant.votes_count ===
                  participantsData[0].votes_count ? (
                    participant.url ? (
                      <Link
                        href={participant.url ? participant.url : ""}
                        target="_blank"
                        className="w-full"
                        key={v4()}
                      >
                        <ParticipantCard
                          index={index}
                          hasUrl={true}
                          voteStatus={voteStatus ? voteStatus : ""}
                          isFirst={index === 0 ? true : false}
                          name={participant.title}
                          progress={participant.votes_percents}
                          votes={participant.votes_count}
                          voteCode={participant.vote_code}
                          number={index + 1}
                          photo={participant.photo}
                          smsNumber={data.data.sms_number}
                          winner={true}
                        />
                      </Link>
                    ) : (
                      <ParticipantCard
                        key={v4()}
                        index={index}
                        hasUrl={false}
                        voteStatus={voteStatus ? voteStatus : ""}
                        isFirst={index === 0 ? true : false}
                        name={participant.title}
                        progress={participant.votes_percents}
                        votes={participant.votes_count}
                        voteCode={participant.vote_code}
                        number={index + 1}
                        photo={participant.photo}
                        smsNumber={data.data.sms_number}
                        winner={true}
                      />
                    )
                  ) : null
                )}
              </div>
            ) : null}

            {winnersCount > 1 ? (
              <div className="w-full h-[1px] bg-[#3636A3]"></div>
            ) : null}
          </div>

          <div className="flex flex-col items-center max-w-[940px] w-full gap-5 justify-center mx-auto">
            {participantsData
              ? participantsData.map((participant, index) =>
                  !hasVotes ? (
                    participant.url ? (
                      <Link
                        href={participant.url ? participant.url : ""}
                        target="_blank"
                        className="w-full mx-auto"
                        key={v4()}
                      >
                        <ParticipantCard
                          index={index}
                          hasUrl={true}
                          voteStatus={voteStatus ? voteStatus : ""}
                          isFirst={index === 0 ? true : false}
                          name={participant.title}
                          progress={participant.votes_percents}
                          votes={participant.votes_count}
                          voteCode={participant.vote_code}
                          number={index + 1}
                          photo={participant.photo}
                          smsNumber={data.data.sms_number}
                          winner={false}
                        />
                      </Link>
                    ) : (
                      <ParticipantCard
                        hasUrl={false}
                        key={v4()}
                        index={index}
                        voteStatus={voteStatus ? voteStatus : ""}
                        isFirst={index === 0 ? true : false}
                        name={participant.title}
                        progress={participant.votes_percents}
                        votes={participant.votes_count}
                        voteCode={participant.vote_code}
                        number={index + 1}
                        photo={participant.photo}
                        smsNumber={data.data.sms_number}
                        winner={false}
                      />
                    )
                  ) : (
                    participant.votes_count !==
                      participantsData[0].votes_count &&
                    (participant.url ? (
                      <Link
                        href={participant.url ? participant.url : ""}
                        target="_blank"
                        className="w-full mx-auto"
                        key={v4()}
                      >
                        <ParticipantCard
                          index={index}
                          hasUrl={true}
                          voteStatus={voteStatus ? voteStatus : ""}
                          isFirst={index === 0 ? true : false}
                          name={participant.title}
                          progress={participant.votes_percents}
                          votes={participant.votes_count}
                          voteCode={participant.vote_code}
                          number={index + 1}
                          photo={participant.photo}
                          smsNumber={data.data.sms_number}
                          winner={false}
                        />
                      </Link>
                    ) : (
                      <ParticipantCard
                        hasUrl={false}
                        key={v4()}
                        index={index}
                        voteStatus={voteStatus ? voteStatus : ""}
                        isFirst={index === 0 ? true : false}
                        name={participant.title}
                        progress={participant.votes_percents}
                        votes={participant.votes_count}
                        voteCode={participant.vote_code}
                        number={index + 1}
                        photo={participant.photo}
                        smsNumber={data.data.sms_number}
                        winner={false}
                      />
                    ))
                  )
                )
              : null}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <main className="h-full py-[100px]">
        <div className="container">
          <Loader />
        </div>
      </main>
    );
  }
};

export default ParticipantsList;
