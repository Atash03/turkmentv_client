"use server";
import baseUrl from "@/baseUrl";
import routes from "@/routes";
import { cookies } from "next/headers";

export async function authenticateLottery(
  phone: string,
  code: string,
) {
  try {
    const res = await fetch(`${baseUrl.QUIZ_SRC}${routes.lotteryActive}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phone,
        key: code,
      }),
    });

    if (!res.ok) {
      console.log("Authentication failed");
      return undefined;
    }

    const result = await res.json();

    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}
