"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
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

const Testimonials = () => {
  const neonColors: Record<string, string> = {
    pink: "rgba(236, 72, 153, 0.8)",
    blue: "rgba(59, 130, 246, 0.8)",
    purple: "rgba(168, 85, 247, 0.8)",
  };

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Music Enthusiast",
      content: "Booking tickets with CYBERTIX was a breeze! The interface is sleek and the process was lightning fast. Attended my dream concert with zero hassle.",
      rating: 5,
      avatar: "https://placehold.co/80x80/EC4899/FFFFFF?text=AJ"
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Event Organizer",
      content: "As someone in the industry, I appreciate how CYBERTIX makes ticketing secure and efficient. The analytics dashboard is a game-changer for tracking sales.",
      rating: 5,
      avatar: "https://placehold.co/80x80/3B82F6/FFFFFF?text=SW"
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Frequent Attendee",
      content: "The instant e-tickets feature is amazing. No more waiting in long lines! CYBERTIX has truly revolutionized the concert experience in Australia.",
      rating: 4,
      avatar: "https://placehold.co/80x80/A855F7/FFFFFF?text=MC"
    }
  ];

  return (
    <section className="py-16 md:py-24 container mx-auto px-6 relative overflow-hidden">
      {/* Abstract Background Image for this section */}
      <div className="absolute inset-0 opacity-10 blur-sm pointer-events-none"
        style={{
          backgroundImage: `url(https://placehold.co/1920x1080/000/000?text=Testimonials+Background)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      <div className="relative z-10">
        <SectionTitle
          title="What Our Users Say"
          subtitle="Testimonials"
          color="purple"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-xl border border-purple-500/30 relative overflow-hidden"
              style={{ boxShadow: getNeonShadow('purple') + '20' }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="absolute -top-5 -right-5 w-24 h-24 bg-purple-500/10 rounded-full"></div>
              <div className="relative z-10">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`}
                    />
                  ))}
                </div>
                <p className="text-white/90 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-purple-500"
                    style={{ boxShadow: `0 0 10px ${neonColors.purple}` }}
                  />
                  <div>
                    <h4 className="text-white font-bold">{testimonial.name}</h4>
                    <p className="text-purple-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;