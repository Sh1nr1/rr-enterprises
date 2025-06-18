'use client'

import { motion, useScroll, useTransform, cubicBezier } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import { ChevronDown, Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { useTheme } from 'next-themes'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ThemeToggle from '@/components/layout/ThemeToggle'
import { Button } from '@/components/ui/button'

// --- Constants (Moved to top for clarity) ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
}

const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
        },
    },
}

const statsData = [
    { value: 80, suffix: 'Cr+', label: 'Revenue Generated', prefix: '₹' },
    { value: 20, suffix: '+', label: 'Projects Completed' },
    { value: 500, suffix: 'MW+', label: 'Solar Capacity' },
    { value: 9, suffix: '+', label: 'Years Experience' },
]

const clientLogos = [
    { name: 'Hero Future Energy', logo: '/logos/hero-future.svg' },
    { name: 'Renew Power', logo: '/logos/renew-power.svg' },
    { name: 'Adani Solar', logo: '/logos/adani-solar.svg' },
    { name: 'BonDadda', logo: '/logos/bondadda.svg' },
    { name: 'Tata Power', logo: '/logos/tata-power.svg' },
    { name: 'NTPC', logo: '/logos/ntpc.svg' },
]

// --- AnimatedCounter Component ---
interface AnimatedCounterProps {
    value: number
    suffix?: string
    prefix?: string
    duration?: number
}

function AnimatedCounter({ value, suffix = '', prefix = '', duration = 2000 }: AnimatedCounterProps) {
    const [count, setCount] = useState(0)
    const [isInView, setIsInView] = useState(false)
    const ref = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isInView) {
                    setIsInView(true)
                }
            },
            { threshold: 0.3 }
        )

        const currentRef = ref.current; // Capture current ref value
        if (currentRef) observer.observe(currentRef)
        return () => {
            if (currentRef) observer.disconnect() // Use the captured ref
        };
    }, [isInView])

    useEffect(() => {
        if (!isInView) return

        let start = 0
        const end = value
        const increment = end / (duration / 16)
        const timer = setInterval(() => {
            start += increment
            if (start >= end) {
                setCount(end)
                clearInterval(timer)
            } else {
                setCount(Math.floor(start))
            }
        }, 16)

        return () => clearInterval(timer)
    }, [isInView, value, duration])

    return (
        <span ref={ref} className="font-bold">
            {prefix}{count}{suffix}
        </span>
    )
}

// --- HeroSection Component (Refactored for ref cleanup warning) ---
function HeroSection() {
    const [isPlaying, setIsPlaying] = useState(true)
    const [isMuted, setIsMuted] = useState(true)
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null)
    const { scrollYProgress } = useScroll()
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play().catch(error => console.error("Error playing video:", error));
            }
            setIsPlaying(!isPlaying)
        }
    }

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    useEffect(() => {
        const videoElement = videoRef.current; // Capture the current ref value here

        if (videoElement) {
            videoElement.muted = true
            setIsMuted(true) // Ensure state reflects initial muted state

            const handleCanPlayThrough = () => {
                setVideoLoaded(true);
            };

            const handleError = () => {
                console.error("Video failed to load.");
                setVideoLoaded(false);
            };

            videoElement.addEventListener('canplaythrough', handleCanPlayThrough);
            videoElement.addEventListener('error', handleError);

            videoElement.play().catch(error => {
                console.log("Autoplay prevented:", error);
                // If autoplay is prevented, set playing to false and video not loaded
                setVideoLoaded(false);
                setIsPlaying(false);
            });

            // Cleanup function uses the captured `videoElement`
            return () => {
                videoElement.removeEventListener('canplaythrough', handleCanPlayThrough);
                videoElement.removeEventListener('error', handleError);
                // No need to pause here, the component unmounts and element is removed
            };
        }
    }, []) // Empty dependency array means this effect runs once on mount and cleans up on unmount

    return (
        <section className="relative h-screen overflow-hidden bg-black">
            <div className="absolute inset-0 w-full h-full">
                {/* Always show a poster image while video loads or if it fails */}
                <Image src="/hero-video-poster.jpg" alt="Background poster image" fill priority={true} className="object-cover" />
            </div>

            <motion.div
                style={{ y }}
                className="absolute inset-0 w-full h-full"
            >
                <video
                    ref={videoRef}
                    autoPlay
                    muted={isMuted} // Control muted state with isMuted
                    loop
                    playsInline
                    preload="auto"
                    className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
                >
                    <source src="/videos/hero-background.webm" type="video/webm" />
                    <source src="/videos/hero-background.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-black/30 via-black/50 to-black/70' : 'bg-gradient-to-b from-black/10 via-black/30 to-black/50'}`} />
            </motion.div>

            <div className="absolute top-8 right-8 flex gap-4 z-30">
                <Button
                    onClick={togglePlayPause}
                    variant="ghost"
                    size="icon"
                    className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </Button>
                <Button
                    onClick={toggleMute}
                    variant="ghost"
                    size="icon"
                    className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </Button>
                <ThemeToggle />
            </div>

            <div className="relative z-20 h-full flex items-center justify-center">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="space-y-8"
                    >
                        <motion.div variants={itemVariants} className="space-y-4">
                            <div className={`inline-flex items-center px-4 py-2 rounded-full backdrop-blur-md border text-sm font-medium mb-6
                                ${isDark
                                    ? 'bg-gradient-to-r from-blue-500/20 to-green-500/20 border-white/20 text-white/80'
                                    : 'bg-gradient-to-r from-blue-100/50 to-green-100/50 border-blue-200 text-gray-800'
                                }`}>
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                                Powering India&apos;s Solar Revolution
                            </div>
                            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
                                <span className="bg-gradient-to-r from-blue-400 via-white to-green-400 bg-clip-text text-transparent">
                                    RR Enterprises
                                </span>
                            </h1>
                            <p className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed
                                ${isDark ? 'text-white/80' : 'text-white/80'}`}>
                                Leading Solar EPC Solutions with ₹80 Cr+ Turnover
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-6">
                            <p className={`text-lg md:text-xl max-w-4xl mx-auto
                                ${isDark ? 'text-white/70' : 'text-white/70'}`}>
                                Trusted by industry giants like Hero Future Energy, Renew Power, and Adani Solar.
                                We engineer sustainable energy solutions that power the future of India.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Link href="/projects" passHref>
                                    <Button
                                        className={`px-8 py-4 font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl
                                        ${isDark
                                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-blue-500/25'
                                            : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-300/50'
                                        }`}
                                    >
                                        Explore Our Projects
                                    </Button>
                                </Link>
                                <Link href="/contact" passHref>
                                    <Button
                                        variant="outline"
                                        className={`px-8 py-4 backdrop-blur-md font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300
                                        ${isDark
                                            ? 'bg-white/10 border border-white/20 text-white'
                                            : 'bg-blue-50 border border-blue-200 text-blue-700 hover:text-blue-800 hover:border-blue-300'
                                        }`}
                                    >
                                        Get Quote
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="pt-16"
                        >
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                className={`inline-flex items-center transition-colors cursor-pointer
                                ${isDark ? 'text-white/60 hover:text-white/80' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                <ChevronDown size={24} />
                                <span className="ml-2 text-sm">Scroll to explore</span>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {typeof window !== 'undefined' && [...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className={`absolute w-2 h-2 rounded-full
                        ${isDark ? 'bg-blue-400/30' : 'bg-blue-300/20'}`}
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                    }}
                    animate={{
                        y: [null, -20, null],
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: Math.random() * 2,
                    }}
                />
            ))}
        </section>
    )
}

// --- StatsSection Component ---
function StatsSection() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className={`py-24 ${isDark ? 'bg-gradient-to-b from-gray-900 to-black' : 'bg-gradient-to-b from-gray-100 to-white'}`}
        >
            <div className="max-w-7xl mx-auto px-6">
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Driving <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">Impact</span>
                    </h2>
                    <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Our numbers speak for the sustainable future we&apos;re building across India
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {statsData.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`text-center p-8 rounded-3xl backdrop-blur-sm border transition-all duration-500 group
                                ${isDark
                                    ? 'bg-gradient-to-b from-white/5 to-white/10 border-white/10 hover:border-blue-500/30'
                                    : 'bg-gradient-to-b from-blue-50/50 to-blue-100/50 border-blue-200/50 hover:border-blue-300'
                                }`}
                        >
                            <div className={`text-3xl md:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300
                            ${isDark ? 'text-white' : 'text-blue-700'}`}>
                                <AnimatedCounter
                                    value={stat.value}
                                    suffix={stat.suffix}
                                    prefix={stat.prefix}
                                />
                            </div>
                            <p className={`text-sm md:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    )
}

// --- ClientsSection Component ---
function ClientsSection() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className={`py-24 ${isDark ? 'bg-black' : 'bg-gray-50'}`}
        >
            <div className="max-w-7xl mx-auto px-6">
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Trusted by <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">Industry Leaders</span>
                    </h2>
                    <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Powering partnerships with India&apos;s most innovative energy companies
                    </p>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="relative overflow-hidden"
                >
                    <motion.div
                        animate={{ x: ['0%', '-100%'] }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                        className="flex space-x-16 whitespace-nowrap"
                    >
                        {[...clientLogos, ...clientLogos].map((client, index) => (
                            <div
                                key={index}
                                className={`flex-shrink-0 h-20 w-48 backdrop-blur-sm border rounded-2xl flex items-center justify-center group transition-all duration-300
                                ${isDark
                                    ? 'bg-white/5 border-white/10 hover:bg-white/10'
                                    : 'bg-blue-50/50 border-blue-200/50 hover:bg-blue-100/50'
                                }`}
                            >
                                <span className={`font-semibold text-lg transition-colors
                                ${isDark ? 'text-white/70 group-hover:text-white' : 'text-blue-700/80 group-hover:text-blue-800'}`}>
                                    {client.name}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    )
}

// --- Dynamically imported sections ---
const DynamicServicesSection = dynamic(() => import('@/components/sections/ServicesSection'), {
    ssr: false,
    loading: () => <div className="py-24 text-center text-gray-500 dark:text-gray-400">Loading services...</div>,
});

const DynamicProjectsSection = dynamic(() => import('@/components/sections/ProjectsSection'), {
    ssr: false,
    loading: () => <div className="py-24 text-center text-gray-500 dark:text-gray-400">Loading projects...</div>,
});

const DynamicTestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'), {
    ssr: false,
    loading: () => <div className="py-24 text-center text-gray-500 dark:text-gray-400">Loading testimonials...</div>,
});

const DynamicCTASection = dynamic(() => import('@/components/sections/CTASection'), {
    ssr: false,
    loading: () => <div className="py-24 text-center text-gray-500 dark:text-gray-400">Loading call to action...</div>,
});


// --- HomePage Component ---
export default function HomePage() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    return (
        <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}
        suppressHydrationWarning={true}
        >
            <Head>
                <title>RR Enterprises - Leading Solar EPC Solutions in India</title>
                <meta name="description" content="RR Enterprises provides top-tier Solar EPC solutions, engineering sustainable energy across India with 80Cr+ revenue and 50+ completed projects. Trusted by industry leaders." />
                <meta name="keywords" content="Solar EPC, Solar Energy India, Solar Solutions, Renewable Energy, Solar Power Projects, Solar Developers, India Solar, Hero Future Energy, Renew Power, Adani Solar, Tata Power, NTPC, solar installations" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />

                {/* Open Graph / Social Media Meta Tags */}
                <meta property="og:title" content="RR Enterprises - Leading Solar EPC Solutions in India" />
                <meta property="og:description" content="RR Enterprises provides top-tier Solar EPC solutions, engineering sustainable energy across India with 80Cr+ revenue and 50+ completed projects. Trusted by industry leaders." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.rrenterprises.one/" />
                <meta property="og:image" content="https://www.rrenterprises.one/rr-logo.jpg" />
                <meta property="og:image:alt" content="RR Enterprises Solar Solutions" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />

                {/* Twitter Card Meta Tags (Uncomment and customize if needed) */}
                {/* <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:creator" content="@YourTwitterHandle" />
                <meta name="twitter:title" content="RR Enterprises - Leading Solar EPC Solutions in India" />
                <meta name="twitter:description" content="RR Enterprises provides top-tier Solar EPC solutions, engineering sustainable energy across India with 80Cr+ revenue and 50+ completed projects. Trusted by industry leaders." />
                <meta name="twitter:image" content="https://www.rrenterprises.one/twitter-image.jpg" /> */}

                {/* Canonical URL */}
                <link rel="canonical" href="https://www.rrenterprises.one/" />

                {/* Theme Color for mobile browsers */}
                <meta name="theme-color" content="#2563EB" media="(prefers-color-scheme: light)" />
                <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
            </Head>

            <Navbar />
            <main className='relative'>
                <HeroSection />
                <StatsSection />
                <ClientsSection />

                {/* Dynamically imported sections */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                >
                    <DynamicServicesSection />
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                >
                    <DynamicProjectsSection />
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                >
                    <DynamicTestimonialsSection />
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                >
                    <DynamicCTASection />
                </motion.div>
            </main>
            <Footer />
        </div>
    )
}