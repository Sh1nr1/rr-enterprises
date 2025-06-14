'use client';

import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { useTheme } from 'next-themes';

interface AnimatedSectionProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  initial = { opacity: 0, y: 50, scale: 0.98 },
  whileInView = { opacity: 1, y: 0, scale: 1 },
  viewport = { once: true, amount: 0.3 },
  transition = {
    type: 'spring',
    stiffness: 100,
    damping: 15,
    delay: 0.1,
  },
  ...motionProps
}) => {
  const { theme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <motion.section
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      transition={transition}
      whileHover={{
        scale: 1.01,
        transition: { type: 'spring', stiffness: 400, damping: 20 }
      }}
      className={`
        relative overflow-hidden rounded-2xl
        bg-white/70 dark:bg-gray-800/50 backdrop-blur-md
        border border-gray-200/50 dark:border-gray-700/50
        shadow-md hover:shadow-lg dark:shadow-blue-500/10 dark:hover:shadow-cyan-500/20
        transition-all duration-300 ease-out
        before:absolute before:inset-0 before:rounded-2xl
        before:bg-gradient-to-br before:from-blue-50/30 before:to-purple-50/20
        dark:before:from-blue-900/10 dark:before:to-purple-900/5
        before:opacity-0 before:transition-opacity before:duration-300
        hover:before:opacity-100
        after:absolute after:inset-0 after:rounded-2xl
        after:bg-gradient-to-br after:from-transparent after:via-white/5 after:to-transparent
        dark:after:from-transparent dark:after:via-gray-700/10 dark:after:to-transparent
        after:opacity-60
        group
        ${className}
      `}
      {...motionProps}
    >
      {/* Subtle animated border glow */}
      <div className={`
        absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500
        group-hover:opacity-100
        bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-cyan-400/20
        dark:from-blue-500/30 dark:via-purple-500/30 dark:to-cyan-500/30
        blur-sm -z-10 scale-110
      `} />
      
      {/* Content container */}
      <div className={`
        relative z-10 p-6 sm:p-8
        text-gray-900 dark:text-white
        transition-colors duration-300
      `}>
        {children}
      </div>
      
      {/* Subtle corner accents */}
      <div className={`
        absolute top-0 left-0 w-20 h-20 rounded-2xl
        bg-gradient-to-br from-blue-400/10 to-transparent
        dark:from-blue-500/20 dark:to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
      `} />
      <div className={`
        absolute bottom-0 right-0 w-20 h-20 rounded-2xl
        bg-gradient-to-tl from-purple-400/10 to-transparent
        dark:from-purple-500/20 dark:to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
      `} />
    </motion.section>
  );
};

export default AnimatedSection;