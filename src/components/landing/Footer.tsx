import React from 'react';

const getNeonShadow = (color: string) => {
  const neonColors: Record<string, string> = {
    pink: "rgba(236, 72, 153, 0.8)", // true-pink-500
    blue: "rgba(59, 130, 246, 0.8)",  // true-blue-500
    purple: "rgba(168, 85, 247, 0.8)", // true-purple-500
  };
  const c = neonColors[color] || neonColors.purple;
  return `0 0 10px ${c}, 0 0 30px ${c}`;
};

const Footer = () => {
  const neonColors: Record<string, string> = {
    pink: "rgba(236, 72, 153, 0.8)",
    blue: "rgba(59, 130, 246, 0.8)",
    purple: "rgba(168, 85, 247, 0.8)",
  };

  return (
    <footer className="py-10 border-t border-white/10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="text-white/50 mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Ticketing. All rights reserved.
        </div>
        <div className="flex space-x-6 text-white/70">
          <a href="#" className="hover:text-pink-500 transition-colors duration-200">Privacy Policy</a>
          <a href="#" className="hover:text-blue-500 transition-colors duration-200">Terms of Service</a>
          <a href="#" className="hover:text-purple-500 transition-colors duration-200">Contact</a>
        </div>
      </div>
      <div
        className="h-0.5 w-1/3 mx-auto mt-6 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50"
        style={{ boxShadow: `0 0 10px ${neonColors.pink}` }}
      ></div>
    </footer>
  );
};

export default Footer;