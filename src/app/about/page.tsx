'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useAnimation, useInView, UseInViewOptions, easeOut, easeInOut} from 'framer-motion';
import {
  Sun,
  Users,
  Award,
  Target,
  Eye,
  Heart,
  Zap,
  Globe,
  ArrowRight,
  CheckCircle,
  MapPin,
  TrendingUp,
  Home,
  ChevronRight,
} from 'lucide-react';

// Import shared components
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ThemeToggle from '@/components/layout/ThemeToggle';
import { Button } from '@/components/ui/button';

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

const cardHoverVariants = {
  hover: {
    scale: 1.02,
    y: -8,
    transition: {
      duration: 0.3,
      ease: easeOut,
    },
  },
  tap: {
    scale: 0.98,
  },
};

const glowVariants = {
  hover: {
    boxShadow: [
      "0 0 20px rgba(59, 130, 246, 0.5)",
      "0 0 40px rgba(59, 130, 246, 0.7)",
      "0 0 20px rgba(59, 130, 246, 0.5)",
    ],
    scale: 1.05,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: easeInOut,
    },
  },
};

// --- Reusable Components ---

// Animated Section Component
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedSection = ({ children, className = '', delay = 0.1 }: AnimatedSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: delay } as UseInViewOptions);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Breadcrumb Component
interface BreadcrumbProps {
  items: { label: string; href: string; isCurrent?: boolean }[];
}

const BreadcrumbComponent = ({ items }: BreadcrumbProps) => {
  return (
    <nav aria-label="breadcrumb" className="container mx-auto px-4 pt-8 md:pt-12">
      <ol className="flex items-center space-x-2 text-muted-foreground text-sm">
        {items.map((item, index) => (
          <React.Fragment key={item.href}>
            <li>
              {item.isCurrent ? (
                <span className="text-foreground font-medium">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-primary transition-colors flex items-center"
                  aria-current={item.isCurrent ? 'page' : undefined}
                >
                  {item.href === '/' && <Home className="w-4 h-4 mr-1" />}
                  {item.label}
                </Link>
              )}
            </li>
            {index < items.length - 1 && (
              <li>
                <ChevronRight className="w-4 h-4 text-muted-foreground/60" />
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

// Particle Background Component
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// --- Data Definitions ---

const timelineData = [
  {
    year: '2018',
    title: 'Foundation',
    description: 'RR Enterprises established with a vision to democratize solar energy across India.',
    icon: <Sun className="w-6 h-6" />,
    milestone: 'Company Founded',
  },
  {
    year: '2019',
    title: 'First Major Contract',
    description: 'Secured our first 10MW solar installation project, marking our entry into large-scale operations.',
    icon: <Award className="w-6 h-6" />,
    milestone: '10MW Milestone',
  },
  {
    year: '2021',
    title: 'Rapid Expansion',
    description: 'Expanded operations across 5 states with a dedicated team of 50+ professionals.',
    icon: <Globe className="w-6 h-6" />,
    milestone: '5 States Coverage',
  },
  {
    year: '2023',
    title: 'Industry Leadership',
    description: 'Achieved ₹8 Cr+ annual turnover, establishing ourselves as a trusted solar solutions provider.',
    icon: <TrendingUp className="w-6 h-6" />,
    milestone: '₹8 Cr+ Turnover',
  },
  {
    year: '2024',
    title: 'Innovation Hub',
    description: 'Launched our R&D division focusing on next-generation solar technologies and smart grid solutions.',
    icon: <Zap className="w-6 h-6" />,
    milestone: 'R&D Launch',
  },
];

const values = [
  {
    icon: <Sun className="w-8 h-8" />,
    title: 'Sustainability First',
    description: 'Every project contributes to a cleaner, more sustainable future for generations to come.',
    color: 'from-emerald-500/20 to-green-500/20',
    borderColor: 'group-hover:border-emerald-400/50',
    iconColor: 'text-emerald-400',
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: 'Customer-Centric',
    description: 'We build lasting relationships through exceptional service and unwavering commitment to quality.',
    color: 'from-rose-500/20 to-pink-500/20',
    borderColor: 'group-hover:border-rose-400/50',
    iconColor: 'text-rose-400',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Innovation Drive',
    description: 'Continuously pushing boundaries with cutting-edge technology and forward-thinking solutions.',
    color: 'from-yellow-500/20 to-orange-500/20',
    borderColor: 'group-hover:border-yellow-400/50',
    iconColor: 'text-yellow-400',
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: 'Reliability',
    description: 'Delivering on promises with precision, punctuality, and professional excellence.',
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'group-hover:border-blue-400/50',
    iconColor: 'text-blue-400',
  },
];

const stats = [
  { 
    number: '₹8Cr+', 
    label: 'Annual Turnover', 
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'from-green-500/20 to-emerald-500/20',
    glowColor: 'hover:shadow-green-500/25'
  },
  { 
    number: '20+', 
    label: 'Projects Completed', 
    icon: <CheckCircle className="w-6 h-6" />,
    color: 'from-blue-500/20 to-cyan-500/20',
    glowColor: 'hover:shadow-blue-500/25'
  },
  { 
    number: '50MW+', 
    label: 'Total Capacity Installed', 
    icon: <Zap className="w-6 h-6" />,
    color: 'from-yellow-500/20 to-orange-500/20',
    glowColor: 'hover:shadow-yellow-500/25'
  },
  { 
    number: '5', 
    label: 'States Covered', 
    icon: <MapPin className="w-6 h-6" />,
    color: 'from-purple-500/20 to-pink-500/20',
    glowColor: 'hover:shadow-purple-500/25'
  },
];

export default function AboutPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const heroControls = useAnimation();

  useEffect(() => {
    if (heroInView) {
      heroControls.start('visible');
    }
  }, [heroControls, heroInView]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Navbar />
      
      <main className="relative z-10">
        {/* Breadcrumb Navigation */}
        <BreadcrumbComponent
          items={[
            { label: 'Home', href: '/' },
            { label: 'About Us', href: '/about', isCurrent: true },
          ]}
        />

        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 pb-12"
          initial="hidden"
          animate={heroControls}
          variants={containerVariants}
        >
          <ParticleBackground />
          
          {/* Animated Background Orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.6, 0.3, 0.6],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center px-6 py-3 mb-8 bg-primary/20 border border-primary/30 rounded-full backdrop-blur-md hover:bg-primary/30 transition-colors duration-300"
            >
              <Sun className="w-5 h-5 mr-2 text-primary animate-spin-slow" aria-hidden="true" />
              <span className="text-sm font-medium">Powering India&apos;s Solar Revolution</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight"
              style={{ fontFamily: 'var(--font-space-grotesk, system-ui)' }}
            >
              About RR Enterprises
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Leading India&apos;s transition to sustainable energy with innovative solar solutions,
              exceptional service, and unwavering commitment to a cleaner future.
            </motion.p>

            <motion.div 
              variants={itemVariants} 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className={`relative bg-gradient-to-br ${stat.color} backdrop-blur-md border border-border/50 rounded-2xl p-6 text-center hover:border-primary/50 transition-all duration-500 group cursor-pointer ${stat.glowColor} hover:shadow-2xl`}
                  variants={cardHoverVariants}
                  whileHover="hover"
                  whileTap="tap"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-center mb-3 text-primary group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                      {stat.icon}
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Mission, Vision, Values */}
        <AnimatedSection className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="sr-only">Mission, Vision, Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                variants={itemVariants}
                className="relative group"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-card/50 backdrop-blur-md border border-border/50 rounded-3xl p-8 hover:border-primary/50 transition-all duration-500 h-full">
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-full bg-primary/20 border border-primary/30 mr-4">
                      <Target className="w-8 h-8 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Our Mission
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    To accelerate India&apos;s adoption of clean energy by delivering world-class solar
                    power solutions that are reliable, efficient, and accessible to all.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="relative group"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-card/50 backdrop-blur-md border border-border/50 rounded-3xl p-8 hover:border-accent/50 transition-all duration-500 h-full">
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-full bg-accent/20 border border-accent/30 mr-4">
                      <Eye className="w-8 h-8 text-accent" aria-hidden="true" />
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                      Our Vision
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    To be India&apos;s most trusted solar energy partner, creating a sustainable future
                    where clean energy powers every home and business.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="relative group"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-card/50 backdrop-blur-md border border-border/50 rounded-3xl p-8 hover:border-secondary/50 transition-all duration-500 h-full">
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-full bg-secondary/20 border border-secondary/30 mr-4">
                      <Heart className="w-8 h-8 text-secondary" aria-hidden="true" />
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                      Our Values
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Integrity, innovation, and excellence drive everything we do, ensuring sustainable
                    solutions that benefit our customers and the planet.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Core Values Grid */}
        <AnimatedSection className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/20">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                What Drives Us
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our core values shape every decision, every project, and every relationship we build.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative group cursor-pointer`}
                  whileHover={{ scale: 1.05, y: -8 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Card Content */}
                  <div className={`relative bg-card/50 backdrop-blur-md border border-border/50 rounded-2xl p-8 text-center hover:border-primary/50 transition-all duration-500 h-full ${value.borderColor}`}>
                    <div className={`flex justify-center mb-6 ${value.iconColor} group-hover:scale-110 transition-transform duration-300`} aria-hidden="true">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      {value.description}
                    </p>
                    
                    {/* Hover Line Effect */}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Animated Timeline */}
        <AnimatedSection className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Our Journey
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From a visionary startup to a leading solar solutions provider, discover the
                milestones that shaped our story.
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-primary via-accent to-secondary"></div>

              {timelineData.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative flex items-center mb-16 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Node */}
                  <motion.div
                    className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full border-4 border-background z-10 shadow-lg"
                    whileHover={{ scale: 1.5 }}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(59, 130, 246, 0.7)",
                        "0 0 0 10px rgba(59, 130, 246, 0)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Content Card */}
                  <motion.div
                    className={`relative group ml-20 md:ml-0 md:w-5/12 ${
                      index % 2 === 0 ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16'
                    }`}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative bg-card/50 backdrop-blur-md border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all duration-500">
                      <div className="flex items-center mb-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-primary/20 border border-primary/30 rounded-full mr-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                            {item.year}
                          </div>
                          <div className="text-sm text-muted-foreground">{item.milestone}</div>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Leadership Section */}
        <AnimatedSection className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/20">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Leadership Excellence
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Visionary leaders driving innovation and excellence in the solar energy sector.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative group"
              whileHover={{ scale: 1.02 }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-card/50 backdrop-blur-md border border-border/50 rounded-3xl p-12 text-center hover:border-primary/50 transition-all duration-500">
                <div className="flex items-center justify-center mb-8">
                  <div className="p-6 rounded-full bg-primary/20 border border-primary/30 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-16 h-16 text-primary" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-6 group-hover:text-primary transition-colors duration-300">
                  Meet Our Executive Team
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto group-hover:text-foreground transition-colors duration-300">
                  Our leadership team brings together decades of experience in renewable energy,
                  engineering excellence, and business strategy. Together, they guide RR Enterprises
                  toward a sustainable future while maintaining our commitment to innovation and quality.
                </p>
                <Link href="/about/team1" passHref legacyBehavior>
                  <Button
                    className="relative overflow-hidden group/btn bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-primary-foreground border-0 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                    asChild
                    title="Explore Team Profiles"
                  >
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Button Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      
                      <span className="relative z-10 flex items-center">
                        Meet Our Team
                        <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </span>
                    </motion.a>
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimatedSection className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              variants={itemVariants}
              className="relative group"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-md border border-border/50 rounded-3xl p-12 hover:border-primary/50 transition-all duration-500">
                <motion.div
                  className="flex justify-center mb-8"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div className="p-6 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
                    <Sun className="w-16 h-16 text-primary" aria-hidden="true" />
                  </div>
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  Ready to Go Solar?
                </h2>
                
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of satisfied customers who have transformed their energy future with RR Enterprises.
                  Let&apos;s build a sustainable tomorrow, today.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/contact" passHref legacyBehavior>
                    <Button
                      className="relative overflow-hidden group/cta bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-primary-foreground border-0 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl min-w-[200px]"
                      asChild
                      title="Get Your Solar Quote"
                    >
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        variants={glowVariants}
                        //whileHover="hover"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-full opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative z-10 flex items-center justify-center">
                          Get Free Quote
                          <ArrowRight className="ml-2 w-5 h-5 group-hover/cta:translate-x-1 transition-transform duration-300" />
                        </span>
                      </motion.a>
                    </Button>
                  </Link>

                  <Link href="/projects" passHref legacyBehavior>
                    <Button
                      variant="outline"
                      className="relative overflow-hidden group/secondary border-2 border-primary/30 bg-transparent hover:bg-primary/10 text-foreground hover:text-primary rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300 min-w-[200px]"
                      asChild
                      title="View Our Projects"
                    >
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full opacity-0 group-hover/secondary:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative z-10 flex items-center justify-center">
                          View Projects
                          <Eye className="ml-2 w-5 h-5 group-hover/secondary:scale-110 transition-transform duration-300" />
                        </span>
                      </motion.a>
                    </Button>
                  </Link>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-4 left-4 w-2 h-2 bg-primary/60 rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-8 w-1 h-1 bg-accent/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-4 left-8 w-1.5 h-1.5 bg-secondary/60 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      </main>

      <Footer />
      
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ThemeToggle />
        </motion.div>
      </div>
    </div>
  );
}