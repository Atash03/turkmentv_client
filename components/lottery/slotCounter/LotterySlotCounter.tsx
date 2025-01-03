'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import SlotCounter from 'react-slot-counter';
import { useMediaQuery } from 'usehooks-ts';

interface LotterySlotCounterProps {
  numberString: string;
  isAnimating: boolean;
}

const LotterySlotCounter = ({ numberString, isAnimating }: LotterySlotCounterProps) => {
  const [formattedNumber, setFormattedNumber] = useState(numberString);

  useEffect(() => {
    const formatted = numberString.replace(/-/g, ',');
    setFormattedNumber(formatted);
  }, [numberString]);

  const tablet = useMediaQuery('(max-width: 769px)');
  const mobile = useMediaQuery('(max-width: 426px)');

  return (
    <div className="relative w-fit">
      {mobile ? (
        <Image
          src="/roller-triangle-sm.svg"
          alt="roller-triangle"
          width={24}
          height={24}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20"
        />
      ) : (
        <Image
          src="/roller-triangle.svg"
          alt="roller-triangle"
          width={48}
          height={48}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20"
        />
      )}

      {mobile ? (
        <Image
          src="/roller-triangle-sm.svg"
          alt="roller-triangle"
          width={24}
          height={24}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 rotate-180"
        />
      ) : (
        <Image
          src="/roller-triangle.svg"
          alt="roller-triangle"
          width={48}
          height={48}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 rotate-180"
        />
      )}

      <div
        className="flex items-center h-fit md:max-w-[1132px] sm:max-w-[640px] max-w-[324px] w-full justify-center text-white md:py-4 md:px-6 rounded-full overflow-y-hidden overflow-x-visible relative border-4 border-lightPrimary"
        style={{
          background:
            'linear-gradient(180deg, #454673 0%, #575992 10.5%, #575992 90%, #454673 100%)',
          boxShadow: '0px 4px 4px 0px #00000040',
        }}>
        {/* Highlight */}
        <div
          className="absolute top-[50%] -translate-y-1/2 left-0 w-full h-full"
          style={{
            background:
              'linear-gradient(180deg, rgba(87, 89, 146, 0) 0%, #7274AB 50%, rgba(87, 89, 146, 0) 100%)',
          }}></div>

        <div className="z-10">
          <SlotCounter
            value={formattedNumber}
            startValue={formattedNumber}
            startValueOnce
            charClassName="rolling-number"
            separatorClassName="slot-seperator"
            duration={2}
            speed={2}
            delay={2}
            startFromLastDigit
            animateUnchanged
            animateOnVisible={false}
            autoAnimationStart={false}
          />
        </div>
      </div>
    </div>
  );
};

export default LotterySlotCounter;
