// app/error.tsx
"use client"; // This *must* be a client component

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Home, Mail, RefreshCw, ChevronDown, ChevronUp, Terminal, Zap, BookOpen } from 'lucide-react';

// Assuming these components are in your project
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Reuse FloatingParticles if you want it on the error page
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


interface ErrorPageProps {
  error: Error & { digest?: string }; // Next.js passes an error object
  reset: () => void; // Function to attempt to re-render the segment
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const [showTrace, setShowTrace] = useState(false);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const handleRetry = () => {
    setRetrying(true);
    // Attempt to re-render the error boundary's contents
    reset();
    setTimeout(() => setRetrying(false), 2000); // Reset retry state after a delay
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900 relative overflow-hidden flex flex-col"
    >
      <FloatingParticles />

      <Navbar /> {/* Integrated Navbar */}

      {/* Error Animation (You can reuse your SpaceAnimation if desired, but simplified here) */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative"
        >
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-red-600/30 to-orange-600/30 backdrop-blur-sm border border-red-400/50 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-16 h-16 text-red-400" />
            </motion.div>
          </div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-red-500/20 blur-xl"
          />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] p-8 flex-grow">
        <div className="text-center max-w-3xl w-full">
          {/* Error Code */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
              ERROR
            </div>
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
              className="text-2xl md:text-3xl font-bold text-white mb-4"
            >
              System Malfunction Detected
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-300 text-lg mb-6 leading-relaxed"
            >
              Our quantum processors encountered an unexpected anomaly.
              Our tech wizards have been notified and are working on a solution.
            </motion.p>

            {/* Error Alert */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              className="mb-6"
            >
              <Alert className="bg-red-900/20 border-red-500/30 backdrop-blur-sm">
                <Terminal className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-200">
                  <strong>Error:</strong> {error.message || 'An unknown error occurred.'}
                  {error.digest && ` (Digest: ${error.digest})`}
                </AlertDescription>
              </Alert>
            </motion.div>

            {/* Error Trace Toggle */}
            {error.stack && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mb-6"
              >
                <button
                  onClick={() => setShowTrace(!showTrace)}
                  className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                >
                  {showTrace ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  {showTrace ? 'Hide' : 'Show'} Technical Details
                </button>

                <AnimatePresence>
                  {showTrace && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 p-4 bg-slate-800/50 rounded-lg border border-slate-600/30 overflow-hidden"
                    >
                      <pre className="text-xs text-gray-400 whitespace-pre-wrap font-mono max-h-32 overflow-y-auto">
                        {error.stack}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center max-w-xl mx-auto"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRetry}
                disabled={retrying}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 w-full"
              >
                <RefreshCw className={`w-5 h-5 ${retrying ? 'animate-spin' : ''}`} />
                {retrying ? 'Retrying...' : 'Try Again'}
              </motion.button>

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

              <Link href="/" passHref>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(107, 114, 128, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 w-full"
                >
                  <Home className="w-5 h-5" />
                  Go Home
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="mt-12 text-center"
          >
            <h3 className="text-xl font-bold text-white mb-4">Quick Links:</h3>
            <div className="flex flex-wrap justify-center gap-4 text-lg">
              <Link href="/services" passHref>
                <motion.a
                  whileHover={{ scale: 1.05, color: 'rgb(147, 197, 253)' }}
                  className="text-gray-300 hover:underline flex items-center gap-1 transition-colors"
                >
                  <Zap className="w-4 h-4" /> Our Services
                </motion.a>
              </Link>
              <Link href="/projects" passHref>
                <motion.a
                  whileHover={{ scale: 1.05, color: 'rgb(147, 197, 253)' }}
                  className="text-gray-300 hover:underline flex items-center gap-1 transition-colors"
                >
                  <Terminal className="w-4 h-4" /> View Projects
                </motion.a>
              </Link>
              <Link href="/blog" passHref>
                <motion.a
                  whileHover={{ scale: 1.05, color: 'rgb(147, 197, 253)' }}
                  className="text-gray-300 hover:underline flex items-center gap-1 transition-colors"
                >
                  <BookOpen className="w-4 h-4" /> Read Blog
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