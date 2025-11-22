"use client";

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import components to ensure client-side only execution
const Hero = dynamic(() => import('@/components/landing/Hero'), { ssr: false });
const TrendingConcerts = dynamic(() => import('@/components/landing/TrendingConcerts'), { ssr: false });
const Features = dynamic(() => import('@/components/landing/Features'), { ssr: false });
const HowItWorks = dynamic(() => import('@/components/landing/HowItWorks'), { ssr: false });
const Destinations = dynamic(() => import('@/components/landing/Destinations'), { ssr: false });
const Testimonials = dynamic(() => import('@/components/landing/Testimonials'), { ssr: false });
const Footer = dynamic(() => import('@/components/landing/Footer'), { ssr: false });
const Nav = dynamic(() => import('@/components/landing/Nav'), { ssr: false });

export default function RootApp() {
  // Initialize GSAP animations after component mounts
  useEffect(() => {
    const initGSAP = async () => {
      // Dynamically import GSAP libraries
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      gsap.registerPlugin(ScrollTrigger);

      // Set smooth scrolling
      gsap.set("body", {
        css: {
          scrollBehavior: "smooth"
        }
      });
    };

    initGSAP();
  }, []);

  return (
    <>
      {/* Custom font and CDN loading */}
      <style jsx global>{`
        /* Minimal definition to simulate a bold, stylized display font */
        .font-display {
            font-family: 'Montserrat', sans-serif;
            letter-spacing: -0.05em;
        }
        /* Import a suitable font (assuming global availability or using a standard fallback) */
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&display=swap');
      `}</style>
      {/* Load GSAP and ScrollTrigger via CDN */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" async />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" async />

      <div className="min-h-screen bg-black text-white font-inter">
        <Nav />
        <Hero />
        <TrendingConcerts />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Destinations />
        <Footer />
      </div>
    </>
  );
}