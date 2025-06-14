"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Loader2,
  MessageSquare,
  Zap,
  Building2,
  Home,
  Info,
  Briefcase,
  Lightbulb,
  BookOpen,
  Calculator,
  Users,
} from 'lucide-react';
import { useTheme } from 'next-themes'; // Import useTheme
import dynamic from 'next/dynamic';

// Assuming these are in your components directory
const Navbar = dynamic(() => import('@/components/layout/Navbar'), { ssr: false });
const Footer = dynamic(() => import('@/components/layout/Footer'), { ssr: false });
import ThemeToggle from '@/components/layout/ThemeToggle';

const ContactPage = () => {
  const { resolvedTheme } = useTheme(); // Get the resolved theme
  const [mounted, setMounted] = useState(false); // State to track client-side mounting
  const isDark = resolvedTheme === 'dark'; // Determine if current theme is dark

  useEffect(() => {
    // Set mounted to true once the component has hydrated on the client
    setMounted(true);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

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
        type: 'spring',
        stiffness: 100,
      } as Transition,
    },
  };

  // Glow effect variants: blue for light, a slightly different blue/cyan for dark
  const glowVariants = {
    initial: { boxShadow: '0 0 0 rgba(59, 130, 246, 0)' },
    focus: {
      boxShadow: isDark ? '0 0 20px rgba(0, 255, 255, 0.4)' : '0 0 20px rgba(59, 130, 246, 0.5)',
      transition: { duration: 0.3 },
    },
  };

  const breadcrumbLinks = [
    { name: 'Home', href: '/' },
    { name: 'Contact', href: '/contact' },
  ];

  // Render a minimal version for SSR to prevent hydration errors
  if (!mounted) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-gray-100 text-gray-900">
        <Navbar />
        <main className="flex-grow flex items-center justify-center text-center text-gray-600">
          Loading contact page...
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div
      className={`flex min-h-screen flex-col transition-all duration-500
        ${isDark
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white'
          : 'bg-gradient-to-br from-blue-50 via-white to-gray-100 text-gray-900'
        }`}
    >
      {/* Animated background elements - colors adjusted for theme */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className={`absolute top-1/4 left-1/4 h-64 w-64 rounded-full blur-3xl ${isDark ? 'bg-blue-500 opacity-20' : 'bg-blue-300 opacity-20'}`}
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          className={`absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full blur-3xl ${isDark ? 'bg-purple-500 opacity-15' : 'bg-purple-300 opacity-15'}`}
        />
      </div>

      <Navbar /> {/* Integrated Navbar component */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container relative z-10 mx-auto px-6 py-12 flex-grow"
      >
        <nav className="mb-8 text-sm">
          <ol className="flex space-x-2">
            {breadcrumbLinks.map((link, index) => (
              <li key={`${link.name}-${index}`} className="flex items-center">
                <Link href={link.href} passHref>
                  <motion.a
                    className={`transition-colors ${isDark ? 'text-blue-300 hover:text-blue-500' : 'text-blue-700 hover:text-blue-900'}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.name}
                  </motion.a>
                </Link>
                {index < breadcrumbLinks.length - 1 && (
                  <span className={`mx-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>/</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <motion.div variants={itemVariants} className="mb-16 text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="mb-6 flex items-center justify-center"
          >
            <Building2 className={`mr-4 h-12 w-12 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            <h1 className={`bg-clip-text text-transparent text-5xl font-bold
                           ${isDark
                               ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400'
                               : 'bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600'
                           }`}>
              RR Enterprises
            </h1>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
          >
            Connect with the future. Let's build something extraordinary together.
          </motion.p>
        </motion.div>

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className={`rounded-2xl border p-8 shadow-2xl backdrop-blur-lg transition-all duration-300
                            ${isDark
                                ? 'bg-white/5 border-white/10'
                                : 'bg-white/80 border-white/20'
                            }`}>
              <div className="mb-6 flex items-center">
                <MessageSquare className={`mr-3 h-6 w-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Send us a Message
                </h2>
              </div>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Name Field */}
                    <motion.div
                      variants={glowVariants}
                      initial="initial"
                      animate={focusedField === 'name' ? 'focus' : 'initial'}
                      className="relative"
                    >
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField('')}
                        required
                        className={`w-full rounded-lg border px-4 py-3 shadow-sm outline-none transition-all duration-300 focus:border-blue-400
                                   ${isDark
                                       ? 'bg-white/5 text-white placeholder-gray-400 border-white/20'
                                       : 'bg-white/50 text-gray-900 placeholder-gray-500 border-gray-300'
                                   }`}
                        placeholder="Your Name"
                      />
                    </motion.div>

                    {/* Email Field */}
                    <motion.div
                      variants={glowVariants}
                      initial="initial"
                      animate={focusedField === 'email' ? 'focus' : 'initial'}
                      className="relative"
                    >
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField('')}
                        required
                        className={`w-full rounded-lg border px-4 py-3 shadow-sm outline-none transition-all duration-300 focus:border-blue-400
                                   ${isDark
                                       ? 'bg-white/5 text-white placeholder-gray-400 border-white/20'
                                       : 'bg-white/50 text-gray-900 placeholder-gray-500 border-gray-300'
                                   }`}
                        placeholder="your.email@example.com"
                      />
                    </motion.div>

                    {/* Phone Field */}
                    <motion.div
                      variants={glowVariants}
                      initial="initial"
                      animate={focusedField === 'phone' ? 'focus' : 'initial'}
                      className="relative"
                    >
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField('')}
                        className={`w-full rounded-lg border px-4 py-3 shadow-sm outline-none transition-all duration-300 focus:border-blue-400
                                   ${isDark
                                       ? 'bg-white/5 text-white placeholder-gray-400 border-white/20'
                                       : 'bg-white/50 text-gray-900 placeholder-gray-500 border-gray-300'
                                   }`}
                        placeholder="Your Phone Number"
                      />
                    </motion.div>

                    {/* Message Field */}
                    <motion.div
                      variants={glowVariants}
                      initial="initial"
                      animate={focusedField === 'message' ? 'focus' : 'initial'}
                      className="relative"
                    >
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField('')}
                        required
                        rows={4}
                        className={`w-full resize-none rounded-lg border px-4 py-3 shadow-sm outline-none transition-all duration-300 focus:border-blue-400
                                   ${isDark
                                       ? 'bg-white/5 text-white placeholder-gray-400 border-white/20'
                                       : 'bg-white/50 text-gray-900 placeholder-gray-500 border-gray-300'
                                   }`}
                        placeholder="Tell us about your project or inquiry..."
                      />
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group flex w-full items-center justify-center rounded-lg border px-6 py-4 font-semibold shadow-lg backdrop-blur-lg transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50
                                 ${isDark
                                     ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-blue-400/50'
                                     : 'bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white border-blue-500/50'
                                 }`}
                    >
                      <div className="flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Send Message
                          </>
                        )}
                      </div>
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    className="py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    >
                      <CheckCircle className={`mx-auto mb-4 h-16 w-16 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                    </motion.div>
                    <h3 className={`mb-2 text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Message Sent!
                    </h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Contact Information */}
            <div className={`rounded-2xl border p-8 shadow-2xl backdrop-blur-lg transition-all duration-300
                            ${isDark
                                ? 'bg-white/5 border-white/10'
                                : 'bg-white/80 border-white/20'
                            }`}>
              <h2 className={`mb-6 text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Get in Touch
              </h2>

              <div className="space-y-6">
                <motion.div
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <MapPin className={`mr-4 h-6 w-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  <div>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Address</p>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      123 Innovation Drive
                      <br />
                      Tech Park, Silicon Valley
                      <br />
                      CA 94000, USA
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Phone className={`mr-4 h-6 w-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  <div>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Phone</p>
                    <a href="tel:+15551234567" className={`transition-colors ${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-800'}`}>
                      +1 (555) 123-4567
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Mail className={`mr-4 h-6 w-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  <div>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Email</p>
                    <a href="mailto:contact@rrenterprises.com" className={`transition-colors ${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-800'}`}>
                      contact@rrenterprises.com
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Map */}
            <div className={`rounded-2xl border shadow-2xl backdrop-blur-lg overflow-hidden
                            ${isDark
                                ? 'bg-white/5 border-white/10'
                                : 'bg-white/80 border-white/20'
                            }`}>
              <div className="relative h-80 overflow-hidden bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d206013.0649774656!2d-122.25134880949318!3d37.76016147424424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808581d4a0f441dd%3A0x67399e574c86d4d1!2sSilicon%20Valley%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className={`transition-all duration-500 ${isDark ? 'grayscale hover:grayscale-0' : 'grayscale-[50%] hover:grayscale-0'}`}
                />
                <div className={`pointer-events-none absolute inset-0 ${isDark ? 'bg-blue-900/20' : 'bg-blue-100/20'}`} />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <Link href="/services" passHref>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col items-center justify-center rounded-xl border p-4 shadow-lg backdrop-blur-lg transition-all duration-300 hover:shadow-xl w-full
                              ${isDark
                                  ? 'bg-white/5 text-white hover:bg-white/10 border-white/20'
                                  : 'bg-white/80 text-gray-900 hover:bg-white/90 border-white/20'
                              }`}
                >
                  <Zap className={`mx-auto mb-2 h-6 w-6 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
                  <div className="text-sm font-medium">Explore Our Services</div>
                </motion.button>
              </Link>

              <Link href="/calculator" passHref>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col items-center justify-center rounded-xl border p-4 shadow-lg backdrop-blur-lg transition-all duration-300 hover:shadow-xl w-full
                              ${isDark
                                  ? 'bg-white/5 text-white hover:bg-white/10 border-white/20'
                                  : 'bg-white/80 text-gray-900 hover:bg-white/90 border-white/20'
                              }`}
                >
                  <Calculator className={`mx-auto mb-2 h-6 w-6 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                  <div className="text-sm font-medium">Get a Quote</div>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <Footer /> {/* Integrated Footer component */}
    </div>
  );
};

export default ContactPage;