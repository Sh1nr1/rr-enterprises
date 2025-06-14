// src/app/projects/[slug]/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { MapPin, Building2, ChevronLeft, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

// Assuming you have these components
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// --- Utility function to generate slugs (same as your ProjectsShowcase) ---
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

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
  description: string; // Add a description for the detail page
}

// Dummy data for demonstration (you'd fetch this from an API or database)
const rawProjects = [
  {
    id: 1,
    title: "Smart City Infrastructure",
    location: "Mumbai, Maharashtra",
    client: "Municipal Corporation",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
    category: "Infrastructure",
    state: "Maharashtra",
    status: "Completed",
    description: "A comprehensive project focused on developing smart infrastructure solutions including intelligent transportation systems, waste management, and public utilities for the city of Mumbai."
  },
  {
    id: 2,
    title: "Industrial Complex Development",
    location: "Ahmedabad, Gujarat",
    client: "Gujarat Industries Ltd",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    category: "Industrial",
    state: "Gujarat",
    status: "In Progress",
    description: "Construction of a sprawling industrial complex designed to house manufacturing units, R&D facilities, and logistics hubs, boosting the region's industrial growth."
  },
  {
    id: 3,
    title: "Renewable Energy Park",
    location: "Indore, Madhya Pradesh",
    client: "Green Energy Corp",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop",
    category: "Energy",
    state: "Madhya Pradesh",
    status: "Completed",
    description: "Development of a large-scale solar and wind energy park contributing significantly to renewable energy generation in Madhya Pradesh."
  },
  {
    id: 4,
    title: "Heritage Resort Complex",
    location: "Jaipur, Rajasthan",
    client: "Royal Hospitality Group",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
    category: "Hospitality",
    state: "Rajasthan",
    status: "Planning",
    description: "A unique hospitality project to restore a historic fort and convert it into a luxury heritage resort, preserving cultural legacy while offering world-class amenities."
  },
  {
    id: 5,
    title: "Tech Park Development",
    location: "Pune, Maharashtra",
    client: "TechnoSpace Solutions",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    category: "Technology",
    state: "Maharashtra",
    status: "Completed",
    description: "A modern technology park designed to foster innovation and host leading IT and software companies, complete with state-of-the-art infrastructure."
  },
  {
    id: 6,
    title: "Petrochemical Facility",
    location: "Vadodara, Gujarat",
    client: "Petro Industries",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
    category: "Industrial",
    state: "Gujarat",
    status: "In Progress",
    description: "Construction of an advanced petrochemical manufacturing facility, incorporating sustainable practices and efficient production lines."
  },
  {
    id: 7,
    title: "Agricultural Innovation Center",
    location: "Bhopal, Madhya Pradesh",
    client: "AgriTech Foundation",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=600&fit=crop",
    category: "Agriculture",
    state: "Madhya Pradesh",
    status: "Completed",
    description: "A research and development center focused on agricultural innovation, promoting sustainable farming techniques and crop yield optimization."
  },
  {
    id: 8,
    title: "Desert Solar Installation",
    location: "Jodhpur, Rajasthan",
    client: "Solar Dynamics Ltd",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop",
    category: "Energy",
    state: "Rajasthan",
    status: "In Progress",
    description: "Installation of a vast solar power plant in the desert region, harnessing solar energy to provide clean electricity to thousands of homes."
  }
];

const projects: Project[] = rawProjects.map(p => ({
  ...p,
  slug: generateSlug(p.title)
}));

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ params }) => {
  const { theme, systemTheme, resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const project = projects.find(p => p.slug === params.slug);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
        <div className="text-xl text-gray-700 dark:text-gray-300 animate-pulse">
          Loading project details...
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className={`min-h-screen flex flex-col justify-center items-center text-center p-8 ${
        isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-100 text-gray-900'
      }`}>
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} mb-8`}>
          The project you are looking for does not exist or has been moved.
        </p>
        <Link href="/projects">
          <Button
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" /> Back to Projects
          </Button>
        </Link>
      </div>
    );
  }

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'Completed': return 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-300';
      case 'In Progress': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-300';
      case 'Planning': return 'from-orange-500/20 to-yellow-500/20 border-orange-500/30 text-orange-300';
      default: return 'from-gray-500/20 to-slate-500/20 border-gray-500/30 text-gray-300';
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white'
        : 'bg-gradient-to-br from-slate-50 via-white to-slate-100 text-gray-900'
    }`}>
      <Navbar />
      <div className="relative z-10 container mx-auto px-6 py-12 pt-28">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link
                  href="/"
                  className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} flex items-center transition-colors`}
                >
                  <Home className="w-4 h-4 mr-1" /> Home
                </Link>
              </li>
              <li className="inline-flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <Link
                  href="/projects"
                  className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} flex items-center transition-colors`}
                >
                  Projects
                </Link>
              </li>
              <li className="inline-flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <span className="text-sm font-medium text-cyan-400 cursor-default">
                  {project.title}
                </span>
              </li>
            </ol>
          </nav>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`rounded-2xl p-8 lg:p-12 shadow-2xl backdrop-blur-xl border ${
            isDarkMode ? 'bg-slate-800/40 border-slate-700/50' : 'bg-white/40 border-slate-200/50'
          }`}
        >
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-80 object-cover rounded-xl mb-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          />

          <h1 className={`text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r ${
            isDarkMode ? 'from-white via-cyan-200 to-blue-300' : 'from-gray-900 via-cyan-600 to-blue-700'
          } bg-clip-text text-transparent`}
          >
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Badge className={`bg-gradient-to-r ${getStatusColor(project.status)} backdrop-blur-sm border text-sm font-medium`}>
              {project.status}
            </Badge>
            <Badge variant="outline" className={`${
              isDarkMode
                ? 'border-slate-600/50 text-slate-300'
                : 'border-slate-300/50 text-slate-600'
            } bg-transparent text-sm`}
            >
              {project.category}
            </Badge>
          </div>

          <p className={`text-lg mb-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            {project.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className={`flex items-center gap-3 p-4 rounded-lg border ${
              isDarkMode ? 'bg-slate-700/30 border-slate-600/50' : 'bg-slate-100/50 border-slate-200/50'
            }`}>
              <MapPin className="w-5 h-5 text-cyan-500 flex-shrink-0" />
              <div>
                <span className={`block text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Location</span>
                <span className={`block text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{project.location}</span>
              </div>
            </div>
            <div className={`flex items-center gap-3 p-4 rounded-lg border ${
              isDarkMode ? 'bg-slate-700/30 border-slate-600/50' : 'bg-slate-100/50 border-slate-200/50'
            }`}>
              <Building2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <div>
                <span className={`block text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Client</span>
                <span className={`block text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{project.client}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <Link href="/contact" className="flex-1">
              <Button
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
              >
                <Phone className="w-5 h-5" /> Inquire About This Project
              </Button>
            </Link>
            <Link href="/projects" className="flex-1">
              <Button
                variant="outline"
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  isDarkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700/50' : 'border-slate-300 text-slate-600 hover:bg-slate-200/50'
                }`}
              >
                <ChevronLeft className="w-5 h-5" /> Back to All Projects
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;