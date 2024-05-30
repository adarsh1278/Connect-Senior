"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ModeToggle } from './mode';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow text-3xl fixed w-screen mt-0 dark:bg-black z-20">
      <div className="container mx-auto">
        <div className="flex items-center justify-between lg:items-center lg:justify-between">
          <div className="flex items-center justify-between text-5xl">
            <a href="#" className="ml-3">
              <Image className="w-20 h-15 sm:h-24" src="/logo.png" alt="Logo" width={80} height={60} />
            </a>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button onClick={toggleNavbar} type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                {!isOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu open: "block", Menu closed: "hidden" */}
          <div className={`${isOpen ? 'block' : 'hidden'} absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white  lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center`}>
            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
              <Link href="/" onClick={toggleNavbar} className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Home</Link>
              <Link href="/doubts" onClick={toggleNavbar} className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Explore Doubts</Link>
              <Link href="/sign-up" onClick={toggleNavbar} className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Join</Link>
            </div>

            <div className="flex items-center mt-4 lg:mt-0">
              <div className="hidden lg:block text-4xl mx-4 text-gray-600 transition-colors duration-300 transform dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none p-3 mr-5" >
                <ModeToggle />
              </div>

              <button type="button" className="flex items-center focus:outline-none" onClick={toggleNavbar} aria-label="toggle profile dropdown">
                <Link href="/user/dashboard" className="font-bold dark:text-white text-blue-500 text-center text-4xl">Me</Link>
                <h3 className="mx-2 text-gray-700 dark:text-gray-200 lg:hidden">Khatab Wedaa</h3>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
