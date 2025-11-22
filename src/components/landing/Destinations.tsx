"use client";

import React from 'react';
import { Locate } from 'lucide-react';
import { motion } from 'framer-motion';

interface Destination {
  name: string;
  events: number;
  color: string;
  icon: React.ElementType;
}

const getNeonShadow = (color: string) => {
  const neonColors: Record<string, string> = {
    pink: "rgba(236, 72, 153, 0.8)", // true-pink-500
    blue: "rgba(59, 130, 246, 0.8)",  // true-blue-500
    purple: "rgba(168, 85, 247, 0.8)", // true-purple-500
  };
  const c = neonColors[color] || neonColors.purple;
  return `0 0 10px ${c}, 0 0 30px ${c}`;
};

const SectionTitle = ({ title, subtitle, color = 'pink' }: { title: string; subtitle: string; color?: string }) => {
  const neonColors: Record<string, string> = {
    pink: "rgba(236, 72, 153, 0.8)",
    blue: "rgba(59, 130, 246, 0.8)",
    purple: "rgba(168, 85, 247, 0.8)",
  };

  return (
    <div className="text-center mb-16 max-w-3xl mx-auto">
      <p className={`text-sm uppercase tracking-widest font-semibold text-${color}-400 mb-2`}>{subtitle}</p>
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-white leading-tight font-display"
        style={{ textShadow: `0 0 5px ${neonColors[color]}40` }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>
      <motion.div
        className={`h-1 w-20 mx-auto mt-4 bg-${color}-500`}
        style={{ boxShadow: `0 0 8px ${neonColors[color]}` }}
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      ></motion.div>
    </div>
  );
};

const Destinations = () => {
  const neonColors: Record<string, string> = {
    pink: "rgba(236, 72, 153, 0.8)",
    blue: "rgba(59, 130, 246, 0.8)",
    purple: "rgba(168, 85, 247, 0.8)",
  };

  const destinations: Destination[] = [
    { name: "Sydney, NSW", events: 45, color: "pink", icon: Locate },
    { name: "Melbourne, VIC", events: 38, color: "blue", icon: Locate },
    { name: "Brisbane, QLD", events: 22, color: "purple", icon: Locate },
    { name: "Perth, WA", events: 15, color: "pink", icon: Locate },
  ];

  return (
    <section
      className="py-16 md:py-24 bg-gray-900/40 border-t border-b border-white/10 relative overflow-hidden"
    >
      {/* Abstract Background Image for this section */}
      <div className="absolute inset-0 opacity-10 blur-sm pointer-events-none"
        style={{
          backgroundImage: `url(https://placehold.co/1920x1080/000/000?text=Neon+City+Silhouette)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle
          title="Australia's Biggest Scenes"
          subtitle="Concert Destinations"
          color="pink"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {destinations.map((dest, index) => (
            <motion.div
              key={index}
              className={`p-6 bg-black/50 rounded-lg text-center transition-all duration-300 hover:scale-105 border border-${dest.color}-500/20`}
              style={{ boxShadow: getNeonShadow(dest.color) + '10' }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className={`w-12 h-12 flex items-center justify-center rounded-full bg-transparent border-2 border-${dest.color}-500 mx-auto mb-4`}
                style={{ boxShadow: `0 0 10px ${neonColors[dest.color]}` }}
                whileHover={{ scale: 1.1, boxShadow: `0 0 15px ${neonColors[dest.color]}` }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <dest.icon className={`w-6 h-6 text-${dest.color}-400`} />
              </motion.div>
              <motion.h4
                className="text-xl font-bold font-display"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.1 }}
              >
                {dest.name}
              </motion.h4>
              <motion.p
                className="text-sm text-white/70 mt-1"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.15 }}
              >
                {dest.events}+ Upcoming Gigs
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;