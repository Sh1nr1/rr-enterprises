'use client';

import React from 'react';
import { motion, useInView, Transition } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Building2,
  ArrowRight,
  ExternalLink,
  Zap,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes'; // Import useTheme

interface Project {
  id: string; // Changed to string for consistency with new data if IDs are strings
  name: string; // Renamed from 'title'
  client?: string;
  location: string;
  image: string;
  slug: string; // Assuming we still need a slug for routing, can be generated from title
  capacity: string; // New field, will need a default or derive if not in new data
  completionDate: string; // New field, will need a default or derive if not in new data
  category: 'Commercial' | 'Industrial' | 'Residential' | 'Infrastructure' | 'Energy' | 'Hospitality' | 'Technology' | 'Agriculture'; // Updated categories
  featured?: boolean;
}

// New project data provided by the user
const rawProjects = [
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
];

// Function to generate a slug from a title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen
};

// Map the raw projects to the Project interface
const projects: Project[] = rawProjects.map(rawProject => ({
  id: String(rawProject.id), // Ensure ID is a string
  name: rawProject.title,
  client: rawProject.client,
  location: `${rawProject.location}, ${rawProject.state}`, // Combine location and state
  image: rawProject.image,
  slug: generateSlug(rawProject.title), // Generate slug from title
  capacity: "N/A", // Default value as capacity is not in the new data
  completionDate: rawProject.status === "Completed" ? "2024" : "Ongoing", // Derive from status
  category: rawProject.category as Project['category'], // Type assertion for category
  featured: rawProject.status === "Completed" && (rawProject.id === 1 || rawProject.id === 3 || rawProject.id === 5) // Example of featuring some completed projects
}));


const getCategoryColor = (category: Project['category']) => {
  const colors = {
    Commercial: 'from-blue-500/20 to-cyan-500/20 border-blue-400/30 dark:from-blue-500/30 dark:to-cyan-500/30 dark:border-blue-400/40',
    Industrial: 'from-orange-500/20 to-red-500/20 border-orange-400/30 dark:from-orange-500/30 dark:to-red-500/30 dark:border-orange-400/40',
    Residential: 'from-green-500/20 to-emerald-500/20 border-green-400/30 dark:from-green-500/30 dark:to-emerald-500/30 dark:border-green-400/40',
    Infrastructure: 'from-purple-500/20 to-pink-500/20 border-purple-400/30 dark:from-purple-500/30 dark:to-pink-500/30 dark:border-purple-400/40',
    Energy: 'from-yellow-500/20 to-amber-500/20 border-yellow-400/30 dark:from-yellow-500/30 dark:to-amber-500/30 dark:border-yellow-400/40',
    Hospitality: 'from-fuchsia-500/20 to-rose-500/20 border-fuchsia-400/30 dark:from-fuchsia-500/30 dark:to-rose-500/30 dark:border-fuchsia-400/40',
    Technology: 'from-indigo-500/20 to-purple-500/20 border-indigo-400/30 dark:from-indigo-500/30 dark:to-purple-500/30 dark:border-indigo-400/40',
    Agriculture: 'from-lime-500/20 to-green-500/20 border-lime-400/30 dark:from-lime-500/30 dark:to-green-500/30 dark:border-lime-400/40'
  };
  return colors[category] || 'from-gray-500/20 to-slate-500/20 border-gray-400/30 dark:from-gray-500/30 dark:to-slate-500/30 dark:border-gray-400/40'; // Default color if category not found
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
      duration: 0.8
    } as Transition
  }
};

const ProjectsSection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { resolvedTheme } = useTheme(); // Get the resolved theme
  const isDark = resolvedTheme === 'dark'; // Check if it's currently dark mode

  return (
    <section
      ref={ref}
      // Conditional background based on theme
      className={`relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900' 
          : 'bg-gradient-to-b from-gray-50 via-white/50 to-gray-50'
      }`}
    >
      {/* Background Effects - adjusted for light/dark */}
      <div className={`absolute inset-0 ${isDark ? 'bg-[radial-gradient(circle_at_20%_50%,rgba(34,197,94,0.08),transparent_70%)]' : 'bg-[radial-gradient(circle_at_20%_50%,rgba(34,197,94,0.04),transparent_70%)]'}`} />
      <div className={`absolute inset-0 ${isDark ? 'bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.08),transparent_70%)]' : 'bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.04),transparent_70%)]'}`} />

      {/* Grid Pattern Overlay - adjusted for light/dark */}
      <div className={`absolute inset-0 ${isDark ? 'bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]' : 'bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)]'} bg-[size:50px_50px]`} />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center mb-4">
            <Building2 className="w-10 h-10 text-emerald-400 dark:text-emerald-400 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent
                           bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900
                           dark:from-white dark:via-emerald-200 dark:to-cyan-200">
              Recent Projects
            </h2>
          </div>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed
                       text-gray-700 dark:text-slate-300">
            Discover our latest installations transforming various sectors across India
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              <Card className="relative h-full backdrop-blur-lg overflow-hidden
                               bg-white/50 dark:bg-white/5
                               border border-gray-200 dark:border-white/10
                               hover:border-emerald-400/50 dark:hover:border-emerald-400/50
                               transition-all duration-500">
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-20">
                    <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0 shadow-lg">
                      Featured
                    </Badge>
                  </div>
                )}

                {/* Card Glow Effect - uses the same category color logic */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(project.category)} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Image Overlay - adjusted for light/dark */}
                  <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-slate-900/80 via-transparent to-transparent' : 'bg-gradient-to-t from-gray-50/80 via-transparent to-transparent'}`} />

                  {/* Capacity Badge (using N/A if not available) */}
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center space-x-2
                                     bg-black/50 dark:bg-black/50 // Always dark for contrast on image
                                     backdrop-blur-sm rounded-lg px-3 py-1">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-white font-semibold text-sm">{project.capacity}</span>
                    </div>
                  </div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                <CardContent className="relative z-10 p-6">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="border-emerald-400/30 text-emerald-300 bg-emerald-500/10">
                      {project.category}
                    </Badge>
                    <div className="flex items-center text-gray-500 dark:text-slate-400 text-sm">
                      <Calendar className="w-3 h-3 mr-1" />
                      {project.completionDate}
                    </div>
                  </div>

                  {/* Project Name */}
                  <h3 className="text-xl font-semibold mb-2
                                 text-gray-800 dark:text-white
                                 group-hover:text-emerald-600 dark:group-hover:text-emerald-100
                                 transition-colors duration-300">
                    {project.name}
                  </h3>

                  {/* Client */}
                  {project.client && (
                    <div className="flex items-center mb-3
                                     text-gray-600 dark:text-slate-300">
                      <Building2 className="w-4 h-4 mr-2
                                           text-gray-500 dark:text-slate-400" />
                      <span className="text-sm">{project.client}</span>
                    </div>
                  )}

                  {/* Location */}
                  <div className="flex items-center mb-6
                                   text-gray-600 dark:text-slate-300">
                    <MapPin className="w-4 h-4 mr-2
                                      text-gray-500 dark:text-slate-400" />
                    <span className="text-sm">{project.location}</span>
                  </div>

                  {/* Action Button */}
                  <Link href={`/projects/${project.slug}`} className="block">
                    <motion.div
                      className="flex items-center justify-between p-3 rounded-lg border transition-all duration-300 group/btn cursor-pointer
                                 bg-gray-100/50 hover:bg-emerald-500/20
                                 border-gray-200 hover:border-emerald-400/50
                                 dark:bg-white/5 dark:hover:bg-emerald-500/20
                                 dark:border-white/10 dark:hover:border-emerald-400/50"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="group-hover/btn:text-emerald-600 transition-colors duration-300
                                       text-gray-700 dark:text-white dark:group-hover/btn:text-emerald-100">
                        View Project
                      </span>
                      <ArrowRight className="w-4 h-4 text-emerald-400 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </motion.div>
                  </Link>
                </CardContent>

                {/* Corner Accent - uses the same category color logic */}
                <div className={`absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-b-[30px] ${isDark ? 'border-b-emerald-500/20 group-hover:border-b-emerald-500/40' : 'border-b-emerald-500/10 group-hover:border-b-emerald-500/20'} transition-colors duration-300`} />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <p className="mb-6 text-gray-600 dark:text-slate-400">
            Want to see your project featured here?
          </p>
          <Link href="/projects">
            <motion.button
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="mr-2">View All Projects</span>
              <ExternalLink className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;