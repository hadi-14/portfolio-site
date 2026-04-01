"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsMounted(true);
        // Close sidebar when pathname changes (navigation)
        setIsOpen(false);
    }, [pathname]);

    // Close sidebar on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        if (isOpen) {
            window.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }
        return () => {
            window.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const navSections = [
        {
            label: "Navigation",
            links: [
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/projects", label: "Projects" },
            ],
        },
        {
            label: "Quick Links",
            links: [
                { href: "/#experience", label: "Work" },
                { href: "/#contact", label: "Contact" },
            ],
        },
    ];

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        if (href.startsWith("/#")) return false;
        return pathname === href || pathname.startsWith(href + "/");
    };

    const linkClass = (href: string) =>
        `flex items-center justify-between gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 font-mono text-sm ${isActive(href)
            ? "text-green-400 bg-green-400/5 border border-green-400/30"
            : "text-white/70 hover:text-white hover:bg-white/5"
        }`;

    const sidebarContent = (
        <>
            {/* Logo Section */}
            <div className="px-4 py-6 border-b border-white/10">
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/logo1.png"
                        alt="AHM Logo"
                        width={40}
                        height={26}
                        style={{ width: 'auto', height: 'auto' }}
                        className="transition-all"
                    />
                    <span className="text-lg font-bold text-white hidden sm:inline">Portfolio</span>
                </Link>
            </div>

            {/* Navigation Sections */}
            <nav className="flex-1 overflow-y-auto px-3 py-6">
                {navSections.map((section) => (
                    <div key={section.label} className="mb-8">
                        <p className="text-xs font-mono text-white/40 uppercase tracking-widest px-4 mb-3">
                            {section.label}
                        </p>
                        <div className="space-y-1">
                            {section.links.map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className={linkClass(href)}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span>{label}</span>
                                    <span className="opacity-30 text-xs">/&gt;</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Footer (optional) */}
            <div className="px-4 py-4 border-t border-white/10 text-xs text-white/40">
                <p>© 2026 Abdul Hadi</p>
            </div>
        </>
    );

    if (!isMounted) {
        return null;
    }

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex fixed left-0 top-0 w-[280px] h-screen flex-col bg-[#0a0a0a] border-r border-white/5 z-40">
                {sidebarContent}
            </aside>

            {/* Mobile Hamburger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-[60] p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all"
                aria-label="Toggle sidebar"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Mobile Overlay and Sidebar */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="md:hidden fixed inset-0 bg-black/50 z-30"
                        onClick={() => setIsOpen(false)}
                    />
                    {/* Mobile Sidebar */}
                    <aside className="md:hidden fixed left-0 top-0 w-[250px] h-screen flex-col bg-[#0a0a0a] border-r border-white/5 z-40">
                        {sidebarContent}
                    </aside>
                </>
            )}
        </>
    );
};

export default Sidebar;
