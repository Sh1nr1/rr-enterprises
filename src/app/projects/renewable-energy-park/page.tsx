"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Sun, Zap, Calendar, Users, MapPin, Play, Pause, ChevronRight as IconChevronRight, Home,  BookOpen, Briefcase, Calculator, Phone,  Wind, Droplets, PanelBottom } from 'lucide-react'; // Added new icons for renewable energy
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ThemeToggle from '@/components/layout/ThemeToggle';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

// --- Breadcrumb Component ---
interface BreadcrumbProps {
  items: { label: string; href: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const { theme } = useTheme();
  // Ensure isDarkMode is only derived after the component has mounted
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted ? theme === 'dark' : false; // Default to false if not mounted

  return (
    <nav className="flex mb-8" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {items.map((item, index) => (
          <li key={item.href} className="inline-flex items-center">
            {index > 0 && <IconChevronRight className="w-4 h-4 text-gray-400 mx-1" />}
            <Link href={item.href} passHref legacyBehavior>
              <motion.a
                className={`text-sm font-medium ${
                  index === items.length - 1
                    ? 'text-cyan-400 cursor-default'
                    : mounted && isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900' // Apply theme for text color conditionally
                } flex items-center transition-colors`}
                whileHover={{ scale: index === items.length - 1 ? 1 : 1.05 }}
                whileTap={{ scale: index === items.length - 1 ? 1 : 0.95 }}
              >
                {item.label === 'Home' && <Home className="w-4 h-4 mr-1" />}
                {item.label}
              </motion.a>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

// --- RenewableEnergyParkShowcase Component ---
export default function RenewableEnergyParkPage() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [beforeAfter, setBeforeAfter] = useState(50);

  // Use useTheme hook and add mounted state
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after the component mounts on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Derive isDarkMode only when mounted
  const isDarkMode = mounted ? (theme === 'dark' || (theme === 'system' && systemTheme === 'dark')) : false;

  // Sample project images for Renewable Energy Park
  const projectImages = [
    'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Solar panels
    'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Wind turbines
    'https://plus.unsplash.com/premium_photo-1664299486163-8a7415bec73f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Hydroelectric
    'https://images.unsplash.com/photo-1545208942-e1c9c916524b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // General energy park
  ];

  // Auto-advance carousel
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % projectImages.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, projectImages.length]);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % projectImages.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + projectImages.length) % projectImages.length);

  // Apply theme classes conditionally based on mounted state
  const themeClasses = mounted && isDarkMode
    ? 'bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white' // Dark green theme for renewable
    : 'bg-gradient-to-br from-green-50 via-white to-green-100 text-gray-900'; // Light green theme

  const cardClasses = mounted && isDarkMode
    ? 'bg-green-800/40 border-green-700/50 hover:bg-green-800/60'
    : 'bg-white/40 border-green-200/50 hover:bg-white/60';

  const glowClasses = mounted && isDarkMode
    ? 'shadow-[0_0_30px_rgba(0,255,0,0.3),_0_0_60px_rgba(0,200,0,0.2)]' // Green glow for renewable
    : 'shadow-[0_0_20px_rgba(0,255,0,0.1),_0_0_40px_rgba(0,200,0,0.08)]';

  const titleGradient = mounted && isDarkMode
    ? 'from-emerald-400 via-lime-500 to-green-600' // Dark mode green gradient
    : 'from-emerald-600 via-lime-700 to-green-800'; // Light mode green gradient

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
        <div className="text-xl text-gray-700 dark:text-gray-300 animate-pulse">
          
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${themeClasses}`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 50, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full ${
            mounted && isDarkMode ? 'bg-gradient-to-br from-green-500/10 to-teal-500/5' : 'bg-gradient-to-br from-green-500/5 to-teal-500/3'
          } blur-3xl`}
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
          className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full ${
            mounted && isDarkMode ? 'bg-gradient-to-br from-blue-500/10 to-emerald-500/5' : 'bg-gradient-to-br from-blue-500/5 to-emerald-500/3'
          } blur-3xl`}
        />
      </div>

      <Navbar />
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12 pt-28">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Projects', href: '/projects' },
            { label: 'Renewable Energy Park', href: '/projects/renewable_energy_park' },
          ]} />
        </motion.div>

        {/* Header Section */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.h1
            className={`text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${titleGradient}`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Renewable Energy Park
          </motion.h1>
          <motion.p
            className={`text-xl md:text-2xl ${mounted && isDarkMode ? 'opacity-70' : 'opacity-80'} mb-8 max-w-3xl mx-auto`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            A large-scale integrated renewable energy project for Green Energy Corp, harnessing solar, wind, and hydro power for a sustainable future.
          </motion.p>
        </motion.header>

        {/* Image Carousel */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <div className={`relative rounded-3xl overflow-hidden border p-2 ${cardClasses} ${glowClasses}`}>
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden">
              <AnimatePresence initial={false} mode="wait">
                <motion.img
                  key={currentImage}
                  src={projectImages[currentImage]}
                  alt={`Renewable Energy Project ${currentImage + 1}`}
                  className="w-full h-full object-cover absolute inset-0"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  loading="lazy"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

              {/* Carousel Controls */}
              <Button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all text-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all text-white"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              {/* Play/Pause */}
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute bottom-4 right-4 p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all text-white"
                aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {projectImages.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentImage === index ? 'bg-green-400 scale-125' : 'bg-white/50'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Project Overview */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-12"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className={`p-8 rounded-3xl border transition-all duration-300 ${cardClasses} ${glowClasses}`}
              whileHover={{ scale: 1.01, boxShadow: mounted && isDarkMode ? "0 0 40px rgba(0,255,0,0.4)" : "0 0 30px rgba(0,255,0,0.2)" }}
            >
              <h3 className={`text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r ${titleGradient}`}>Project Overview</h3>
              <div className="space-y-4">
                <div className={`flex items-center space-x-3 ${mounted && isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  <MapPin className="w-5 h-5 text-green-400" />
                  <span className="text-lg">Indore, Madhya Pradesh, India</span>
                </div>
                <div className={`flex items-center space-x-3 ${mounted && isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-lg">Green Energy Corp</span>
                </div>
                <p className={`text-lg leading-relaxed ${mounted && isDarkMode ? 'opacity-80' : 'opacity-90'}`}>
                  Development of a sprawling **100-acre renewable energy park**, integrating **solar, wind, and hydro power** generation.
                  This ambitious project aims to significantly contribute to clean energy production and set a benchmark for sustainable infrastructure.
                </p>
              </div>
            </motion.div>

            {/* Key Stats */}
            <motion.div
              className={`p-8 rounded-3xl border transition-all duration-300 ${cardClasses} ${glowClasses}`}
              whileHover={{ scale: 1.01, boxShadow: mounted && isDarkMode ? "0 0 40px rgba(0,200,0,0.4)" : "0 0 30px rgba(0,200,0,0.2)" }}
            >
              <h3 className={`text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r ${titleGradient}`}>Key Statistics</h3>
              <div className="grid grid-cols-2 gap-6">
                <motion.div className="text-center" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.9, type: "spring" }}>
                  <div className="flex items-center justify-center mb-2">
                    <PanelBottom className="w-7 h-7 text-yellow-400" />
                  </div>
                  <div className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${mounted && isDarkMode ? 'from-yellow-300 to-amber-400' : 'from-yellow-600 to-amber-700'}`}>50MW</div>
                  <div className={`text-sm ${mounted && isDarkMode ? 'opacity-70' : 'opacity-80'}`}>Solar Capacity</div>
                </motion.div>
                <motion.div className="text-center" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 1.0, type: "spring" }}>
                  <div className="flex items-center justify-center mb-2">
                    <Wind className="w-7 h-7 text-blue-400" />
                  </div>
                  <div className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${mounted && isDarkMode ? 'from-blue-300 to-cyan-400' : 'from-blue-600 to-cyan-700'}`}>30MW</div>
                  <div className={`text-sm ${mounted && isDarkMode ? 'opacity-70' : 'opacity-80'}`}>Wind Capacity</div>
                </motion.div>
                <motion.div className="text-center" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 1.1, type: "spring" }}>
                  <div className="flex items-center justify-center mb-2">
                    <Droplets className="w-7 h-7 text-teal-400" />
                  </div>
                  <div className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${mounted && isDarkMode ? 'from-teal-300 to-emerald-400' : 'from-teal-600 to-emerald-700'}`}>20MW</div>
                  <div className={`text-sm ${mounted && isDarkMode ? 'opacity-70' : 'opacity-80'}`}>Hydro Capacity</div>
                </motion.div>
                <motion.div className="text-center" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 1.2, type: "spring" }}>
                  <div className="flex items-center justify-center mb-2">
                    <Calendar className="w-7 h-7 text-purple-400" />
                  </div>
                  <div className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${mounted && isDarkMode ? 'from-purple-300 to-pink-400' : 'from-purple-600 to-pink-700'}`}>24</div>
                  <div className={`text-sm ${mounted && isDarkMode ? 'opacity-70' : 'opacity-80'}`}>Months</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Before/After Slider */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-12"
        >
          <div className={`p-8 rounded-3xl border transition-all duration-300 ${cardClasses} ${glowClasses}`}>
            <h3 className={`text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r ${titleGradient}`}>Visual Transformation</h3>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/flagged/photo-1585003852902-6d5efdf2b8fd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Placeholder for "Before" (e.g., barren land)
                alt="Before development"
                className="w-full h-full object-cover absolute top-0 left-0"
                style={{ clipPath: `inset(0 ${100 - beforeAfter}% 0 0)` }}
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1686645951736-5a912cb427f6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Placeholder for "After" (e.g., with solar panels)
                alt="After development"
                className="w-full h-full object-cover absolute top-0 left-0"
                style={{ clipPath: `inset(0 0 0 ${beforeAfter}%)` }}
                loading="lazy"
              />

              {/* Slider Control */}
              <div className="absolute inset-0 flex items-center justify-center">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={beforeAfter}
                  onChange={(e) => setBeforeAfter(parseInt(e.target.value))}
                  className="w-full md:w-3/4 h-2 bg-gradient-to-r from-gray-500 to-green-500 rounded-lg appearance-none cursor-pointer absolute z-10"
                  style={{
                    background: `linear-gradient(to right, #6b7280 0%, #6b7280 ${beforeAfter}%, #22c55e ${beforeAfter}%, #22c55e 100%)`
                  }}
                />
                <div className="absolute w-1 h-full bg-white bg-opacity-70 shadow-lg cursor-grab" style={{ left: `${beforeAfter}%`, transform: 'translateX(-50%)' }} />
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-lg text-white text-sm">
                Before
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-lg text-white text-sm">
                After
              </div>
            </div>
          </div>
        </motion.section>

        {/* Testimonial */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="max-w-4xl mx-auto px-6 py-12"
        >
          <div className={`p-8 rounded-3xl text-center border transition-all duration-300 ${cardClasses} ${glowClasses}`}>
            <div className="mb-6">
              <motion.div
                className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-emerald-400 to-green-500 flex items-center justify-center mb-4 text-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.3, type: "spring", stiffness: 200 }}
              >
                <span className="text-2xl font-bold">SN</span>
              </motion.div>
              <h4 className={`text-xl font-semibold ${mounted && isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sneha Narayan</h4>
              <p className="text-green-400 font-medium">Chief Sustainability Officer, Green Energy Corp</p>
            </div>
            <blockquote className={`text-2xl font-light leading-relaxed mb-6 italic ${mounted && isDarkMode ? 'text-slate-200' : 'text-gray-800'}`}>
              &apos;RR Enterprises&apos; expertise in renewable energy is truly outstanding. The Indore Energy Park is a testament to their commitment to green technology and efficient project delivery. A vital step towards a carbon-neutral future!&apos;
            </blockquote>
            <div className="flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 + i * 0.1, duration: 0.3 }}>
                  <Sun className="w-6 h-6 text-green-400 fill-current" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* --- Project Resources / Related Links Section --- */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-12 mb-20 p-8 rounded-3xl backdrop-blur-xl border text-center relative overflow-hidden"
        >
          {/* Apply cardClasses and glowClasses for consistent theming */}
          <div className={`absolute inset-0 z-0 ${cardClasses.replace('hover:bg-green-800/60', '').replace('hover:bg-white/60', '')} ${glowClasses}`} />
          <div className="relative z-10">
            <h3 className={`text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r ${titleGradient}`}>
              More Projects & Resources
            </h3>
            <p className={`text-lg mb-8 max-w-2xl mx-auto ${mounted && isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Explore more of our impactful sustainable projects or delve deeper into our green offerings.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <Link href="/projects/wind-farm-expansion" passHref legacyBehavior>
                <Button className={`w-full py-3 px-6 rounded-xl text-lg font-semibold transition-all duration-300 transform ${mounted && isDarkMode ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg' : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg'}`}
                  asChild
                >
                  <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Wind className="mr-2" /> View Our Wind Farm Expansion</motion.a>
                </Button>
              </Link>
              <Link href="/projects/solar-farm-installations" passHref legacyBehavior>
                <Button className={`w-full py-3 px-6 rounded-xl text-lg font-semibold transition-all duration-300 transform ${mounted && isDarkMode ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white shadow-lg' : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg'}`}
                  asChild
                >
                  <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><PanelBottom className="mr-2" /> Explore Our Solar Farm Projects</motion.a>
                </Button>
              </Link>
              <Link href="/services/epc-renewable" passHref legacyBehavior>
                <Button className={`w-full py-3 px-6 rounded-xl text-lg font-semibold transition-all duration-300 transform ${mounted && isDarkMode ? 'bg-gradient-to-r from-lime-600 to-green-600 hover:from-lime-700 hover:to-green-700 text-white shadow-lg' : 'bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-white shadow-lg'}`}
                  asChild
                >
                  <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Briefcase className="mr-2" /> Learn About Our Renewable EPC Services</motion.a>
                </Button>
              </Link>
              <Link href="/contact" passHref legacyBehavior>
                <Button className={`w-full py-3 px-6 rounded-xl text-lg font-semibold transition-all duration-300 transform ${mounted && isDarkMode ? 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg' : 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white shadow-lg'}`}
                  asChild
                >
                  <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Phone className="mr-2" /> Request a Green Project Quote</motion.a>
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Call to Action for other pages */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-20 p-8 rounded-3xl backdrop-blur-xl border text-center relative overflow-hidden"
        >
          {/* Apply cardClasses for consistent theming */}
          <div className={`absolute inset-0 z-0 ${cardClasses.replace('hover:bg-green-800/60', '').replace('hover:bg-white/60', '')}`} />
          <div className="relative z-10">
            <h3 className={`text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r ${titleGradient}`}>
              Discover More About RR Enterprises
            </h3>
            <p className={`text-lg mb-8 max-w-2xl mx-auto ${mounted && isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Whether you&apos;re looking for comprehensive services, a rewarding career, or insightful blog posts, we&apos;re here to help.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              <Link href="/services" passHref legacyBehavior>
                <Button className={`w-full py-3 px-6 rounded-xl text-lg font-semibold transition-all duration-300 transform ${mounted && isDarkMode ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg' : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg'}`}
                  asChild
                >
                  <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Zap className="mr-2" /> Our Services</motion.a>
                </Button>
              </Link>
              <Link href="/career" passHref legacyBehavior>
                <Button className={`w-full py-3 px-6 rounded-xl text-lg font-semibold transition-all duration-300 transform ${mounted && isDarkMode ? 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg' : 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-lg'}`}
                  asChild
                >
                  <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Briefcase className="mr-2" /> Careers</motion.a>
                </Button>
              </Link>
              <Link href="/blog" passHref legacyBehavior>
                <Button className={`w-full py-3 px-6 rounded-xl text-lg font-semibold transition-all duration-300 transform ${mounted && isDarkMode ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg' : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg'}`}
                  asChild
                >
                  <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><BookOpen className="mr-2" /> Our Blog</motion.a>
                </Button>
              </Link>
              <Link href="/calculator" passHref legacyBehavior>
                <Button className={`w-full py-3 px-6 rounded-xl text-lg font-semibold transition-all duration-300 transform ${mounted && isDarkMode ? 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-lg' : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg'}`}
                  asChild
                >
                  <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Calculator className="mr-2" /> Solar Calculator</motion.a>
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>
      </div>

      <Footer />
    </div>
  );
}