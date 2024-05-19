// components/AsciiArt.tsx
"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // Set initial state to false

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`w-full bg-navbar p-6 fixed top-${isScrolled ? '0' : '12'} left-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-custom-dark' : ''}`}>
      <div className={`container mx-auto flex justify-between items-center relative ${isScrolled ? 'pt-1 pb-1 transition-all duration-300' : 'pt-5 pb-5  pl-3 pr-3 transition-all duration-300'}`}>
        <a href="#" className="text-3xl font-bold">
          <span className="bg-gradient-to-r from-gradient2 to-gradient1 bg-clip-text text-transparent text-5xl">AHM</span>
        </a>

        <div className="hidden md:flex space-x-6 text-gray-300">
          <a href="#" className='hover:text-white'>Home</a>
          <a href="#" className='hover:text-white'>About</a>
          <a href="#" className='hover:text-white'>Services</a>
          <a href="#" className='hover:text-white'>Contact</a>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            {isOpen ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4 p-4 text-gray-300">
          <a href="#" className='hover:text-white'>Home</a>
          <a href="#" className='hover:text-white'>About</a>
          <a href="#" className='hover:text-white'>Services</a>
          <a href="#" className='hover:text-white'>Contact</a>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
