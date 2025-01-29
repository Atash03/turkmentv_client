"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLotteryAuth } from "@/store/useLotteryAuth";
import { Queries } from "@/api/queries";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { setAuth } = useLotteryAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // ✅ Check credentials from localStorage
      const phone = localStorage.getItem("lotteryPhone");
      const code = localStorage.getItem("lotteryCode");

      if (phone && code) {
        try {
          // ✅ Authenticate using stored credentials
          const response = await Queries.authenticateLottery(phone, code);

          if (response.errorMessage) {
            // If authentication fails, redirect to the auth page
            console.log("redirecting form protected route");
            router.replace("/lottery/auth");
          } else {
            // ✅ Set the authenticated state
            setAuth(response, phone, code);
            setIsLoading(false);
          }
        } catch (err) {
          console.error("Authentication failed:", err);
          router.replace("/lottery/auth");
        }
      } else {
        // Redirect to the auth page if no credentials are found
        router.replace("/lottery/auth");
      }
    };

    checkAuth();
  }, [router, setAuth]);

  // Show nothing while checking auth
  if (isLoading) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
