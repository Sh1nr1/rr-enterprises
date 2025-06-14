import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CTO",
    company: "TechFlow Dynamics",
    quote: "RR Enterprises transformed our digital infrastructure with their innovative solutions. The team's expertise and dedication exceeded our expectations.",
    rating: 5
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Founder & CEO",
    company: "InnovateLabs",
    quote: "Working with RR Enterprises was a game-changer. Their futuristic approach and cutting-edge technology helped us scale beyond our wildest dreams.",
    rating: 5
  },
  {
    id: 3,
    name: "Dr. Emily Watson",
    role: "Director of Operations",
    company: "NexGen Solutions",
    quote: "The level of professionalism and technical excellence from RR Enterprises is unmatched. They delivered results that transformed our entire business model.",
    rating: 5
  },
  {
    id: 4,
    name: "James Park",
    role: "VP of Engineering",
    company: "Quantum Systems",
    quote: "RR Enterprises doesn't just meet expectations – they redefine what's possible. Their innovative solutions positioned us as industry leaders.",
    rating: 5
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Chief Innovation Officer",
    company: "FutureTech Corp",
    quote: "The partnership with RR Enterprises has been transformative. Their visionary approach and flawless execution make them our go-to technology partner.",
    rating: 5
  }
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/10 dark:bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-300 bg-clip-text text-transparent mb-6"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Discover how RR Enterprises has transformed businesses with cutting-edge solutions and innovative technology.
          </motion.p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex justify-center"
              >
                <div className="w-full max-w-4xl">
                  {/* Main Testimonial Card */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                    <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-200 dark:border-gray-700">
                      {/* Quote Icon */}
                      <div className="absolute top-6 left-6 text-blue-500 dark:text-blue-400 opacity-20">
                        <Quote size={48} />
                      </div>

                      {/* Stars */}
                      <div className="flex justify-center mb-6">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400 mx-1" />
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-200 text-center leading-relaxed mb-8 relative z-10">
                        "{testimonials[currentIndex].quote}"
                      </blockquote>

                      {/* Author Info */}
                      <div className="flex items-center justify-center space-x-4">
                        {/* Avatar */}
                        <div className="relative">
                          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-50"></div>
                          <div className="relative w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {testimonials[currentIndex].avatar ? (
                              <img 
                                src={testimonials[currentIndex].avatar} 
                                alt={testimonials[currentIndex].name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              getInitials(testimonials[currentIndex].name)
                            )}
                          </div>
                        </div>

                        {/* Name and Role */}
                        <div className="text-center">
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                            {testimonials[currentIndex].name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {testimonials[currentIndex].role}
                          </p>
                          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                            {testimonials[currentIndex].company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-200 dark:border-gray-700"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-200 dark:border-gray-700"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-blue-600 dark:bg-blue-400 w-8'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Transform Your Business?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our satisfied clients and experience the RR Enterprises difference. Let's build the future together.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">Get Started Today</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;