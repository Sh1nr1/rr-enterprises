// app/solutions/page.tsx
"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  MapPin,
  Hammer,
  Building,
  ChevronRight,
  CheckCircle,
  Home,
  Shield,
  BarChart3,
  Settings,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { motion, easeOut, Transition } from "framer-motion";
import { useTheme } from "next-themes";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { Badge } from "@/components/ui/badge";

// Import dynamic from next/dynamic
import dynamic from 'next/dynamic';

// --- Dynamic import for ThreeJSModel with better loading state ---
const DynamicThreeJSModel = dynamic(() => import('@/components/three-model'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full min-h-[192px] bg-gray-100 dark:bg-gray-800 rounded-xl text-sm text-gray-500 dark:text-gray-400 animate-pulse">
      <div className="flex flex-col items-center space-y-2">
        <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin" />
        <span>Loading 3D Model...</span>
      </div>
    </div>
  ),
});

// --- Memoized Framer Motion Variants ---
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};

const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardHoverVariants = {
  initial: { scale: 1, boxShadow: "0 0 0px rgba(0,0,0,0)" },
  darkHover: {
    scale: 1.03,
    boxShadow:
      "0 0 25px rgba(255, 165, 0, 0.4), 0 0 40px rgba(255, 69, 0, 0.2)",
    transition: { type: "spring", stiffness: 300, damping: 20 } as Transition,
  },
  lightHover: {
    scale: 1.03,
    boxShadow:
      "0 0 25px rgba(59, 130, 246, 0.4), 0 0 40px rgba(34, 197, 94, 0.2)",
    transition: { type: "spring", stiffness: 300, damping: 20 } as Transition,
  },
};

// --- Memoized Stat Card Component ---
interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  isDark: boolean;
}

const StatCard = React.memo(({ icon: Icon, label, value, isDark }: StatCardProps) => {
  const combinedVariants = useMemo(() => ({
    ...fadeInUp,
    ...cardHoverVariants,
  }), []);

  return (
    <motion.div
      variants={combinedVariants}
      initial="initial"
      whileInView="animate"
      whileHover={isDark ? "darkHover" : "lightHover"}
      viewport={{ once: true, margin: "-50px" }} // Optimized viewport
      className={`p-6 rounded-xl backdrop-blur-lg border text-center relative overflow-hidden
      ${isDark ? "bg-gray-800/30 border-gray-700/50" : "bg-white/30 border-gray-200/50"}
    `}
    >
      <div
        className={`absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
      ${isDark ? "bg-orange-500/10" : "bg-blue-500/10"}
    `}
      />
      <div className="relative z-10">
        <Icon
          className={`w-8 h-8 mx-auto mb-3 ${isDark ? "text-orange-400" : "text-blue-600"}`}
        />
        <div
          className={`text-3xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-800"}`}
        >
          {value}
        </div>
        <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          {label}
        </div>
      </div>
    </motion.div>
  );
});

StatCard.displayName = 'StatCard';

// --- Optimized Service Card Component ---
interface Service {
  title: string;
  icon: React.ElementType;
  type: string;
  description: string;
  features: string[];
  processes: string[];
}

interface ServiceCardProps {
  service: Service;
  isDark: boolean;
}

const ServiceCard = React.memo(({ service, isDark }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isMobile, setIsMobile] = useState(false);

  // Optimized mobile detection with useCallback
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, [checkMobile]);

  // Throttled mouse move handler for better performance
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current && !isMobile) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setMousePosition({ x: -100, y: -100 });
    }
  }, [isMobile]);

  const combinedVariants = useMemo(() => ({
    ...fadeInUp,
    ...cardHoverVariants,
  }), []);

  // Memoized style calculation
  const mouseStyle = useMemo(() => ({
    background: `radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), ${isDark ? "rgba(255, 165, 0, 0.15)" : "rgba(59, 130, 246, 0.15)"}, transparent 80%)`,
    "--mouse-x": `${mousePosition.x}px`,
    "--mouse-y": `${mousePosition.y}px`,
  } as React.CSSProperties), [isDark, mousePosition.x, mousePosition.y]);

  return (
    <motion.div
      ref={cardRef}
      variants={combinedVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }} // Optimized viewport
      className={`group relative overflow-hidden rounded-2xl border backdrop-blur-lg transition-all duration-500
                [transform-style:preserve-3d] [perspective:1000px]
        ${isDark
          ? "bg-gray-900/30 border-gray-700/50"
          : "bg-white/30 border-gray-200/50"
        }`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: isMobile ? 0.98 : 1 }}
      whileHover={isMobile ? {} : (isDark ? "darkHover" : "lightHover")}
    >
      {!isMobile && (
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-radial opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
          style={mouseStyle}
        />
      )}

      <div
        className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isDark
            ? "bg-gradient-to-r from-orange-500/10 via-red-500/10 to-yellow-500/10"
            : "bg-gradient-to-r from-blue-500/10 via-green-500/10 to-teal-500/10"
          } animate-gradient-x`}
      />

      <div className="relative z-10 p-8 [transform:translateZ(20px)] group-hover:[transform:translateZ(40px)] transition-transform duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div
              className={`p-3 rounded-xl transition-all duration-300
              ${isDark
                  ? "bg-gradient-to-br from-orange-500/20 to-red-500/20 group-hover:bg-orange-600/30"
                  : "bg-gradient-to-br from-blue-500/20 to-green-500/20 group-hover:bg-blue-600/30"
                }`}
            >
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.2, rotate: 15 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <service.icon
                  className={`w-6 h-6 ${isDark ? "text-orange-400 group-hover:text-white" : "text-blue-600 group-hover:text-white"}`}
                />
              </motion.div>
            </div>
            <div>
              <h3 className={`text-xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-800"}`}>
                {service.title}
              </h3>
              <Badge variant="outline" className={`text-xs ${isDark ? "border-orange-400/50 text-orange-400" : "border-blue-400/50 text-blue-600"}`}>
                {service.type}
              </Badge>
            </div>
          </div>
          <ChevronRight className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
        </div>

        <p className={`mb-6 leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          {service.description}
        </p>

        {/* 3D Model Section - Lazy loaded only when in viewport */}
        <div className="mb-6 h-48 rounded-xl overflow-hidden border border-gray-200/20">
          <DynamicThreeJSModel type={service.type} isDark={isDark} />
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className={`text-sm font-semibold mb-3 ${isDark ? "text-orange-400" : "text-blue-600"}`}>
            Key Features
          </h4>
          <div className="space-y-2">
            {service.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-2"
              >
                <CheckCircle className={`w-4 h-4 flex-shrink-0 ${isDark ? "text-green-400" : "text-green-600"}`} />
                <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Processes */}
        <div>
          <h4 className={`text-sm font-semibold mb-3 ${isDark ? "text-orange-400" : "text-blue-600"}`}>
            Process Steps
          </h4>
          <div className="space-y-2">
            {service.processes.map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="flex items-start space-x-3"
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5
                  ${isDark ? "bg-orange-500/20 text-orange-400" : "bg-blue-500/20 text-blue-600"}`}>
                  {index + 1}
                </div>
                <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {process}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

ServiceCard.displayName = 'ServiceCard';

// --- Main Landing Page Component ---
const LandingPage = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Fix theme synchronization issue
  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
  }, []);

  // Prevent theme flashing by using mounted state
  const isDark = mounted ? resolvedTheme === "dark" : false;

  // Memoized services data to prevent unnecessary re-renders
  const services: Service[] = useMemo(() => [
    {
      title: "Site Preparation",
      icon: MapPin,
      type: "site-preparation",
      description: "Comprehensive site assessment, soil analysis, and terrain preparation for optimal solar panel installation.",
      features: [
        "Geological survey and soil testing",
        "Environmental impact assessment",
        "Utility connection planning",
        "Permit acquisition support"
      ],
      processes: [
        "Initial site inspection and feasibility study",
        "Topographical mapping and analysis",
        "Soil composition testing",
        "Infrastructure planning and design"
      ]
    },
    {
      title: "Installation",
      icon: Hammer,
      type: "installation",
      description: "Professional installation of high-efficiency solar panels with industry-leading mounting systems and electrical connections.",
      features: [
        "High-efficiency solar panels",
        "Advanced mounting systems",
        "Grid-tie inverter installation",
        "Electrical safety compliance"
      ],
      processes: [
        "Foundation and mounting structure setup",
        "Solar panel array installation",
        "Electrical wiring and connections",
        "System testing and commissioning"
      ]
    },
    {
      title: "Monitoring",
      icon: Building,
      type: "monitoring",
      description: "24/7 system monitoring with real-time performance analytics and predictive maintenance capabilities.",
      features: [
        "Real-time performance tracking",
        "Predictive maintenance alerts",
        "Mobile app dashboard",
        "Energy production analytics"
      ],
      processes: [
        "Sensor installation and calibration",
        "Data collection system setup",
        "Performance baseline establishment",
        "Ongoing monitoring and optimization"
      ]
    }
  ], []);

  // Memoized stats data
  const stats = useMemo(() => [
    { icon: Home, label: "Projects Completed", value: "12+" },
    { icon: Shield, label: "Years Experience", value: "9+" },
    { icon: BarChart3, label: "Energy Generated", value: "50MW+" },
    { icon: Settings, label: "Certified Installers", value: "12+" }
  ], []);

  // Show loading state until theme is resolved
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-2 border-blue-600 dark:border-orange-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-600 dark:text-gray-400">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <Navbar />

      {/* Breadcrumb Support */}
      <nav className={`container mx-auto px-6 py-4 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`} aria-label="breadcrumb">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link href="/" className={`${isDark ? "hover:text-white" : "hover:text-gray-800"}`}>
              Home
            </Link>
            <ChevronRight className={`h-3 w-3 mx-2 ${isDark ? "text-gray-600" : "text-gray-400"}`} />
          </li>
          <li className="flex items-center">
            <span className={`${isDark ? "text-white font-semibold" : "text-gray-800 font-semibold"}`}>Solutions</span>
          </li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-8 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className={`absolute inset-0 ${isDark
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900/20"
            : "bg-gradient-to-br from-blue-50 via-white to-green-50"}`} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-full px-6 py-3 mb-8 border border-orange-200/20"
            >
              <Sparkles className={`w-5 h-5 ${isDark ? "text-orange-400" : "text-orange-600"}`} />
              <span className={`text-sm font-semibold ${isDark ? "text-orange-400" : "text-orange-600"}`}>
                Next-Generation Solar Solutions
              </span>
            </motion.div>

            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
              Powering Tomorrow with{" "}
              <span className={`bg-gradient-to-r bg-clip-text text-transparent ${isDark
                ? "from-orange-400 to-yellow-400"
                : "from-blue-600 to-green-600"}`}>
                Clean Energy
              </span>
            </h1>

            <p className={`text-xl mb-8 leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Transform your property with our comprehensive solar installation services.
              From site preparation to ongoing monitoring, we deliver sustainable energy solutions that last.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/quote">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: isDark ? "0 0 30px rgba(255, 165, 0, 0.3)" : "0 0 30px rgba(59, 130, 246, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 ${isDark
                    ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    : "bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    }`}
                >
                  Get Free Quote
                </motion.button>
              </Link>

              <Link href="/services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-4 rounded-xl font-semibold border-2 transition-all duration-300 ${isDark
                    ? "border-orange-400 text-orange-400 hover:bg-orange-400/10"
                    : "border-blue-600 text-blue-600 hover:bg-blue-600/10"
                    }`}
                >
                  Learn More
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} isDark={isDark} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
              Our Services
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              End-to-end solar solutions designed to maximize efficiency and minimize environmental impact.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} isDark={isDark} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`rounded-3xl p-12 text-center relative overflow-hidden ${isDark
              ? "bg-gradient-to-br from-gray-800/50 to-orange-900/30 border border-gray-700/50"
              : "bg-gradient-to-br from-blue-50/50 to-green-50/50 border border-gray-200/50"}`}
          >
            <div className="relative z-10">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
                Ready to Go Solar?
              </h2>
              <p className={`text-xl mb-8 max-w-2xl mx-auto ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                Join thousands of satisfied customers who have made the switch to clean, renewable energy.
              </p>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-10 py-4 rounded-xl font-semibold text-white text-lg transition-all duration-300 ${isDark
                    ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    : "bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    }`}
                >
                  Start Your Solar Journey
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ThemeToggle />
    </div>
  );
};

export default LandingPage;