"use client";

import Image from "next/image";
import placeholder from "@/public/person placeholder.svg";
import clsx from "clsx";
import { motion, usePresence, Variant, Transition } from "framer-motion";
import RollingCounter from "react-slot-counter";

interface IProps {
  number: number;
  name: string | null;
  description: string | null;
  photo: string | null;
  votes: number;
  progress: number;
  voteCode: string;
  smsNumber: string;
  isFirst: boolean;
  voteStatus: string;
  winner: boolean;
  hasUrl: boolean;
  index: number;
}

const ParticipantCard = ({
  number,
  name,
  description,
  photo,
  votes,
  progress,
  voteCode,
  index,
  hasUrl,
  isFirst,
  voteStatus,
  winner,
}: IProps) => {
  const substractedProgress = progress > 99 ? progress - 2 : progress;

  const transition: Transition = {
    type: "spring",
    stiffness: 500,
    damping: 50,
    mass: 1,
    delay: index * 0.1,
  };

  const [isPresent, safeToRemove] = usePresence();

  const animations = {
    layout: true,
    initial: "out",
    style: {
      position: (isPresent ? "static" : "absolute") as "static" | "absolute", // Corrected cast
    },
    animate: isPresent ? "in" : "out",
    variants: {
      in: { scaleY: 1, opacity: 1 },
      out: { scaleY: 0, opacity: 0, zIndex: -1 },
      tapped: { scale: 0.98, opacity: 0.5, transition: { duration: 0.1 } },
    },
    onAnimationComplete: () => !isPresent && safeToRemove(),
    transition,
  };

  return winner && votes !== 0 ? (
    ////////////////////////////////////////////// Winner card
    <motion.div
      // {...animations}
      className="flex flex-col overflow-hidden bg-fillNavyBlue  max-w-[940px] w-full group"
    >
      <div className="flex items-center gap-[5px] sm:gap-[20px] p-[5px] pt-[10px] w-full">
        <h3 className="text-[26px] sm:text-[80px] leading-[100%] font-bold text-fillNavyBlue text-stroke">
          {number}
        </h3>
        {photo && name ? (
          // If there an image, show image
          <div className="relative min-w-[60px] rounded-[10px] h-[60px] sm:min-w-[140px] sm:h-[140px] overflow-hidden">
            <Image
              fill
              src={photo}
              alt={name}
              className={clsx(" object-cover", {
                "group-hover:scale-110 transition-all duration-300 ease-out":
                  hasUrl,
              })}
              unoptimized
              unselectable="off"
            />
          </div>
        ) : (
          // If there is no image, show placeholder
          <div className="relative overflow-hidden rounded-[10px] min-w-[60px] h-[60px] sm:min-w-[140px] sm:h-[140px]">
            <Image
              fill
              src={placeholder}
              alt={"placeholder"}
              className={clsx(" object-cover", {
                "group-hover:scale-110 transition-all duration-300 ease-out":
                  hasUrl,
              })}
              unoptimized
              unselectable="off"
            />
          </div>
        )}
        <div className="flex flex-col gap-[10px] sm:gap-[24px] w-full">
          <div className="flex justify-between items-center w-full">
            <div className="flex justify-between items-center sm:items-start w-full sm:w-fit sm:justify-start sm:flex-col gap-[14px]">
              {name ? (
                <h2
                  className={clsx(
                    "text-[18px] transition-all sm:text-[24px] leading-[100%] font-bold text-white",
                    {
                      // 'group-hover:text-[28px] transition-all duration-300 ease-out': hasUrl,
                    }
                  )}
                >
                  {name}
                </h2>
              ) : null}

              {description ? (
                <p
                  className={clsx(
                    "text-[14px] transition-all font-[400] text-[#B7B7D1]",
                    {
                      // 'group-hover:text-[28px] transition-all duration-300 ease-out': hasUrl,
                    }
                  )}
                >
                  {description}
                </p>
              ) : null}

              {/* If we have voteCode and voting not closed, then show badge with code. Else dont show */}
              {voteCode && voteStatus !== "closed" ? (
                // Desktop version
                <p className="hidden sm:block py-[10px] px-[8px] bg-[#1E1E7B] text-fillLightGray text-[14px] leading-[125%] max-w-[232px] rounded-[10px]">
                  Ses bermek üçin
                  <span className="inline-block w-fit px-1 py-[4px] mx-[4px] font-bold text-white text-[16px] border  rounded-md">
                    {voteCode}
                  </span>
                  ugrat
                </p>
              ) : null}
            </div>
            <div className="flex flex-col items-end gap-[8px]">
              <h4 className="text-[12px] sm:text-[48px] text-white leading-[100%] font-bold">
                {/* {votes ? votes : 0} */}
                <RollingCounter
                  value={votes ? votes : 0}
                  startValueOnce={true}
                  animateOnVisible={false}
                  autoAnimationStart={false}
                />
              </h4>
              <h4 className="text-[12px] sm:text-[24px] text-white leading-[100%] font-bold">
                ses
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* If we have voteCode and voting not closed, then show badge with code. Else dont show */}
      {voteCode && voteStatus !== "closed" ? (
        // Mobile version
        <p className="block sm:hidden py-[10px] px-[4px] font-medium bg-[#1E1E7B] rounded-md text-fillLightGray text-[10px] leading-[125%] ">
          Ses bermek üçin{" "}
          <span className="inline-block w-fit px-1 py-[4px] mx-[4px] font-bold text-white text-[16px] border  rounded-md">
            {voteCode}
          </span>{" "}
          ugrat
        </p>
      ) : null}
    </motion.div>
  ) : (
    ////////////////////////////////////////////// Simple card
    <motion.div
      className="flex flex-col max-w-[940px] items-center w-full gap-[5px] sm:gap-[20px] group"
      // {...animations}
    >
      <div className="flex items-center gap-[5px] sm:gap-[20px] max-w-[900px] w-full px-[5px] sm:p-0">
        <h3 className="w-[24px] text-[16px] sm:text-[20px] leading-[100%] font-bold">
          {number}
        </h3>
        {photo && name ? (
          <div className="relative min-w-[50px] rounded-[10px] overflow-hidden sm:min-w-[80px] h-[50px] sm:h-[80px]">
            <Image
              fill
              src={photo}
              alt={name}
              className={clsx(" object-cover", {
                "group-hover:scale-110 transition-all duration-300 ease-out":
                  hasUrl,
              })}
              unoptimized
              unselectable="off"
            />
          </div>
        ) : (
          <div className="relative min-w-[50px] sm:min-w-[80px] h-[50px] sm:h-[80px] rounded-[10px] overflow-hidden">
            <Image
              fill
              src={placeholder}
              alt={"placeholder"}
              className={clsx(" object-cover", {
                "group-hover:scale-110 transition-all duration-300 ease-out":
                  hasUrl,
              })}
              unoptimized
              unselectable="off"
            />
          </div>
        )}
        <div className="flex flex-col gap-[10px] sm:gap-[12px] w-full">
          <div className="flex justify-between items-center w-full">
            <div className="flex justify-between sm:justify-start  sm:flex-col gap-[8px]">
              {name ? (
                <h2
                  className={clsx(
                    "text-textBlack text-[16px] sm:text-[18px] leading-[100%] font-bold"
                  )}
                >
                  {name}
                </h2>
              ) : null}

              {description ? (
                <p
                  className={clsx(
                    "text-[14px] transition-all font-[400] text-[#4D4D4D]",
                    {
                      // 'group-hover:text-[28px] transition-all duration-300 ease-out': hasUrl,
                    }
                  )}
                >
                  {description}
                </p>
              ) : null}

              {/* If we have voteCode and voting not closed, then show badge with code. Else dont show */}
              {voteCode && voteStatus !== "closed" ? (
                // Desktop version
                <p className="hidden sm:block py-[5px] px-[8px] bg-[#EAEAFF] text-[#9393DA] text-[14px] leading-[125%] rounded-[10px] w-fit">
                  Ses bermek üçin
                  <span className="inline-block w-fit px-1 py-[2px] mx-[4px] font-bold leading-[100%] text-fillNavyBlue text-[16px] border border-fillNavyBlue rounded-md">
                    {voteCode}
                  </span>
                  ugrat
                </p>
              ) : null}
            </div>
            <div className="flex flex-col gap-[4px] items-end">
              <h4 className="text-[12px] sm:text-[32px] text-[#808080] font-bold leading-[100%] ">
                {/* {votes ? votes : 0} */}
                <RollingCounter
                  value={votes ? votes : 0}
                  startValueOnce={true}
                  animateOnVisible={false}
                  autoAnimationStart={false}
                />
              </h4>
              <h4 className="text-[12px] sm:text-[16px] text-[#808080] font-bold leading-[100%] ">
                ses
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* If we have voteCode and voting not closed, then show badge with code. Else dont show */}
      {voteCode && voteStatus !== "closed" ? (
        // Mobile version
        <p className="block sm:hidden text-[#9393DA] text-[10px] leading-[125%] w-full">
          Ses bermek üçin{" "}
          <span className="inline-block w-fit px-1 py-[4px] leading-[100%] mx-[4px] font-bold text-fillNavyBlue text-[16px] border border-fillNavyBlue  rounded-md">
            {voteCode}
          </span>{" "}
          ugrat
        </p>
      ) : null}
      <div className="w-full h-[1px] bg-[#EDEDFA]"></div>
    </motion.div>
  );
};

export default ParticipantCard;
