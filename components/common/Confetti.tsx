"use client";
import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useMediaQuery } from "usehooks-ts";

const Confetti = () => {
  const [recycle, setRecycle] = useState<boolean>(true);
  const { width, height } = useWindowSize();
  const colors = [
    "linear-gradient(45deg, #5D5D72, #8589DE)",
    "linear-gradient(45deg, #E1E0FF, #575992)",
    "#8589DE",
    "#575992",
    "#E1E0FF",
    "#FF3131",
  ];

  const mobile = useMediaQuery("(max-width: 426px)");

  useEffect(() => {
    setTimeout(() => setRecycle(false), 10000);
  }, [recycle]);

  return (
    <div className="fixed top-0 left-0 z-50">
      <ReactConfetti
        width={width}
        height={height}
        recycle={recycle}
        numberOfPieces={mobile ? 300 / 3 : 300}
        tweenDuration={500}
        colors={colors}
      />
    </div>
  );
};

export default Confetti;
