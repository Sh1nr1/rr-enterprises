'use client';

import React from 'react';
import { motion,  Transition } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Sun,
  Building2,
  Factory,
  Wrench,
  ArrowRight,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes'; // Import useTheme

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  slug: string;
  gradient: string;
}

const services: Service[] = [
  {
    id: '1',
    title: 'AC-DC Integration Switchyard',
    description: 'Advanced power conversion systems with seamless AC-DC integration for maximum energy efficiency and grid stability.',
    icon: <Zap className="w-8 h-8" />,
    slug: 'ac-dc-integration',
    gradient: 'from-blue-500/20 to-cyan-500/20 dark:from-blue-500/30 dark:to-cyan-500/30'
  },
  {
    id: '2',
    title: 'Commercial Solar Installations',
    description: 'Comprehensive solar solutions for businesses, featuring cutting-edge photovoltaic technology and smart energy management.',
    icon: <Building2 className="w-8 h-8" />,
    slug: 'commercial-solar',
    gradient: 'from-green-500/20 to-emerald-500/20 dark:from-green-500/30 dark:to-emerald-500/30'
  },
  {
    id: '3',
    title: 'Industrial Solar Projects',
    description: 'Large-scale industrial solar installations with advanced monitoring systems and predictive maintenance capabilities.',
    icon: <Factory className="w-8 h-8" />,
    slug: 'industrial-projects',
    gradient: 'from-orange-500/20 to-amber-500/20 dark:from-orange-500/30 dark:to-amber-500/30'
  },
  {
    id: '4',
    title: 'Solar Maintenance & Support',
    description: 'AI-powered maintenance services with real-time monitoring, predictive analytics, and 24/7 technical support.',
    icon: <Wrench className="w-8 h-8" />,
    slug: 'solar-maintenance',
    gradient: 'from-purple-500/20 to-pink-500/20 dark:from-purple-500/30 dark:to-pink-500/30'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95
  },
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

const ServicesSection: React.FC = () => {
  const { resolvedTheme } = useTheme(); // Get the resolved theme
  const isDark = resolvedTheme === 'dark'; // Check if it's currently dark mode

  return (
    <section
      className={`relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${
        isDark
          ? 'bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900'
          : 'bg-gradient-to-b from-gray-50 via-white/50 to-gray-50'
      }`}
    >
      {/* Background Effects - same as Projects */}
      <div className={`absolute inset-0 ${isDark ? 'bg-[radial-gradient(circle_at_20%_50%,rgba(34,197,94,0.08),transparent_70%)]' : 'bg-[radial-gradient(circle_at_20%_50%,rgba(34,197,94,0.04),transparent_70%)]'}`} />
      <div className={`absolute inset-0 ${isDark ? 'bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.08),transparent_70%)]' : 'bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.04),transparent_70%)]'}`} />

      {/* Grid Pattern Overlay - same as Projects */}
      <div className={`absolute inset-0 ${isDark ? 'bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]' : 'bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)]'} bg-[size:50px_50px]`} />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center mb-4">
            <Sun className="w-10 h-10 text-cyan-400 dark:text-cyan-400 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent
                         bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900
                         dark:from-white dark:via-cyan-200 dark:to-blue-200">
              Our Services
            </h2>
          </div>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed
                      text-gray-700 dark:text-slate-300">
            Pioneering the future of solar energy with advanced technology and innovative solutions
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="group"
            >
              <Card className="relative h-full backdrop-blur-lg overflow-hidden
                           bg-white/50 dark:bg-white/5
                           border border-gray-200 dark:border-white/10
                           hover:border-cyan-400/50 dark:hover:border-cyan-400/50
                           transition-all duration-300">
                {/* Card Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl backdrop-blur-sm border transition-all duration-300
                                 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/20 dark:to-blue-500/20
                                 border-cyan-400/10 dark:border-cyan-400/20
                                 group-hover:shadow-lg group-hover:shadow-cyan-400/15 dark:group-hover:shadow-cyan-400/25">
                      <div className="text-blue-600 dark:text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
                        {service.icon}
                      </div>
                    </div>
                    <motion.div
                      className={`${isDark ? 'bg-cyan-400' : 'bg-blue-400'} w-2 h-2 rounded-full opacity-50 group-hover:opacity-100`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                  <CardTitle className="text-xl font-semibold transition-colors duration-300
                                       text-gray-800 dark:text-white
                                       group-hover:text-blue-600 dark:group-hover:text-cyan-100">
                    {service.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative z-10 flex flex-col flex-grow">
                  <CardDescription className="text-sm leading-relaxed mb-6 flex-grow
                                            text-gray-600 dark:text-slate-300">
                    {service.description}
                  </CardDescription>

                  <Link href={`/solutions/`} className="mt-auto"> {/*`/services/${service.slug}`} className="mt-auto">*/}
                    <Button
                      variant="ghost"
                      className="w-full transition-all duration-300 group/btn
                                 bg-gray-100/50 hover:bg-cyan-500/20
                                 border border-gray-200 hover:border-cyan-400/50
                                 text-gray-700 hover:text-blue-600
                                 dark:bg-white/5 dark:hover:bg-cyan-500/20
                                 dark:border-white/10 dark:hover:border-cyan-400/50
                                 dark:text-white dark:hover:text-cyan-100"
                    >
                      <span className="mr-2">View Details</span>
                      <ArrowRight className="w-4 h-4 text-blue-500 dark:text-cyan-400 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p className="mb-6 text-gray-600 dark:text-slate-400">
            Ready to transform your energy infrastructure?
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            Get Started Today
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;