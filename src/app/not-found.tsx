// app/not-found.tsx
"use client"; // Needs to be a client component for framer-motion, useState, useEffect

import React, { useState, useEffect } from 'react';
import { motion} from 'framer-motion';
import Link from 'next/link';
// No 'next/head' needed for App Router metadata
import { Home, Mail, Terminal, Zap, BookOpen, Building, Briefcase, Calculator } from 'lucide-react';

// Assuming these components are in your project
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
 // If you want this on 404

// Re-use your GlitchText, FloatingParticles, SpaceAnimation components here
// You might want to put these into a separate utility/component file, e.g., components/animations/NotFoundAnimations.tsx

interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ children, className = "" }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className={`${isGlitching ? 'animate-pulse text-red-400' : ''} transition-colors duration-200`}>
        {children}
      </div>
      {isGlitching && (
        <>
          <div className="absolute inset-0 text-cyan-400 opacity-50 animate-ping">
            {children}
          </div>
          <div className="absolute inset-0 text-purple-400 opacity-30 transform translate-x-1 -translate-y-1">
            {children}
          </div>
        </>
      )}
    </div>
  );
};

const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => i);
  const isBrowser = typeof window !== 'undefined'; // Ensure window access only on client

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {isBrowser && particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const SpaceAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-60" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-400 rounded-full opacity-80" />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-70" />
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-pink-400 rounded-full opacity-50" />
      </motion.div>

      <motion.div
        className="absolute top-20 left-1/2 transform -translate-x-1/2"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600/20 to-cyan-600/20 backdrop-blur-sm border border-purple-400/30" />
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-pink-500/30 to-blue-500/30 animate-pulse" />
          <div className="absolute inset-8 rounded-full bg-white/10 backdrop-blur-lg" />
        </div>
      </motion.div>
    </div>
  );
};


// Main 404 Component - this is what Next.js will render for not-found
export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }} // Exit animation might not apply directly on a page load
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex flex-col"
    >
      <FloatingParticles />
      <SpaceAnimation />

      <Navbar /> {/* Integrated Navbar */}

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] p-8 flex-grow">
        <div className="text-center max-w-3xl w-full">
          {/* 404 Glitch Effect */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <GlitchText className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              404
            </GlitchText>
          </motion.div>

          {/* Glass Card */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 p-8 mb-8 shadow-2xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Lost in Cyberspace
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-300 text-lg mb-8 leading-relaxed"
            >
              The digital realm you&apos;re seeking has drifted into the void.
              Let&apos;s navigate you back to familiar territory.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center max-w-lg mx-auto"
            >
              <Link href="/" passHref>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 w-full"
                >
                  <Home className="w-5 h-5" />
                  Return Home
                </motion.button>
              </Link>

              <Link href="/contact" passHref>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(16, 185, 129, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 w-full"
                >
                  <Mail className="w-5 h-5" />
                  Contact Support
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 text-center"
          >
            <h3 className="text-xl font-bold text-white mb-4">Explore Other Dimensions:</h3>
            <div className="flex flex-wrap justify-center gap-4 text-lg">
              <Link href="/about" passHref>
                <motion.a
                  whileHover={{ scale: 1.05, color: 'rgb(147, 197, 253)' }}
                  className="text-gray-300 hover:underline flex items-center gap-1 transition-colors"
                >
                  <Building className="w-4 h-4" /> About Us
                </motion.a>
              </Link>
              <Link href="/services" passHref>
                <motion.a
                  whileHover={{ scale: 1.05, color: 'rgb(147, 197, 253)' }}
                  className="text-gray-300 hover:underline flex items-center gap-1 transition-colors"
                >
                  <Zap className="w-4 h-4" /> Services
                </motion.a>
              </Link>
              <Link href="/projects" passHref>
                <motion.a
                  whileHover={{ scale: 1.05, color: 'rgb(147, 197, 253)' }}
                  className="text-gray-300 hover:underline flex items-center gap-1 transition-colors"
                >
                  <Terminal className="w-4 h-4" /> Projects
                </motion.a>
              </Link>
              <Link href="/career" passHref>
                <motion.a
                  whileHover={{ scale: 1.05, color: 'rgb(147, 197, 253)' }}
                  className="text-gray-300 hover:underline flex items-center gap-1 transition-colors"
                >
                  <Briefcase className="w-4 h-4" /> Career
                </motion.a>
              </Link>
              <Link href="/blog" passHref>
                <motion.a
                  whileHover={{ scale: 1.05, color: 'rgb(147, 197, 253)' }}
                  className="text-gray-300 hover:underline flex items-center gap-1 transition-colors"
                >
                  <BookOpen className="w-4 h-4" /> Blog
                </motion.a>
              </Link>
              <Link href="/calculator" passHref>
                <motion.a
                  whileHover={{ scale: 1.05, color: 'rgb(147, 197, 253)' }}
                  className="text-gray-300 hover:underline flex items-center gap-1 transition-colors"
                >
                  <Calculator className="w-4 h-4" /> Calculator
                </motion.a>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer /> {/* Integrated Footer */}
    </motion.div>
  );
}

// Metadata for this not-found page
