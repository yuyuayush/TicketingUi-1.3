"use client";

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = typeof __initial_auth_token !== 'undefined' ? 'User' : 'Sign In';

  const navItems = ["Concerts", "Venues", "Contact", auth];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center h-16">
        <div className="text-2xl font-extrabold tracking-widest text-white cursor-pointer">
          <span className="text-pink-500 font-display shadow-text-pink">CYBER</span><span className="text-blue-500 font-display">TIX</span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex space-x-8">
          {navItems.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
              className="text-white/70 hover:text-white transition-colors duration-300 font-medium relative group"
            >
              {item}
              <span 
                className="absolute left-0 bottom-0 w-full h-0.5 bg-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
              ></span>
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-white p-2" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-black/95 border-t border-white/10 flex flex-col items-center py-4 space-y-4">
          {navItems.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
              onClick={() => setIsOpen(false)}
              className="text-xl text-white/90 hover:text-pink-500 transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Nav;