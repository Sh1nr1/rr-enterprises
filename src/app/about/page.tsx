'use client';

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useAnimation, useInView, UseInViewOptions, easeOut } from 'framer-motion'
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
} from 'lucide-react'

// Import shared components
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ThemeToggle from '@/components/layout/ThemeToggle'
import { Button } from '@/components/ui/button' // Assuming ShadCN button is preferred for CTAs
import { Separator } from '@/components/ui/separator' // For breadcrumbs

// // SEO Metadata
// export const metadata = {
//   title: 'About Us | RR Enterprises - Solar EPC Company',
//   description: 'Learn about RR Enterprises: Our mission, vision, values, and journey in leading India\'s solar energy revolution. Trusted EPC solutions for a sustainable future.',
// }

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
}

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
}

// Reusable Animated Section Component
interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

const AnimatedSection = ({ children, className = '', delay = 0.1 }: AnimatedSectionProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: delay } as UseInViewOptions)

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
  )
}

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
]

const values = [
  {
    icon: <Sun className="w-8 h-8" />,
    title: 'Sustainability First',
    description: 'Every project contributes to a cleaner, more sustainable future for generations to come.',
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: 'Customer-Centric',
    description: 'We build lasting relationships through exceptional service and unwavering commitment to quality.',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Innovation Drive',
    description: 'Continuously pushing boundaries with cutting-edge technology and forward-thinking solutions.',
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: 'Reliability',
    description: 'Delivering on promises with precision, punctuality, and professional excellence.',
  },
]

const stats = [
  { number: '₹8Cr+', label: 'Annual Turnover', icon: <TrendingUp className="w-6 h-6" /> },
  { number: '200+', label: 'Projects Completed', icon: <CheckCircle className="w-6 h-6" /> },
  { number: '50MW+', label: 'Total Capacity Installed', icon: <Zap className="w-6 h-6" /> },
  { number: '5', label: 'States Covered', icon: <MapPin className="w-6 h-6" /> },
]

export default function AboutPage() {
  const [activeTimelineItem, setActiveTimelineItem] = useState(0)
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })
  const heroControls = useAnimation()

  useEffect(() => {
    if (heroInView) {
      heroControls.start('visible')
    }
  }, [heroControls, heroInView])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden">
      <Navbar /> {/* Integrated Navbar */}
      <ThemeToggle /> {/* Integrated ThemeToggle */}

      <main>
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-4 pt-8 md:pt-12">
          <nav className="flex items-center space-x-2 text-gray-400 text-sm">
            <Link href="/" className="hover:text-blue-400 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" /> Home
            </Link>
            <Separator orientation="vertical" className="h-4 w-px bg-gray-600" />
            <span className="text-white">About Us</span>
          </nav>
        </div>

        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          className="relative min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 pb-12 md:pb-0"
          initial="hidden"
          animate={heroControls}
          variants={containerVariants}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse-slow"></div>{' '}
            {/* Added animate-pulse-slow class */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.5, 0.3, 0.5],
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
              className="inline-flex items-center px-6 py-3 mb-8 bg-blue-500/20 border border-blue-400/30 rounded-full backdrop-blur-sm"
            >
              <Sun className="w-5 h-5 mr-2 text-yellow-400" />
              <span className="text-sm font-medium">Powering India&apos;s Solar Revolution</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent leading-tight"
            >
              About RR Enterprises
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Leading India&apos;s transition to sustainable energy with innovative solar solutions,
              exceptional service, and unwavering commitment to a cleaner future.
            </motion.p>

            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex justify-center mb-3 text-blue-400">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Mission, Vision, Values */}
        <AnimatedSection className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:border-blue-400/50 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <Target className="w-8 h-8 text-blue-400 mr-3" />
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  To accelerate India&apos;s adoption of clean energy by delivering world-class solar
                  power solutions that are reliable, efficient, and accessible to all.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:border-purple-400/50 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <Eye className="w-8 h-8 text-purple-400 mr-3" />
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  To be India&apos;s most trusted solar energy partner, creating a sustainable future
                  where clean energy powers every home and business.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:border-green-400/50 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <Heart className="w-8 h-8 text-green-400 mr-3" />
                  <h3 className="text-2xl font-bold">Our Values</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Integrity, innovation, and excellence drive everything we do, ensuring sustainable
                  solutions that benefit our customers and the planet.
                </p>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Core Values Grid */}
        <AnimatedSection className="py-24 px-4 sm:px-6 lg:px-8 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                What Drives Us
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our core values shape every decision, every project, and every relationship we
                build.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-blue-400/50 transition-all duration-300 group"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex justify-center mb-6 text-blue-400 group-hover:text-blue-300 transition-colors">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Animated Timeline */}
        <AnimatedSection className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Our Journey
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                From a visionary startup to a leading solar solutions provider, discover the
                milestones that shaped our story.
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>

              {timelineData.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative flex items-center mb-16 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  onMouseEnter={() => setActiveTimelineItem(index)}
                >
                  {/* Timeline Node */}
                  <motion.div
                    className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-slate-900 z-10"
                    whileHover={{ scale: 1.3 }}
                    animate={activeTimelineItem === index ? { scale: 1.3 } : { scale: 1 }}
                  />

                  {/* Content Card */}
                  <motion.div
                    className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 ml-20 md:ml-0 md:w-5/12 hover:bg-white/10 hover:border-blue-400/50 transition-all duration-300 ${
                      index % 2 === 0 ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16'
                    }`}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-full mr-4">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-400">{item.year}</div>
                        <div className="text-sm text-gray-400">{item.milestone}</div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{item.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Leadership Section */}
        <AnimatedSection className="py-24 px-4 sm:px-6 lg:px-8 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Leadership Excellence
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Visionary leaders driving innovation and excellence in the solar energy sector.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg border border-white/10 rounded-3xl p-12 text-center"
            >
              <div className="flex items-center justify-center mb-8">
                <Users className="w-16 h-16 text-blue-400" />
              </div>
              <h3 className="text-3xl font-bold mb-6">Meet Our Executive Team</h3>
              <p className="text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
                Our leadership team brings together decades of experience in renewable energy,
                engineering excellence, and business strategy. Together, they guide RR Enterprises
                toward a sustainable future while maintaining our commitment to innovation and quality.
              </p>
              <Link href="/about/team" passHref>
                <Button
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 group"
                  asChild // This makes ShadCN Button render as a Link
                >
                  <motion.a // Using motion.a for Framer Motion animation on the Link
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Explore Team Profiles</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                </Button>
              </Link>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* CTA: Join Our Team */}
        <AnimatedSection className="py-24 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
            Shape the Future with Us
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Passionate about solar energy and sustainable development? Discover career opportunities
            at RR Enterprises and become a part of our growing team.
          </p>
          <Link href="/career" passHref>
            <Button
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full text-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 group shadow-lg"
              asChild
            >
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                View Open Positions
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </Button>
          </Link>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimatedSection className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Ready to Go Solar?
              </h2>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                Join thousands of satisfied customers who have made the switch to clean, reliable
                solar energy with RR Enterprises.
              </p>
              <Link href="/contact" passHref>
                <Button
                  className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 group"
                  asChild
                >
                  <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <span>Start Your Solar Journey</span>
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                </Button>
              </Link>
            </motion.div>
          </div>
        </AnimatedSection>
      </main>
      <Footer /> {/* Integrated Footer */}
    </div>
  )
}