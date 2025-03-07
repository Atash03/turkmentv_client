"use client";
import { getNextQuizNetijeData, getQuizNetijeData } from "@/api/queries";
import { Datum } from "@/models/quizQuestionsWinners.model";
import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";

const padding = "py-4";

const QuizTapgyrResults = ({ id, steps }: { id: string; steps: string[] }) => {
  const [data, setData] = useState<Datum[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [nextPageQueries, setQueries] = useState<{
    limit: number;
    offset: number;
  }>({
    limit: 0,
    offset: 0,
  });

  async function getData(next?: boolean) {
    if (next) {
      const res = await getNextQuizNetijeData(
        id,
        nextPageQueries.limit,
        nextPageQueries.offset
      );
      if (res) {
        setQueries({
          limit: res.per_page,
          offset: nextPageQueries.offset + res.per_page,
        });
        setData([...data, ...res.data]);
      }
    } else {
      setLoading(true);
      const res = await getQuizNetijeData(id);
      if (res) {
        setTotal(res.total);
        setQueries({
          limit: res.per_page,
          offset: res.per_page,
        });
        setData(res.data);
        setLoading(false);
      } else {
        notFound();
      }
    }
  }

  //   const handleSearchSubmit = async (event: any) => {
  //     if (event.key === "Enter") {
  //       event.preventDefault();
  //       try {
  //         setLoading(true);
  //         const response = await fetch(
  //           `https://sms.turkmentv.gov.tm/api/quiz/${id}/search`,
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({ phone, tapgyr: 1 }),
  //           }
  //         );

  //         // Handle the response as needed
  //         const data = await response.json();
  //         setLoading(false);
  //         // setData(data);
  //         console.log(data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   };

  useEffect(() => {
    getData();
  }, []);

  return (
    <article className="flex flex-col gap-[24px]">
      <header className="flex justify-center">
        <h1 className="text-[28px] text-[#1B1B21] md:text-[36px]">Netijeler</h1>
        {/* <div className="flex items-center gap-[14px] lg:col-span-2 relative">
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
        </div> */}
      </header>
      {data.length > 0 && !loading ? (
        // Table Head
        <div className="flex flex-col bg-[#F6F2FA] rounded-[12px] overflow-hidden">
          <div className="flex justify-between bg-[#EAE7EF] p-[20px]">
            {data[0].client?.id && (
              <span className={`${padding} max-w-[20px] w-full text-center`}>
                Ýeri
              </span>
            )}
            {data[0].client?.phone && (
              <span className={`${padding} max-w-[150px] w-full text-center`}>
                Telefon beligisi
              </span>
            )}
            {data[0].tapgyr_breakdown &&
              steps.map((item) => (
                <span
                  key={item}
                  className={`hidden md:inline-block min-w-[60px] max-w-[150px] w-full text-center ${padding}`}
                >
                  Tapgyr {item}
                </span>
              ))}
            {data[0].correct_answers_time && (
              <span
                className={`${padding} min-w-[50px] text-center md:min-w-[115px] max-w-[150px] w-full flex justify-center`}
              >
                Nobatlaryň jemi
              </span>
            )}
            {data[0].total_score_of_client && (
              <span
                className={`${padding} min-w-[50px] text-center md:min-w-[115px] max-w-[150px] w-full flex justify-center`}
              >
                Utuklaryň jemi
              </span>
            )}
          </div>
          {/* Table body */}
          <div className=" text-[#46464F]">
            {data.map((winner, id) => (
              <React.Fragment key={id}>
                <div
                  key={id}
                  className={`${
                    id !== data.length - 1 && "md:border-b md:border-[#C7C5D0]"
                  } flex justify-between px-[20px]`}
                >
                  <span
                    className={`${padding} max-w-[20px] w-full text-center`}
                  >
                    {id > 0 &&
                    winner.correct_answers_time ===
                      data[id - 1].correct_answers_time
                      ? id
                      : id + 1}
                  </span>
                  <div
                    className={`${padding} max-w-[150px] w-full text-center flex flex-col gap-[7px]`}
                  >
                    <span className="h-[36px]">
                      +{winner.client?.phone ? winner.client.phone : "-"}
                    </span>
                    {steps.map((step, i) => (
                      <span
                        key={i}
                        className="py-[5px] text-center col-span-2 md:hidden"
                      >
                        Tapgyr {step}
                      </span>
                    ))}
                  </div>
                  {steps.map((step, i) => {
                    const tapgyr = winner.tapgyr_breakdown?.find(
                      (i) => i.tapgyr === Number(step)
                    );
                    return (
                      <div
                        key={i}
                        className="min-w-[60px] max-w-[150px] w-full justify-center hidden md:flex"
                      >
                        <div className="flex justify-center items-center text-base text-textBlack leading-[125%]  max-w-[50px] w-[100%]">
                          <span className="border border-[#2C7CDA] text-[#2C7CDA] rounded-full w-[36px] h-[36px] flex justify-center items-center text-base leading-[125%] ">
                            {tapgyr ? tapgyr.tapgyr_correct_time : "-"}
                          </span>
                        </div>
                        <div className="flex justify-center items-center text-base text-textBlack leading-[125%]  max-w-[50px] w-[100%]">
                          <span className="bg-fillOrange rounded-full w-[36px] h-[36px] flex justify-center items-center text-base leading-[125%] text-white">
                            {tapgyr ? tapgyr.tapgyr_score : "-"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  <div
                    className={`min-w-[50px] md:min-w-[115px] max-w-[150px] w-full flex flex-col md:flex-row justify-center ${padding}`}
                  >
                    <div className="flex justify-center items-center text-base text-textBlack leading-[125%]  max-w-[180px] w-[100%]">
                      <span className="border border-[#2C7CDA] text-[#2C7CDA] rounded-full w-[36px] h-[36px] flex justify-center items-center text-base leading-[125%] ">
                        {winner.correct_answers_time
                          ? winner.correct_answers_time
                          : "-"}
                      </span>
                    </div>
                    {steps.map((step, i) => {
                      const tapgyr = winner.tapgyr_breakdown?.find(
                        (i) => i.tapgyr === Number(step)
                      );
                      return (
                        <div key={i} className="py-[5px] md:hidden">
                          <div className="flex justify-center items-center text-base text-textBlack leading-[125%]  max-w-[180px] w-[100%]">
                            <span className="border border-[#2C7CDA] text-[#2C7CDA] rounded-full w-[30px] h-[30px] flex justify-center items-center text-base leading-[125%] ">
                              {tapgyr ? tapgyr.tapgyr_correct_time : "-"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    className={`min-w-[50px] md:min-w-[115px] max-w-[150px] w-full flex flex-col md:flex-row justify-center ${padding}`}
                  >
                    <div className="flex justify-center items-center text-base text-textBlack leading-[125%]  max-w-[180px] w-[100%]">
                      <span className="bg-fillOrange rounded-full w-[36px] h-[36px] flex justify-center items-center text-base leading-[125%] text-white">
                        {winner.total_score_of_client
                          ? winner.total_score_of_client
                          : "-"}
                      </span>
                    </div>
                    {steps.map((step, i) => {
                      const tapgyr = winner.tapgyr_breakdown?.find(
                        (i) => i.tapgyr === Number(step)
                      );
                      return (
                        <div key={i} className="py-[5px] md:hidden">
                          <div className="flex justify-center items-center text-base text-textBlack leading-[125%]  max-w-[180px] w-[100%]">
                            <span className="bg-fillOrange rounded-full w-[30px] h-[30px] flex justify-center items-center text-base leading-[125%] text-white">
                              {tapgyr ? tapgyr.tapgyr_correct_time : "-"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* {steps.map((step, i) => {
                  const tapgyr = winner.tapgyr_breakdown?.find(
                    (i) => i.tapgyr === Number(step)
                  );
                  return (
                    <div
                      key={i}
                      className={`${
                        i === steps.length - 1 && "border-b border-[#C7C5D0]"
                      } md:border-none md:hidden grid grid-cols-4`}
                    >
                      <span className="py-[5px] text-center col-span-2">
                        Tapgyr {step}
                      </span>
                      <div className="py-[5px]">
                        <div className="flex justify-center items-center text-base text-textBlack leading-[125%]  max-w-[180px] w-[100%]">
                          <span className="border border-[#2C7CDA] text-[#2C7CDA] rounded-full w-[30px] h-[30px] flex justify-center items-center text-base leading-[125%] ">
                            {tapgyr ? tapgyr.tapgyr_correct_time : "-"}
                          </span>
                        </div>
                      </div>
                      <div className="py-[5px]">
                        <div className="flex justify-center items-center text-base text-textBlack leading-[125%]  max-w-[180px] w-[100%]">
                          <span className="bg-fillOrange rounded-full w-[30px] h-[30px] flex justify-center items-center text-base leading-[125%] text-white">
                            {tapgyr ? tapgyr.tapgyr_correct_time : "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })} */}
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : (
        <Loader />
      )}
      {data.length < total && (
        <button
          onClick={() => getData(true)}
          className="py-[5px] self-center px-[10px] md:w-fit rounded-md bg-blue-500 text-white border border-blue-500 lg:hover:bg-white lg:hover:text-blue-500 transition-all duration-300"
        >
          Dowamy
        </button>
      )}
    </article>
  );
};

export default QuizTapgyrResults;
