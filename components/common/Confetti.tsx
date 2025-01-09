'use client';

import { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { useMediaQuery } from 'usehooks-ts';

const Confetti = ({
  numberOfPieces = 200,
  showConfetti,
}: {
  numberOfPieces?: number;
  showConfetti: boolean;
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

  const mobile = useMediaQuery('(max-width: 426px)');

  return (
    <div className="fixed top-0 left-0 z-50">
      <ReactConfetti
        width={width}
        height={height}
        recycle={showConfetti}
        numberOfPieces={mobile ? numberOfPieces / 3 : numberOfPieces}
        tweenDuration={500}
        // run={true}
        colors={colors}
      />
    </div>
  );
};

export default Confetti;
