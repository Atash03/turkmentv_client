'use client';

import Image from 'next/image';
// import React, { useRef, useState, useEffect } from "react";

// const SpinWheel: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [isSpinning, setIsSpinning] = useState<boolean>(false);
//   const [countdown, setCountdown] = useState<number>(5);

//   const totalSize = 554; // Total size including borders
//   const outerBorderWidth = 12; // Outer border width
//   const innerBorderWidth = 15; // Inner border width
//   const wheelSize = totalSize - outerBorderWidth - innerBorderWidth; // Inner wheel size

//   const drawWheel = (angleOffset: number = 0): void => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const radius = wheelSize / 2;

//     // Clear the canvas and set background color
//     ctx.fillStyle = "#FFF";
//     ctx.fillRect(0, 0, totalSize, totalSize);

//     // Draw the outermost border
//     ctx.beginPath();
//     ctx.arc(totalSize / 2, totalSize / 2, totalSize / 2, 0, 2 * Math.PI);
//     ctx.fillStyle = "#5D5D72"; // Outer border color
//     ctx.fill();
//     ctx.closePath();

//     // Draw the inner border
//     ctx.beginPath();
//     ctx.arc(
//       totalSize / 2,
//       totalSize / 2,
//       (totalSize - outerBorderWidth) / 2,
//       0,
//       2 * Math.PI
//     );
//     ctx.fillStyle = "#8589DE"; // Inner border color
//     ctx.fill();
//     ctx.closePath();

//     // Draw the wheel
//     const segmentAngle = (2 * Math.PI) / 24; // 24 segments
//     for (let i = 0; i < 24; i++) {
//       ctx.beginPath();
//       ctx.moveTo(totalSize / 2, totalSize / 2);
//       ctx.arc(
//         totalSize / 2,
//         totalSize / 2,
//         radius,
//         segmentAngle * i + angleOffset,
//         segmentAngle * (i + 1) + angleOffset
//       );
//       ctx.fillStyle = i % 2 === 0 ? "#E1E0FF" : "#575992"; // Alternate colors
//       ctx.fill();
//       ctx.stroke();
//       ctx.closePath();
//     }

//     // Draw central ellipse
//     ctx.beginPath();
//     ctx.ellipse(
//       totalSize / 2,
//       totalSize / 2,
//       105 / 2,
//       105 / 2,
//       0,
//       0,
//       2 * Math.PI
//     );
//     ctx.fillStyle = "#FFF";
//     ctx.fill();
//     ctx.stroke();

//     // Add countdown text in the ellipse
//     ctx.fillStyle = "#79536A"; // Text color
//     ctx.font = "60px Roboto";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     ctx.fillText(countdown.toString(), totalSize / 2, totalSize / 2);
//   };

//   const spinWheel = (): void => {
//     if (isSpinning) return;

//     setIsSpinning(true);
//     setCountdown(5); // Reset countdown

//     let currentAngle = 0;
//     const spinDuration = 5000; // Spin for 5 seconds
//     const spinStartTime = Date.now();

//     // Countdown Timer Logic
//     const countdownInterval = setInterval(() => {
//       setCountdown((prev) => {
//         if (prev === 0) {
//           clearInterval(countdownInterval);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     // Spinning Logic
//     const spin = () => {
//       const elapsedTime = Date.now() - spinStartTime;

//       if (elapsedTime >= spinDuration) {
//         setIsSpinning(false);
//         return;
//       }

//       // Update angle
//       const progress = elapsedTime / spinDuration;
//       const easedProgress = easeOutCubic(progress); // Easing for smooth deceleration
//       currentAngle = easedProgress * 10 * Math.PI; // Spin multiple times

//       drawWheel(currentAngle);
//       requestAnimationFrame(spin);
//     };

//     spin();
//   };

//   // Easing function for smooth deceleration
//   const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

//   // Initial draw
//   useEffect(() => {
//     drawWheel();
//   }, [countdown]);

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <canvas
//         ref={canvasRef}
//         width={totalSize}
//         height={totalSize}
//         className="rounded-full shadow-lg"
//       ></canvas>
//       <button
//         onClick={spinWheel}
//         disabled={isSpinning}
//         className={`mt-4 px-6 py-2 rounded-full text-white font-bold ${
//           isSpinning
//             ? "bg-gray-400 cursor-not-allowed"
//             : "bg-blue-500 hover:bg-blue-700"
//         }`}
//       >
//         {isSpinning ? "Spinning..." : "Spin the Wheel"}
//       </button>
//     </div>
//   );
// };

// export default SpinWheel;

import { useState } from 'react';

const SpinWheel: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [rotation, setRotation] = useState(0);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setCountdown(5); // Reset countdown
    const totalSpin = rotation + 360 * 10 + Math.random() * 360; // 10 full rotations + random offset
    setRotation(totalSpin); // Update rotation to a new value

    // Countdown logic
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 0) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Reset everything after the spin duration
    setTimeout(() => {
      setIsSpinning(false);
      setRotation((prev) => prev % 360); // Normalize the rotation
      setCountdown(5); // Reset countdown for the next spin
    }, 6000); // Spin duration
  };

  return (
    <div className="flex flex-col items-center">
      {/* Outer Border */}
      <div className="relative w-[554px] h-[554px] rounded-full border-[12px] border-[#5D5D72] flex items-center justify-center">
        {/* Inner Border */}
        <div
          className="relative w-[530px] h-[530px] rounded-full border-[15px] border-[#8589DE] overflow-hidden"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 5s ease-out' : '',
          }}>
          {/* Wheel Segments */}
          <div className="absolute inset-0 rounded-full bg-white w-[500px] h-[500px]">
            <Image
              src={'/wheel-circle.svg'}
              alt="wheel"
              height={500}
              width={500}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Countdown Display */}
        <div className="absolute w-[105px] h-[105px] rounded-full bg-white flex items-center justify-center shadow-[0px_1px_3px_1px_rgba(0,0,0,0.5),_0px_1px_2px_0px_rgba(0,0,0,0.3)]">
          <span className="text-[#79536A] font-roboto text-[60px] leading-[70px] tracking-[-1%]">
            {countdown}
          </span>
        </div>
      </div>

      {/* Spin Button */}
      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className={`mt-6 px-6 py-3 rounded-full text-white font-bold ${
          isSpinning ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
        }`}>
        {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
      </button>
    </div>
  );
};

export default SpinWheel;
