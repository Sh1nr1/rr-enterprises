"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variant, Transition, easeInOut } from 'framer-motion';
import Link from 'next/link';
import { Sun, Moon, Zap, Building, Factory, Settings, ArrowRight, Sparkles, Home, ChevronRight as IconChevronRight } from 'lucide-react'; // Renamed ChevronRight to avoid conflict
import Navbar from '@/components/layout/Navbar'; // Assuming Navbar component exists
import Footer from '@/components/layout/Footer'; // Assuming Footer component exists
import ThemeToggle from '@/components/layout/ThemeToggle'; // Assuming ThemeToggle component exists
import { Button } from '@/components/ui/button'; // Assuming ShadCN button is available

// // SEO Metadata
// export const metadata = {
//   title: 'Our Services - RR Enterprises',
//   description: 'Explore our comprehensive range of solar energy solutions, from residential installations to large-scale industrial projects. RR Enterprises: Powering a sustainable future.',
// };

// --- Breadcrumb Component ---
interface BreadcrumbProps {
  items: { label: string; href: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex mb-8" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {items.map((item, index) => (
          <li key={item.href} className="inline-flex items-center">
            {index > 0 && <IconChevronRight className="w-4 h-4 text-gray-400 mx-1" />}
            <Link href={item.href} passHref>
              <motion.a
                className={`text-sm font-medium ${
                  index === items.length - 1
                    ? 'text-cyan-400 cursor-default'
                    : 'text-gray-300 hover:text-white transition-colors'
                } flex items-center`}
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

const Services = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const services = [
    {
      id: 'residential',
      title: 'Residential Solar Installations',
      icon: Sun,
      description: 'Transform your home with cutting-edge solar technology. Custom-designed systems that maximize energy efficiency and reduce your carbon footprint.',
      gradient: 'from-amber-400 via-orange-500 to-yellow-600',
      glowColor: 'shadow-amber-500/20',
      hoverGlow: 'group-hover:shadow-amber-500/40'
    },
    {
      id: 'commercial',
      title: 'Commercial Solar Installations',
      icon: Building,
      description: 'Power your business with sustainable energy solutions. Scalable solar systems designed to meet commercial demands and boost your bottom line.',
      gradient: 'from-blue-400 via-cyan-500 to-teal-600',
      glowColor: 'shadow-blue-500/20',
      hoverGlow: 'group-hover:shadow-blue-500/40'
    },
    {
      id: 'industrial',
      title: 'Industrial Solar Projects',
      icon: Factory,
      description: 'Large-scale solar installations for industrial facilities. Engineered for maximum output and reliability in demanding environments.',
      gradient: 'from-purple-400 via-violet-500 to-indigo-600',
      glowColor: 'shadow-purple-500/20',
      hoverGlow: 'group-hover:shadow-purple-500/40'
    },
    {
      id: 'maintenance',
      title: 'Solar Maintenance & Monitoring',
      icon: Settings,
      description: 'Keep your solar investment performing at peak efficiency. Advanced monitoring systems and proactive maintenance services.',
      gradient: 'from-emerald-400 via-green-500 to-teal-600',
      glowColor: 'shadow-emerald-500/20',
      hoverGlow: 'group-hover:shadow-emerald-500/40'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.6
      } as Transition
    }
  };

  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: {
      rotate: 360,
      scale: 1.1,
      transition: { duration: 0.6, ease: easeInOut }
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Animated Background Elements (Subtle) */}
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
          className="absolute top-20 left-20 w-64 h-64 rounded-full opacity-10 blur-3xl bg-blue-500"
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
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-10 blur-3xl bg-purple-500"
        />
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 70, repeat: Infinity, ease: "linear" },
            scale: { duration: 9, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-5 blur-3xl bg-emerald-500"
        />
      </div>

      <Navbar /> {/* Integrated Navbar */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle /> {/* Integrated Theme Toggle */}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12 pt-28"> {/* Added padding top for navbar */}
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
          ]} />
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <span className="text-sm font-medium text-gray-300">PREMIUM SOLAR SOLUTIONS</span>
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Our <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-300">
            Harness the power of tomorrow with our comprehensive solar energy solutions.
            From residential installations to industrial-scale projects.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="group relative overflow-hidden rounded-2xl border border-opacity-20 border-gray-700/50 hover:bg-gray-800/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
                whileHover={{ y: -5 }}
              >
                {/* Gradient Border (Subtle) */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-sm`}></div>

                {/* Icon */}
                <motion.div
                  className={`inline-flex p-4 rounded-xl mb-6 bg-gradient-to-r ${service.gradient} shadow-lg`}
                  variants={iconVariants}
                  initial="initial"
                  whileHover="hover"
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {service.title}
                </h3>
                <p className="text-lg mb-6 leading-relaxed text-gray-300">
                  {service.description}
                </p>

                {/* CTA Button */}
                <div className="flex items-center justify-between">
                  <Button className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 bg-gray-700/50 hover:bg-gray-600/50 text-white hover:scale-105 hover:shadow-lg group/btn" asChild>
                    <Link href="/contact">
                      <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </motion.a>
                    </Link>
                  </Button>

                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-700/30 group-hover:scale-110 transition-transform duration-300">
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-current transition-colors duration-300" />
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center mt-20"
        >
          <div className="inline-block p-8 rounded-2xl bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 shadow-2xl">
            <h3 className="text-3xl font-bold mb-4 text-white">
              Ready to Go Solar?
            </h3>
            <p className="text-lg mb-6 text-gray-300">
              Get a free consultation and discover how much you can save with solar energy.
            </p>
            <Button className="px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 hover:from-yellow-300 hover:to-orange-400 hover:scale-105 hover:shadow-2xl transform" asChild>
              <Link href="/contact">
                <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Get Free Quote
                </motion.a>
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      <Footer /> {/* Integrated Footer */}
    </div>
  );
};

export default Services;