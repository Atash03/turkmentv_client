"use client";
import { useQuizResults, useResultsLoading } from "@/store/store";
import React, { useState } from "react";

const QuizResultsSearch = ({ id }: { id: string }) => {
  const [phone, setPhone] = useState<string>("");
  const { setError, setResultData } = useQuizResults();
  const { setLoading } = useResultsLoading();

  const handleSearchSubmit = async (event: any) => {
    if (event.key === "Enter" && phone.length === 8) {
      event.preventDefault();
      try {
        setLoading(true);
        const response = await fetch(
          `https://sms.turkmentv.gov.tm/api/quiz/${id}/search_netije`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone }),
          }
        );

        // Handle the response as needed
        const data = await response.json();
        setLoading(false);
        if (!data.error) {
          setResultData([data.data]);
        } else {
          setResultData([]);
          setError("Telefon belgisi tapylmady");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-col w-full items-center gap-4">
      <h1 className="text-[28px] leading-[120%] font-semibold text-textBlack text-center md:text-left">
        Öz jogaplaryňyzy görüň
      </h1>
      <div className="flex items-center gap-[14px] relative md:w-1/2">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-4"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.93853 0.608964C5.90914 0.206926 6.94943 0 8 0C9.05058 0 10.0909 0.206926 11.0615 0.608964C12.0321 1.011 12.914 1.60028 13.6569 2.34315C14.3997 3.08601 14.989 3.96793 15.391 4.93853C15.7931 5.90914 16 6.94943 16 8C16 9.05057 15.7931 10.0909 15.391 11.0615C15.1172 11.7226 14.7565 12.3425 14.3196 12.9054L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L12.9054 14.3196C12.3425 14.7565 11.7226 15.1172 11.0615 15.391C10.0909 15.7931 9.05057 16 8 16C6.94943 16 5.90914 15.7931 4.93853 15.391C3.96793 14.989 3.08601 14.3997 2.34315 13.6569C1.60028 12.914 1.011 12.0321 0.608964 11.0615C0.206926 10.0909 0 9.05058 0 8C0 6.94942 0.206926 5.90914 0.608964 4.93853C1.011 3.96793 1.60028 3.08601 2.34315 2.34315C3.08601 1.60028 3.96793 1.011 4.93853 0.608964ZM8 2C7.21207 2 6.43185 2.15519 5.7039 2.45672C4.97595 2.75825 4.31451 3.20021 3.75736 3.75736C3.20021 4.31451 2.75825 4.97595 2.45672 5.7039C2.15519 6.43185 2 7.21207 2 8C2 8.78793 2.15519 9.56815 2.45672 10.2961C2.75825 11.0241 3.20021 11.6855 3.75736 12.2426C4.31451 12.7998 4.97595 13.2417 5.7039 13.5433C6.43185 13.8448 7.21207 14 8 14C8.78793 14 9.56815 13.8448 10.2961 13.5433C11.0241 13.2417 11.6855 12.7998 12.2426 12.2426C12.7998 11.6855 13.2417 11.0241 13.5433 10.2961C13.8448 9.56815 14 8.78793 14 8C14 7.21207 13.8448 6.43185 13.5433 5.7039C13.2417 4.97595 12.7998 4.31451 12.2426 3.75736C11.6855 3.20021 11.0241 2.75825 10.2961 2.45672C9.56815 2.15519 8.78793 2 8 2Z"
            fill="#46464F"
          />
        </svg>
        <input
          type="tel"
          className="text-[#46464F] focus:outline-[#1B1B21] flex-1 bg-[#E4E1E9] rounded-[12px] py-4 pr-4 pl-12 w-full"
          placeholder="63879809"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onKeyDown={(e) => handleSearchSubmit(e)}
          maxLength={8}
          minLength={8}
        />
      </div>
    </div>
  );
};

export default QuizResultsSearch;
