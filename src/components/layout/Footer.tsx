"use client"
import React from 'react';
import { Mail, Phone, Linkedin, Twitter, Github, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: 'services' },
    { name: 'Projects', href: 'projects' },
    { name: 'Careers', href: 'career' },
    { name: 'Contact', href: 'contact' }
  ];


  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-400' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-sky-400' },
    { name: 'GitHub', icon: Github, href: '#', color: 'hover:text-gray-300' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-400' }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Glass container */}
      <div className="relative backdrop-blur-sm bg-white/5 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  RR Enterprises
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full mt-2 shadow-lg shadow-cyan-500/50"></div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                Innovating the future with cutting-edge solutions and exceptional service. 
                Your trusted partner in digital transformation and technological advancement.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 group">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                    <Mail className="w-4 h-4 text-cyan-400" />
                  </div>
                  <a href="mailto:info@rrenterprises.one" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                    info@rrenterprises.one
                  </a>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                    <Phone className="w-4 h-4 text-purple-400" />
                  </div>
                  <a href="tel:+918128801731" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">
                    +91 812-880-1731
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white relative">
                Quick Links
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"></div>
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group"
                    >
                      <span className="w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white relative">
                Connect With Us
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-400 to-transparent"></div>
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className={`p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-current/25 group`}
                      aria-label={social.name}
                    >
                      <IconComponent className="w-5 h-5 group-hover:animate-pulse" />
                    </a>
                  );
                })}
              </div>
              
              {/* Newsletter signup hint */}
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                <p className="text-sm text-gray-300">
                  Stay updated with our latest innovations and insights.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © {currentYear} RR Enterprises. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="#privacy" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#terms" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="#cookies" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Cookie Policy
                </a>
              </div>
            </div>
            
            {/* Subtle animated line */}
            <div className="mt-4 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;