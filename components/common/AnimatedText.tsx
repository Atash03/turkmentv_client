import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  characterClassName?: string;
  initialY?: number;
  exitY?: number;
  duration: number;
  characterDelay?: number;
}

const AnimatedText = ({
  text,
  className = '',
  characterClassName = '',
  initialY = -100,
  exitY = 100,
  duration,
  characterDelay = 0,
}: AnimatedTextProps) => {
  const characters = text.split('');

  return (
    <motion.div className="overflow-hidden">
      <motion.p
        className={cn(`flex`, className)}
        variants={{
          enter: {
            transition: { staggerChildren: 1, delayChildren: 0.5 },
          },
          exit: {
            transition: { staggerChildren: 0.05, staggerDirection: -1 },
          },
        }}>
        <AnimatePresence>
          {characters.map((character, i) => (
            <motion.div
              key={i}
              initial={{ translateY: '-100%', opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              exit={{ translateY: '100%', opacity: 0 }}
              transition={{
                duration,
                delay: characterDelay + (i / 5) * duration,
                ease: 'easeOut',
              }}
              className={cn(`block`, characterClassName, {
                'animate-dotsFlash': text === '...',
              })}>
              {character === ' ' ? '\u00A0' : character}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.p>
    </motion.div>
  );
};

export default AnimatedText;
