"use client"
import React from 'react';
import { Mail, Phone, Linkedin, Twitter, Github, Instagram } from 'lucide-react';
import { motion, Transition } from 'framer-motion';
import { useTheme } from 'next-themes'; // Import useTheme hook

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { resolvedTheme } = useTheme(); // Get the current resolved theme
  const isDark = resolvedTheme === 'dark'; // Determine if it's dark mode

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: 'services' },
    { name: 'Projects', href: 'projects' },
    { name: 'Careers', href: 'career' },
    { name: 'Contact', href: 'contact' }
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: '#', darkTextHover: 'hover:text-blue-400', lightTextHover: 'hover:text-blue-700' }, // Adjusted lightTextHover
    { name: 'Twitter', icon: Twitter, href: '#', darkTextHover: 'hover:text-sky-400', lightTextHover: 'hover:text-sky-700' }, // Adjusted lightTextHover
    { name: 'GitHub', icon: Github, href: '#', darkTextHover: 'hover:text-gray-300', lightTextHover: 'hover:text-indigo-700' }, // Adjusted lightTextHover
    { name: 'Instagram', icon: Instagram, href: '#', darkTextHover: 'hover:text-pink-400', lightTextHover: 'hover:text-purple-700' } // Adjusted lightTextHover
  ];

  // Framer Motion Variants for footer entrance animation
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.1
      } as Transition
    },
  };

  // Framer Motion Variants for individual link/icon entrance (staggered)
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.footer
      // Main footer background gradient - now brighter space theme for light mode
      className={`relative overflow-hidden font-mono transition-colors duration-500
        ${isDark
          ? "bg-gradient-to-br from-indigo-950 via-gray-950 to-blue-950 text-white"
          : "bg-gradient-to-br from-blue-100 via-purple-200 to-indigo-300 text-gray-800" // Brighter, space-like gradient
        }`}
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Animated background elements - Enhanced blur and opacity for depth, adjusted for brighter theme */}
      <div className={`absolute inset-0 opacity-40 blur-sm pointer-events-none transition-opacity duration-500
        ${isDark ? 'opacity-40' : 'opacity-30'}`} // Slightly increased opacity for light mode to show glow
      >
        <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-slow-1
          ${isDark ? 'bg-cyan-500/15' : 'bg-cyan-200/30'}`}></div> {/* Brighter color for light mode */}
        <div className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-slow-2 delay-700
          ${isDark ? 'bg-purple-500/15' : 'bg-purple-200/30'}`}></div> {/* Brighter color for light mode */}
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-2xl animate-pulse-slow-3 delay-300
          ${isDark ? 'bg-blue-500/10' : 'bg-blue-200/20'}`}></div> {/* Brighter color for light mode */}
      </div>

      {/* Glass container - Core glassmorphic styling, adjusted for light mode's brighter space theme */}
      <div className={`relative backdrop-blur-xl transition-all duration-500
        ${isDark
          ? "bg-white/5 border-t border-white/10 shadow-[0_-2px_15px_rgba(0,255,255,0.1),_inset_0_1px_0_rgba(255,255,255,0.05)]"
          : "bg-blue-50/40 border-t border-blue-100/60 shadow-[0_-2px_10px_rgba(0,0,0,0.05),_inset_0_1px_0_rgba(255,255,255,0.15)]" // Very light blue glass
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

            {/* Company Info */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="mb-6">
                <h2 className={`text-3xl font-bold bg-clip-text text-transparent transition-colors duration-500
                  ${isDark
                    ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_8px_rgba(0,255,255,0.4)]"
                    : "bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 drop-shadow-[0_0_8px_rgba(0,0,0,0.2)]" // Vibrant, darker gradient for "brighter space" title
                  }`}>
                  RR Enterprises
                </h2>
                {/* Animated thin gradient line divider */}
                <div className={`h-0.5 w-24 rounded-full mt-2 animate-gradient-line transition-colors duration-500
                  ${isDark
                    ? "bg-gradient-to-r from-cyan-400 to-purple-600 shadow-lg shadow-cyan-500/50"
                    : "bg-gradient-to-r from-blue-400 to-purple-500 shadow-sm shadow-blue-300/50" // Softer gradient for light mode
                  }`}></div>
              </div>
              <p className={`leading-relaxed mb-6 max-w-md text-sm transition-colors duration-500
                ${isDark ? "text-gray-300" : "text-gray-700"}`}> {/* Darker text for readability on bright background */}
                Innovating the future with cutting-edge solutions and exceptional service.
                Your trusted partner in digital transformation and technological advancement.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <motion.div variants={itemVariants} className="flex items-center space-x-3 group">
                  <motion.div
                    className={`p-2 rounded-lg transition-all duration-300
                      ${isDark
                        ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 group-hover:from-cyan-500/30 group-hover:to-blue-500/30"
                        : "bg-blue-100/60 group-hover:bg-blue-200/80" // Lighter background for light mode
                      }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Mail className={`w-4 h-4 transition-colors duration-300
                      ${isDark ? "text-cyan-400 group-hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.6)]" : "text-blue-600 group-hover:drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]"}`} /> {/* Darker icon color */}
                  </motion.div>
                  <a href="mailto:info@rrenterprises.one" className={`relative group overflow-hidden transition-colors duration-300
                    ${isDark ? "text-gray-300 hover:text-cyan-400" : "text-gray-700 hover:text-blue-700"}`}> {/* Darker text and subtle hover */}
                    info@rrenterprises.one
                    <span className={`absolute bottom-0 left-0 w-full h-px transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left
                      ${isDark ? "bg-gradient-to-r from-cyan-400 to-blue-400" : "bg-gradient-to-r from-blue-500 to-indigo-500"}`}></span> {/* Softer underline */}
                  </a>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center space-x-3 group">
                  <motion.div
                    className={`p-2 rounded-lg transition-all duration-300
                      ${isDark
                        ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30"
                        : "bg-purple-100/60 group-hover:bg-purple-200/80" // Lighter background for light mode
                      }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Phone className={`w-4 h-4 transition-colors duration-300
                      ${isDark ? "text-purple-400 group-hover:drop-shadow-[0_0_5px_rgba(200,0,255,0.6)]" : "text-purple-600 group-hover:drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]"}`} /> {/* Darker icon color */}
                  </motion.div>
                  <a href="tel:+918128801731" className={`relative group overflow-hidden transition-colors duration-300
                    ${isDark ? "text-gray-300 hover:text-purple-400" : "text-gray-700 hover:text-purple-700"}`}> {/* Darker text and subtle hover */}
                    +91 812-880-1731
                    <span className={`absolute bottom-0 left-0 w-full h-px transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left
                      ${isDark ? "bg-gradient-to-r from-purple-400 to-pink-400" : "bg-gradient-to-r from-purple-500 to-rose-500"}`}></span> {/* Softer underline */}
                  </a>
                </motion.div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h3 className={`text-lg font-semibold mb-6 relative transition-colors duration-500
                ${isDark ? "text-white drop-shadow-[0_0_5px_rgba(0,255,255,0.3)]" : "text-indigo-800 drop-shadow-[0_0_3px_rgba(0,0,0,0.1)]"}`}> {/* Darker text, subtle shadow */}
                Quick Links
                <div className={`absolute -bottom-2 left-0 w-12 h-0.5 animate-gradient-line transition-colors duration-500
                  ${isDark ? "bg-gradient-to-r from-cyan-400 to-transparent" : "bg-gradient-to-r from-blue-400 to-transparent"}`}></div> {/* Softer gradient */}
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li key={index} variants={itemVariants}>
                    <a
                      href={link.href}
                      className={`relative flex items-center group overflow-hidden transition-all duration-300
                        ${isDark ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-indigo-800"}`}> {/* Darker text, subtle hover */}
                      <span className={`relative z-10 transition-colors duration-300`}>
                        {link.name}
                        <span className={`absolute bottom-0 left-0 w-full h-px transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left
                          ${isDark ? "bg-gradient-to-r from-cyan-400 to-purple-600" : "bg-gradient-to-r from-blue-400 to-indigo-500"}`}></span> {/* Softer underline */}
                      </span>
                      {/* Arrow animation */}
                      <span className={`w-0 h-0.5 transition-all duration-300 ml-0 group-hover:ml-2
                        ${isDark ? "bg-gradient-to-r from-cyan-400 to-purple-600 group-hover:w-4" : "bg-gradient-to-r from-blue-400 to-indigo-500 group-hover:w-4"}`}></span> {/* Softer arrow */}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Social Media */}
            <motion.div variants={itemVariants}>
              <h3 className={`text-lg font-semibold mb-6 relative transition-colors duration-500
                ${isDark ? "text-white drop-shadow-[0_0_5px_rgba(200,0,255,0.3)]" : "text-indigo-800 drop-shadow-[0_0_3px_rgba(0,0,0,0.1)]"}`}> {/* Darker text, subtle shadow */}
                Connect With Us
                <div className={`absolute -bottom-2 left-0 w-12 h-0.5 animate-gradient-line transition-colors duration-500
                  ${isDark ? "bg-gradient-to-r from-purple-400 to-transparent" : "bg-gradient-to-r from-purple-400 to-transparent"}`}></div> {/* Softer gradient */}
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      className={`p-3 rounded-xl border transition-all duration-300 hover:scale-110 hover:shadow-lg group relative overflow-hidden
                        ${isDark
                          ? "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10 hover:shadow-current/25"
                          : "bg-blue-100/50 border-blue-200/70 hover:border-blue-300/90 hover:bg-blue-200/70 hover:shadow-blue-300/30" // Lighter, more subtle styling for light mode
                        }
                        ${isDark ? social.darkTextHover : social.lightTextHover}`}
                      aria-label={social.name}
                      whileHover={{
                        scale: 1.1,
                        boxShadow: `0 0 15px ${
                          isDark ?
                          (social.darkTextHover.includes('blue') ? 'rgba(66, 153, 225, 0.5)' : social.darkTextHover.includes('sky') ? 'rgba(14, 165, 233, 0.5)' : social.darkTextHover.includes('gray') ? 'rgba(156, 163, 175, 0.5)' : 'rgba(236, 72, 153, 0.5)') :
                          (social.lightTextHover.includes('blue') ? 'rgba(59, 130, 246, 0.3)' : social.lightTextHover.includes('sky') ? 'rgba(14, 165, 233, 0.3)' : social.lightTextHover.includes('indigo') ? 'rgba(99, 102, 241, 0.3)' : 'rgba(147, 51, 234, 0.3)') // Softer shadow for light mode
                        }`
                      }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                    >
                      <IconComponent className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_currentColor]" />
                    </motion.a>
                  );
                })}
              </div>

              {/* Newsletter signup hint */}
              <motion.div variants={itemVariants} className={`mt-6 p-4 rounded-xl border transition-colors duration-500
                ${isDark
                  ? "bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500/20 shadow-inner shadow-cyan-500/10"
                  : "bg-blue-50/70 border-blue-100/90 shadow-inner shadow-blue-100/10" // Lighter, more subtle styling for light mode
                }`}>
                <p className={`text-sm transition-colors duration-500
                  ${isDark ? "text-gray-300" : "text-gray-600"}`}> {/* Darker text */}
                  Stay updated with our latest innovations and insights.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm">
              <motion.div variants={itemVariants} className={`transition-colors duration-500
                ${isDark ? "text-gray-400" : "text-gray-600"}`}> {/* Darker text */}
                © {currentYear} RR Enterprises. All rights reserved.
              </motion.div>
              <div className="flex space-x-6">
                <motion.a
                  variants={itemVariants}
                  href="#privacy"
                  className={`relative group overflow-hidden transition-colors duration-300
                    ${isDark ? "text-gray-400 hover:text-cyan-400" : "text-gray-600 hover:text-blue-700"}`}> {/* Darker text, subtle hover */}
                  Privacy Policy
                  <span className={`absolute bottom-0 left-0 w-full h-px transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left
                    ${isDark ? "bg-gradient-to-r from-cyan-400 to-blue-400" : "bg-gradient-to-r from-blue-400 to-indigo-400"}`}></span> {/* Softer underline */}
                </motion.a>
                <motion.a
                  variants={itemVariants}
                  href="#terms"
                  className={`relative group overflow-hidden transition-colors duration-300
                    ${isDark ? "text-gray-400 hover:text-cyan-400" : "text-gray-600 hover:text-blue-700"}`}> {/* Darker text, subtle hover */}
                  Terms of Service
                  <span className={`absolute bottom-0 left-0 w-full h-px transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left
                    ${isDark ? "bg-gradient-to-r from-cyan-400 to-blue-400" : "bg-gradient-to-r from-blue-400 to-indigo-400"}`}></span> {/* Softer underline */}
                </motion.a>
                <motion.a
                  variants={itemVariants}
                  href="#cookies"
                  className={`relative group overflow-hidden transition-colors duration-300
                    ${isDark ? "text-gray-400 hover:text-cyan-400" : "text-gray-600 hover:text-blue-700"}`}> {/* Darker text, subtle hover */}
                  Cookie Policy
                  <span className={`absolute bottom-0 left-0 w-full h-px transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left
                    ${isDark ? "bg-gradient-to-r from-cyan-400 to-blue-400" : "bg-gradient-to-r from-blue-400 to-indigo-400"}`}></span> {/* Softer underline */}
                </motion.a>
              </div>
            </div>

            {/* Subtle animated line */}
            <div className={`mt-4 h-px animate-pulse-line transition-colors duration-500
              ${isDark ? "bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" : "bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"}`}></div> {/* Softer gradient for light mode */}
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;