"use client";

import React, { useState, useEffect } from 'react';
import { motion, Transition } from 'framer-motion';
import Link from 'next/link';
import {
  Brush,
  Hammer,
  Zap,
  Building2,
  Monitor,
  Droplets,
  Shield,
  Eye,
  Fence,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Home,
  ChevronRight as IconChevronRight,
  Settings,
  Wrench,
  BatteryCharging,
  Power,
  Leaf
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardTitle, CardDescription } from '@/components/ui/card'; // CardContent is not directly used in render, but often imported with Card
import { Badge } from '@/components/ui/badge';

// --- Reusable Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    }
  }
};

const itemEntryVariants = { // Renamed to avoid confusion with glowVariants 'initial'
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6
    } as Transition
  }
};

const glowVariants = {
  initial: { boxShadow: "0 0 0px transparent" },
  darkHover: {
    boxShadow: "0 0 15px rgba(0, 255, 255, 0.6), 0 0 30px rgba(0, 255, 255, 0.4)", // Cyan glow
    transition: { duration: 0.3 }
  },
  lightHover: {
    boxShadow: "0 0 15px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4)", // Blue glow
    transition: { duration: 0.3 }
  }
};

// Combine item entry animation and glow variants for ServiceCard
const combinedServiceCardVariants = {
  ...itemEntryVariants, // Includes hidden and visible for staggered entry
  ...glowVariants,      // Includes initial, darkHover, lightHover for hover effects
};

// --- Breadcrumb Component (Theme-Aware) ---
interface BreadcrumbItem {
  label: string;
  href: string;
}

const Breadcrumb = ({ items, isDark }: { items: BreadcrumbItem[]; isDark: boolean }) => (
  <motion.nav
    className="flex mb-8"
    aria-label="Breadcrumb"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <ol className="inline-flex items-center space-x-1 md:space-x-2">
      {items.map((item, index) => (
        <li key={item.href} className="inline-flex items-center">
          {index > 0 && <IconChevronRight className={`w-4 h-4 ${isDark ? "text-gray-500" : "text-gray-400"}`} />}
          <Link href={item.href} passHref>
            <motion.span
              className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${
                index === items.length - 1
                  ? (isDark ? 'text-cyan-400' : 'text-blue-600')
                  : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900')
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label === 'Home' && <Home className="w-4 h-4" />}
              {item.label}
            </motion.span>
          </Link>
        </li>
      ))}
    </ol>
  </motion.nav>
);

// --- Futuristic Service Card Component ---
interface Service {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
}

const ServiceCard = ({ service, isDark }: { service: Service; isDark: boolean }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current && !isMobile) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setMousePosition({ x: -100, y: -100 });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      // Use the combined variants object here for both entry and hover
      variants={combinedServiceCardVariants}
      // Set the initial state for the staggered entry animation
      initial="hidden"
      // Set the hover state, which will use the 'darkHover' or 'lightHover' from combinedServiceCardVariants
      whileHover={isMobile ? {} : (isDark ? 'darkHover' : 'lightHover')}
      // Set the state for when the component comes into view (staggered effect)
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="group relative overflow-hidden rounded-2xl transition-all duration-300 [transform-style:preserve-3d]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: isMobile ? 0.98 : 1 }}
      // Note: 'initial' prop here now refers to combinedServiceCardVariants.initial
      // which comes from glowVariants.initial. This is correct for the boxShadow initial state.
    >
      <Card
        className="h-full p-6 relative z-10 flex flex-col justify-between"
        // Apply CSS variables for the radial gradient only if not on mobile
        style={!isMobile ? { '--mouse-x': `${mousePosition.x}px`, '--mouse-y': `${mousePosition.y}px` } as React.CSSProperties : undefined}
      >
        {!isMobile && (
          <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
                           ${isDark ? 'from-cyan-400/20' : 'from-blue-500/20'}
                          `}
               style={{
                 background: `radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), ${isDark ? 'rgba(0, 255, 255, 0.15)' : 'rgba(59, 130, 246, 0.15)'}, transparent 80%)`
               }}
          />
        )}

        <div className="relative z-20 flex flex-col h-full transition-transform duration-300 [transform:translateZ(20px)] group-hover:[transform:translateZ(40px)]">
          <div
            className={`inline-flex p-3 rounded-xl mb-4 transition-all duration-300 ease-in-out
                            ${isDark ? 'bg-gray-700/50 group-hover:bg-cyan-900/40 group-hover:shadow-lg group-hover:shadow-cyan-500/10' : 'bg-gray-100 group-hover:bg-blue-100 group-hover:shadow-lg group-hover:shadow-blue-500/10'}
                            ${isMobile ? 'group-hover:scale-105' : ''}
                          `}
          >
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <service.icon className={`w-7 h-7 transition-all duration-300 ease-in-out ${isDark ? 'text-gray-300 group-hover:text-cyan-300' : 'text-gray-600 group-hover:text-blue-600'}`} />
            </motion.div>
          </div>
          <CardTitle className={`text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-cyan-300 dark:group-hover:text-cyan-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <span className="relative inline-block">
              {service.title}
              <motion.span
                className={`absolute left-0 bottom-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300
                                ${isDark ? 'bg-gradient-to-r from-cyan-400 to-purple-400' : 'bg-gradient-to-r from-blue-500 to-indigo-500'}
                              `}
              />
            </span>
          </CardTitle>
          <CardDescription className={`text-sm mb-4 flex-grow ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {service.description}
          </CardDescription>
          <div className={`inline-flex items-center gap-2 text-sm font-semibold mt-auto transition-colors duration-300 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>
            Enquire Now <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Card>
      <Link href="/contact" className="absolute inset-0 z-30" aria-label={`Learn more about ${service.title}`}></Link>
    </motion.div>
  );
};

// --- USP Item Component ---
const USPItem = ({ icon: Icon, title, description, isDark }: { icon: React.ElementType, title: string, description: string, isDark: boolean }) => (
  <motion.div
    className={`flex flex-col items-center text-center p-6 rounded-xl relative
      ${isDark ? 'bg-gray-800/20 border border-gray-700/50' : 'bg-white/50 border border-gray-200/80'}
      backdrop-blur-sm shadow-xl`}
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
  >
    <motion.div
      className={`p-3 rounded-full mb-4 relative ${isDark ? 'bg-cyan-900/40 text-cyan-300' : 'bg-blue-100 text-blue-600'}`}
      animate={{
        boxShadow: [
          `0 0 0px ${isDark ? 'rgba(0, 255, 255, 0.4)' : 'rgba(59, 130, 246, 0.4)'}`,
          `0 0 15px ${isDark ? 'rgba(0, 255, 255, 0.8)' : 'rgba(59, 130, 246, 0.8)'}`,
          `0 0 0px ${isDark ? 'rgba(0, 255, 255, 0.4)' : 'rgba(59, 130, 246, 0.4)'}`,
        ]
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <Icon className="w-8 h-8" />
    </motion.div>
    <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
  </motion.div>
);


const ServicesPage = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  const services: Service[] = [
    { id: 'site-cleaning', title: 'Site Cleaning', icon: Brush, description: 'Comprehensive site preparation to ensure optimal conditions for solar installation projects.' },
    { id: 'piling-works', title: 'Piling Works', icon: Hammer, description: 'Professional foundation piling for secure and stable solar panel mounting structures.' },
    { id: 'ac-dc-works', title: 'AC & DC Works', icon: Zap, description: 'Expert electrical installation for all AC and DC components of solar energy systems.' },
    { id: 'equipment-foundation', title: 'Equipment Foundation', icon: Building2, description: 'Robust foundation construction for solar equipment, ensuring long-term stability and performance.' },
    { id: 'module-installation', title: 'Module Installation', icon: Monitor, description: 'Complete installation and commissioning of solar modules and their monitoring structures.' },
    { id: 'cleaning-system', title: 'Module Cleaning System', icon: Droplets, description: 'Advanced automated cleaning systems to maintain peak solar panel efficiency.' },
    { id: 'control-room', title: 'Main Control Room', icon: Shield, description: 'State-of-the-art control room construction for centralized plant monitoring and management.' },
    { id: 'la-earthing', title: 'LA & Earthing', icon: Settings, description: 'Lightning arrestor and earthing system installation for enhanced safety and equipment protection.' },
    { id: 'cctv-installation', title: 'CCTV Installation', icon: Eye, description: 'Comprehensive surveillance system installation for the security of solar assets.' },
    { id: 'chain-link-fencing', title: 'Chain Link Fencing', icon: Fence, description: 'Perimeter security fencing installation to protect the solar plant and ensure site safety.' },
    { id: 'plant-testing', title: 'Plant Testing', icon: CheckCircle, description: 'Comprehensive testing services to ensure optimal solar plant performance and compliance.' },
    { id: 'maintenance-support', title: 'O&M Support', icon: Wrench, description: 'Ongoing operations and maintenance support to ensure long-term system efficiency.' }
  ];

  const uspItems = [
    { title: 'Efficiency', icon: BatteryCharging, description: 'Maximizing energy output with optimized solutions.' },
    { title: 'Reliability', icon: Power, description: 'Ensuring consistent performance and minimal downtime.' },
    { title: 'Sustainability', icon: Leaf, description: 'Committed to eco-friendly and lasting energy solutions.' },
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-cyan-400"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-gray-200' : 'bg-gray-50 text-gray-800'} font-sans transition-colors duration-500`}>
      <Navbar />

      {/* Main Content Area */}
      <main className="relative z-10 container mx-auto px-4 py-16 sm:py-20 md:py-24">
        {/* Background Gradients / Neon Blobs */}
        <div className={`fixed inset-0 overflow-hidden pointer-events-none transition-opacity duration-1000 ${isDark ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-gradient-radial from-cyan-500/20 to-transparent blur-3xl animate-blob-slow-1" />
          <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-gradient-radial from-purple-500/20 to-transparent blur-3xl animate-blob-slow-2" />
          <div className="absolute top-1/4 right-1/4 w-1/3 h-1/3 rounded-full bg-gradient-radial from-blue-500/20 to-transparent blur-3xl animate-blob-slow-3" />
          {/* Subtle moving particles/grid overlay for futuristic feel */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] dark:bg-[url('/grid-dark.svg')] opacity-5 dark:opacity-10 pointer-events-none animate-grid-pulse"></div>
        </div>

        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }]} isDark={isDark} />

        <motion.header
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <Badge variant="outline" className={`inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border ${isDark ? 'border-cyan-400/20 bg-cyan-900/10 text-cyan-300' : 'border-blue-600/20 bg-blue-50 text-blue-700'}`}>
            <Sparkles className={`w-5 h-5`} />
            <span className={`text-sm font-medium`}>COMPREHENSIVE SOLAR CONSTRUCTION</span>
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Our Core <span className={`bg-clip-text text-transparent ${isDark ? 'bg-gradient-to-r from-cyan-400 to-purple-400' : 'bg-gradient-to-r from-blue-600 to-indigo-600'}`}>Services</span>
          </h1>
          <p className={`text-lg max-w-3xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            From site preparation to final commissioning, RR Enterprises provides end-to-end solar construction services with cutting-edge technology and expert craftsmanship.
          </p>
        </motion.header>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 [perspective:1000px]"
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} isDark={isDark} />
          ))}
        </motion.div>

        {/* Optional Feature Strip / USP Highlight Section */}
        <motion.section
          className="mt-20 md:mt-28"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Why Choose Our Futuristic Approach?
          </h2>
          <div className="flex overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-6 lg:grid lg:grid-cols-3 lg:gap-8 justify-start lg:justify-items-center scrollbar-hide">
            {uspItems.map((item) => (
              <USPItem key={item.title} {...item} isDark={isDark} />
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className={`text-center mt-20 md:mt-28 p-8 md:p-12 rounded-2xl border
            ${isDark ? 'bg-gray-800/20 border-gray-700/50' : 'bg-white/50 border-gray-200/80'} backdrop-blur-sm`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Build the Future of Energy?
          </h2>
          <p className={`text-lg mb-6 max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Let&apos;s discuss how our expertise can bring your solar project to life. Get a comprehensive consultation and a detailed quote from our specialists.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="px-8 py-6 text-base font-bold transition-all duration-300 hover:scale-105 transform-gpu" asChild>
              <Link href="/contact">
                Request a Quote
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 text-base font-bold transition-all duration-300 hover:scale-105 transform-gpu" asChild>
              <Link href="/projects">
                See Our Projects <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;