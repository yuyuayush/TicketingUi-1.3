"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface NeonButtonProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
  onClick?: () => void;
}

const getNeonShadow = (color: string) => {
  const neonColors: Record<string, string> = {
    pink: "rgba(236, 72, 153, 0.8)", // true-pink-500
    blue: "rgba(59, 130, 246, 0.8)",  // true-blue-500
    purple: "rgba(168, 85, 247, 0.8)", // true-purple-500
  };
  const c = neonColors[color] || neonColors.pink;
  return `0 0 10px ${c}, 0 0 30px ${c}`;
};

const NeonButton: React.FC<NeonButtonProps> = ({
  children,
  color = 'pink',
  className = '',
  onClick
}) => {
  const neonColors: Record<string, string> = {
    pink: "rgba(236, 72, 153, 0.8)",
    blue: "rgba(59, 130, 246, 0.8)",
    purple: "rgba(168, 85, 247, 0.8)"
  };

  const style = {
    boxShadow: `${getNeonShadow(color)}, 0 0 0 2px ${neonColors[color]}`,
  };

  return (
    <motion.button
      whileHover={{
        scale: 1.03,
        boxShadow: [style.boxShadow, `${getNeonShadow(color)}, 0 0 0 2px ${neonColors[color]}, 0 0 20px ${neonColors[color]}`]
      }}
      whileTap={{ scale: 0.98 }}
      style={style}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center px-8 py-3 font-bold uppercase tracking-wider text-sm rounded-full transition-all duration-300 ease-in-out bg-transparent border-2 border-${color}-500 text-white ${className}`}
    >
      <span className={`z-10 text-${color}-300`}>{children}</span>
    </motion.button>
  );
};

export default NeonButton;