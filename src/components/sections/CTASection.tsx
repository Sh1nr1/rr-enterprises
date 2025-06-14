import React from 'react';
import { motion, easeInOut, easeIn, easeOut } from 'framer-motion';
import { ArrowRight, Zap, Rocket, Sparkles } from 'lucide-react';

interface CTASectionProps {
  headline?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  variant?: 'default' | 'gradient' | 'particles';
  className?: string;
}

const CTASection: React.FC<CTASectionProps> = ({
  headline = "Ready to Power Your Future?",
  description = "Transform your business with cutting-edge solutions designed for tomorrow. Join industry leaders who trust RR Enterprises to deliver exceptional results and drive innovation.",
  buttonText = "Get a Quote",
  buttonHref = "/contact",
  variant = 'gradient',
  className = ""
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut }
    }
  };

  const floatingIconVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        ease: easeInOut,
        repeat: Infinity
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 3,
        ease: easeInOut,
        repeat: Infinity
      }
    }
  };

  const ParticleAnimation = () => (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 dark:bg-blue-300 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -100],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );

  const GradientAnimation = () => (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-3xl"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{
          rotate: { duration: 20, ease: "linear", repeat: Infinity },
          scale: { duration: 8, ease: "easeInOut", repeat: Infinity }
        }}
      />
      <motion.div
        className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-pink-500/20 via-purple-500/20 to-blue-500/20 rounded-full blur-3xl"
        animate={{
          rotate: -360,
          scale: [1.2, 1, 1.2]
        }}
        transition={{
          rotate: { duration: 25, ease: "linear", repeat: Infinity },
          scale: { duration: 10, ease: "easeInOut", repeat: Infinity }
        }}
      />
    </div>
  );

  const BackgroundAnimation = () => {
    switch (variant) {
      case 'particles':
        return <ParticleAnimation />;
      case 'gradient':
        return <GradientAnimation />;
      default:
        return <GradientAnimation />;
    }
  };

  return (
    <section className={`relative py-20 px-4 overflow-hidden ${className}`}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <BackgroundAnimation />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          variants={floatingIconVariants}
          animate="animate"
          className="absolute top-1/4 left-1/4 text-blue-400/30 dark:text-blue-300/20"
        >
          <Zap size={32} />
        </motion.div>
        <motion.div
          variants={floatingIconVariants}
          animate="animate"
          className="absolute top-1/3 right-1/4 text-purple-400/30 dark:text-purple-300/20"
          style={{ animationDelay: '1s' }}
        >
          <Rocket size={28} />
        </motion.div>
        <motion.div
          variants={floatingIconVariants}
          animate="animate"
          className="absolute bottom-1/3 left-1/3 text-cyan-400/30 dark:text-cyan-300/20"
          style={{ animationDelay: '2s' }}
        >
          <Sparkles size={24} />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Headline */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              {headline}
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-200 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            variants={itemVariants}
            className="relative inline-block"
          >
            {/* Pulsing background effect */}
            <motion.div
              variants={pulseVariants}
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl"
            />
            
            {/* Button */}
            <motion.a
              href={buttonHref}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex items-center justify-center px-8 py-4 md:px-12 md:py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg md:text-xl rounded-full shadow-2xl transition-all duration-300 group overflow-hidden border border-blue-400/30"
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Button content */}
              <span className="relative z-10 mr-2">{buttonText}</span>
              <motion.div
                className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
              >
                <ArrowRight size={24} />
              </motion.div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 -top-px bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
            </motion.a>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-gray-300 dark:text-gray-400"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Free Consultation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span>Custom Solutions</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
    </section>
  );
};

export default CTASection;