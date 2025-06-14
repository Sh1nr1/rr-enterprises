"use client";
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Sun, 
  Zap, 
  DollarSign, 
  Shield, 
  Leaf, 
  TrendingUp, 
  CheckCircle, 
  Phone, 
  Mail, 
  Moon,
  Play,
  Award,
  Clock,
  Users,
  Settings
} from 'lucide-react';

const SolarCommercialPage = () => {
  const [isDark, setIsDark] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  const benefits = [
    {
      icon: DollarSign,
      title: "Massive Cost Savings",
      description: "Reduce energy costs by up to 90% with our high-efficiency commercial solar systems"
    },
    {
      icon: Leaf,
      title: "Environmental Impact",
      description: "Eliminate thousands of tons of CO2 emissions while enhancing your corporate sustainability"
    },
    {
      icon: Shield,
      title: "25-Year Warranty",
      description: "Industry-leading warranty coverage with guaranteed performance and peace of mind"
    },
    {
      icon: TrendingUp,
      title: "ROI in 3-5 Years",
      description: "Fast payback period with immediate energy savings and tax incentives"
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Tier-1 solar panels and inverters from world-renowned manufacturers"
    },
    {
      icon: Users,
      title: "Expert Installation",
      description: "Certified technicians with 15+ years of commercial solar experience"
    }
  ];

  const processSteps = [
    { title: "Initial Consultation", icon: Phone, description: "Free site assessment and energy audit" },
    { title: "Custom Design", icon: Settings, description: "Tailored system design and 3D modeling" },
    { title: "Permits & Approvals", icon: CheckCircle, description: "Handle all paperwork and regulatory requirements" },
    { title: "Professional Installation", icon: Users, description: "Expert installation by certified technicians" },
    { title: "Grid Connection", icon: Zap, description: "Seamless utility interconnection process" },
    { title: "Monitoring & Support", icon: Clock, description: "24/7 system monitoring and maintenance" }
  ];

  const AnimatedCounter = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const ref = React.useRef();
    const inView = useInView(ref);

    useEffect(() => {
      if (inView) {
        let startTime;
        const animate = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          setCount(Math.floor(progress * end));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, [inView, end, duration]);

    return <span ref={ref}>{count}</span>;
  };

  const theme = isDark ? 'dark' : '';

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme}`}>
      <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900 text-white dark:text-gray-100">
        
        {/* Theme Toggle */}
        <motion.button
          onClick={toggleTheme}
          className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ rotate: isDark ? 0 : 180 }}
            transition={{ duration: 0.5 }}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.div>
        </motion.button>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <motion.div
            style={{ y }}
            className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 dark:from-cyan-500/20 dark:to-blue-500/20"
          />
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 dark:bg-cyan-400 rounded-full"
                animate={{
                  x: [0, Math.random() * 100, 0],
                  y: [0, Math.random() * 100, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>

          <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 dark:from-cyan-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent animate-pulse">
                Commercial Solar
              </h1>
              <h2 className="text-3xl md:text-5xl font-light mb-8">
                Power Your Business Forward
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 dark:text-gray-400 mb-12 leading-relaxed"
            >
              Transform your commercial property with cutting-edge solar technology. 
              Join 500+ businesses saving millions on energy costs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-500 dark:to-blue-500 rounded-full text-lg font-semibold shadow-lg hover:shadow-blue-500/50 transition-all duration-300 border border-blue-400/30"
              >
                Get Free Quote
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-full text-lg font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-3"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 dark:text-cyan-400">
                  <AnimatedCounter end={500} />+
                </div>
                <div className="text-sm text-gray-400">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 dark:text-cyan-400">
                  <AnimatedCounter end={250} />MW
                </div>
                <div className="text-sm text-gray-400">Solar Installed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 dark:text-cyan-400">
                  $<AnimatedCounter end={50} />M+
                </div>
                <div className="text-sm text-gray-400">Client Savings</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Service Description */}
        <section className="py-20 px-6 bg-black/20 dark:bg-gray-800/20 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                Enterprise Solar Solutions
              </h2>
              <p className="text-xl text-gray-300 dark:text-gray-400 leading-relaxed max-w-4xl mx-auto">
                RR Enterprises specializes in large-scale commercial solar installations that deliver maximum ROI. 
                Our comprehensive solutions cover everything from initial assessment to long-term maintenance, 
                ensuring your business harnesses clean energy efficiently and cost-effectively.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold mb-4">What We Offer:</h3>
                <ul className="space-y-4">
                  {[
                    "Complete turnkey solar installations",
                    "Custom engineering and design",
                    "Premium equipment with warranties",
                    "Financing and leasing options",
                    "Performance monitoring systems",
                    "Ongoing maintenance and support"
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 dark:text-gray-400">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 dark:from-cyan-500/20 dark:to-blue-500/20 rounded-2xl p-8 backdrop-blur-sm border border-blue-400/20">
                  <Sun className="w-16 h-16 text-yellow-400 mb-6 mx-auto" />
                  <h4 className="text-xl font-semibold mb-4 text-center">Why Choose Solar?</h4>
                  <p className="text-gray-300 dark:text-gray-400 text-center leading-relaxed">
                    Solar energy is the fastest-growing renewable energy source globally. 
                    With declining costs and improving technology, now is the perfect time 
                    to invest in your business's sustainable future.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent"
            >
              Why Businesses Choose Us
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group"
                  >
                    <div className="bg-white/5 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-blue-400/30 transition-all duration-300 h-full">
                      <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-cyan-500/20 dark:to-blue-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-8 h-8 text-blue-400 dark:text-cyan-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                      <p className="text-gray-400 dark:text-gray-500 leading-relaxed">{benefit.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-20 px-6 bg-black/20 dark:bg-gray-800/20 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent"
            >
              Our Installation Process
            </motion.h2>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 dark:from-cyan-500 dark:to-blue-500 rounded-full" />

              <div className="space-y-16">
                {processSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  const isActive = currentStep === index;
                  const isCompleted = currentStep > index;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                    >
                      <div className={`flex-1 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                        <motion.div
                          animate={{ scale: isActive ? 1.05 : 1 }}
                          className={`bg-white/5 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 ${
                            isActive ? 'border-blue-400/50 shadow-lg shadow-blue-400/20' : 'border-white/10'
                          }`}
                        >
                          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                          <p className="text-gray-400 dark:text-gray-500">{step.description}</p>
                        </motion.div>
                      </div>

                      <div className="relative z-10">
                        <motion.div
                          animate={{ 
                            scale: isActive ? 1.2 : 1,
                            backgroundColor: isCompleted ? '#10B981' : isActive ? '#3B82F6' : '#374151'
                          }}
                          className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-white/20 backdrop-blur-md"
                        >
                          <IconComponent className="w-8 h-8 text-white" />
                        </motion.div>
                      </div>

                      <div className="flex-1" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 dark:from-cyan-500/20 dark:to-blue-500/20 rounded-3xl p-12 backdrop-blur-md border border-blue-400/20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                Ready to Go Solar?
              </h2>
              <p className="text-xl text-gray-300 dark:text-gray-400 mb-8 leading-relaxed">
                Get a free consultation and custom quote for your commercial solar project. 
                Our experts will assess your energy needs and design the perfect solution.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-500 dark:to-blue-500 rounded-full text-lg font-semibold shadow-lg hover:shadow-blue-500/50 transition-all duration-300 border border-blue-400/30 flex items-center justify-center gap-3"
                >
                  <Phone className="w-5 h-5" />
                  Call Now: (555) 123-SOLAR
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-full text-lg font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Mail className="w-5 h-5" />
                  Email Quote Request
                </motion.button>
              </div>

              <div className="mt-8 text-sm text-gray-400 dark:text-gray-500">
                Free consultation • No obligation • Response within 24 hours
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 bg-black/40 dark:bg-gray-900/40 backdrop-blur-md border-t border-white/10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sun className="w-8 h-8 text-blue-400 dark:text-cyan-400" />
              <span className="text-2xl font-bold">RR Enterprises</span>
            </div>
            <p className="text-gray-400 dark:text-gray-500 mb-4">
              Leading commercial solar installations across the nation
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <span>Licensed & Insured</span>
              <span>•</span>
              <span>NABCEP Certified</span>
              <span>•</span>
              <span>25-Year Warranty</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SolarCommercialPage;
