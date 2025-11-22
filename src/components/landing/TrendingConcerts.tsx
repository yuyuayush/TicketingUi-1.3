"use client";

import React from 'react';
import { Star, Calendar, Locate, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Concert {
  id: number;
  title: string;
  date: string;
  location: string;
  artist: string;
  color: string;
  image: string;
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

const TrendingConcerts = () => {
  const neonColors: Record<string, string> = {
    pink: "rgba(236, 72, 153, 0.8)",
    blue: "rgba(59, 130, 246, 0.8)",
    purple: "rgba(168, 85, 247, 0.8)",
  };

  const trendingConcerts: Concert[] = [
    { id: 1, title: "The Cosmic Echoes Tour", date: "20/DEC/2025", location: "Sydney Arena", artist: "Aurora Bloom", color: "pink", image: "https://placehold.co/800x600/EC4899/ffffff?text=AURORA+BLOOM" },
    { id: 2, title: "Neon Skyline Symphony", date: "05/JAN/2026", location: "Melbourne Park", artist: "Digital Monk", color: "blue", image: "https://placehold.co/800x600/3B82F6/ffffff?text=DIGITAL+MONK" },
    { id: 3, title: "Future Beats Unleashed", date: "12/FEB/2026", location: "Brisbane Hangar", artist: "Rhythm AI", color: "purple", image: "https://placehold.co/800x600/A855F7/ffffff?text=RHYTHM+AI" },
    { id: 4, title: "The Outback Rhapsody", date: "01/MAR/2026", location: "Perth Stadium", artist: "Desert Sounds", color: "blue", image: "https://placehold.co/800x600/3B82F6/ffffff?text=DESERT+SOUNDS" },
  ];

  return (
    <section
      className="py-16 md:py-24 container mx-auto px-6 relative overflow-hidden"
    >
      {/* Abstract Background Image for this section */}
      <div className="absolute inset-0 opacity-10 blur-sm pointer-events-none"
        style={{
          backgroundImage: `url(https://placehold.co/1920x1080/000/000?text=Cyberpunk+Sound+Stage)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      <div className="relative z-10">
        <SectionTitle
          title="Trending Concerts"
          subtitle="Don't Miss Out"
          color="pink"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingConcerts.map((concert, index) => (
            <motion.div
              key={concert.id}
              className={`p-6 bg-gray-900 rounded-xl transition-all duration-500 border border-${concert.color}-500/30
                        hover:scale-[1.03] hover:border-${concert.color}-500 relative overflow-hidden group`}
              style={{ boxShadow: getNeonShadow(concert.color) + '20' }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Concert Image as Card Background */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${concert.image})`, opacity: 0.1 }}
              ></div>

              {/* Abstract Glowing Background Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br from-${concert.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Star className={`w-6 h-6 text-${concert.color}-400 mb-4`} style={{ filter: `drop-shadow(0 0 5px ${neonColors[concert.color]})` }} />
                </motion.div>
                <motion.p
                  className="text-sm uppercase tracking-widest text-white/70"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  {concert.artist}
                </motion.p>
                <motion.h3
                  className="text-xl font-bold mt-1 mb-4 leading-snug font-display"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  {concert.title}
                </motion.h3>
                <motion.div
                  className="space-y-1 text-white/80 text-sm"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <p className="flex items-center"><Calendar size={16} className="mr-2 text-pink-400" /> Date: {concert.date}</p>
                  <p className="flex items-center"><Locate size={16} className="mr-2 text-blue-400" /> Venue: {concert.location}</p>
                </motion.div>
                <motion.button
                  className={`mt-6 w-full py-2 rounded-full font-semibold text-sm transition-colors duration-300
                                     bg-${concert.color}-500/20 text-${concert.color}-300 hover:bg-${concert.color}-500 hover:text-white`}
                  style={{ boxShadow: `0 0 10px ${neonColors[concert.color]}30` }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  View Tickets <ChevronRight size={16} className="inline ml-1" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingConcerts;