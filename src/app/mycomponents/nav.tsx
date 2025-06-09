"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ModeToggle } from './mode';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Import Heroicons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md text-base fixed w-full top-0 dark:bg-gray-900 z-50"> {/* Adjusted shadow, text size, dark bg, z-index */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8"> {/* Consistent padding */}
        <div className="flex items-center justify-between h-16"> {/* Fixed height for navbar */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image className="h-10 w-auto sm:h-12" src="/logo.png" alt="Logo" width={80} height={60} /> {/* Adjusted logo size */}
            </Link>
          </div>

          {/* Desktop Menu & Links */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Home</Link>
            <Link href="/leaderboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Leaderboard</Link>
            <Link href="/doubts" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Explore Doubts</Link>
            <Link href="/aboutUs" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">About Us</Link>
            <ModeToggle />
            <Link href="/user/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800">Me</Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <ModeToggle /> {/* Moved ModeToggle to be visible on mobile before menu button */}
            <button
              onClick={toggleNavbar}
              type="button"
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden border-t border-gray-200 dark:border-gray-700`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" onClick={toggleNavbar} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Home</Link>
          <Link href="/leaderboard" onClick={toggleNavbar} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Leaderboard</Link>
          <Link href="/doubts" onClick={toggleNavbar} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Explore Doubts</Link>
          <Link href="/aboutUs" onClick={toggleNavbar} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">About Us</Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center px-5">
            <Link href="/user/dashboard" onClick={toggleNavbar} className="block w-full px-3 py-2 rounded-md text-base font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800">
              My Profile (Me)
            </Link>
          </div>
          {/* You can add other user-specific links here if needed */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
