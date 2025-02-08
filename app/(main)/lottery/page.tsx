import { authenticateLottery } from "@/api";
import Loader from "@/components/Loader";
import LotteryMain from "@/components/lottery/LotteryMain";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

const Page = async () => {
  return (
    <Suspense fallback={<Loader />}>
      <LotteryMain />
    </Suspense>
  );
};

export default Page;
