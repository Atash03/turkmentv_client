"use client";

import LotteryAuthForm from "@/components/lottery/auth/LotteryAuthForm";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLotteryAuth } from "@/store/useLotteryAuth";

const LotteryAuthPage = () => {
  const router = useRouter();
  const { isAuthenticated, logout } = useLotteryAuth();

  useEffect(() => {
    console.log("Auth page - Authentication state:", isAuthenticated);
    if (isAuthenticated) {
      console.log("Auth page - Redirecting to lottery...");
      router.push("/lottery");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className="container">
      <div className="flex justify-center items-center min-h-[50vh] py-[200px]">
        <LotteryAuthForm />
      </div>
    </div>
  );
};

export default LotteryAuthPage;
