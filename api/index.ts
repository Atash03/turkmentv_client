"use server";
import baseUrl from "@/baseUrl";
import routes from "@/routes";
import { revalidateTag } from "next/cache";

export async function authenticateLottery(phone: string, code: string) {
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
      next: {
        revalidate: 300,
        tags: ["lotteryData"],
      },
    });

    if (!res.ok) {
      console.log("Authentication failed");
      return undefined;
    }

    const result = await res.json();

    console.log("Data fetched successfully " + res.status);
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export const revalidateTagName = async (tag: string) => {
  revalidateTag(tag);
};
