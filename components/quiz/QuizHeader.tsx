"use client";
import { Data } from "@/models/quizQuestions.model";
import Image from "next/image";
import React from "react";

const QuizHeader = ({ data }: { data: Data | undefined }) => {
  return (
    <header className="flex flex-col gap-[40px]">
      <article>
        <span className="text-[#46464F]">{data?.date}</span>
        <h1 className="text-[44px] font-[500] text-[#1B1B21] leading-10">
          <span className="md:hidden">Bäsleşik </span>
          <span className="hidden md:inline">"Bäsleşigiň" netijeleri</span>
        </h1>
        <p className="text-[#46464F] mt-[8px]">{data?.description}</p>
      </article>
      {(data?.banner || data?.banner_mobile) && (
        <>
          {data.banner_mobile && (
            <div className="w-full relative bg-[#E1E0FF] h-[100px] rounded-[8px] overflow-hidden md:hidden object-cover">
              <Image
                src={data.banner_mobile ? data.banner_mobile : data.banner}
                alt="banner"
                unselectable="off"
                className="object-cover"
                fill
              />
            </div>
          )}
          <div className="w-full h-[100px] hidden md:block bg-[#E1E0FF] rounded-[8px] relative overflow-hidden">
            <Image
              src={data.banner}
              alt="banner"
              unselectable="off"
              className="object-cover"
              fill
            />
          </div>
        </>
      )}
    </header>
  );
};

export default QuizHeader;
