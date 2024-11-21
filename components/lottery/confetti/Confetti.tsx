'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils'; // Assuming `cn` is defined in `lib/utils`

const Confetti: React.FC = () => {
  const [confetti, setConfetti] = useState<number[]>([]);

  useEffect(() => {
    const confettiArray = Array.from({ length: 300 }, (_, i) => i); // Generate 300 confetti pieces
    setConfetti(confettiArray);

    const timer = setTimeout(() => {
      setConfetti([]);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const randomColor = () => {
    const colors = [
      'linear-gradient(45deg, #5D5D72, #8589DE)',
      'linear-gradient(45deg, #E1E0FF, #575992)',
      '#8589DE',
      '#575992',
      '#E1E0FF',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  if (confetti.length === 0) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {confetti.map((_, i) => {
        const randomSize = Math.random() * 10 + 8; // Size between 8px and 18px
        const randomStartX = Math.random() * 100; // Start anywhere across the screen
        const randomStartY = Math.random() < 0.5 ? -10 : 110; // Start above or below the screen
        const randomDuration = Math.random() * 1 + 4; // Duration between 4s and 5s
        const randomEndX = Math.random() * 200 - 100; // Drift horizontally (-100vw to +100vw)
        const randomRotation = Math.random() * 360; // Start with a random rotation
        const randomDelay = Math.random() * 0.5; // Delay between 0-0.5s

        return (
          <div
            key={i}
            className={cn('absolute', 'confetti-piece')}
            style={
              {
                top: `${randomStartY}%`,
                left: `${randomStartX}%`,
                width: `${randomSize}px`,
                height: `${randomSize}px`,
                background: randomColor(),
                animationDuration: `${randomDuration}s`,
                animationDelay: `${randomDelay}s`,
                transform: `rotate(${randomRotation}deg)`,
                '--end-x': `${randomEndX}vw`,
              } as React.CSSProperties
            }></div>
        );
      })}
    </div>
  );
};

export default Confetti;
