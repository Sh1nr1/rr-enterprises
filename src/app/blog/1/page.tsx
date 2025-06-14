// app/blog/sample/page.tsx
'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence, UseInViewOptions, useInView, easeOut } from 'framer-motion'
import { useTheme } from 'next-themes' // <--- IMPORT useTheme here!
import {
  ArrowRight,
  Calendar,
  User,
  Share2,
  BookOpen,
  Clock,
  Home,
  ChevronRight,
  Sun as SunIcon,
  Moon as MoonIcon,
} from 'lucide-react'

// Import shared components
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ThemeToggle from '@/components/layout/ThemeToggle'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

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
}

// Reusable Animated Section Component
interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  intersectionThreshold?: number
}

const AnimatedSection = ({ children, className = '', intersectionThreshold = 0.1 }: AnimatedSectionProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    threshold: intersectionThreshold,
  } as UseInViewOptions);

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

const BlogPostPage = () => {
  // Use next-themes' useTheme hook
  const { theme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark'; // Convenience flag for conditional styling

  // Mock blog data - in real app this would come from props/API or dynamic routing
  const blogPost = {
    id: 1,
    slug: 'future-of-enterprise-automation',
    title: 'The Future of Solar Automation: AI-Driven Solutions for Tomorrow',
    excerpt:
      'Exploring how artificial intelligence is revolutionizing solar energy deployment and creating unprecedented opportunities for sustainable growth.',
    content: `
# Revolutionizing Solar Operations

The landscape of solar energy deployment and management is evolving at breakneck speed. As we stand on the precipice of a new era, artificial intelligence is not just changing how we build and maintain solar farms—it's redefining what's possible in renewable energy.

## The Current State of Solar Automation

Today's solar enterprises are increasingly relying on sophisticated automation systems to streamline panel installation, optimize energy harvesting, and reduce operational costs. From drone-based inspections to automated cleaning systems, the scope of what can be automated continues to expand.

### Key Benefits We're Seeing:

- **Optimized Energy Yield**: AI predicts weather patterns and adjusts panel angles for maximum efficiency.
- **Reduced Maintenance Costs**: Predictive analytics identify potential equipment failures before they occur.
- **Accelerated Deployment**: Automated systems streamline the construction of large-scale solar projects.
- **Enhanced Safety**: Robotics and AI minimize human exposure to hazardous environments.

## The AI Revolution in Solar

Artificial Intelligence is the catalyst that's pushing solar automation beyond simple rule-based systems. Machine learning algorithms can now:

- Predict solar panel performance based on environmental data
- Optimize grid integration for stable energy supply
- Personalize energy consumption insights for customers
- Make complex decisions on energy storage and distribution

## Looking Ahead

The future holds even more exciting possibilities. We're moving toward solar ecosystems that don't just generate power, but actually learn, adapt, and improve over time. Imagine solar farms that self-diagnose, self-repair, and continuously optimize their output based on real-time demand and environmental conditions.

### Emerging Trends to Watch:

1. **Autonomous Solar Farms**: Systems that manage themselves from installation to decommissioning.
2. **AI-Powered Grid Management**: Intelligent grids balancing supply and demand with unprecedented precision.
3. **Advanced Material Science Integration**: AI accelerating the discovery of next-gen solar materials.
4. **Decentralized Energy Networks**: Blockchain and AI enabling peer-to-peer energy trading.

## Implementation Strategy for Solar Automation

Successfully implementing AI-driven automation in solar requires a strategic approach:

**Phase 1: Assessment & Data Collection**
Identify processes ripe for automation, focusing on data-rich areas like site selection, energy yield prediction, and maintenance scheduling. Collect comprehensive data from existing operations.

**Phase 2: Pilot Programs & Prototyping**
Start small with pilot projects demonstrating clear ROI, such as AI-driven anomaly detection for solar panels or automated site surveying with drones. This builds confidence and provides valuable learning experiences.

**Phase 3: Scale & Integrate**
Once successful pilots are established, scale the solutions across your solar portfolio. Integrate AI systems with existing operational platforms for seamless workflow and continuous optimization.

## Conclusion

The future of solar energy is intrinsically linked with advanced automation and artificial intelligence. It's not just about producing more clean energy—it's about producing it smarter, more efficiently, and more sustainably. Organizations that embrace this transformation today will lead tomorrow's green energy revolution.

As we continue to push the boundaries of what's possible, one thing is clear: the convergence of AI and solar technology represents the most significant leap forward for renewable energy in our time.
    `,
    author: 'Rishi Singh',
    date: '2025-06-10',
    readTime: '8 min read',
    category: 'Solar Technology',
    image:
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80',
  }

  const relatedPosts = [
    {
      id: 2,
      title: 'Revolutionizing Solar Panel Efficiency with Nanotechnology',
      excerpt: 'Exploring how advanced materials are pushing the boundaries of solar energy capture.',
      author: 'Mike Rodriguez',
      date: '2025-06-08',
      readTime: '6 min read',
      image:
        'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      slug: 'solar-panel-nanotechnology',
    },
    {
      id: 3,
      title: 'The Role of AI in Predictive Maintenance for Solar Farms',
      excerpt: 'How artificial intelligence is ensuring longevity and peak performance of solar assets.',
      author: 'Alex Johnson',
      date: '2025-06-05',
      readTime: '7 min read',
      image:
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      slug: 'ai-predictive-maintenance',
    },
    {
      id: 4,
      title: 'Sustainable Practices in Solar Construction: A Green Approach',
      excerpt: 'Building environmentally conscious solar projects from the ground up.',
      author: 'Emma Wilson',
      date: '2025-06-03',
      readTime: '5 min read',
      image:
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      slug: 'sustainable-solar-construction',
    },
  ]

  const parseMarkdown = (content: string) => {
    let htmlContent = content
      .replace(
        /### (.*$)/gim,
        '<h3 class="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">$1</h3>'
      )
      .replace(
        /## (.*$)/gim,
        '<h2 class="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">$1</h2>'
      )
      .replace(
        /# (.*$)/gim,
        '<h1 class="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">$1</h1>'
      )

    htmlContent = htmlContent.replace(/\*\*(.*?)\*\*/gim, '<strong class="font-semibold text-blue-400">$1</strong>')
    htmlContent = htmlContent.replace(/\*(.*?)\*/gim, '<em class="italic text-gray-300">$1</em>')

    htmlContent = htmlContent.replace(/(\n\d+\.\s.*)+/gim, (match) => {
      const items = match
        .split('\n')
        .filter(line => line.trim() !== '')
        .map(line => `<li class="mb-2 pl-2">${line.replace(/^\d+\.\s/, '')}</li>`)
        .join('');
      return `<ol class="list-decimal list-inside mb-6 pl-4">${items}</ol>`;
    });

    htmlContent = htmlContent.replace(/(\n-\s.*)+/gim, (match) => {
      const items = match
        .split('\n')
        .filter(line => line.trim() !== '')
        .map(line => `<li class="mb-2 pl-2 border-l-2 border-blue-500/30 pl-4">${line.replace(/^- /, '')}</li>`)
        .join('');
      return `<ul class="list-none mb-6">${items}</ul>`;
    });


    htmlContent = htmlContent
      .split('\n\n')
      .map((paragraph) => {
        if (paragraph.trim() === '' || paragraph.trim().startsWith('<h') || paragraph.trim().startsWith('<ul') || paragraph.trim().startsWith('<ol')) {
          return paragraph;
        }
        return `<p class="mb-6 leading-relaxed">${paragraph}</p>`;
      })
      .join('');


    return htmlContent
  }

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 100])

  return (
    // Updated root div to use conditional classes based on `isDark`
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
          {/* Overlay color based on theme */}
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
            // Adjusted prose classes for better theme handling, 'prose-invert' means it inverts for dark mode, so remove when not dark.
            className={`prose prose-lg max-w-none ${isDark ? 'prose-invert text-gray-200' : 'text-gray-800'}`}
          >
            <div dangerouslySetInnerHTML={{ __html: parseMarkdown(blogPost.content) }} />
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
                    key={post.id}
                    variants={itemVariants}
                    custom={index}
                    className={`group cursor-pointer transition-all duration-500 hover:scale-105 backdrop-blur-sm rounded-2xl overflow-hidden border hover:shadow-2xl ${isDark ? 'bg-gray-800/50 border-gray-700/50 hover:shadow-blue-500/20' : 'bg-white/70 border-gray-200/50 hover:shadow-blue-300/20'}`}
                    whileHover={{ y: -5 }}
                  >
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
              <Link href="/blog" passHref>
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
          <Link href="/services" passHref>
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
  )
}

export default BlogPostPage