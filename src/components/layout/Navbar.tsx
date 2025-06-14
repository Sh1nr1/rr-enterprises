"use client"
import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react'; // Remove Building2
import { useTheme } from 'next-themes';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { setTheme, resolvedTheme } = useTheme();

  const isDark = mounted && (resolvedTheme === 'dark');

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleThemeToggle = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Solutions', href: '/solutions'},
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
  { name: 'Blogs', href: '/blog' },
];

  if (!mounted) {
    return (
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out transform translate-y-0
          backdrop-blur-xl bg-white/10 shadow-2xl border-b border-white/20`
        }
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo - Made clickable for SSR fallback */}
            <Link href="/" className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105">
              <div className="relative">
                {/* Custom Logo for SSR Fallback */}
                <img
                  src="/rr-logo.svg" // Path to your logo in the public directory
                  alt="RR Enterprises Logo"
                  className="h-10 w-10 lg:h-12 lg:w-12" // Adjust size as needed
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  RR Enterprises
                </span>
                <span className="text-xs text-gray-600 -mt-1">
                  Future Built Today
                </span>
              </div>
            </Link>

            {/* Desktop Navigation (simplified for SSR) */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-gray-700 font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Theme Toggle & Mobile Menu Button Placeholder */}
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-full bg-gray-200/50" aria-label="Toggle theme">
                <Moon className="h-5 w-5 text-gray-700" />
              </button>
              <button className="lg:hidden p-2 rounded-full bg-gray-200/50" aria-label="Toggle menu">
                <Menu className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <div className={isDark ? 'dark' : ''}>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out transform translate-y-0 ${
          isScrolled
            ? 'backdrop-blur-xl bg-white/10 dark:bg-black/20 shadow-2xl border-b border-white/20 dark:border-white/10'
            : 'backdrop-blur-sm bg-transparent'
        }`}
        style={{
          background: isScrolled
            ? isDark
              ? 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(15,23,42,0.4) 100%)'
              : 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)'
            : 'transparent'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo - Wrapped with Next.js Link for navigation */}
            <Link
              href="/"
              className="flex items-center space-x-3 cursor-pointer group transition-all duration-300 hover:scale-105"
              style={{
                animation: 'slideInLeft 0.8s ease-out'
              }}
            >
              <div className="relative">
                {/* Custom Logo for Client-Side Render */}
                <img
                  src="/rr-logo.svg" // Path to your logo in the public directory
                  alt="RR Enterprises Logo"
                  className="h-10 w-10 lg:h-12 lg:w-12" // Adjust size as needed
                  // You might need to add classes here for dark mode styling or dynamic color
                  // Example: `className="h-8 w-8 lg:h-10 lg:w-10 ${isDark ? 'filter invert' : ''}"`
                  // 'filter invert' might work for simple black/white logos in dark mode
                />
                <div className="absolute inset-0 bg-blue-500/20 dark:bg-cyan-400/20 rounded-full blur-lg scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                  RR Enterprises
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400 -mt-1">
                  Future Built Today
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div
              className="hidden lg:flex items-center space-x-1"
              style={{
                animation: 'slideInDown 0.8s ease-out 0.2s both'
              }}
            >
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-cyan-400 transition-all duration-300 rounded-lg group overflow-hidden"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${0.3 + index * 0.1}s both`
                  }}
                >
                  <span className="relative z-10 font-medium">{link.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-cyan-400/10 dark:to-blue-400/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg"></div>
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-cyan-400 dark:to-blue-400 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                </a>
              ))}
            </div>

            {/* Theme Toggle & Mobile Menu Button */}
            <div
              className="flex items-center space-x-3"
              style={{
                animation: 'slideInRight 0.8s ease-out 0.4s both'
              }}
            >
              {/* Theme Toggle */}
              <button
                onClick={handleThemeToggle}
                className="p-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-cyan-400/20 dark:to-blue-400/20 hover:from-blue-500/30 hover:to-purple-500/30 dark:hover:from-cyan-400/30 dark:hover:to-blue-400/30 transition-all duration-300 backdrop-blur-sm border border-white/20 dark:border-white/10 group"
                aria-label="Toggle theme"
              >
                <div className="relative">
                  {isDark ? (
                    <Sun className="h-5 w-5 text-yellow-400 transition-transform duration-300 group-hover:rotate-90" />
                  ) : (
                    <Moon className="h-5 w-5 text-blue-600 transition-transform duration-300 group-hover:-rotate-12" />
                  )}
                </div>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-cyan-400/20 dark:to-blue-400/20 hover:from-blue-500/30 hover:to-purple-500/30 dark:hover:from-cyan-400/30 dark:hover:to-blue-400/30 transition-all duration-300 backdrop-blur-sm border border-white/20 dark:border-white/10"
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6">
                  <Menu
                    className={`absolute inset-0 h-6 w-6 text-gray-700 dark:text-gray-200 transition-all duration-300 ${
                      isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                    }`}
                  />
                  <X
                    className={`absolute inset-0 h-6 w-6 text-gray-700 dark:text-gray-200 transition-all duration-300 ${
                      isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden transition-all duration-500 ease-out overflow-hidden ${
              isOpen ? 'max-h-300 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-2 pt-2 pb-4 space-y-2 backdrop-blur-xl bg-white/5 dark:bg-black/5 rounded-2xl mt-4 border border-white/10 dark:border-white/5">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-cyan-400 transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 dark:hover:from-cyan-400/10 dark:hover:to-blue-400/10 font-medium"
                  style={{
                    animation: isOpen ? `slideInRight 0.4s ease-out ${index * 0.1}s both` : 'none'
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Animated Border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 dark:via-cyan-400/50 to-transparent"></div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16 lg:h-20"></div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(-100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInDown {
          from {
            transform: translateY(-50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Navbar;