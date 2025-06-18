'use client';

import React from 'react';
import { motion,  Transition } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Sun,
  HardHat,
  Drill,
  Zap,
  ArrowRight,
  Settings,
  Droplets,
  Building,
  Shield,
  Camera,
  Link as LinkIcon,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

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
    title: 'Site Preparation & Cleaning',
    description: 'Comprehensive site preparation including land clearing, leveling, debris removal, and ground preparation for optimal solar installation.',
    icon: <HardHat className="w-8 h-8" />,
    slug: 'site-cleaning',
    gradient: 'from-amber-500/20 to-orange-500/20 dark:from-amber-500/30 dark:to-orange-500/30'
  },
  {
    id: '2',
    title: 'Piling Works',
    description: 'Professional foundation piling services using advanced drilling techniques to ensure stable and durable solar panel mounting systems.',
    icon: <Drill className="w-8 h-8" />,
    slug: 'piling-works',
    gradient: 'from-stone-500/20 to-gray-500/20 dark:from-stone-500/30 dark:to-gray-500/30'
  },
  {
    id: '3',
    title: 'AC & DC Electrical Works',
    description: 'Complete electrical infrastructure including AC-DC integration, cable laying, switchyard installation, and power conversion systems.',
    icon: <Zap className="w-8 h-8" />,
    slug: 'ac-dc-works',
    gradient: 'from-blue-500/20 to-cyan-500/20 dark:from-blue-500/30 dark:to-cyan-500/30'
  },
  {
    id: '4',
    title: 'Equipment Foundation',
    description: 'Specialized concrete foundations for transformers, inverters, and other critical equipment with precision engineering and quality assurance.',
    icon: <Building className="w-8 h-8" />,
    slug: 'equipment-foundation',
    gradient: 'from-slate-500/20 to-zinc-500/20 dark:from-slate-500/30 dark:to-zinc-500/30'
  },
  {
    id: '5',
    title: 'Module Installation & Commissioning',
    description: 'Professional installation of solar modules, mounting structures, and monitoring systems with comprehensive testing and commissioning.',
    icon: <Settings className="w-8 h-8" />,
    slug: 'module-installation',
    gradient: 'from-green-500/20 to-emerald-500/20 dark:from-green-500/30 dark:to-emerald-500/30'
  },
  {
    id: '6',
    title: 'Module Cleaning System',
    description: 'Automated cleaning system installation for maximum solar panel efficiency with smart scheduling and water management features.',
    icon: <Droplets className="w-8 h-8" />,
    slug: 'cleaning-system',
    gradient: 'from-cyan-500/20 to-teal-500/20 dark:from-cyan-500/30 dark:to-teal-500/30'
  },
  {
    id: '7',
    title: 'Control Room Construction',
    description: 'Climate-controlled main control room construction with advanced HVAC systems, fire safety, and comprehensive monitoring infrastructure.',
    icon: <Building className="w-8 h-8" />,
    slug: 'control-room',
    gradient: 'from-indigo-500/20 to-purple-500/20 dark:from-indigo-500/30 dark:to-purple-500/30'
  },
  {
    id: '8',
    title: 'Lightning Protection & Earthing',
    description: 'Complete lightning arrestor and earthing system installation ensuring maximum safety and equipment protection from electrical surges.',
    icon: <Shield className="w-8 h-8" />,
    slug: 'lightning-earthing',
    gradient: 'from-yellow-500/20 to-amber-500/20 dark:from-yellow-500/30 dark:to-amber-500/30'
  },
  {
    id: '9',
    title: 'CCTV Security Systems',
    description: 'Advanced surveillance system installation with high-definition cameras, night vision, and remote monitoring capabilities for site security.',
    icon: <Camera className="w-8 h-8" />,
    slug: 'cctv-installation',
    gradient: 'from-red-500/20 to-pink-500/20 dark:from-red-500/30 dark:to-pink-500/30'
  },
  {
    id: '10',
    title: 'Perimeter Fencing',
    description: 'Robust chain link fencing installation with security gates, barbed wire, and access control systems for complete site protection.',
    icon: <LinkIcon className="w-8 h-8" />,
    slug: 'chain-link-fencing',
    gradient: 'from-emerald-500/20 to-green-500/20 dark:from-emerald-500/30 dark:to-green-500/30'
  },
  {
    id: '11',
    title: 'Plant Testing & Commissioning',
    description: 'Comprehensive plant testing, system integration, performance validation, and final commissioning with detailed documentation and training.',
    icon: <CheckCircle className="w-8 h-8" />,
    slug: 'testing-commissioning',
    gradient: 'from-violet-500/20 to-purple-500/20 dark:from-violet-500/30 dark:to-purple-500/30'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <section
      className={`relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${
        isDark
          ? 'bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900'
          : 'bg-gradient-to-b from-gray-50 via-white/50 to-gray-50'
      }`}
    >
      {/* Background Effects */}
      <div className={`absolute inset-0 ${isDark ? 'bg-[radial-gradient(circle_at_20%_50%,rgba(34,197,94,0.08),transparent_70%)]' : 'bg-[radial-gradient(circle_at_20%_50%,rgba(34,197,94,0.04),transparent_70%)]'}`} />
      <div className={`absolute inset-0 ${isDark ? 'bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.08),transparent_70%)]' : 'bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.04),transparent_70%)]'}`} />

      {/* Grid Pattern Overlay */}
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
              Construction & Installation Services
            </h2>
          </div>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed
                      text-gray-700 dark:text-slate-300">
            Complete end-to-end solar power plant construction with precision engineering and advanced technology integration
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
              className="group"
            >
              <Card className="relative h-full backdrop-blur-lg overflow-hidden
                           bg-white/60 dark:bg-white/5
                           border border-gray-200 dark:border-white/10
                           hover:border-cyan-400/50 dark:hover:border-cyan-400/50
                           transition-all duration-300">
                {/* Card Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                <CardHeader className="relative z-10 pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl backdrop-blur-sm border transition-all duration-300
                                 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/20 dark:to-blue-500/20
                                 border-cyan-400/10 dark:border-cyan-400/20
                                 group-hover:shadow-lg group-hover:shadow-cyan-400/15 dark:group-hover:shadow-cyan-400/25">
                      <div className="text-blue-600 dark:text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
                        {service.icon}
                      </div>
                    </div>
                    <motion.div
                      className={`${isDark ? 'bg-cyan-400' : 'bg-blue-400'} w-1.5 h-1.5 rounded-full opacity-50 group-hover:opacity-100`}
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
                  <CardTitle className="text-lg font-semibold transition-colors duration-300 leading-tight
                                       text-gray-800 dark:text-white
                                       group-hover:text-blue-600 dark:group-hover:text-cyan-100">
                    {service.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative z-10 flex flex-col flex-grow pt-0">
                  <CardDescription className="text-sm leading-relaxed mb-5 flex-grow
                                            text-gray-600 dark:text-slate-300">
                    {service.description}
                  </CardDescription>

                  <Link href={`/solutions/`} className="mt-auto">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full transition-all duration-300 group/btn
                                 bg-gray-100/50 hover:bg-cyan-500/20
                                 border border-gray-200 hover:border-cyan-400/50
                                 text-gray-700 hover:text-blue-600
                                 dark:bg-white/5 dark:hover:bg-cyan-500/20
                                 dark:border-white/10 dark:hover:border-cyan-400/50
                                 dark:text-white dark:hover:text-cyan-100"
                    >
                      <span className="mr-2 text-sm">Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400 group-hover/btn:translate-x-1 transition-transform duration-300" />
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
            Ready to build your solar power plant with expert construction services?
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            Get Construction Quote
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;