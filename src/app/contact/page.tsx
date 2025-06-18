"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
    Mail,
    Phone,
    MapPin,
    Send,
    CheckCircle,
    Loader2,
    MessageSquare,
    Zap,
    Globe,
} from 'lucide-react';
import { useTheme } from 'next-themes';

import RREnterprisesLogoSrc from '../../../public/rr-logo.svg';

const Navbar = dynamic(() => import('@/components/layout/Navbar'), { ssr: false });
const Footer = dynamic(() => import('@/components/layout/Footer'), { ssr: false });

interface FormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

interface BreadcrumbLink {
    name: string;
    href: string;
}

const BREADCRUMB_LINKS: BreadcrumbLink[] = [
    { name: 'Home', href: '/' },
    { name: 'Contact', href: '/contact' },
];

const INITIAL_FORM_DATA: FormData = {
    name: '',
    email: '',
    phone: '',
    message: '',
};

const CONTAINER_VARIANTS = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const ITEM_VARIANTS = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 80,
            damping: 10,
        } as Transition,
    },
};

const GLOW_VARIANTS = {
    initial: {
        boxShadow: '0 0 0 rgba(0, 255, 255, 0)',
        borderColor: 'rgba(148, 163, 184, 0.2)'
    },
    focus: {
        boxShadow: '0 0 15px rgba(0, 180, 255, 0.5), inset 0 0 10px rgba(0, 180, 255, 0.05)',
        borderColor: 'rgba(0, 180, 255, 0.7)',
        transition: { duration: 0.3 },
    },
};

interface InputFieldProps {
    label: string;
    name: keyof FormData;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onFocus: (fieldName: string) => void;
    onBlur: () => void;
    focusedField: string;
    placeholder: string;
    required?: boolean;
    rows?: number;
}

const ContactInputField: React.FC<InputFieldProps> = ({
    label, name, type, value, onChange, onFocus, onBlur, focusedField, placeholder, required, rows
}) => (
    <motion.div
        variants={GLOW_VARIANTS}
        initial="initial"
        animate={focusedField === name ? 'focus' : 'initial'}
        className="relative group mb-4"
    >
        <label htmlFor={name} className="block text-sm font-mono mb-1
            text-cyan-700 dark:text-cyan-300">
            {label}
        </label>
        {type === 'textarea' ? (
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                onFocus={() => onFocus(name)}
                onBlur={onBlur}
                required={required}
                rows={rows}
                className="w-full resize-none rounded-xl border px-4 py-3 shadow-inner outline-none transition-all duration-300 font-mono backdrop-blur-sm
                    bg-white/50 text-gray-900 placeholder-gray-500 border-gray-300
                    dark:bg-black/30 dark:text-white dark:placeholder-slate-400 dark:border-white/20"
                placeholder={placeholder}
            />
        ) : (
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onFocus={() => onFocus(name)}
                onBlur={onBlur}
                required={required}
                className="w-full rounded-xl border px-4 py-3 shadow-inner outline-none transition-all duration-300 font-mono backdrop-blur-sm
                    bg-white/50 text-gray-900 placeholder-gray-500 border-gray-300
                    dark:bg-black/30 dark:text-white dark:placeholder-slate-400 dark:border-white/20"
                placeholder={placeholder}
            />
        )}
    </motion.div>
);

interface InfoCardProps {
    icon: React.ElementType;
    iconTextColor: string;
    iconBgColor: string;
    title: string;
    children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon: Icon, iconTextColor, iconBgColor, title, children }) => (
    <motion.div
        className="group flex items-start p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 mb-6
            bg-gray-100/30 border-gray-300/30 hover:border-blue-400/40
            dark:bg-black/20 dark:border-white/10 dark:hover:border-cyan-400/40"
        whileHover={{ x: 3, backgroundColor: 'rgba(0,255,255,0.03)' }}
    >
        <div className={`p-2 rounded-lg ${iconBgColor}/20 mr-3 sm:mr-4`}>
          <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${iconTextColor}`} />
        </div>
        <div>
            <p className="font-mono text-sm mb-1
                text-blue-700 dark:text-cyan-300">{title}</p>
            <div className="text-sm sm:text-base">{children}</div>
        </div>
    </motion.div>
);

const ContactPage = () => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const isDark = mounted && resolvedTheme === 'dark';

    const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [focusedField, setFocusedField] = useState<string>('');

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Using your Formspree endpoint
            const response = await fetch("https://formspree.io/f/xpwrlbav", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json" // Formspree recommends this header
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsSubmitted(true);
                // Clear form data after successful submission
                setTimeout(() => {
                    setIsSubmitted(false);
                    setFormData(INITIAL_FORM_DATA);
                }, 2500); // Display success message for 2.5 seconds
            } else {
                // Attempt to parse error message from Formspree response
                //const errorData = await response.json();
                //const errorMessage = errorData.errors ? errorData.errors.map((err: any) => err.message).join(', ') : 'Failed to send message.';
                //throw new Error(errorMessage);
            }
        } catch (error) {
            console.error("Submission error:", error);
            // Provide user feedback for error
            alert(`Error: ${error instanceof Error ? error.message : 'Something went wrong. Please try again.'}`);
            setIsSubmitted(false); // Ensure success message doesn't show on error
        } finally {
            setIsSubmitting(false); // Always stop submitting state
        }
    };

    if (!mounted) {
        return (
            <div className="flex min-h-screen flex-col
                bg-gradient-to-br from-white via-gray-100 to-blue-50
                dark:from-slate-900 dark:via-blue-900 dark:to-black
                text-gray-900 dark:text-white">
                <Navbar />
                <main className="flex-grow flex items-center justify-center text-center text-blue-600 dark:text-cyan-400">
                    <div className="flex flex-col items-center space-y-4">
                        <Loader2 className="h-10 w-10 animate-spin" />
                        <span className="text-xl font-mono">ESTABLISHING_CONNECTION...</span>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden
            bg-gradient-to-br from-white via-gray-100 to-blue-50
            dark:from-slate-900 dark:via-blue-900 dark:to-black
            text-gray-900 dark:text-white">
            <div className="fixed inset-0 opacity-15 pointer-events-none">
                <div className="absolute inset-0
                    bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-pulse
                    dark:via-cyan-500/5"
                />
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(0,180,255,0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,180,255,0.05) 1px, transparent 1px)
                        `,
                        backgroundSize: '30px 30px'
                    }}
                />
            </div>

            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            x: [0, 80, -40, 0],
                            y: [0, -80, 40, 0],
                            scale: [0.8, 1, 0.7, 0.8],
                        }}
                        transition={{
                            duration: 15 + i * 5,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: i * 3,
                        }}
                        className={`absolute h-20 w-20 rounded-full blur-xl ${
                            isDark
                                ? (i % 2 === 0 ? 'bg-cyan-400/15' : 'bg-blue-400/15')
                                : (i % 2 === 0 ? 'bg-yellow-400/15' : 'bg-orange-400/15')
                        }`}
                        style={{
                            left: `${15 + i * 25}%`,
                            top: `${5 + i * 30}%`,
                        }}
                    />
                ))}
            </div>

            <Navbar />

            <motion.div
                variants={CONTAINER_VARIANTS}
                initial="hidden"
                animate="visible"
                className="container relative z-10 mx-auto px-4 py-8 sm:px-6 sm:py-10 flex-grow"
            >
                <nav className="mb-8 sm:mb-10" aria-label="Breadcrumb">
                    <ol className="flex space-x-1 text-xs sm:text-sm">
                        {BREADCRUMB_LINKS.map((link, index) => (
                            <li key={link.name} className="flex items-center">
                                <Link href={link.href} passHref legacyBehavior>
                                    <motion.a
                                        className="transition-all duration-300 px-2 py-1 rounded border border-transparent hover:border-blue-400/30 hover:bg-blue-400/10
                                            text-blue-600 hover:text-blue-500
                                            dark:text-cyan-400 dark:hover:text-cyan-300 dark:hover:border-cyan-400/30 dark:hover:bg-cyan-400/10"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        {link.name}
                                    </motion.a>
                                </Link>
                                {index < BREADCRUMB_LINKS.length - 1 && (
                                    <span className="mx-1.5 sm:mx-3 text-slate-400 dark:text-slate-500" aria-hidden="true">/</span>
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>

                <motion.div variants={ITEM_VARIANTS} className="mb-12 sm:mb-16 text-center relative">
                    <motion.div
                        initial={{ scale: 0.6, opacity: 0, rotateY: 180 }}
                        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                        transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
                        className="mb-6 flex items-center justify-center"
                    >
                        <div className="relative">
                            <motion.div
                                animate={{
                                    boxShadow: [
                                        '0 0 15px rgba(0,180,255,0.4)',
                                        '0 0 30px rgba(0,180,255,0.7)',
                                        '0 0 15px rgba(0,180,255,0.4)'
                                    ]
                                }}
                                transition={{ duration: 1.8, repeat: Infinity }}
                                className="p-3 rounded-full backdrop-blur-sm border
                                    bg-gradient-to-br from-blue-500/15 to-purple-500/15 border-blue-400/20
                                    dark:from-cyan-500/15 dark:to-blue-500/15 dark:border-cyan-400/20"
                            >
                                <img
                                    src={RREnterprisesLogoSrc.src}
                                    alt="RR Enterprises Logo"
                                    className="h-12 w-12"
                                />
                            </motion.div>
                            <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-400 rounded-full animate-pulse" aria-hidden="true" />
                        </div>
                    </motion.div>

                    <motion.h1
                        variants={ITEM_VARIANTS}
                        className="text-4xl sm:text-5xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent
                            bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
                            dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400"
                        style={{ fontFamily: 'Orbitron, monospace' }}
                    >
                        RR ENTERPRISES
                    </motion.h1>

                    <motion.p
                        variants={ITEM_VARIANTS}
                        className="text-sm sm:text-lg mb-4 sm:mb-6 font-mono
                            text-blue-700 dark:text-cyan-300"
                    >
                        SOLAR_TECH_DIVISION.CONTACT_INTERFACE
                    </motion.p>

                    <motion.p
                        variants={ITEM_VARIANTS}
                        className="text-base sm:text-xl max-w-lg mx-auto leading-relaxed
                            text-gray-700 dark:text-slate-300"
                    >
                        Establishing secure communication channel. Connect with the future of solar energy.
                    </motion.p>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.2, delay: 0.4 }}
                        className="mt-8 sm:mt-10 mb-6 sm:mb-8 h-px relative
                            bg-gradient-to-r from-transparent via-blue-400 to-transparent
                            dark:via-cyan-400"
                        aria-hidden="true"
                    >
                        <motion.div
                            animate={{ x: [-80, 300] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                            className="absolute top-0 w-16 h-px
                                bg-gradient-to-r from-transparent via-blue-400 to-transparent
                                dark:via-cyan-400"
                        />
                    </motion.div>
                </motion.div>

                <div className="mx-auto max-w-4xl grid gap-8 md:grid-cols-2">
                    <motion.div variants={ITEM_VARIANTS}>
                        <div className="relative">
                            <div className="relative rounded-2xl sm:rounded-3xl backdrop-blur-md p-6 sm:p-8 shadow-xl overflow-hidden
                                bg-gradient-to-br from-gray-100/40 to-gray-200/40 border border-gray-300/30
                                dark:from-white/5 dark:to-white/10 dark:border-white/15">
                                <div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 border-l-2 border-t-2 rounded-tl-2xl sm:rounded-tl-3xl
                                    border-blue-400/30 dark:border-cyan-400/30" aria-hidden="true" />
                                <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-20 sm:h-20 border-r-2 border-b-2 rounded-br-2xl sm:rounded-br-3xl
                                    border-blue-400/30 dark:border-cyan-400/30" aria-hidden="true" />

                                <div className="mb-6 sm:mb-8 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="p-2 rounded-lg mr-3 sm:mr-4
                                            bg-blue-400/15 dark:bg-cyan-400/15">
                                            <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6
                                                text-blue-400 dark:text-cyan-400" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl sm:text-xl font-bold font-mono
                                                text-gray-800 dark:text-white">
                                                {'{'}--message--{'}'}
                                            </h2>
                                            <p className="text-xs sm:text-sm
                                                text-blue-600 dark:text-cyan-300">Secure P2P Channel</p>
                                        </div>
                                    </div>
                                    <div className="hidden sm:flex space-x-1" aria-hidden="true">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                                    </div>
                                </div>

                                <AnimatePresence mode="wait">
                                    {!isSubmitted ? (
                                        <motion.form
                                            key="form"
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -15 }}
                                            onSubmit={handleSubmit}
                                            className="space-y-4"
                                        >
                                            <ContactInputField
                                                label="> USER_IDENTIFIER//"
                                                name="name"
                                                type="text"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                onFocus={setFocusedField}
                                                onBlur={() => setFocusedField('')}
                                                focusedField={focusedField}
                                                placeholder="Your designation..."
                                                required
                                            />
                                            <ContactInputField
                                                label="> EMAIL_SMTP_CHANNEL//"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                onFocus={setFocusedField}
                                                onBlur={() => setFocusedField('')}
                                                focusedField={focusedField}
                                                placeholder="user@domain.protocol"
                                                required
                                            />
                                            <ContactInputField
                                                label="> DIRECT_CELL_LINK [OPTIONAL]//"
                                                name="phone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                onFocus={setFocusedField}
                                                onBlur={() => setFocusedField('')}
                                                focusedField={focusedField}
                                                placeholder="+XX XXX XXX XXXX"
                                            />
                                            <ContactInputField
                                                label="> MESSAGE_PAYLOAD//"
                                                name="message"
                                                type="textarea"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                onFocus={setFocusedField}
                                                onBlur={() => setFocusedField('')}
                                                focusedField={focusedField}
                                                placeholder="Your solar energy needs..."
                                                required
                                                rows={4}
                                            />

                                            <motion.button
                                                type="submit"
                                                disabled={isSubmitting}
                                                whileHover={{ scale: 1.01 }}
                                                whileTap={{ scale: 0.99 }}
                                                className="group relative w-full overflow-hidden rounded-xl px-4 py-3 font-bold text-white shadow-md transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 font-mono
                                                    bg-gradient-to-r from-blue-600 to-purple-700
                                                    dark:from-cyan-500 dark:to-blue-600"
                                            >
                                                <motion.div
                                                    className="absolute inset-0 transition-opacity duration-300
                                                        bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-80
                                                        dark:from-cyan-400 dark:to-blue-500 dark:opacity-0 dark:group-hover:opacity-80"
                                                    animate={isSubmitting ? { opacity: [0, 0.4, 0] } : {}}
                                                    transition={{ repeat: Infinity, duration: 1.2 }}
                                                    aria-hidden="true"
                                                />
                                                <div className="relative flex items-center justify-center text-sm sm:text-base">
                                                    {isSubmitting ? (
                                                        <>
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                            TRANSMITTING...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Send className="mr-2 h-4 w-4" />
                                                            INITIATE_TRANSMISSION
                                                        </>
                                                    )}
                                                </div>
                                            </motion.button>
                                        </motion.form>
                                    ) : (
                                        <motion.div
                                            key="success"
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ type: 'spring', stiffness: 180, delay: 0.1 }}
                                            className="py-8 text-center"
                                        >
                                            <motion.div
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{ type: 'spring', stiffness: 180, delay: 0.1 }}
                                                className="relative mb-4"
                                            >
                                                <CheckCircle className="mx-auto h-16 w-16 text-green-400" />
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                                                    className="absolute inset-0 border-2 border-green-400/20 rounded-full"
                                                    aria-hidden="true"
                                                />
                                            </motion.div>
                                            <h3 className="mb-3 text-2xl font-bold text-green-400 font-mono">
                                                TRANSMISSION_COMPLETE
                                            </h3>
                                            <p className="font-mono text-sm
                                                text-gray-700 dark:text-slate-300">
                                                Thank you! Your message has been received.
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={ITEM_VARIANTS} className="space-y-6">
                        <div className="relative rounded-2xl sm:rounded-3xl backdrop-blur-md p-6 sm:p-8 shadow-xl overflow-hidden
                            bg-gradient-to-br from-gray-100/40 to-gray-200/40 border border-gray-300/30
                            dark:from-white/5 dark:to-white/10 dark:border-white/15">
                            <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 border-r-2 border-t-2 rounded-tr-2xl sm:rounded-tr-3xl
                                border-blue-400/30 dark:border-cyan-400/30" aria-hidden="true" />
                            <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 border-l-2 border-b-2 rounded-bl-2xl sm:rounded-bl-3xl
                                border-blue-400/30 dark:border-cyan-400/30" aria-hidden="true" />

                            <div className="flex items-center mb-4 sm:mb-6">
                                <div className="p-2 rounded-lg mr-3 sm:mr-4
                                    bg-blue-400/15 dark:bg-cyan-400/15">
                                    <Globe className="h-5 w-5 sm:h-6 sm:w-6
                                        text-blue-400 dark:text-cyan-400" />
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold font-mono
                                    text-gray-800 dark:text-white">
                                    CONTACT_PROTOCOLS
                                </h2>
                            </div>

                            <div className="space-y-4 sm:space-y-5">
                                <InfoCard icon={MapPin} iconTextColor="text-blue-500" iconBgColor="blue-500" title="HEADQUARTERS">
                                    <address className="not-italic font-medium
                                        text-gray-800 dark:text-white">
                                        B 202 Sangath Pearl<br />
                                        Motera, Ahmedabad<br />
                                        380005, Gujarat, India
                                    </address>
                                </InfoCard>

                                <InfoCard icon={Phone} iconTextColor="text-green-500" iconBgColor="green-500" title="DIRECT_LINK">
                                    <a href="tel:+918128801731" className="font-medium hover:text-blue-500 transition-colors
                                        text-gray-800 dark:text-white dark:hover:text-cyan-400">
                                        +91 812 880 1731
                                    </a>
                                </InfoCard>

                                <InfoCard icon={Mail} iconTextColor="text-purple-500" iconBgColor="purple-500" title="DATA_CHANNEL">
                                    <a href="mailto:rrenterprises1224@gmail.com" className="font-medium hover:text-blue-500 transition-colors
                                        text-gray-800 dark:text-white dark:hover:text-cyan-400">
                                        rrenterprises1224@gmail.com
                                    </a>
                                </InfoCard>
                            </div>
                        </div>

                        <div className="relative rounded-2xl sm:rounded-3xl backdrop-blur-md border shadow-xl overflow-hidden
                            bg-gradient-to-br from-gray-100/40 to-gray-200/40 border-gray-300/30
                            dark:from-white/5 dark:to-white/10 dark:border-white/15">
                            <div className="absolute top-2 left-2 z-10 flex items-center space-x-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-hidden="true" />
                                <span className="text-xs font-mono
                                    text-blue-600 dark:text-cyan-300">LOCATION</span>
                            </div>

                            <div className="relative h-60 sm:h-80 overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d648.7057268155382!2d72.60964765123163!3d23.11050782133315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e83d4854a535f%3A0x7416af5abf889fbc!2sSangath%20Pearl!5e0!3m2!1sen!2sin!4v1750272192535!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className={`transition-all duration-500
                                        ${isDark ? 'filter contrast-125 brightness-75 hue-rotate-180' : ''}`}
                                    title="RR Enterprises Location"
                                />
                                <div className="pointer-events-none absolute inset-0
                                    bg-gradient-to-t from-blue-900/20 to-transparent
                                    dark:from-cyan-900/20 dark:to-transparent" aria-hidden="true" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                            <Link href="/services" passHref legacyBehavior>
                                <motion.a
                                    whileHover={{ scale: 1.03, y: -1 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group relative overflow-hidden rounded-xl backdrop-blur-md border p-4 sm:p-6 shadow-md transition-all duration-300 hover:shadow-lg w-full flex flex-col items-center justify-center
                                        bg-gradient-to-br from-yellow-100/40 to-orange-100/40 border-yellow-300/20
                                        dark:from-yellow-500/15 dark:to-orange-500/15 dark:border-yellow-400/20"
                                >
                                    <div className="absolute inset-0 transition-opacity duration-300
                                        bg-gradient-to-br from-yellow-300/5 to-orange-300/5 opacity-0 group-hover:opacity-80
                                        dark:from-yellow-400/5 dark:to-orange-400/5 dark:opacity-0 dark:group-hover:opacity-80" aria-hidden="true" />
                                    <div className="relative text-center">
                                        <Zap className="mx-auto mb-2 h-6 w-6 text-yellow-400" />
                                        <div className="text-xs font-mono mb-0.5
                                            text-yellow-700 dark:text-yellow-300">SERVICES</div>
                                        <div className="text-xs
                                            text-gray-700/80 dark:text-white/80">Explore Systems</div>
                                    </div>
                                </motion.a>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            <Footer />
        </div>
    );
};

export default ContactPage;