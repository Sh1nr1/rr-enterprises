"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head'; // For SEO metadata
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Home, Mail, RefreshCw, ChevronDown, ChevronUp, Terminal, Zap, BookOpen, Building, Briefcase, Calculator} from 'lucide-react';
import Navbar from '@/components/layout/Navbar'; // Assuming you have a Navbar component
import Footer from '@/components/layout/Footer'; // Assuming you have a Footer component
import ThemeToggle from '@/components/layout/ThemeToggle'; // Assuming you have a ThemeToggle component

export const metadata = {
  title: 'Error - RR Enterprises',
  description: 'Something went wrong, or the page you are looking for does not exist on RR Enterprises website.',
};

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

  // Determine if running on client-side to access window object
  const isBrowser = typeof window !== 'undefined';

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

interface NotFoundPageProps {
  onNavigate: (destination: string) => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex flex-col"
    >
      <FloatingParticles />
      <SpaceAnimation />

      <Navbar /> {/* Integrated Navbar */}

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] p-8 flex-grow"> {/* Adjust min-h to account for Navbar */}
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
};

interface ErrorPageProps {
  onNavigate: (destination: string) => void;
  errorDetails?: {
    code?: string;
    message?: string;
    trace?: string;
  };
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorDetails }) => {
  const [showTrace, setShowTrace] = useState(false);
  const [retrying, setRetrying] = useState(false);

  const handleRetry = () => {
    setRetrying(true);
    // Simulate retry logic
    setTimeout(() => {
      setRetrying(false);
      // In a real app, you might re-fetch data or redirect to a safe page
      window.location.reload(); // Simple reload for demonstration
    }, 2000);
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

      {/* Error Animation */}
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
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] p-8 flex-grow"> {/* Adjust min-h to account for Navbar */}
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
                  <strong>Error Code:</strong> {errorDetails?.code || 'SYS_0x7F'} - {errorDetails?.message || 'Quantum flux capacitor overflow'}
                </AlertDescription>
              </Alert>
            </motion.div>

            {/* Error Trace Toggle */}
            {errorDetails?.trace && (
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
                        {errorDetails.trace}
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
};

export default function ErrorDemoPage() {
  const [currentPage, setCurrentPage] = useState<'404' | 'error'>('404');

  // Sample error details for demonstration
  const sampleErrorDetails = {
    code: 'QUANTUM_0x42',
    message: 'Dimensional matrix synchronization failed',
    trace: `Stack trace:
    at QuantumProcessor.initialize() line 42
    at DimensionalMatrix.sync() line 127
    at HyperDrive.engage() line 89
    at StarshipEnterprise.warp() line 256
    at Universe.expand() line ∞

Error: Quantum entanglement disrupted
    Expected: stable quantum state
    Received: chaotic probability wave

System attempting auto-recovery...
Recovery failed: insufficient dilithium crystals
Please contact technical support for manual intervention.`
  };

  // This function is for internal demo toggling; actual navigation uses Next.js Link
  const handleNavigate = (destination: string) => {
    console.log(`Demo Navigation: ${destination}`);
    // In a real app, this would use router.push for client-side navigation
  };

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <div className="relative">
        {/* Toggle Buttons for Demo - for `app/blog/error/page.tsx` this section would be removed,
            as it simulates different error states. In a real error page, only the ErrorPage component
            would be directly rendered with actual error data. */}
        <div className="fixed top-4 left-4 z-[100] flex gap-2"> {/* Increased z-index */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage('404')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              currentPage === '404'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            404 Page
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage('error')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              currentPage === 'error'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Error Page
          </motion.button>
        </div>
        <div className="fixed top-4 right-4 z-[100]">
          <ThemeToggle /> {/* Theme Toggle */}
        </div>

        {/* Page Content */}
        <AnimatePresence mode="wait">
          {currentPage === '404' ? (
            <NotFoundPage key="404" onNavigate={handleNavigate} />
          ) : (
            <ErrorPage
              key="error"
              onNavigate={handleNavigate}
              errorDetails={sampleErrorDetails}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}