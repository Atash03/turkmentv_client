import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TextMaskRevealProps {
  text: string;
  className?: string;
  duration?: number; // Duration in seconds for each character
  startDelay?: number; // Delay before animation starts
}

const TextMaskReveal = ({
  text,
  className = '',
  duration = 0.1,
  startDelay = 0,
}: TextMaskRevealProps) => {
  const [characters, setCharacters] = useState<string[]>([]);

  useEffect(() => {
    setCharacters(text.split(''));
  }, [text]);

  return (
    <div
      className={`relative overflow-hidden inline-flex ${className}`}
      style={{ position: 'relative' }}>
      <AnimatePresence>
        {characters.map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            className="inline-block"
            initial={{ y: '-100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{
              duration: duration,
              delay: startDelay + index * duration,
              ease: 'easeOut',
            }}
            style={{ display: 'inline-block', overflow: 'hidden' }}>
            <motion.span
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '100%' }}
              transition={{
                duration: duration,
                delay: startDelay + index * duration,
                ease: 'easeOut',
              }}
              className="block">
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TextMaskReveal;
