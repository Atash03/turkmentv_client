'use client';
import { motion } from 'framer-motion';
import { useCallback, useMemo, useState } from 'react';

interface RollingCounterWorkingProps {
  numberString: string;
}

// Move constants outside component
const ROLLS = 5;
const DIGIT_HEIGHT = 104;
const INITIAL_OFFSET = 38;
const EXTRA_NUMBERS_AFTER = 5;
const EXTRA_NUMBERS_BEFORE = 2;

// Memoize number generation function
const getNumbers = (targetValue: number) => {
  const numbers = [];

  // Add complete rolls
  for (let i = 0; i < ROLLS; i++) {
    for (let n = 0; n < 10; n++) {
      numbers.push(n);
    }
  }

  // Add sequence before target
  for (let n = EXTRA_NUMBERS_BEFORE; n > 0; n--) {
    numbers.push((targetValue - n + 10) % 10);
  }

  // Add target
  numbers.push(targetValue);

  // Add extra numbers after target
  for (let n = 1; n <= EXTRA_NUMBERS_AFTER; n++) {
    numbers.push((targetValue + n) % 10);
  }

  return numbers;
};

const RollingDigit = ({
  targetValue,
  index,
  onAnimationComplete,
  isStopped,
  showHyphen,
}: {
  targetValue: number;
  index: number;
  onAnimationComplete: () => void;
  isStopped: boolean;
  showHyphen: boolean;
}) => {
  const numbers = useMemo(() => getNumbers(targetValue), [targetValue]);

  const targetIndex = ROLLS * 10 + EXTRA_NUMBERS_BEFORE;

  return (
    <div className="flex items-center">
      <div className="overflow-hidden h-[180px] w-[77px] relative">
        <motion.div
          initial={{ y: INITIAL_OFFSET }}
          animate={{
            y: -(targetIndex * DIGIT_HEIGHT) + INITIAL_OFFSET,
          }}
          transition={{
            duration: 5,
            delay: index * 4,
            ease: 'easeInOut',
          }}
          onAnimationComplete={onAnimationComplete}
          className="absolute flex flex-col">
          {numbers.map((num, i) => (
            <div
              key={`${index}-${i}`}
              className={`h-[${DIGIT_HEIGHT}px] w-[77px] flex items-center justify-center numeric-display-1 transition-colors duration-500 ${
                isStopped && num === targetValue ? 'text-white' : 'text-[#B0B1CD]'
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

const RollingCounterWorking: React.FC<RollingCounterWorkingProps> = ({ numberString }) => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isStopped, setIsStopped] = useState<boolean[]>([]);

  const numbers = useMemo(() => {
    if (!numberString) return [];

    const parsed = numberString
      .replace(/-/g, '')
      .split('')
      .map((char) => parseInt(char, 10));

    if (isInitialLoading) {
      setIsStopped(new Array(parsed.length).fill(false));
      setIsInitialLoading(false);
    }

    return parsed;
  }, [numberString, isInitialLoading]);

  const handleAnimationComplete = useCallback((index: number) => {
    setIsStopped((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  }, []);

  if (isInitialLoading) {
    return (
      <div className="flex items-center justify-center bg-lightPrimary text-white py-4 px-6 rounded-full">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-lightPrimary text-white py-4 px-6 rounded-full">
      {numbers.map((num, index) => (
        <RollingDigit
          key={`${index}-${num}`}
          targetValue={num}
          index={index}
          onAnimationComplete={() => handleAnimationComplete(index)}
          isStopped={isStopped[index]}
          showHyphen={(index + 1) % 2 === 0 && index !== numbers.length - 1}
        />
      ))}
    </div>
  );
};

export default RollingCounterWorking;
