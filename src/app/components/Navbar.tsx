"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/#experience', label: 'Work' },
    { href: '/#contact', label: 'Contact' },
  ];

  const linkClass = (href: string) =>
    `font-mono text-lg transition-all duration-300 flex items-center gap-1 ${
      pathname === href ? 'text-green-400' : 'text-accent-700 hover:text-green-400'
    }`;

  return (
    <nav
      className={`w-full bg-[#0a0a0a]/90 backdrop-blur-sm rounded-b-[40px] px-6 py-4 fixed top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-[0_10px_40px_rgba(0,0,0,0.8)] border-b border-white/5' : ''
      } ${!isScrolled ? 'bounce' : ''}`}
    >
      <div className="mx-4 md:mx-10 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold pl-2">
          <Image
            src="/logo1.png"
            alt="AHM Logo"
            width={isScrolled ? 28 : 45}
            height={isScrolled ? 18 : 28}
            className="transition-all duration-300"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass(href)}>
              {label}
              <span className="opacity-30 text-sm">/&gt;</span>
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white/50 hover:text-white focus:outline-none"
        >
          {isOpen ? (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4 px-6 pb-4 border-t border-white/5 pt-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className={linkClass(href)}
            >
              {label} <span className="opacity-30 text-sm">/&gt;</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
