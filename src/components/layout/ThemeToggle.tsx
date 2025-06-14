// src/components/layout/ThemeToggle.tsx
"use client"; // This component must be a Client Component to use hooks like useState and useEffect

import * as React from 'react';
import { Sun, Moon } from 'lucide-react'; // Icons for light/dark mode
import { useTheme } from 'next-themes'; // Official next-themes hook

// Import your ShadCN UI Button component
import { Button } from '@/components/ui/button'; 

// --- Component Props Interface ---
interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'glass'; // Custom variants for visual styles
  className?: string; // Additional Tailwind classes for external styling
}

// --- Main ThemeToggle Component ---
const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  size = 'md', 
  variant = 'default',
  className = '' 
}) => {
  // useTheme provides `theme`, `setTheme`, and `resolvedTheme`
  // `resolvedTheme` is the actual theme applied (takes system preference into account)
  const { setTheme, resolvedTheme } = useTheme();

  // `mounted` state is crucial for `next-themes` and SSR
  // It ensures UI that depends on `resolvedTheme` is only rendered client-side
  const [mounted, setMounted] = React.useState(false);

  // Set mounted to true after the component has mounted on the client
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Show a placeholder or null to prevent hydration mismatches
  // This is a good practice for components that rely on client-side specific data (like theme)
  if (!mounted) {
    return (
      <div className={`${getSizeClasses(size)} ${getVariantClasses(variant)} animate-pulse`}>
        <div className="w-5 h-5 bg-zinc-300 dark:bg-zinc-600 rounded-full" /> {/* Changed to rounded-full for better visual */}
      </div>
    );
  }

  // Determine the target theme to toggle to
  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  // Get dynamic Tailwind classes based on props
  const sizeClasses = getSizeClasses(size);
  const variantClasses = getVariantClasses(variant);
  const iconSize = getIconSize(size);

  return (
    <Button // Using ShadCN's Button component
      type="button" // Important for accessibility and form submission behavior
      onClick={toggleTheme}
      className={`
        relative overflow-hidden group
        ${sizeClasses}
        ${variantClasses}
        ${className}
        transition-all duration-300 ease-in-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
        focus-visible:ring-blue-500 dark:focus-visible:ring-cyan-400
        focus-visible:ring-offset-background dark:focus-visible:ring-offset-zinc-900
      `}
      aria-label={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} theme`}
    >
      {/* Background glow effect (remains on button) */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      
      {/* Main icon container */}
      <div className="relative flex items-center justify-center w-full h-full"> {/* Ensure fill for icons */}
        {/* Sun icon for light mode */}
        <Sun 
          className={`
            absolute transition-all duration-500 ease-in-out
            ${resolvedTheme === 'light' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-180 scale-75'
            }
            text-amber-400 group-hover:text-amber-300
          `}
          size={iconSize}
        />
        
        {/* Moon icon for dark mode */}
        <Moon 
          className={`
            transition-all duration-500 ease-in-out
            ${resolvedTheme === 'dark' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-180 scale-75'
            }
            text-zinc-300 group-hover:text-cyan-200
          `}
          size={iconSize}
        />
      </div>

      {/* Animated particles (remains on button) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`
              absolute w-1 h-1 bg-current rounded-full opacity-0 group-hover:opacity-60
              animate-ping
            `}
            style={{
              top: `${20 + i * 20}%`,
              left: `${20 + i * 30}%`,
              animationDelay: `${i * 200}ms`,
              animationDuration: '1.5s'
            }}
          />
        ))}
      </div>

      {/* Ripple effect on click (remains on button) */}
      {/* Note: ShadCN Button might have its own ripple/focus, adjust if needed */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 to-cyan-500/30 scale-0 group-active:scale-110 transition-transform duration-200" />
    </Button>
  );
};

export default ThemeToggle;

// --- Helper Functions for Dynamic Classes ---
// These functions help keep your component's JSX clean by abstracting styling logic.
function getSizeClasses(size: 'sm' | 'md' | 'lg'): string {
  switch (size) {
    case 'sm':
      return 'w-8 h-8 rounded-lg';
    case 'md':
      return 'w-10 h-10 rounded-xl';
    case 'lg':
      return 'w-12 h-12 rounded-2xl';
    default:
      return 'w-10 h-10 rounded-xl';
  }
}

function getVariantClasses(variant: 'default' | 'minimal' | 'glass'): string {
  switch (variant) {
    case 'minimal':
      // Tailwind's `bg-transparent` is standard. Using `zinc` for hover for consistency with your base color.
      return 'bg-transparent hover:bg-zinc-800/20 dark:hover:bg-zinc-100/20 text-zinc-800 dark:text-zinc-200';
    case 'glass':
      // Enhanced glassmorphism with better contrast using zinc/black
      return `
        bg-white/5 dark:bg-black/5 backdrop-blur-md
        border border-white/10 dark:border-white/5
        hover:bg-white/10 dark:hover:bg-black/10
        hover:border-white/20 dark:hover:border-white/10
        shadow-lg hover:shadow-xl
        text-white
      `;
    case 'default':
    default:
      // Adjusted default to use zinc for a consistent modern feel
      return `
        bg-zinc-200 dark:bg-zinc-800
        hover:bg-zinc-300 dark:hover:bg-zinc-700
        border border-zinc-300 dark:border-zinc-700
        hover:border-zinc-400 dark:hover:border-zinc-600
        shadow-sm hover:shadow-md
        text-zinc-900 dark:text-zinc-100
      `;
  }
}

function getIconSize(size: 'sm' | 'md' | 'lg'): number {
  switch (size) {
    case 'sm':
      return 16;
    case 'md':
      return 20;
    case 'lg':
      return 24;
    default:
      return 20;
  }
}