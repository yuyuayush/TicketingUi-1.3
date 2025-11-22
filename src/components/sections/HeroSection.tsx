'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap-setup';
import NeonButton from '@/components/ui/NeonButton';
import Image from 'next/image';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax background
    const hero = heroRef.current;
    if (!hero) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      hero.style.backgroundPositionY = `${scrollTop * 0.3}px`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // GSAP staggered entrance
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
      );
    }
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `
          linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9)),
          url('/images/concert-crowd.jpg') center/cover no-repeat,
          radial-gradient(circle at 20% 30%, rgba(157, 78, 221, 0.15) 0%, transparent 40%),
          radial-gradient(circle at 80% 70%, rgba(67, 97, 238, 0.1) 0%, transparent 50%)
        `,
      }}
    >
      {/* Subtle Australian skyline silhouette (abstract) */}
      <div
        className="absolute bottom-0 w-full h-24 opacity-30"
        style={{
          background: `url('/images/sydney-melbourne-silhouette.svg') center bottom no-repeat`,
          backgroundSize: 'contain',
        }}
      />

      <div className="text-center z-10 px-4 max-w-4xl">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-extrabold mb-6"
          style={{
            textShadow: '0 0 15px rgba(157, 78, 221, 0.7)',
            background: 'linear-gradient(to right, #e0b0ff, #8a2be2, #00f2fe)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Experience Live Music Like Never Before
        </h1>
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
        >
          Australia’s premier destination for premium concert tickets. From Sydney to Perth, front-row seats await.
        </p>
        <div ref={ctaRef}>
          <NeonButton>Book Your Concert Tickets Now</NeonButton>
        </div>
      </div>
    </section>
  );
}