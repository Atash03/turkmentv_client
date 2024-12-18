'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface RollingCounterProps {
  numberString: string; // A 10-character string, e.g., "05-12-34-56-78"
}

const RollingCounter: React.FC<RollingCounterProps> = ({ numberString }) => {
  const [rollingValues, setRollingValues] = useState<number[]>([]);
  const [isStopped, setIsStopped] = useState<boolean[]>([]); // Track stopped numbers

  useEffect(() => {
    // Parse input string into an array of numbers, removing hyphens
    const targetNumbers = numberString
      .replace(/-/g, '')
      .split('')
      .map((char) => parseInt(char, 10));
    setRollingValues(targetNumbers);
    setIsStopped(new Array(targetNumbers.length).fill(false));
  }, [numberString]);

  const getNumbers = () => Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className="flex items-center justify-center bg-lightPrimary text-white py-4 px-6 rounded-full">
      {rollingValues.map((targetValue, index) => (
        <div key={index} className="flex items-center justify-center">
          {/* Container to display numbers */}
          <div className="overflow-hidden h-[180px] w-[77px] relative">
            <motion.div
              initial={{ y: '0%' }}
              animate={{ y: `-${targetValue * 10}%` }}
              transition={{
                duration: 0.5 + index * 0.2,
                ease: 'easeInOut',
              }}
              onAnimationComplete={() => {
                // Mark this number as stopped
                setIsStopped((prev) => {
                  const newStatus = [...prev];
                  newStatus[index] = true;
                  return newStatus;
                });
              }}
              className="absolute top-1/2 -translate-y-1/2 flex flex-col -mt-[52px]">
              {getNumbers().map((num) => (
                <div
                  key={num}
                  className={`px-4 py-2 numeric-display-1 transition-colors duration-500 ${
                    isStopped[index] && num === targetValue
                      ? 'text-white' // Stopped number
                      : 'text-[#B0B1CD]' // Rolling numbers
                  }`}>
                  {num}
                </div>
              ))}
            </motion.div>
          </div>
          {/* Add a hyphen every two digits */}
          {(index + 1) % 2 === 0 && index !== rollingValues.length - 1 && (
            <div className="w-[32px] h-[4px] bg-lightOnPrimary mx-5"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RollingCounter;
