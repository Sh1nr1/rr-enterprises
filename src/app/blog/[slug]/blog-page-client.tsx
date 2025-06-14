// src/app/blog/[slug]/blog-page-client.tsx
'use client'; // This is a Client Component

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence, useInView, easeOut } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  ArrowRight,
  Calendar,
  User,
  Share2,
  BookOpen,
  Clock,
  Home,
  ChevronRight,
} from 'lucide-react';

// Import shared components
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ThemeToggle from '@/components/layout/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { PostMetadata, BlogPostData } from '@/lib/posts'; // Import types

// Framer Motion Variants (keep these here)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};

// Reusable Animated Section Component (keep this here)
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  intersectionThreshold?: number;
}

const AnimatedSection = ({ children, className = '', intersectionThreshold = 0.1 }: AnimatedSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    threshold: intersectionThreshold,
  });

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

// Props interface for this Client Component
interface BlogPostClientProps {
  // `blogPost` now includes the HTML content
  blogPost: PostMetadata & { content: string };
  relatedPosts: PostMetadata[];
}

export const BlogPostClient = ({ blogPost, relatedPosts }: BlogPostClientProps) => {
  // All client-side hooks go here
  const { theme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDark ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar />
      <ThemeToggle />

      <main>
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-4 pt-8 md:pt-12">
          <nav className={`flex items-center space-x-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <Link href="/" className="hover:text-blue-400 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" /> Home
            </Link>
            <Separator orientation="vertical" className={`h-4 w-px ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`} />
            <Link href="/blog" className="hover:text-blue-400 transition-colors flex items-center">
              Blog
            </Link>
            <Separator orientation="vertical" className={`h-4 w-px ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`} />
            <span className={`${isDark ? 'text-white' : 'text-gray-900'} truncate max-w-[200px] sm:max-w-none`}>
              {blogPost.title}
            </span>
          </nav>
        </div>

        {/* Hero Section */}
        <motion.div
          className="relative h-96 overflow-hidden mt-8 md:mt-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-cyan-600/20"
            style={{
              y, // Apply parallax effect
              backgroundImage: `url(${blogPost.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className={`absolute inset-0 ${isDark ? 'bg-gray-900/70 backdrop-blur-sm' : 'bg-gray-100/70 backdrop-blur-sm'}`} />

          <div className="relative h-full flex items-center justify-center">
            <div className="text-center max-w-4xl px-6">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 mb-6"
              >
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-300">{blogPost.category}</span>
              </motion.div>
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 leading-tight"
              >
                {blogPost.title}
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className={`text-lg md:text-xl mb-8 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
              >
                {blogPost.excerpt}
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Article Meta */}
        <AnimatedSection className="max-w-4xl mx-auto px-6 py-8">
          <motion.div
            variants={itemVariants}
            className={`flex flex-wrap items-center gap-6 p-6 rounded-2xl backdrop-blur-sm ${isDark ? 'bg-gray-800/30 border border-gray-700/50' : 'bg-white/70 border border-gray-200/50'}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{blogPost.author}</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Senior Technology Writer</p>
              </div>
            </div>

            <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>
                {new Date(blogPost.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>

            <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <Clock className="w-4 h-4 text-purple-400" />
              <span>{blogPost.readTime}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className={`ml-auto transition-colors ${isDark ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-700/50' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100/50'}`}
              onClick={() => navigator.clipboard.writeText(window.location.href)}
            >
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
          </motion.div>
        </AnimatedSection>

        {/* Article Content */}
        <AnimatedSection className="max-w-4xl mx-auto px-6 pb-16 pt-8">
          <motion.article
            variants={itemVariants}
            // No need for your custom parseMarkdown function anymore, remark-html provides the HTML
            className={`prose prose-lg max-w-none ${isDark ? 'prose-invert text-gray-200' : 'text-gray-800'}`}
          >
            <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
          </motion.article>
        </AnimatedSection>

        {/* Related Posts */}
        <AnimatedSection className={`py-16 backdrop-blur-sm ${isDark ? 'bg-gray-800/30' : 'bg-gray-100/30'}`}>
          <div className="max-w-6xl mx-auto px-6">
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            >
              Related Articles
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              <AnimatePresence>
                {relatedPosts.map((post, index) => (
                  <motion.div
                    key={post.slug} // Use slug as key
                    variants={itemVariants}
                    custom={index}
                    className={`group cursor-pointer transition-all duration-500 hover:scale-105 backdrop-blur-sm rounded-2xl overflow-hidden border hover:shadow-2xl ${isDark ? 'bg-gray-800/50 border-gray-700/50 hover:shadow-blue-500/20' : 'bg-white/70 border-gray-200/50 hover:shadow-blue-300/20'}`}
                    whileHover={{ y: -5 }}
                  >
                    {/* This Link usage is correct as it directly wraps a div, not another <a> */}
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>

                      <div className="p-6">
                        <h3 className={`text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {post.title}
                        </h3>
                        <p className={`mb-4 leading-relaxed line-clamp-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {post.excerpt}
                        </p>

                        <div className={`flex items-center justify-between text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span>
                              {new Date(post.date).toLocaleDateString()}
                            </span>
                            <span className="text-blue-400">{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <motion.div variants={itemVariants} className="text-center mt-12">
              {/* CORRECTED: Added legacyBehavior to Link */}
              <Link href="/blog" passHref legacyBehavior>
                <Button
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 group shadow-lg"
                  asChild
                >
                  <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    View All Articles
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                </Button>
              </Link>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* CTA: Services */}
        <AnimatedSection className="py-24 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">
            Our Expert Solar Services
          </h2>
          <p className={`text-xl mb-12 max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover how RR Enterprises delivers cutting-edge solar EPC solutions tailored to your
            needs.
          </p>
          {/* CORRECTED: Added legacyBehavior to Link */}
          <Link href="/services" passHref legacyBehavior>
            <Button
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full text-lg font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 group shadow-lg"
              asChild
            >
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Explore Our Services
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </Button>
          </Link>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
};