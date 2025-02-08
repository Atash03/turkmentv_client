"use client";
import { useLotteryStatus } from "@/store/store";
import React, { useEffect } from "react";
import LotteryWinnersSection from "./LotteryWinnersSection";
import { ILotteryResponse } from "@/models/lottery/lottery.model";

const LotteryWinners = ({
  data,
  lotteryStatus,
}: {
  data: ILotteryResponse;
  lotteryStatus: "Upcoming" | "Ongoing" | "Finished";
}) => {
  const { status, setStatus } = useLotteryStatus();

  useEffect(() => {
    setStatus(lotteryStatus);
  }, []);

  return (
    (status === "Finished" || status === "Ongoing") && (
      <LotteryWinnersSection data={data} />
    )
  );
};

export default LotteryWinners;
