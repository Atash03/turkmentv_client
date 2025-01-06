import React from 'react';
import SlotCounter from 'react-slot-counter';

interface IProps {
  value: string | number;
  startValueOnce?: boolean;
  animateOnVisible?: boolean;
  autoAnimationStart?: boolean;
}

const RollingCounter = ({
  value,
  startValueOnce = false,
  animateOnVisible = false,
  autoAnimationStart = false,
}: IProps) => {
  return (
    <SlotCounter
      value={value ? value : 0}
      startValueOnce={startValueOnce}
      animateOnVisible={animateOnVisible}
      autoAnimationStart={autoAnimationStart}
    />
  );
};

export default RollingCounter;
