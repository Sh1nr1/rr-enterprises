// app/blog/page.tsx
'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import {
  Search,
  Filter,
  Calendar,
  Tag,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  Eye,
  Clock,
  Home,
  ArrowRight,
} from 'lucide-react'

// Import shared components
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ThemeToggle from '@/components/layout/ThemeToggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

// Import the new AnimatedSection component
import AnimatedSection from '@/components/animations/AnimatedSection'

// Helper function to create a slug from a title
const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
}

// Blog post type definition for better type safety
interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  preview: string;
  image: string;
  readTime: string;
  views: string;
  slug: string;
}

// Sample blog data (now including a 'slug' property)
const blogPosts: BlogPost[] = [
  // New AI-related Solar Posts
  {
    id: 10, // Assign a unique ID
    title: 'AI-Powered Optimization: Maximizing Solar Panel Performance',
    category: 'Solar Technology', // Adjusted category for new posts
    date: '2025-06-20', // Use the date from the README.md
    preview: 'Discover how Artificial Intelligence is revolutionizing solar energy by optimizing panel efficiency, predicting output, and extending the lifespan of solar installations.',
    image: 'https://images.unsplash.com/photo-1507668077121-ee23b2d718b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    readTime: '7 min read',
    views: '4.5k', // Sample views
    slug: createSlug('AI-Powered Optimization: Maximizing Solar Panel Performance'),
  },
  {
    id: 11, // Assign a unique ID
    title: 'AI\'s Role in Smart Grids: Seamless Solar Energy Integration',
    category: 'Energy Management', // Adjusted category for new posts
    date: '2025-07-05', // Use the date from the README.md
    preview: 'Explore how Artificial Intelligence is enabling smarter, more resilient electricity grids that can seamlessly integrate the increasing supply of solar energy.',
    image: 'https://images.unsplash.com/photo-1542436897-7175b550548d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    readTime: '9 min read',
    views: '3.9k', // Sample views
    slug: createSlug('AI\'s Role in Smart Grids: Seamless Solar Energy Integration'),
  },
  {
    id: 12, // Assign a unique ID
    title: 'AI in Solar Manufacturing: From Cells to Systems',
    category: 'Manufacturing Innovation', // Adjusted category for new posts
    date: '2025-07-20', // Use the date from the README.md
    preview: 'Discover how Artificial Intelligence is revolutionizing every stage of solar panel manufacturing, leading to higher quality, lower costs, and accelerated production.',
    image: 'https://images.unsplash.com/photo-1602830889278-8d00c3b318a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    readTime: '8 min read',
    views: '4.2k', // Sample views
    slug: createSlug('AI in Solar Manufacturing: From Cells to Systems'),
  },
  {
    id: 13, // Assign a unique ID
    title: 'Revolutionizing Solar O&M with AI-Driven Predictive Maintenance',
    category: 'Operations & Maintenance', // Adjusted category for new posts
    date: '2025-08-01', // Use the date from the README.md
    preview: 'Learn how Artificial Intelligence is transforming solar farm operations and maintenance (O&M) from reactive fixes to proactive predictions, ensuring peak performance and longevity.',
    image: 'https://images.unsplash.com/photo-1594192661595-c9a0c20a273e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    readTime: '6 min read',
    views: '4.8k', // Sample views
    slug: createSlug('Revolutionizing Solar O&M with AI-Driven Predictive Maintenance'),
  },

  // Existing Posts (reordered by date for better sorting logic if implemented)
  {
    id: 1,
    title: 'The Future of Solar Automation: AI-Driven Solutions for Tomorrow',
    category: 'Solar Energy',
    date: '2024-06-10',
    preview: 'Exploring how artificial intelligence is revolutionizing solar energy deployment and creating unprecedented opportunities for sustainable growth.',
    image: 'https://images.unsplash.com/photo-1509390231575-b9f471e847c2?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    readTime: '5 min read',
    views: '2.1k',
    slug: createSlug('The Future of Solar Automation: AI-Driven Solutions for Tomorrow'),
  },
  {
    id: 2,
    title: 'Grid Integration: Making Solar Power Seamless',
    category: 'Technology',
    date: '2024-06-08',
    preview: 'Learn about the advancements in grid-tie systems and how they optimize energy flow for solar setups.',
    image: 'https://images.unsplash.com/photo-1621243878775-520e54d5b244?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    readTime: '7 min read',
    views: '1.8k',
    slug: createSlug('Grid Integration: Making Solar Power Seamless'),
  },
  {
    id: 3,
    title: 'The Economics of Solar: ROI and Incentives',
    category: 'Finance',
    date: '2024-06-05',
    preview: 'Understand the financial benefits of going solar, including return on investment and government incentives in India.',
    image: 'https://images.unsplash.com/photo-1533418264831-cd9a7708546b?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    readTime: '8 min read',
    views: '3.2k',
    slug: createSlug('The Economics of Solar: ROI and Incentives'),
  },
  {
    id: 4,
    title: 'Commercial Solar: Powering Businesses Sustainably',
    category: 'Case Study',
    date: '2024-06-03',
    preview: 'Explore how businesses are reducing operational costs and carbon footprints with large-scale solar installations.',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f00e922?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    readTime: '4 min read',
    views: '1.5k',
    slug: createSlug('Commercial Solar: Powering Businesses Sustainably'),
  },
  {
    id: 5,
    title: 'Maintaining Your Solar System: Tips for Longevity',
    category: 'Maintenance',
    date: '2024-06-01',
    preview: 'Essential tips and tricks to ensure your solar panels and system perform optimally for years to come.',
    image: 'https://images.unsplash.com/photo-1621243878775-520e54d5b244?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    readTime: '6 min read',
    views: '2.7k',
    slug: createSlug('Maintaining Your Solar System: Tips for Longevity'),
  },
  {
    id: 6,
    title: 'The Role of AI in Predictive Solar Analytics',
    category: 'Technology',
    date: '2024-05-30',
    preview: 'How artificial intelligence is revolutionizing solar energy forecasting and system management.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    readTime: '9 min read',
    views: '4.1k',
    slug: createSlug('The Role of AI in Predictive Solar Analytics'),
  },
  {
    id: 7,
    title: 'Sustainable Construction Materials for Solar Projects',
    category: 'Construction',
    date: '2024-05-28',
    preview: 'An overview of eco-friendly materials that enhance the sustainability of solar construction.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    readTime: '5 min read',
    views: '1.9k',
    slug: createSlug('Sustainable Construction Materials for Solar Projects'),
  },
  {
    id: 8,
    title: 'Community Solar Projects: Empowering Localities',
    category: 'Community',
    date: '2024-05-25',
    preview: 'How community-based solar initiatives are bringing clean energy benefits to neighborhoods.',
    image: 'https://images.unsplash.com/photo-1621243878775-520e54d5b244?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    readTime: '6 min read',
    views: '2.3k',
    slug: createSlug('Community Solar Projects: Empowering Localities'),
  },
  {
    id: 9,
    title: 'The Impact of Solar on Real Estate Value',
    category: 'Finance',
    date: '2024-05-23',
    preview: 'A look into how installing solar panels can significantly increase your property\'s market value.',
    image: 'https://images.unsplash.com/photo-1533418264831-cd9a7708546b?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    readTime: '7 min read',
    views: '1.6k',
    slug: createSlug('The Impact of Solar on Real Estate Value'),
  },
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date descending

const categories = [
  'All',
  'Solar Energy',
  'Technology',
  'Finance',
  'Case Study',
  'Maintenance',
  'Construction',
  'Community',
  'Solar Technology',       // New category from README.md
  'Energy Management',      // New category from README.md
  'Manufacturing Innovation', // New category from README.md
  'Operations & Maintenance', // New category from README.md
]

const BlogIndex = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)
  const postsPerPage = 6

  const { theme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark'; // Use isDark for conditional classes

  useEffect(() => {
    let filtered = blogPosts

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.preview.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredPosts(filtered)
    setCurrentPage(1)
  }, [selectedCategory, searchTerm])

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Solar Energy':
        return 'from-yellow-500 to-orange-500'
      case 'Technology':
        return 'from-blue-500 to-cyan-500'
      case 'Finance':
        return 'from-green-500 to-emerald-500'
      case 'Case Study':
        return 'from-purple-500 to-pink-500'
      case 'Maintenance':
        return 'from-red-500 to-rose-500'
      case 'Construction':
        return 'from-teal-500 to-lime-500'
      case 'Community':
        return 'from-indigo-500 to-violet-500'
      // New categories for AI/Solar posts
      case 'Solar Technology':
        return 'from-lime-500 to-green-500'
      case 'Energy Management':
        return 'from-orange-500 to-red-500'
      case 'Manufacturing Innovation':
        return 'from-purple-500 to-fuchsia-500'
      case 'Operations & Maintenance':
        return 'from-cyan-500 to-blue-500'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <Navbar />
      <ThemeToggle />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div
          className={`absolute top-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            isDark ? 'bg-blue-500' : 'bg-blue-300'
          }`}
        ></div>
        <div
          className={`absolute -bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            isDark ? 'bg-purple-500' : 'bg-purple-300'
          }`}
        ></div>
      </div>

      <main className="relative z-10 pt-24">
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-4 pt-4">
          <nav className="flex items-center space-x-2 text-gray-400 text-sm">
            <Link href="/" className="hover:text-blue-400 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" /> Home
            </Link>
            <Separator orientation="vertical" className="h-4 w-px bg-gray-600" />
            <span className="text-white">Blog</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1
              className={`text-5xl md:text-6xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Our <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Insights</span>
            </h1>
            <p className={`text-xl md:text-2xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Stay updated with the latest in solar energy and sustainable construction.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between p-4 rounded-xl backdrop-blur-lg border border-white/10"
          >
            {/* Search Bar */}
            <div className="relative flex-1 w-full md:max-w-md">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}
                size={20}
              />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl backdrop-blur-sm border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                ${
                  isDark
                    ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400'
                    : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center md:justify-end gap-2 w-full md:w-auto">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full backdrop-blur-sm border text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? `bg-gradient-to-r ${getCategoryColor(
                          category
                        )} text-white border-transparent shadow-lg`
                      : isDark
                      ? 'bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/50'
                      : 'bg-white/50 border-gray-300 text-gray-600 hover:bg-gray-100/50'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Blog Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={`${selectedCategory}-${searchTerm}-${currentPage}`} // Key change for re-animation on filter/page change
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            <AnimatePresence>
              {currentPosts.length > 0 ? (
                currentPosts.map((post) => (
                  <Link href={`/blog/${post.slug}`} key={post.id} passHref>
                    <motion.article
                      variants={cardVariants}
                      whileHover={{
                        y: -10,
                        transition: { type: 'spring', stiffness: 300, damping: 20 },
                      }}
                      className={`group relative rounded-2xl overflow-hidden backdrop-blur-sm border transition-all duration-300 cursor-pointer
                      ${
                        isDark
                          ? 'bg-gray-800/50 border-gray-700 hover:border-blue-500/50 hover:shadow-blue-500/20'
                          : 'bg-white/70 border-gray-200 hover:border-blue-300/50 hover:shadow-blue-300/20'
                      } shadow-lg hover:shadow-xl`}
                    >
                      {/* Glow Effect */}
                      <div
                        className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r ${getCategoryColor(
                          post.category
                        )} blur-xl`}
                      ></div>

                      {/* Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Category Badge */}
                        <div
                          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm bg-gradient-to-r ${getCategoryColor(
                            post.category
                          )} text-white`}
                        >
                          {post.category}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-3 text-sm">
                          <div
                            className={`flex items-center gap-1 ${
                              isDark ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            <Calendar size={14} />
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                          <div
                            className={`flex items-center gap-1 ${
                              isDark ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            <Clock size={14} />
                            {post.readTime}
                          </div>
                          <div
                            className={`flex items-center gap-1 ${
                              isDark ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            <Eye size={14} />
                            {post.views}
                          </div>
                        </div>

                        <h3
                          className={`text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300 ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {post.title}
                        </h3>

                        <p
                          className={`text-sm line-clamp-3 ${
                            isDark ? 'text-gray-300' : 'text-gray-600'
                          }`}
                        >
                          {post.preview}
                        </p>
                      </div>
                    </motion.article>
                  </Link>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`col-span-full text-center py-10 rounded-xl border border-dashed ${
                    isDark ? 'border-gray-700 text-gray-400' : 'border-gray-300 text-gray-600'
                  }`}
                >
                  <p className="text-lg">No blog posts found for your selection.</p>
                  <Button
                    onClick={() => {
                      setSelectedCategory('All')
                      setSearchTerm('')
                    }}
                    className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  >
                    Reset Filters
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center items-center gap-4"
            >
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                variant="ghost"
                size="icon"
                className={`p-2 rounded-full backdrop-blur-sm border transition-all duration-300 ${
                  currentPage === 1
                    ? isDark
                      ? 'bg-gray-800/30 border-gray-700 text-gray-600 cursor-not-allowed'
                      : 'bg-white/30 border-gray-300 text-gray-400 cursor-not-allowed'
                    : isDark
                    ? 'bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50 hover:border-blue-500'
                    : 'bg-white/50 border-gray-300 text-gray-900 hover:bg-gray-100/50 hover:border-blue-300'
                }`}
              >
                <ChevronLeft size={20} />
              </Button>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-full backdrop-blur-sm border transition-all duration-300 ${
                      currentPage === i + 1
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-lg'
                        : isDark
                        ? 'bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:border-blue-500'
                        : 'bg-white/50 border-gray-300 text-gray-600 hover:bg-gray-100/50 hover:border-blue-300'
                    }`}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>

              <Button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                variant="ghost"
                size="icon"
                className={`p-2 rounded-full backdrop-blur-sm border transition-all duration-300 ${
                  currentPage === totalPages
                    ? isDark
                      ? 'bg-gray-800/30 border-gray-700 text-gray-600 cursor-not-allowed'
                      : 'bg-white/30 border-gray-300 text-gray-400 cursor-not-allowed'
                    : isDark
                    ? 'bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50 hover:border-blue-500'
                    : 'bg-white/50 border-gray-300 text-gray-900 hover:bg-gray-100/50 hover:border-blue-300'
                }`}
              >
                <ChevronRight size={20} />
              </Button>
            </motion.div>
          )}

          {/* Call to Action: Discover Services or Contact */}
          <AnimatedSection className="py-24 px-4 sm:px-6 lg:px-8 text-center mt-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Ready for Your Solar Journey?
            </h2>
            <p
              className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Beyond insights, we offer tangible solar solutions. Explore our services or get in
              touch for a custom quote.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/services" passHref>
                <Button
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 group shadow-lg"
                  asChild
                >
                  <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Explore Services
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                </Button>
              </Link>
              <Link href="/contact" passHref>
                <Button
                  className={`inline-flex items-center px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 group shadow-lg ${
                    isDark
                      ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 hover:border-gray-500'
                      : 'bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 hover:border-gray-400'
                  }`}
                  asChild
                >
                  <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Contact Us
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default BlogIndex