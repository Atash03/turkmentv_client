import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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
    <div className="overflow-hidden">
      <motion.p
        className={cn(`flex `, className)}
        initial={{ translateY: initialY, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        exit={{ translateY: exitY, opacity: 0 }}>
        {characters.map((character, i) => (
          <motion.div
            key={i}
            initial={{ translateY: initialY, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: exitY, opacity: 0 }}
            transition={{
              duration,
              delay: characterDelay + (i / 2) * duration,
              ease: 'easeOut',
            }}
            className={cn(`block `, characterClassName, {
              'animate-dotsFlash': text === '...',
            })}>
            {character}
          </motion.div>
        ))}
      </motion.p>
    </div>
  );
};

export default AnimatedText;
