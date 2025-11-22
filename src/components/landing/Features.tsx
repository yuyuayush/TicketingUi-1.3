"use client";

import React from 'react';
import { Ticket, Globe, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
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

const Features = () => {
  const neonColors: Record<string, string> = {
    pink: "rgba(236, 72, 153, 0.8)",
    blue: "rgba(59, 130, 246, 0.8)",
    purple: "rgba(168, 85, 247, 0.8)",
  };

  const features: Feature[] = [
    { icon: Ticket, title: "Exclusive Access", description: "Get first dibs on pre-sales and premium seating allocations.", color: "purple" },
    { icon: Zap, title: "Instant e-Tickets", description: "Receive your valid, secure tickets straight to your phone instantly.", color: "pink" },
    { icon: Globe, title: "Australia's Best Venues", description: "Curated selection of the top concert halls and arenas nationwide.", color: "blue" },
  ];

  return (
    <section
      className="py-16 md:py-24 container mx-auto px-6 relative overflow-hidden"
    >
      {/* Abstract Background Image for this section */}
      <div className="absolute inset-0 opacity-10 blur-sm pointer-events-none"
        style={{
          backgroundImage: `url(https://placehold.co/1920x1080/000/000?text=Abstract+Circuit+Board+Grid)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      <div className="relative z-10">
        <SectionTitle
          title="The Future of Ticketing"
          subtitle="Why Choose Ticketing"
          color="blue"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`p-8 rounded-2xl bg-gray-900 border border-${feature.color}-500/30 text-center transition-all duration-500
                          hover:shadow-3xl hover:border-${feature.color}-500`}
              style={{ boxShadow: getNeonShadow(feature.color) + '20' }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <motion.div
                className={`mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-full bg-black border-2 border-${feature.color}-500/50`}
                style={{ boxShadow: `0 0 15px ${neonColors[feature.color]}` }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: index * 0.15 + 0.1
                }}
              >
                <feature.icon
                  className={`w-8 h-8 text-${feature.color}-400`}
                  style={{ filter: `drop-shadow(0 0 8px ${neonColors[feature.color]})` }}
                />
              </motion.div>
              <motion.h3
                className="text-2xl font-bold mb-3 font-display"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.2 }}
              >
                {feature.title}
              </motion.h3>
              <motion.p
                className="text-white/70"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.3 }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;