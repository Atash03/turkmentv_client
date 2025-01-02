import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  initialY?: number;
  duration?: number;
  wordDelay?: number;
}

const AnimatedText = ({
  text,
  className = '',
  wordClassName = '',
  initialY = -100,
  duration = 0.5,
  wordDelay = 0.2,
}: AnimatedTextProps) => {
  const words = text.split(' ');

  return (
    <div className="overflow-hidden">
      <motion.p
        className={className}
        initial={{ y: initialY, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: initialY, opacity: 0 }}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ y: initialY, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: initialY, opacity: 0 }}
            transition={{
              duration,
              delay: i * wordDelay,
              ease: 'easeOut',
            }}
            className={`inline-block mx-2 ${wordClassName}`}>
            {word}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
};

export default AnimatedText;
