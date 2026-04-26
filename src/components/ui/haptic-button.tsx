"use client";

import * as React from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import { type HTMLMotionProps } from "framer-motion";

interface HapticButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  hapticIntensity?: "low" | "medium" | "high";
  asChild?: boolean;
  whileHover?: HTMLMotionProps<"button">["whileHover"];
  whileTap?: HTMLMotionProps<"button">["whileTap"];
}

export const HapticButton = React.forwardRef<HTMLButtonElement, HapticButtonProps>(
  ({ className, hapticIntensity = "medium", variant, size, asChild, whileHover, whileTap, ...props }, ref) => {
    const controls = useAnimationControls();

    const scale = {
      low: 0.98,
      medium: 0.95,
      high: 0.9,
    }[hapticIntensity];

    const handlePress = async (e: React.PointerEvent<HTMLButtonElement>) => {
      if (props.onPointerDown) props.onPointerDown(e);
      await controls.start({
        scale,
        transition: { duration: 0.1, ease: "easeOut" },
      });
      await controls.start({
        scale: 1,
        transition: { duration: 0.1, ease: "easeIn" },
      });
    };

    return (
      <motion.div 
        animate={controls} 
        className="inline-block w-full sm:w-auto"
        whileHover={whileHover}
        whileTap={whileTap}
      >
        <Button
          ref={ref}
          variant={variant}
          size={size}
          asChild={asChild}
          className={cn("active:scale-95 transition-transform duration-75", className)}
          onPointerDown={handlePress}
          {...props}
        />
      </motion.div>
    );
  }
);

HapticButton.displayName = "HapticButton";
