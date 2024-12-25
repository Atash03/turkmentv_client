'use client';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState, useRef } from 'react';

interface RollingCounterProps {
  numberString: string;
}

// Move constants outside component
const ROLLS = 2;
const DIGIT_HEIGHT = 104;
const EXTRA_NUMBERS_BEFORE = 2;
const EXTRA_NUMBERS_AFTER = 5;
const CONTAINER_HEIGHT = 180;
const INITIAL_OFFSET = (CONTAINER_HEIGHT - DIGIT_HEIGHT) / 2 - DIGIT_HEIGHT * 2;

// Memoize number generation function
const getNumbers = (targetValue: number) => {
  const numbers = [];

  // Add extra numbers before
  for (let n = 10 - EXTRA_NUMBERS_BEFORE; n < 10; n++) {
    numbers.push(n);
  }

  // Start with zeros
  for (let n = 0; n <= targetValue; n++) {
    numbers.push(n);
  }

  // Add complete rolls after the initial sequence
  for (let i = 0; i < ROLLS; i++) {
    for (let n = 0; n < 10; n++) {
      numbers.push(n);
    }
  }

  // Add sequence to target
  for (let n = 0; n <= targetValue; n++) {
    numbers.push(n);
  }

  // Add extra numbers after target
  for (let n = (targetValue + 1) % 10; n < ((targetValue + 1) % 10) + EXTRA_NUMBERS_AFTER; n++) {
    numbers.push(n % 10);
  }

  return numbers;
};

const RollingDigit = ({
  targetValue,
  index,
  onAnimationComplete,
  isStopped,
  showHyphen,
  totalDigits,
  isRollingBack,
}: {
  targetValue: number;
  index: number;
  onAnimationComplete: () => void;
  isStopped: boolean;
  showHyphen: boolean;
  totalDigits: number;
  isRollingBack: boolean;
}) => {
  const numbers = useMemo(() => getNumbers(targetValue), [targetValue]);

  return (
    <div className="flex items-center">
      <div className="overflow-hidden h-[180px] w-[77px] relative">
        <motion.div
          initial={{ y: INITIAL_OFFSET }}
          animate={{
            y: isRollingBack
              ? INITIAL_OFFSET
              : -(numbers.length - EXTRA_NUMBERS_AFTER - 3) * DIGIT_HEIGHT + INITIAL_OFFSET,
          }}
          transition={{
            duration: isRollingBack ? 2 : 2,
            delay: isRollingBack ? index * 0.2 : (totalDigits - 1 - index) * 0.2,
            ease: 'easeInOut',
          }}
          onAnimationComplete={onAnimationComplete}
          className="absolute flex flex-col">
          {numbers.map((num, i) => (
            <div
              key={`${index}-${i}`}
              className={`h-[${DIGIT_HEIGHT}px] w-[77px] flex items-center justify-center numeric-display-1 transition-colors duration-500 ${
                isStopped && !isRollingBack && num === targetValue ? 'text-white' : 'text-[#B0B1CD]'
              }`}>
              {num}
            </div>
          ))}
        </motion.div>
      </div>
      {showHyphen && <div className="w-[32px] h-[4px] bg-lightOnPrimary mx-5 self-center" />}
    </div>
  );
};

const RollingCounter: React.FC<RollingCounterProps> = ({ numberString }) => {
  const [isStopped, setIsStopped] = useState<boolean[]>([]);
  const [isRollingBack, setIsRollingBack] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentNumbers, setCurrentNumbers] = useState<number[]>([]);
  const prevNumberStringRef = useRef(numberString);

  const { numbers, isInitialLoading } = useMemo(() => {
    if (!numberString) {
      return { numbers: [], isInitialLoading: true };
    }

    const parsed = numberString.split('-').flatMap((pair) => {
      return pair.split('').map((char) => parseInt(char, 10));
    });

    return {
      numbers: parsed,
      isInitialLoading: false,
    };
  }, [numberString]);

  // Initialize currentNumbers
  useEffect(() => {
    if (!currentNumbers.length && numbers.length) {
      setCurrentNumbers(numbers);
    }
  }, [numbers, currentNumbers.length]);

  // Handle number changes
  useEffect(() => {
    if (prevNumberStringRef.current !== numberString && !isRollingBack) {
      setIsTransitioning(true);
      setIsRollingBack(true);
      setIsStopped(new Array(numbers.length).fill(false));

      setTimeout(() => {
        setIsRollingBack(false);
        setCurrentNumbers(numbers);
        prevNumberStringRef.current = numberString;
      }, 2000);
    }
  }, [numberString, numbers, isRollingBack]);

  const handleAnimationComplete = useCallback(
    (index: number) => {
      if (!isRollingBack) {
        setIsStopped((prev) => {
          const newState = [...prev];
          newState[index] = true;

          if (newState.every((stopped) => stopped)) {
            setIsTransitioning(false);
          }

          return newState;
        });
      }
    },
    [isRollingBack],
  );

  if (isInitialLoading) {
    return (
      <div className="flex items-center justify-center bg-lightPrimary text-white py-4 px-6 rounded-full">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex items-center max-w-[1132px] justify-center bg-lightPrimary text-white py-4 px-6 rounded-full">
      {currentNumbers.map((num, index) => (
        <RollingDigit
          key={`${index}`} // Simplified key to prevent re-renders
          targetValue={num}
          index={index}
          onAnimationComplete={() => handleAnimationComplete(index)}
          isStopped={isStopped[index] && !isTransitioning}
          showHyphen={(index + 1) % 2 === 0 && index !== numbers.length - 1}
          totalDigits={numbers.length}
          isRollingBack={isRollingBack}
        />
      ))}
    </div>
  );
};

export default RollingCounter;
