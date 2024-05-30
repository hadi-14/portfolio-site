"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    <nav className={`w-full bg-background-900 rounded-b-[50px] p-6 fixed top-${isScrolled ? '0' : '12'} left-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-custom-dark' : ''}`}>
      <div className={`container mx-auto flex justify-between items-center relative ${isScrolled ? 'pt-0 pb-0' : 'pt-2 pb-2  pl-3 pr-3'} transition-all duration-300 ${!isScrolled ? 'bounce' : ''}`}>
        <Link href="#" className="text-3xl font-bold pl-4">
          <Image
            src="/logo1.png"
            alt="AHM Logo"
            width={isScrolled ? 25 : 45}
            height={isScrolled ? 15 : 25}
            className="transition-all duration-300"
          />
        </Link>

        <div className="hidden md:flex space-x-6 text-accent-700 font-mono text-xl">
          <Link href="/" className='hover:text-accent-500 duration-300'>Home <span className="opacity-50">/&gt;</span></Link>
          <Link href="/about" className='hover:text-accent-500 duration-300'>About <span className="opacity-50">/&gt;</span></Link>
          <Link href="#" className='hover:text-accent-500 duration-300'>Work <span className="opacity-50">/&gt;</span></Link>
          <Link href="#" className='hover:text-accent-500 duration-300'>Services <span className="opacity-50">/&gt;</span></Link>
          <Link href="#" className='hover:text-secondary-200 duration-300 text-secondary-400'>Contact <span className="opacity-50">/&gt;</span></Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            {isOpen ? (
              <svg className="w-8 h-8 text-secondary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-secondary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4 p-4 text-accent-700 font-mono text-xl">
          <Link href="/" className='hover:text-accent-500 duration-300'>Home <span className="opacity-50">/&gt;</span></Link>
          <Link href="/about" className='hover:text-accent-500 duration-300'>About <span className="opacity-50">/&gt;</span></Link>
          <Link href="#" className='hover:text-accent-500 duration-300'>Work <span className="opacity-50">/&gt;</span></Link>
          <Link href="#" className='hover:text-accent-500 duration-300'>Services <span className="opacity-50">/&gt;</span></Link>
          <Link href="#" className='hover:text-secondary-200 duration-300 text-secondary-400'>Contact <span className="opacity-50">/&gt;</span></Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
