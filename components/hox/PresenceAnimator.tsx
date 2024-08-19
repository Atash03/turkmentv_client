"use client";
import { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import {
  VariantLabels,
  AnimationControls,
  TargetAndTransition,
} from "framer-motion";

interface IProps extends PropsWithChildren {
  initial?: any;
  animate?: VariantLabels | AnimationControls | TargetAndTransition | undefined;
  exit?: VariantLabels | TargetAndTransition | undefined;
}

const PresenceAnimator = ({ children, initial, animate, exit }: IProps) => {
  return (
    <motion.div
      className="flex flex-col justify-between min-h-[500px]"
      initial={initial}
      animate={animate}
      exit={exit}
    >
      {children}
    </motion.div>
  );
};

export default PresenceAnimator;
