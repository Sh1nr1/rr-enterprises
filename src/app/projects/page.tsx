"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from 'next-themes';

// Re-import ShadCN UI components
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Re-import layout components
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';


// Lucide icons
import { Home, MapPin, Building2, Filter, Grid3x3, List, ChevronRight, Phone, Mail } from 'lucide-react';

// --- Utility function to generate slugs ---
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

// --- Project Interface ---
interface Project {
  id: number;
  title: string;
  location: string;
  client: string;
  image: string;
  category: string;
  state: string;
  status: 'Completed' | 'In Progress' | 'Planning';
  slug: string;
}

// --- DEFINE RAW PROJECTS OUTSIDE THE COMPONENT ---
// Add 'as const' to assert the literal types for 'status'
const rawProjectsData = [
  {
    id: 1,
    title: "Smart City Infrastructure",
    location: "Mumbai, Maharashtra",
    client: "Municipal Corporation",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
    category: "Infrastructure",
    state: "Maharashtra",
    status: "Completed"
  },
  {
    id: 2,
    title: "Industrial Complex Development",
    location: "Ahmedabad, Gujarat",
    client: "Gujarat Industries Ltd",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    category: "Industrial",
    state: "Gujarat",
    status: "In Progress"
  },
  {
    id: 3,
    title: "Renewable Energy Park",
    location: "Indore, Madhya Pradesh",
    client: "Green Energy Corp",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=400&fit=crop",
    category: "Energy",
    state: "Madhya Pradesh",
    status: "Completed"
  },
  {
    id: 4,
    title: "Heritage Resort Complex",
    location: "Jaipur, Rajasthan",
    client: "Royal Hospitality Group",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop",
    category: "Hospitality",
    state: "Rajasthan",
    status: "Planning"
  },
  {
    id: 5,
    title: "Tech Park Development",
    location: "Pune, Maharashtra",
    client: "TechnoSpace Solutions",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    category: "Technology",
    state: "Maharashtra",
    status: "Completed"
  },
  {
    id: 6,
    title: "Petrochemical Facility",
    location: "Vadodara, Gujarat",
    client: "Petro Industries",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop",
    category: "Industrial",
    state: "Gujarat",
    status: "In Progress"
  },
  {
    id: 7,
    title: "Agricultural Innovation Center",
    location: "Bhopal, Madhya Pradesh",
    client: "AgriTech Foundation",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop",
    category: "Agriculture",
    state: "Madhya Pradesh",
    status: "Completed"
  },
  {
    id: 8,
    title: "Desert Solar Installation",
    location: "Jodhpur, Rajasthan",
    client: "Solar Dynamics Ltd",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop",
    category: "Energy",
    state: "Rajasthan",
    status: "In Progress"
  }
] as const; // Add 'as const' here

// --- MAP PROJECTS ONCE, OUTSIDE THE COMPONENT ---
// Explicitly type the result of the map operation
const allProjects: Project[] = rawProjectsData.map(p => ({
  ...p,
  slug: generateSlug(p.title),
  // The 'status' property is now correctly typed thanks to 'as const' on rawProjectsData
}));


// --- Breadcrumb Component (using Link from next/link) ---
interface BreadcrumbProps {
  items: { label: string; href: string }[];
  isDarkMode: boolean; // Add isDarkMode prop
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, isDarkMode }) => {
  return (
    <nav className="flex mb-8" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {items.map((item, index) => (
          <li key={item.href} className="inline-flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />}
            <Link
              href={item.href}
              className={`text-sm font-medium ${
                index === items.length - 1
                  ? 'text-cyan-400 cursor-default'
                  : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900' // Apply theme for text color
              } flex items-center transition-colors`}
            >
              <motion.span
                whileHover={{ scale: index === items.length - 1 ? 1 : 1.05 }}
                whileTap={{ scale: index === items.length - 1 ? 1 : 0.95 }}
                className="flex items-center"
              >
                {item.label === 'Home' ? (
                  <>
                    <Home className="w-4 h-4 mr-1" />
                    {item.label}
                  </>
                ) : (
                  item.label
                )}
              </motion.span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

const ProjectsShowcase = () => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  const filters = ['All', 'Maharashtra', 'Gujarat', 'Madhya Pradesh', 'Rajasthan'];

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(allProjects); // Use the globally defined allProjects
    } else {
      setFilteredProjects(allProjects.filter(project => project.state === activeFilter));
    }
  }, [activeFilter]); // 'allProjects' is no longer a dependency as it's stable


  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      } as Transition
    }
  };

  const filterVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 }
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'Completed': return 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-300';
      case 'In Progress': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-300';
      case 'Planning': return 'from-orange-500/20 to-yellow-500/20 border-orange-500/30 text-orange-300';
      default: return 'from-gray-500/20 to-slate-500/20 border-gray-500/30 text-gray-300';
    }
  };
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
        <div className="text-xl text-gray-700 dark:text-gray-300 animate-pulse">
          Loading...
        </div>
      </div>
    );
  }
  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white'
        : 'bg-gradient-to-br from-slate-50 via-white to-slate-100 text-gray-900'
    }`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 50, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full ${
            isDarkMode ? 'bg-gradient-to-br from-cyan-500/10 to-blue-500/5' : 'bg-gradient-to-br from-cyan-500/5 to-blue-500/3'
          } blur-3xl`}
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
          className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full ${
            isDarkMode ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/5' : 'bg-gradient-to-br from-purple-500/5 to-pink-500/3'
          } blur-3xl`}
        />
      </div>

      <Navbar />


      <div className="relative z-10 container mx-auto px-6 py-12 pt-28">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Projects', href: '/projects' },
          ]} isDarkMode={isDarkMode} />
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6"
        >
          <div>
            <motion.h1
              className={`text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r ${
                isDarkMode
                  ? 'from-white via-cyan-200 to-blue-300'
                  : 'from-gray-900 via-cyan-600 to-blue-700'
              } bg-clip-text text-transparent`}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our Projects
            </motion.h1>
            <motion.p
              className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'} max-w-2xl`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Showcasing cutting-edge solar construction and development projects across India&apos;s key states.
            </motion.p>
          </div>
        </motion.div>

        {/* Filters and View Controls */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`sticky top-20 z-20 p-6 mb-8 rounded-2xl backdrop-blur-xl border ${
            isDarkMode
              ? 'bg-slate-800/30 border-slate-700/50'
              : 'bg-white/30 border-slate-200/50'
          } shadow-2xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6`}
        >
          {/* State Filters */}
          <div className="flex flex-wrap gap-3">
            <div className={`flex items-center gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filter by State:</span>
            </div>
            {filters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                  activeFilter === filter
                    ? isDarkMode
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25'
                      : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-600/25'
                    : isDarkMode
                      ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 border border-slate-600/30'
                      : 'bg-slate-100/50 text-slate-600 hover:bg-slate-200/50 border border-slate-300/30'
                }`}
                variants={filterVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeFilter === filter && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </motion.button>
            ))}
          </div>

          {/* View Mode Toggle - Using ShadCN Button */}
          <div className={`flex items-center gap-2 p-1 rounded-lg ${
            isDarkMode ? 'bg-slate-700/50' : 'bg-slate-200/50'
          }`}>
            <Button
              onClick={() => setViewMode('grid')}
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className={`${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => setViewMode('list')}
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              className={`${
                viewMode === 'list'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter + viewMode} // Key change for re-animation on filter/view change
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`grid gap-8 ${
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                : 'grid-cols-1'
            }`}
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="group"
              >
                {/* Fixed Link component - removed legacyBehavior and anchor tag */}
                <Link href={`/projects/${project.slug}`} className="block">
                  {/* Using ShadCN Card */}
                  <Card className={`overflow-hidden border-0 shadow-2xl backdrop-blur-xl ${
                    isDarkMode
                      ? 'bg-slate-800/40 hover:bg-slate-800/60'
                      : 'bg-white/40 hover:bg-white/60'
                  } transition-all duration-500 group-hover:shadow-cyan-500/20 cursor-pointer h-full`}>
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Status Badge - Using ShadCN Badge */}
                      <div className="absolute top-4 right-4">
                        <Badge className={`bg-gradient-to-r ${getStatusColor(project.status)} backdrop-blur-sm border text-xs font-medium`}>
                          {project.status}
                        </Badge>
                      </div>

                      {/* Neon Glow Effect */}
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                        isDarkMode ? 'bg-gradient-to-t from-cyan-500/20 to-transparent' : 'bg-gradient-to-t from-cyan-600/10 to-transparent'
                      }`} />
                    </div>

                    {/* Using ShadCN CardContent */}
                    <CardContent className="p-6">
                      <motion.h3
                        className={`text-xl font-bold mb-3 ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        } group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}
                      >
                        {project.title}
                      </motion.h3>

                      <div className="space-y-3">
                        <div className={`flex items-center gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          <MapPin className="w-4 h-4 text-cyan-500" />
                          <span className="text-sm">{project.location}</span>
                        </div>

                        <div className={`flex items-center gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          <Building2 className="w-4 h-4 text-blue-500" />
                          <span className="text-sm">{project.client}</span>
                        </div>

                        <Badge variant="outline" className={`${
                          isDarkMode
                            ? 'border-slate-600/50 text-slate-300'
                            : 'border-slate-300/50 text-slate-600'
                        } bg-transparent`}>
                          {project.category}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center py-20 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
          >
            <div className="text-6xl mb-4">🏗️</div>
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p>Try selecting a different state filter.</p>
            <Link href="/contact" className="inline-block mt-6">
              <Button
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
              >
                <Phone className="w-5 h-5" /> Contact Us
              </Button>
            </Link>
          </motion.div>
        )}

        {/* Footer Stats */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className={`mt-20 p-8 rounded-2xl backdrop-blur-xl border text-center ${
            isDarkMode
              ? 'bg-slate-800/30 border-slate-700/50'
              : 'bg-white/30 border-slate-200/50'
          } shadow-2xl`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Projects', value: allProjects.length }, // Use allProjects here too
              { label: 'States Covered', value: 4 }, // This value is hardcoded, consider deriving it if dynamic
              { label: 'Completed', value: allProjects.filter(p => p.status === 'Completed').length },
              { label: 'In Progress', value: allProjects.filter(p => p.status === 'In Progress').length }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                className="space-y-2"
              >
                <motion.div
                  className={`text-3xl font-bold bg-gradient-to-r ${
                    isDarkMode
                      ? 'from-cyan-400 to-blue-400'
                      : 'from-cyan-600 to-blue-600'
                  } bg-clip-text text-transparent`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {stat.value}
                </motion.div>
                <div className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-8 text-center"
          >
            <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Ready to power your next vision?
            </h3>
            <Link href="/contact" className="inline-block">
              <Button
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg"
              >
                <Mail className="w-5 h-5" /> Get a Quote
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectsShowcase;