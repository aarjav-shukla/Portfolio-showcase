"use client";

import React from "react";
import { motion, type MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedButtonBaseProps = MotionProps & {
  children?: React.ReactNode;
  className?: string;
};

type AnimatedButtonProps =
  | (AnimatedButtonBaseProps &
      Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps> & {
        as?: "button";
      })
  | (AnimatedButtonBaseProps &
      Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof MotionProps> & {
        as: "a";
      });

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children = "Browse Components",
  className = "",
  as = "button",
  ...rest
}) => {
  const Component = (motion as any)[as] || motion.button;

  return (
    <Component
      {...rest}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.5,
      }}
      className={cn(
        "group inline-flex items-center justify-center px-6 py-2 rounded-full relative overflow-hidden bg-black border border-white/20",
        "text-white font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 disabled:pointer-events-none disabled:opacity-50",
        "[--shine:rgba(255,255,255,0.75)]",
        className,
      )}
    >
      <motion.span
        className="tracking-wide flex items-center justify-center h-full w-full relative z-10"
        style={{
          WebkitMaskImage:
            "linear-gradient(-75deg, rgba(255,255,255,0.7) calc(var(--mask-x) + 20%), #ffffff calc(var(--mask-x) + 30%), rgba(255,255,255,0.7) calc(var(--mask-x) + 100%))",
          maskImage:
            "linear-gradient(-75deg, rgba(255,255,255,0.7) calc(var(--mask-x) + 20%), #ffffff calc(var(--mask-x) + 30%), rgba(255,255,255,0.7) calc(var(--mask-x) + 100%))",
        }}
        initial={{ ["--mask-x" as any]: "100%" } as any}
        animate={{ ["--mask-x" as any]: "-100%" } as any}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
          repeatDelay: 1,
        }}
      >
        {children}
      </motion.span>

      <motion.span
        className="block absolute inset-0 rounded-md p-px"
        style={{
          background:
            "linear-gradient(-75deg, transparent 30%, var(--shine) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
        }}
        initial={{ backgroundPosition: "100% 0", opacity: 0 }}
        animate={{ backgroundPosition: ["100% 0", "0% 0"], opacity: [0, 1, 0] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 1,
        }}
      />
    </Component>
  );
};

export default AnimatedButton;
