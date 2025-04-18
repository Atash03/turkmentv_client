"use client";

import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

interface IProps {
  setWinners: Dispatch<SetStateAction<number[]>>;
}

const SpinWheel = ({ setWinners }: IProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [rotation, setRotation] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const { width, height } = useWindowSize();

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setCountdown(5); // Reset countdown after confetti
    }, 6000); // Hide confetti after 6 seconds
  };

  const startCountdown = () => {
    setIsCountingDown(true); // Start countdown state
    let currentCountdown = 5;
    const countdownInterval = setInterval(() => {
      setCountdown(currentCountdown--); // Update countdown
      if (currentCountdown < 0) {
        clearInterval(countdownInterval); // Clear countdown interval
        setIsCountingDown(false); // End countdown
        spinWheel(); // Trigger spin after countdown
      }
    }, 1000);
  };

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true); // Start spinning
    const totalSpin = rotation + 360 * 10 + Math.random() * 360; // 10 full rotations + random offset
    setRotation(totalSpin); // Update rotation to a new value

    setTimeout(() => {
      setIsSpinning(false);
      setRotation((prev) => prev % 360); // Normalize the rotation
      setWinners((prev) => [...prev, 1]);
      triggerConfetti(); // Show confetti after spinning
    }, 5000); // Spin duration
  };

  const handleSpinClick = () => {
    if (!isSpinning && !isCountingDown) {
      startCountdown(); // Start the countdown first
    }
  };

  return (
    <div className="flex flex-col items-center">
      {showConfetti && (
        <div className="fixed top-0 left-0 z-50">
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={1000}
            tweenDuration={10000}
            run={true}
            colors={[
              "linear-gradient(45deg, #5D5D72, #8589DE)",
              "linear-gradient(45deg, #E1E0FF, #575992)",
              "#8589DE",
              "#575992",
              "#E1E0FF",
              "#BA1A1A",
            ]}
          />
        </div>
      )}
      <div className="relative rounded-full md:max-w-[554px] md:max-h-[554px] w-[276px] h-[276px] md:w-full md:h-full">
        {/* Wheel triangle */}
        <Image
          src={"/wheel-triangle.svg"}
          alt="wheel"
          height={34}
          width={35}
          className="absolute z-10 left-[50%] -translate-x-[50%] lg:top-7 top-[17px] md:w-[34px] md:h-[34px] w-[17px] h-[17px]"
        />

        {/* Wheel */}
        <div
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? "transform 5s ease-out" : "",
          }}
          className="lg:p-3 p-2 bg-[#5D5D72] rounded-full overflow-hidden"
        >
          <div className="lg:p-[15px] p-[10px] bg-[#8589DE] rounded-full ">
            <Image
              src={"/wheel-circle-inner.png"}
              alt="wheel"
              height={530}
              width={530}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Countdown */}
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] lg:w-[105px] lg:h-[105px] md:h-[75px] md:w-[75px] w-[50px] h-[50px] rounded-full z-10 bg-white flex items-center justify-center ">
          <span className="text-[#79536A] font-roboto lg:text-[60px] md:text-[45px] text-[28px]  leading-[70px] tracking-[-1%]">
            {countdown}
          </span>
        </div>
      </div>

      {/* Spin Button */}
      <button
        onClick={handleSpinClick}
        disabled={isSpinning || isCountingDown}
        className={`mt-6 px-6 py-3 rounded-full text-white font-bold ${
          isSpinning || isCountingDown
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-700"
        }`}
      >
        {isCountingDown
          ? `Starting in ${countdown}...`
          : isSpinning
          ? "Spinning..."
          : "Spin the Wheel"}
      </button>
    </div>
  );
};

export default SpinWheel;
