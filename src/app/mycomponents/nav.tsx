"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ModeToggle } from './mode';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 dark:bg-black/90 backdrop-blur-lg shadow-lg' 
        : 'bg-transparent dark:bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 blur-md transition duration-500"></div>
              <Image 
                className="relative h-12 w-auto hover:scale-110 transition-transform duration-300" 
                src="/logo.png" 
                alt="Logo" 
                width={90} 
                height={70} 
              />
            </Link>
          </div>

          {/* Desktop Menu & Links */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            <Link href="/" className="px-4 py-2 rounded-full text-base font-bold text-gray-800 dark:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-300">Home</Link>
            <Link href="/leaderboard" className="px-4 py-2 rounded-full text-base font-bold text-gray-800 dark:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-300">Leaderboard</Link>
            <Link href="/doubts" className="px-4 py-2 rounded-full text-base font-bold text-gray-800 dark:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-300">Explore Doubts</Link>
            <Link href="/aboutUs" className="px-4 py-2 rounded-full text-base font-bold text-gray-800 dark:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-300">About Us</Link>
            <div className="ml-2">
              <ModeToggle />
            </div>
            <Link 
              href="/user/dashboard" 
              className="ml-3 px-5 py-2 rounded-full text-base font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
            >
              Me
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-2">
            <ModeToggle />
            <button
              onClick={toggleNavbar}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-full text-gray-800 dark:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-7 w-7" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-7 w-7" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        } fixed top-20 right-0 bottom-0 w-full sm:w-80 bg-white dark:bg-gray-900 shadow-2xl border-l border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out z-50`}
      >
        <div className="flex flex-col p-5 space-y-4">
          <Link 
            href="/" 
            onClick={toggleNavbar} 
            className="block px-4 py-3 rounded-lg text-lg font-bold text-gray-800 dark:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-300"
          >
            Home
          </Link>
          <Link 
            href="/leaderboard" 
            onClick={toggleNavbar} 
            className="block px-4 py-3 rounded-lg text-lg font-bold text-gray-800 dark:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-300"
          >
            Leaderboard
          </Link>
          <Link 
            href="/doubts" 
            onClick={toggleNavbar} 
            className="block px-4 py-3 rounded-lg text-lg font-bold text-gray-800 dark:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-300"
          >
            Explore Doubts
          </Link>
          <Link 
            href="/aboutUs" 
            onClick={toggleNavbar} 
            className="block px-4 py-3 rounded-lg text-lg font-bold text-gray-800 dark:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-300"
          >
            About Us
          </Link>
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <Link 
              href="/user/dashboard" 
              onClick={toggleNavbar} 
              className="block px-4 py-4 rounded-lg text-center text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 shadow-lg"
            >
              My Profile (Me)
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" 
          onClick={toggleNavbar}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default Navbar;
