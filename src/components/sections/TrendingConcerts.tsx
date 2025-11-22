'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap-setup';
// import ConcertCard from '@/components/ui/ConcertCard';

const concerts = [
  { id: 1, artist: 'Tame Impala', venue: 'Sydney Opera House', date: 'Dec 12, 2025', image: '/images/tame-impala.jpg' },
  { id: 2, artist: 'Flume', venue: 'Rod Laver Arena', date: 'Jan 18, 2026', image: '/images/flume.jpg' },
  { id: 3, artist: 'Sia', venue: 'Qudos Bank Arena', date: 'Feb 5, 2026', image: '/images/sia.jpg' },
  { id: 4, artist: 'The Kid LAROI', venue: 'Brisbane Entertainment Centre', date: 'Mar 22, 2026', image: '/images/kid-laroi.jpg' },
];

export default function TrendingConcerts() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.concert-card');
    if (cards) {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16" style={{ color: '#e0b0ff' }}>
          Trending Concerts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* {concerts.map((concert) => (
            <ConcertCard key={concert.id} concert={concert} />
          ))} */}
        </div>
      </div>
    </section>
  );
}