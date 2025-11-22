'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap-setup';

export default function NeonButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;

    const handleHover = () => {
      gsap.to(el, {
        scale: 1.05,
        boxShadow: '0 0 20px rgba(157, 78, 221, 0.8), 0 0 40px rgba(157, 78, 221, 0.5)',
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleLeave = () => {
      gsap.to(el, {
        scale: 1,
        boxShadow: '0 0 10px rgba(157, 78, 221, 0.4)',
        duration: 0.3,
      });
    };

    el.addEventListener('mouseenter', handleHover);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mouseenter', handleHover);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className="relative px-8 py-4 rounded-full font-bold text-lg bg-transparent border border-purple-500 text-purple-300 overflow-hidden group"
      style={{
        boxShadow: '0 0 10px rgba(157, 78, 221, 0.4)',
        transition: 'all 0.3s ease',
      }}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
}