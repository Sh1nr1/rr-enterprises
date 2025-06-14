'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView, easeOut, UseInViewOptions } from 'framer-motion'
import {
  Briefcase,
  MapPin,
  ArrowRight,
  X,
  Upload,
  Users,
  Code,
  Database,
  Palette,
  Shield,
  Home,
  ChevronRight,
  Bolt,
  Globe,
  Rocket,
  Sparkles, // Added Sparkles icon for Gemini feature
  LucideProps
} from 'lucide-react'

// Define the jobRoles array
const jobRoles = [
  {
    id: 1,
    title: 'Senior Full-Stack Developer',
    description: 'Build next-generation applications using cutting-edge technologies and AI integration.',
    location: 'San Francisco, CA / Remote',
    icon: Code,
    gradient: 'from-cyan-400 to-blue-600',
  },
  {
    id: 2,
    title: 'AI/ML Engineer',
    description: 'Develop intelligent systems that push the boundaries of machine learning and automation.',
    location: 'Austin, TX / Hybrid',
    icon: Bolt,
    gradient: 'from-purple-400 to-pink-600',
  },
  {
    id: 3,
    title: 'Product Designer',
    description: 'Craft intuitive user experiences that blend aesthetics with functionality.',
    location: 'New York, NY / Remote',
    icon: Palette,
    gradient: 'from-emerald-400 to-teal-600',
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    description: 'Architect scalable infrastructure and streamline deployment pipelines.',
    location: 'Seattle, WA / Remote',
    icon: Database,
    gradient: 'from-orange-400 to-red-600',
  },
  {
    id: 5,
    title: 'Cybersecurity Specialist',
    description: 'Protect our digital assets and implement advanced security protocols.',
    location: 'Washington, DC / Hybrid',
    icon: Shield,
    gradient: 'from-indigo-400 to-purple-600',
  },
  {
    id: 6,
    title: 'Global Sales Director',
    description: 'Lead international expansion and build strategic partnerships worldwide.',
    location: 'Multiple Locations',
    icon: Globe,
    gradient: 'from-rose-400 to-pink-600',
  },
] as const;

// Define JobRole as the union of all types in the jobRoles array (id is 1 | 2 | 3 | 4 | 5 | 6)
type JobRole = typeof jobRoles[number];

// Define GeneralApplicationJob type for the special case where id is 0
type GeneralApplicationJob = {
  id: 0; // Literal type 0 for general application
  title: 'General Application'; // Literal type for general application title
  description: string;
  location: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  gradient: string;
};

// The type for selectedJob should be the union of all specific job roles AND the general application job, or null
type SelectedJobState = JobRole | GeneralApplicationJob;


// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
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
  }as UseInViewOptions);

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

const CareersPage = () => {
  // Correctly type selectedJob to be either JobRole (from array) or GeneralApplicationJob or null
  const [selectedJob, setSelectedJob] = useState<SelectedJobState | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    coverLetter: '',
  })
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isLoadingLLM, setIsLoadingLLM] = useState(false); // State for LLM loading indicator

  /**
   * Handles the "Apply Now" button click for a specific job.
   * Sets the selected job, pre-fills the form, and opens the modal.
   * @param job The job object being applied for.
   */
  const handleApply = (job: JobRole) => {
    setSelectedJob(job)
    setFormData((prev) => ({ ...prev, position: job.title }))
    setIsModalOpen(true)
  }

  /**
   * Handles form input changes.
   * @param e The change event from the input field.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handles form submission.
   * @param e The form submission event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Application submitted:', { formData, resumeFile })
    // Simulate API call
    setTimeout(() => {
      console.log('Application submitted successfully!');
      setIsModalOpen(false)
      setFormData({ name: '', email: '', phone: '', position: '', coverLetter: '' })
      setResumeFile(null)
      setSelectedJob(null);
    }, 1000);
  }

  /**
   * Handles resume file upload.
   * @param e The change event from the file input field.
   */
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setResumeFile(file)
  }

  /**
   * Generates a cover letter using the Gemini API based on the selected job and user's input.
   */
  const handleGenerateCoverLetter = async () => {
    setIsLoadingLLM(true);
    let prompt = `Write a professional cover letter for a job application.\n\n`;

    const applicantName = formData.name || 'Your Name';
    const applicantEmail = formData.email || 'your.email@example.com';
    const jobTitle = selectedJob?.title || 'a General Application';
    const jobDescription = selectedJob?.description || 'This is a general application, so describe a strong, adaptable candidate for an innovative tech company.';

    prompt += `Applicant Name: ${applicantName}\n`;
    prompt += `Applicant Email: ${applicantEmail}\n`;
    prompt += `Applying for Position: ${jobTitle}\n`;
    prompt += `Job Description: ${jobDescription}\n\n`;
    prompt += `The cover letter should be concise, highlight relevant skills, and express enthusiasm for the role and company (RR Enterprises, focused on AI-driven solar automation).`;

    const chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });

    const payload = { contents: chatHistory };
    const apiKey = "" // Leave this as-is; Canvas will provide it at runtime.
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const generatedText = result.candidates[0].content.parts[0].text;
        setFormData((prev) => ({ ...prev, coverLetter: generatedText }));
      } else {
        console.error('Gemini API response structure unexpected:', result);
        // Fallback or user message for unexpected response
      }
    } catch (error) {
      console.error('Error generating cover letter:', error);
      // Fallback or user message for error
    } finally {
      setIsLoadingLLM(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden">
      <header className="py-4 px-6 flex justify-between items-center bg-slate-900">
        <div className="text-xl font-bold text-white">RR Enterprises</div>
      </header>

      <main>
        <div className="container mx-auto px-4 pt-8 md:pt-12">
          <nav className="flex items-center space-x-2 text-gray-400 text-sm">
            <a href="#" className="hover:text-blue-400 transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" /> Home
            </a>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white">Careers</span>
          </nav>
        </div>

        <AnimatedSection className="relative z-10 text-center py-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Shape Tomorrow
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-80">
              Join RR Enterprises and build the future of solar technology
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={`max-w-2xl mx-auto p-6 rounded-2xl backdrop-blur-sm border bg-white/5 border-white/10`}
            >
              <p className="text-lg leading-relaxed">
                At RR Enterprises, we&apos;re not just building products—we&apos;re crafting the future. Our
                team of visionaries, innovators, and technologists work together to solve tomorrow&apos;s
                challenges today. Join us in creating solutions that matter.
              </p>
            </motion.div>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection className="relative z-10 py-12 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, label: 'Team Members', value: '500+' },
              { icon: Globe, label: 'Countries', value: '25+' },
              { icon: Rocket, label: 'Projects Launched', value: '100+' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`text-center p-6 rounded-2xl backdrop-blur-sm border bg-white/5 border-white/10`}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-cyan-400" />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="opacity-80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="relative z-10 py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              Open Positions
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobRoles.map((job) => (
                <motion.div
                  key={job.id}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`group relative p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 cursor-pointer overflow-hidden
                    bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${job.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${job.gradient} text-white`}>
                        <job.icon className="w-6 h-6" />
                      </div>
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ x: 5 }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-cyan-400 group-hover:to-purple-500 transition-all duration-300">
                      {job.title}
                    </h3>

                    <p className="opacity-80 mb-4 text-sm leading-relaxed">{job.description}</p>

                    <div className="flex items-center text-sm opacity-60">
                      <MapPin className="w-4 h-4 mr-2" />
                      {job.location}
                    </div>

                    <motion.button
                      onClick={() => handleApply(job)}
                      className={`mt-6 w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300
                        bg-white/10 hover:bg-white/20 border border-white/20`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Apply Now
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="py-20 px-6 text-center">
          <motion.div
            variants={itemVariants}
            className={`max-w-4xl mx-auto text-center p-12 rounded-3xl backdrop-blur-sm border bg-white/5 border-white/10`}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">
              Ready to Innovate with Us?
            </h2>
            <p className="text-xl opacity-80 mb-8">
              Explore our comprehensive solar solutions that drive efficiency and sustainability.
            </p>
            <motion.a
              href="#"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full text-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Our Services
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection className="py-20 px-6 text-center">
          <motion.div
            variants={itemVariants}
            className={`max-w-4xl mx-auto text-center p-12 rounded-3xl backdrop-blur-sm border bg-white/5 border-white/10`}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
              Don&apos;t See Your Role?
            </h2>
            <p className="text-xl opacity-80 mb-8">
              We&apos;re always looking for exceptional talent to join our pioneering team.
            </p>
            <motion.button
              onClick={() => {
                // Explicitly type the object being passed to setSelectedJob
                const generalApplicationData: GeneralApplicationJob = {
                  id: 0,
                  title: 'General Application',
                  description: 'General application for a future role.',
                  location: 'Anywhere / Remote',
                  icon: Briefcase,
                  gradient: 'from-gray-400 to-gray-600',
                };
                setSelectedJob(generalApplicationData);
                setFormData((prev) => ({ ...prev, position: 'General Application' }));
                setIsModalOpen(true);
              }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send General Application
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </AnimatedSection>
      </main>

      {/* Application Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-8
                bg-gray-900/95 border border-white/20 backdrop-blur-xl`}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Apply for {selectedJob?.title || 'Position'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className={`p-2 rounded-lg transition-colors hover:bg-white/10`}
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-white" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium mb-2 text-gray-300">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg border bg-white/10 border-white/20 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg border bg-white/10 border-white/20 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-300">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg border bg-white/10 border-white/20 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="position" className="block text-sm font-medium mb-2 text-gray-300">
                      Position
                    </label>
                    <input
                      id="position"
                      type="text"
                      value={formData.position}
                      readOnly
                      className="w-full p-3 rounded-lg border bg-white/5 border-white/10 text-gray-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="coverLetter" className="block text-sm font-medium mb-2 text-gray-300">
                    Cover Letter
                  </label>
                  <textarea
                    id="coverLetter"
                    rows={4}
                    value={formData.coverLetter}
                    onChange={handleChange}
                    placeholder="Tell us why you're perfect for this role..."
                    className="w-full p-3 rounded-lg border bg-white/10 border-white/20 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 text-white resize-none"
                  />
                  <button
                    type="button"
                    onClick={handleGenerateCoverLetter}
                    disabled={isLoadingLLM} // Disable button when loading
                    className="mt-2 w-full flex items-center justify-center py-2 px-4 rounded-lg text-sm font-semibold
                      bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300
                      disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoadingLLM ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" /> ✨ Generate Cover Letter
                      </>
                    )}
                  </button>
                </div>

                <div>
                  <label htmlFor="resume" className="block text-sm font-medium mb-2 text-gray-300">
                    Resume
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
                    border-white/20 hover:border-cyan-400`}
                  >
                    <input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="w-8 h-8 mx-auto mb-2 opacity-50 text-gray-400" />
                    <p className="text-sm opacity-70">
                      {resumeFile ? resumeFile.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs opacity-50 mt-1">PDF, DOC, DOCX up to 10MB</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors
                      bg-white/10 hover:bg-white/20 border border-white/20 text-white`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <footer className="py-8 text-center text-gray-400 text-sm">
        &copy; 2025 RR Enterprises. All rights reserved.
      </footer>
    </div>
  )
}

export default CareersPage
