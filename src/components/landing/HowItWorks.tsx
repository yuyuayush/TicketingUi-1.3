"use client";

import React from 'react';
import { motion } from 'framer-motion';

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

const HowItWorks = () => {
  const neonColors: Record<string, string> = {
    pink: "rgba(236, 72, 153, 0.8)",
    blue: "rgba(59, 130, 246, 0.8)",
    purple: "rgba(168, 85, 247, 0.8)",
  };

  const steps = [
    {
      number: 1,
      title: "Find Your Gig",
      description: "Browse by artist, city, or date to find your perfect concert.",
      color: "purple"
    },
    {
      number: 2,
      title: "Secure Your Spot",
      description: "Select seating and complete the secure, one-click payment.",
      color: "pink"
    },
    {
      number: 3,
      title: "Go Live!",
      description: "Scan your instant e-ticket at the venue and enjoy the show.",
      color: "blue"
    }
  ];

  return (
    <section
      className="py-16 md:py-24 container mx-auto px-6 relative overflow-hidden"
    >
      {/* Abstract Background Image for this section */}
      <div className="absolute inset-0 opacity-10 blur-sm pointer-events-none"
        style={{
          backgroundImage: `url(https://placehold.co/1920x1080/000/000?text=Electric+Grid+Blue)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      <div className="relative z-10">
        <SectionTitle
          title="Your Concert, 3 Steps"
          subtitle="Seamless Booking"
          color="purple"
        />

        <div className="relative flex flex-col lg:flex-row justify-between items-center space-y-12 lg:space-y-0 lg:space-x-8">
          {/* Timeline Line (Desktop Only) */}
          <motion.div
            className="hidden lg:block absolute top-1/4 left-0 right-0 h-1 bg-white/10 mx-16"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ transformOrigin: "center" }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-50"
              style={{ boxShadow: getNeonShadow('purple') + ', ' + getNeonShadow('blue') }}
            ></div>
          </motion.div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="lg:w-1/3 text-center relative p-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="relative z-10">
                <motion.div
                  className="w-16 h-16 flex items-center justify-center rounded-full bg-black border-4 border-purple-500 mx-auto mb-6 text-3xl font-extrabold text-purple-400"
                  style={{ boxShadow: `0 0 20px ${neonColors[step.color]}` }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 10,
                    delay: index * 0.2 + 0.1
                  }}
                >
                  {step.number}
                </motion.div>
                <motion.h4
                  className="text-2xl font-bold mb-3 font-display"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.2 }}
                >
                  {step.title}
                </motion.h4>
                <motion.p
                  className="text-white/80"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  {step.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;