"use client";

import React, { useState, useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Ticket, User } from "lucide-react";
import { useAuthStore } from "@/store/useAuth";
import { removeToken } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { useAdminMenu } from "@/hooks/useAdminAuth";
import { useClickOutside } from "@/hooks/useClickOutside";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const { currentUser, resetAuth } = useAuthStore();
  const { data: menuData } = useAdminMenu();

  // Close profile dropdown when clicking outside
  useClickOutside(profileRef, () => setProfileOpen(false));

  const handleLogout = async () => {
    try {
      resetAuth();
      removeToken();
      toast({
        title: "Successfully logout"
      })
    }
    catch (e) {
      toast({
        title: "Having issue in logout"
      })
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-extrabold tracking-widest text-white cursor-pointer">
            <span className="text-pink-500 font-display shadow-text-pink">CYBER</span><span className="text-blue-500 font-display">TIX</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link href="/explore" className="text-white/70 hover:text-white transition-colors duration-300 font-medium relative group">
            Concerts
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <Link href="/theater" className="text-white/70 hover:text-white transition-colors duration-300 font-medium relative group">
            Venues
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <Link href="#contact" className="text-white/70 hover:text-white transition-colors duration-300 font-medium relative group">
            Contact
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>

          {/* Admin Menu Items */}
          {menuData?.map((item) => (
            <Link key={item.label} href={item.path}>
              <button className="hidden lg:inline-flex items-center gap-1 bg-gradient-to-r from-pink-600 to-red-500 text-white px-4 py-2 text-sm rounded-lg font-medium hover:opacity-90 transition">
                <Ticket size={16} /> {item.label}
              </button>
            </Link>
          ))}

          {/* My Tickets */}
          {currentUser && (
            <Link
              href="/tickets"
              className="hidden lg:inline-flex items-center gap-1 text-white/70 hover:text-pink-500 font-medium transition relative group"
            >
              <Ticket size={16} /> My Tickets
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          )}

          {/* Profile / Sign In */}
          {currentUser ? (
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-pink-600 to-red-500 text-white font-semibold uppercase hover:opacity-90 transition"
              >
                {currentUser?.name?.charAt(0) ?? <User size={20} />}
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-lg p-4 animate-fadeIn">
                  <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold uppercase">
                      {currentUser?.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {currentUser?.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate max-w-[120px]">
                        {currentUser?.email}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 space-y-2">
                    {/* <Link
                      href="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block text-sm text-gray-700 hover:text-pink-600 transition"
                    >
                      View Profile
                    </Link> */}

                    <button
                      onClick={handleLogout}
                      className="w-full mt-2 bg-gradient-to-r from-pink-600 to-red-500 text-white text-sm py-2 rounded-lg hover:opacity-90 transition"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <button className="rounded-full bg-pink-600 px-5 py-2 text-white font-medium hover:bg-pink-700 transition">
                Sign In
              </button>
            </Link>
          )}
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
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-black/95 border-t border-white/10 py-4">
          <div className="container mx-auto flex flex-col space-y-4">
            <Link
              href="/explore"
              className="text-white/90 hover:text-pink-500 transition-colors duration-200 py-2"
              onClick={() => setIsOpen(false)}
            >
              Concerts
            </Link>
            <Link
              href="/theater"
              className="text-white/90 hover:text-pink-500 transition-colors duration-200 py-2"
              onClick={() => setIsOpen(false)}
            >
              Venues
            </Link>
            <Link
              href="#contact"
              className="text-white/90 hover:text-pink-500 transition-colors duration-200 py-2"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            {/* Admin Menu Items (Mobile) */}
            {menuData?.map((item) => (
              <Link key={item.label} href={item.path}>
                <button
                  className="w-full text-left flex items-center gap-3 bg-gradient-to-r from-pink-600 to-red-500 text-white px-4 py-2 text-sm rounded-lg font-medium hover:opacity-90 transition"
                  onClick={() => setIsOpen(false)}
                >
                  <Ticket size={16} /> {item.label}
                </button>
              </Link>
            ))}

            {/* My Tickets (Mobile) */}
            {currentUser && (
              <Link
                href="/tickets"
                className="text-white/90 hover:text-pink-500 transition-colors duration-200 py-2 flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <Ticket size={16} /> My Tickets
              </Link>
            )}

            {/* Profile / Sign In (Mobile) */}
            {currentUser ? (
              <div className="pt-2">
                <div className="flex items-center gap-3 pb-3 border-b border-white/20">
                  <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold uppercase">
                    {currentUser?.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {currentUser?.name}
                    </p>
                    <p className="text-xs text-white/70 truncate max-w-[120px]">
                      {currentUser?.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full mt-3 bg-gradient-to-r from-pink-600 to-red-500 text-white text-sm py-2 rounded-lg hover:opacity-90 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <button className="w-full rounded-full bg-pink-600 px-5 py-2 text-white font-medium hover:bg-pink-700 transition">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Nav;