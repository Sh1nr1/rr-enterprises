"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import * as THREE from "three";
import { Sun, Zap, Brain, ChevronRight, Shield, BarChart3, Cpu } from "lucide-react";
import Link from "next/link";
import { motion, easeOut } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { useTheme } from "next-themes";

// Utility for Framer Motion animations
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};

const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const ThreeJSModel = ({ type, isDark }: { type: string; isDark: boolean }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const renderModel = useCallback(() => {
    if (!mountRef.current) return;

    // Clear existing canvas if any
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 300 / 200, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(300, 200);
    renderer.setClearColor(0x000000, 0); // Transparent background
    mountRef.current.appendChild(renderer.domElement);

    let mainObject: THREE.Group | null = null;

    // Lighting (can be static regardless of theme)
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // --- Model generation based on type and isDark ---
    if (type === "solar") {
      const group = new THREE.Group();
      for (let i = 0; i < 3; i++) {
        const panelGeometry = new THREE.BoxGeometry(2, 0.1, 1.2);
        const panelMaterial = new THREE.MeshPhongMaterial({
          color: isDark ? 0x1a1a2e : 0x16213e,
          shininess: 100,
        });
        const panel = new THREE.Mesh(panelGeometry, panelMaterial);
        panel.position.set(i * 2.5 - 2.5, 0, 0);
        panel.rotation.x = -Math.PI / 6;
        group.add(panel);

        const edgeGeometry = new THREE.EdgesGeometry(panelGeometry);
        const edgeMaterial = new THREE.LineBasicMaterial({
          color: isDark ? 0x00ff88 : 0x0088ff,
        });
        const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
        edges.position.copy(panel.position);
        edges.rotation.copy(panel.rotation);
        group.add(edges);
      }
      
      // Fixed: Use MeshBasicMaterial with proper emissive properties
      const sunGeometry = new THREE.SphereGeometry(0.3, 16, 16);
      const sunMaterial = new THREE.MeshStandardMaterial({
        color: 0xffaa00,
        emissive: new THREE.Color(0xffaa00), // Fixed: Use THREE.Color
        emissiveIntensity: 0.3, // This property exists on MeshBasicMaterial
      });
      const sun = new THREE.Mesh(sunGeometry, sunMaterial);
      sun.position.set(0, 3, -2);
      group.add(sun);
      scene.add(group);
      mainObject = group;
      camera.position.set(5, 2, 5);
      camera.lookAt(0, 0, 0);
    } else if (type === "switchyard") {
      const group = new THREE.Group();
      const transformerGeometry = new THREE.CylinderGeometry(0.8, 0.8, 2, 8);
      const transformerMaterial = new THREE.MeshPhongMaterial({
        color: isDark ? 0x2a2a4a : 0x34495e,
      });
      const transformer = new THREE.Mesh(transformerGeometry, transformerMaterial);
      transformer.position.set(0, 0, 0);
      group.add(transformer);
      for (let i = 0; i < 4; i++) {
        const lineGeometry = new THREE.CylinderGeometry(0.05, 0.05, 3, 8);
        const lineMaterial = new THREE.MeshPhongMaterial({
          color: isDark ? 0x00aaff : 0x2980b9,
        });
        const line = new THREE.Mesh(lineGeometry, lineMaterial);
        const angle = (i / 4) * Math.PI * 2;
        line.position.set(Math.cos(angle) * 2, 1.5, Math.sin(angle) * 2);
        line.rotation.z = Math.PI / 2;
        group.add(line);
        const arcGeometry = new THREE.TorusGeometry(0.1, 0.02, 8, 16);
        const arcMaterial = new THREE.MeshStandardMaterial({
          color: isDark ? 0x00ffff : 0x3498db,
          emissive: new THREE.Color(isDark ? 0x004444 : 0x002244), // Fixed: Use THREE.Color
          emissiveIntensity: 0.5,
        });
        const arc = new THREE.Mesh(arcGeometry, arcMaterial);
        arc.position.copy(line.position);
        arc.position.y += 0.3;
        group.add(arc);
      }
      scene.add(group);
      mainObject = group;
      camera.position.set(6, 3, 6);
      camera.lookAt(0, 0, 0);
    } else if (type === "grid") {
      const group = new THREE.Group();
      const hubGeometry = new THREE.OctahedronGeometry(1);
      const hubMaterial = new THREE.MeshPhongMaterial({
        color: isDark ? 0x6a4c93 : 0x9b59b6,
        transparent: true,
        opacity: 0.8,
      });
      const hub = new THREE.Mesh(hubGeometry, hubMaterial);
      group.add(hub);
      for (let i = 0; i < 8; i++) {
        const nodeGeometry = new THREE.SphereGeometry(0.2, 8, 8);
        const nodeMaterial = new THREE.MeshStandardMaterial({
          color: isDark ? 0x00ff88 : 0x1abc9c,
          emissive: new THREE.Color(isDark ? 0x004422 : 0x002211), // Fixed: Use THREE.Color
          emissiveIntensity: 0.3,
        });
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        const angle = (i / 8) * Math.PI * 2;
        const radius = 2 + Math.sin(i) * 0.5;
        node.position.set(
          Math.cos(angle) * radius,
          Math.sin(i * 0.7) * 1.5,
          Math.sin(angle) * radius
        );
        group.add(node);
        const points = [new THREE.Vector3(0, 0, 0), node.position.clone()];
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMaterial = new THREE.LineBasicMaterial({
          color: isDark ? 0x00aaff : 0x3498db,
          transparent: true,
          opacity: 0.4,
        });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        group.add(line);
      }
      scene.add(group);
      mainObject = group;
      camera.position.set(5, 3, 5);
      camera.lookAt(0, 0, 0);
    }

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      if (mainObject) {
        if (type === "solar") {
          mainObject.rotation.y += 0.005;
          // Fixed: Better type checking for finding the sun object
          const sun = mainObject.children.find(
            (child): child is THREE.Mesh => 
              child instanceof THREE.Mesh && 
              child.geometry instanceof THREE.SphereGeometry
          );
          if (sun && sun.material instanceof THREE.MeshStandardMaterial) {
            sun.material.emissiveIntensity = 0.3 + Math.sin(Date.now() * 0.003) * 0.2;
          }
        } else if (type === "switchyard") {
          mainObject.rotation.y += 0.01;
          mainObject.children.forEach((child) => {
            if (child instanceof THREE.Mesh && child.geometry instanceof THREE.TorusGeometry) {
              child.rotation.x += 0.05;
              child.rotation.z += 0.03;
            }
          });
        } else if (type === "grid") {
          mainObject.rotation.y += 0.008;
          mainObject.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
          mainObject.children.forEach((child, index) => {
            if (child instanceof THREE.Mesh && child.geometry instanceof THREE.SphereGeometry) {
              child.position.y += Math.sin(Date.now() * 0.002 + index) * 0.002;
            }
          });
        }
      }
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.traverse((object) => {
        // Fixed: Proper type checking for meshes
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, [type, isDark]); // Dependencies for useCallback

  useEffect(() => {
    renderModel();
  }, [renderModel]);

  return <div ref={mountRef} className="w-full h-full" />;
};

interface SolutionCardProps {
  solution: {
    title: string;
    icon: React.ElementType;
    type: string;
    description: string;
    features: string[];
    useCases: string[];
  };
  isDark: boolean;
}

const SolutionCard = ({ solution, isDark }: SolutionCardProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      className={`
      relative overflow-hidden rounded-2xl border backdrop-blur-lg transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group
      ${
        isDark
          ? "bg-gray-900/30 border-gray-700/50 shadow-xl hover:shadow-cyan-500/20"
          : "bg-white/30 border-gray-200/50 shadow-xl hover:shadow-blue-500/20"
      }
    `}
    >
      {/* Animated gradient border */}
      <div
        className={`
        absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
        ${
          isDark
            ? "bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20"
            : "bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-teal-500/20"
        }
        animate-gradient-x
      `}
      />

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div
              className={`
              p-3 rounded-xl
              ${
                isDark
                  ? "bg-gradient-to-br from-cyan-500/20 to-purple-500/20"
                  : "bg-gradient-to-br from-blue-500/20 to-teal-500/20"
              }
            `}
            >
              <solution.icon
                className={`w-6 h-6 ${isDark ? "text-cyan-400" : "text-blue-600"}`}
              />
            </div>
            <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
              {solution.title}
            </h3>
          </div>
          <ChevronRight
            className={`w-5 h-5 ${
              isDark ? "text-cyan-400" : "text-blue-600"
            } group-hover:translate-x-1 transition-transform`}
          />
        </div>

        {/* 3D Model */}
        <div className="h-48 mb-6 rounded-xl overflow-hidden bg-black/20 backdrop-blur-sm">
          <ThreeJSModel type={solution.type} isDark={isDark} />
        </div>

        {/* Description */}
        <p className={`text-sm mb-6 leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          {solution.description}
        </p>

        {/* Features */}
        <div className="mb-6">
          <h4 className={`text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-gray-800"}`}>
            Key Features
          </h4>
          <div className="space-y-2">
            {solution.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div
                  className={`w-2 h-2 rounded-full ${isDark ? "bg-cyan-400" : "bg-blue-500"}`}
                />
                <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div>
          <h4 className={`text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-gray-800"}`}>
            Applications
          </h4>
          <div className="flex flex-wrap gap-2">
            {solution.useCases.map((useCase, index) => (
              <span
                key={index}
                className={`
                  px-3 py-1 rounded-full text-xs font-medium
                  ${
                    isDark
                      ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300"
                      : "bg-gradient-to-r from-blue-500/20 to-teal-500/20 text-blue-700"
                  }
                `}
              >
                {useCase}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SolarSolutionsPage = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  const solutions = [
    {
      title: "Advanced Solar Panels",
      icon: Sun,
      type: "solar",
      description:
        "Next-generation photovoltaic technology with enhanced efficiency and intelligent tracking systems for maximum energy conversion.",
      features: [
        "99.8% Pure Silicon Crystalline Structure",
        "Smart Sun Tracking Technology",
        "Weather-Resistant Nano Coating",
        "Real-time Performance Analytics",
        "25-Year Power Output Guarantee",
      ],
      useCases: ["Residential", "Commercial", "Industrial", "Utility Scale", "Off-Grid"],
    },
    {
      title: "AC-DC Integration Switchyard",
      icon: Zap,
      type: "switchyard",
      description:
        "Intelligent power conversion and distribution system that seamlessly integrates renewable energy sources with existing grid infrastructure.",
      features: [
        "Bidirectional Power Flow Control",
        "Advanced Harmonic Filtering",
        "Remote Monitoring & Control",
        "Fault Detection & Isolation",
        "Load Balancing Optimization",
      ],
      useCases: ["Grid Integration", "Microgrids", "Energy Storage", "Power Quality", "Load Management"],
    },
    {
      title: "Smart AI Grid Monitoring",
      icon: Brain,
      type: "grid",
      description:
        "AI-powered monitoring and predictive analytics platform that optimizes energy distribution and prevents system failures before they occur.",
      features: [
        "Machine Learning Algorithms",
        "Predictive Maintenance",
        "Real-time Anomaly Detection",
        "Energy Demand Forecasting",
        "Automated Response Systems",
      ],
      useCases: ["Smart Cities", "Industrial IoT", "Energy Trading", "Demand Response", "Grid Stability"],
    },
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
        <Navbar />
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-gray-500">
          Loading Advanced Solar Solutions...
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col transition-all duration-500 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900"
          : "bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50"
      }`}
    >
      <Navbar />

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full animate-pulse ${
              isDark ? "bg-cyan-400/30" : "bg-blue-400/30"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <main className="relative z-10 flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-sm"
          aria-label="Breadcrumb"
        >
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href="/" className={`${isDark ? "text-gray-400" : "text-gray-600"} hover:text-blue-500`}>
                Home
              </Link>
              <ChevronRight className={`h-4 w-4 mx-2 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
            </li>
            <li className="flex items-center">
              <span className={`${isDark ? "text-white" : "text-gray-800"} font-medium`}>Solutions</span>
            </li>
          </ol>
        </motion.nav>

        {/* Header */}
        <motion.div variants={fadeInUp} initial="initial" animate="animate" className="text-center mb-16">
          <div className="flex justify-end items-center mb-8">
            <ThemeToggle />
          </div>

          <h1
            className={`text-6xl font-bold mb-6 bg-clip-text text-transparent ${
              isDark
                ? "bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
                : "bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600"
            }`}
          >
            Advanced Solar Solutions
          </h1>

          <p
            className={`text-xl max-w-3xl mx-auto leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Harness the power of tomorrow with our cutting-edge solar technologies. From intelligent
            panels to AI-driven grid management, we deliver enterprise-grade solutions that transform
            how energy is generated, managed, and distributed.
          </p>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto"
          >
            {[
              { icon: Shield, label: "99.9% Uptime", value: "Guaranteed" },
              { icon: BarChart3, label: "Energy Efficiency", value: "45% Higher" },
              { icon: Cpu, label: "AI Processing", value: "Real-time" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`
                  p-6 rounded-xl backdrop-blur-lg border
                  ${
                    isDark
                      ? "bg-gray-800/30 border-gray-700/50"
                      : "bg-white/30 border-gray-200/50"
                  }
                `}
              >
                <stat.icon
                  className={`w-8 h-8 mx-auto mb-3 ${
                    isDark ? "text-cyan-400" : "text-blue-600"
                  }`}
                />
                <div
                  className={`text-2xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-800"}`}
                >
                  {stat.value}
                </div>
                <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Solutions Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {solutions.map((solution, index) => (
            <SolutionCard key={index} solution={solution} isDark={isDark} />
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className={`
            mt-20 p-12 rounded-3xl backdrop-blur-lg border text-center
            ${
              isDark
                ? "bg-gradient-to-r from-gray-800/50 via-purple-800/30 to-gray-800/50 border-gray-700/50"
                : "bg-gradient-to-r from-white/50 via-blue-50/50 to-white/50 border-gray-200/50"
            }
          `}
        >
          <h2 className={`text-4xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-800"}`}>
            Ready to Transform Your Energy Future?
          </h2>
          <p
            className={`text-lg mb-8 max-w-2xl mx-auto ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            Join thousands of organizations already benefiting from our advanced solar solutions. Get
            started with a free consultation and custom energy assessment.
          </p>
          <Link
            href="/contact"
            className={`
              px-12 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl inline-block
              ${
                isDark
                  ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-cyan-500/25"
                  : "bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:shadow-blue-500/25"
              }
            `}
          >
            Schedule Consultation
          </Link>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default SolarSolutionsPage;