"use client";

import React, { useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import NeonButton from '../ui/NeonButton';
import Link from 'next/link';

const getNeonShadow = (color: string) => {
  const neonColors: Record<string, string> = {
    pink: "rgba(236, 72, 153, 0.8)", // true-pink-500
    blue: "rgba(59, 130, 246, 0.8)",  // true-blue-500
    purple: "rgba(168, 85, 247, 0.8)", // true-purple-500
  };
  const c = neonColors[color] || neonColors.purple;
  return `0 0 10px ${c}, 0 0 30px ${c}`;
};

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroContentRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Parallax effect for background
  useEffect(() => {
    const handleScroll = () => {
      const hero = heroRef.current;
      if (hero) {
        const scrolled = window.scrollY;
        const parallax = scrolled * 0.1; // Adjust the multiplier for parallax intensity
        hero.style.transform = `translateY(${parallax}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#000" }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20"></div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 10 + 2}px`,
              height: `${Math.random() * 10 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: ['rgba(236, 72, 153, 0.4)', 'rgba(59, 130, 246, 0.4)', 'rgba(168, 85, 247, 0.4)'][Math.floor(Math.random() * 3)],
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Background Video (for Hero Section) */}
      <div ref={heroRef} className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2"
            poster="https://placehold.co/1920x1080/000/000?text=Hero+Video+Fallback"
          >
          <source src="../../../../../edulink/public/video/heroVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark Overlay for Readability */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 1 }}
        ></motion.div>
      </div>

      {/* Neon City Outline (Abstract SVG substitute) */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/90 to-transparent z-10">
        <svg viewBox="0 0 1400 100" className="w-full h-full absolute bottom-0">
          <path
            d="M0 100 L 200 40 L 400 80 L 600 20 L 800 60 L 1000 30 L 1200 70 L 1400 50 V 100 Z"
            fill="none"
            stroke="url(#neon-grad)"
            strokeWidth="3"
            className="opacity-70"
          />
          <defs>
            <linearGradient id="neon-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "rgba(168, 85, 247, 0.8)", stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: "rgba(59, 130, 246, 0.8)", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "rgba(236, 72, 153, 0.8)", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Hero Content */}
      <div ref={heroContentRef} className="relative z-20 text-center px-6 py-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[7rem] font-extrabold tracking-tighter mb-6 font-display leading-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              background: "linear-gradient(90deg, #EC4899 0%, #3B82F6 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: `${getNeonShadow('purple')}, ${getNeonShadow('pink')}`,
            }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              AUSTRALIA
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="block"
            >
              LIVE NOW
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl font-medium text-white/90 max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          >
            The ultimate source for the hottest concert tickets across Sydney, Melbourne & beyond. Experience the future of live music.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            className="pt-6"
          >
            <NeonButton color="purple" className="text-base sm:text-lg px-8 py-4">
              <Link href="/explore">
              Book Your Concert Tickets Now
              <ChevronRight size={20} className="ml-2" />
              </Link>
            </NeonButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <div className="text-white/70 animate-pulse text-sm mb-2">SCROLL</div>
        <motion.div
          className="w-0.5 h-10 bg-white/30 mt-2"
          animate={{ height: [10, 40, 10] }}
          transition={{ repeat: Infinity, duration: 2 }}
        ></motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;