'use client';

import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const Confetti = ({
  infinite = true,
  numberOfPieces = 200,
}: {
  infinite?: boolean;
  numberOfPieces?: number;
}) => {
  const { width, height } = useWindowSize();
  const colors = [
    'linear-gradient(45deg, #5D5D72, #8589DE)',
    'linear-gradient(45deg, #E1E0FF, #575992)',
    '#8589DE',
    '#575992',
    '#E1E0FF',
    '#FF3131',
  ];

  return (
    <div className="fixed top-0 left-0 z-50">
      <ReactConfetti
        width={width}
        height={height}
        recycle={infinite}
        numberOfPieces={numberOfPieces}
        tweenDuration={5000}
        run={true}
        colors={colors}
      />
    </div>
  );
};

export default Confetti;
