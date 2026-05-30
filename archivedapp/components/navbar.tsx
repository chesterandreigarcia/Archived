"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
    { label: "Videos", href: "/videos" },
    { label: "Photos", href: "/photos" },
    { label: "Archive", href: "/archive" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled ? "bg-black/60 backdrop-blur-md" : "bg-transparent"
            }`}
        >
            <div className="flex items-center justify-between px-6 md:px-14 py-4 md:py-5">

                <Link
                    href="/"
                    className="text-white tracking-widest select-none"
                    style={{
                        fontFamily: "var(--font-bebas), sans-serif",
                        fontSize: "clamp(1.5rem, 3vw, 2rem)",
                        lineHeight: 1,
                        letterSpacing: "0.15em",
                    }}
                >
                    ARCHIVE
                </Link>

                <ul
                    className="hidden md:flex items-center gap-8"
                    style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                >
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="text-white/70 hover:text-white text-sm tracking-widest uppercase transition-colors duration-200"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <a
                    href="https://instagram.com/idlechstr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:inline-flex items-center gap-2 border border-white/30 hover:border-white text-white text-xs tracking-widest uppercase px-5 py-2 transition-all duration-200 hover:bg-white hover:text-black"
                    style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                >
                    @idlechstr
                </a>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden flex flex-col gap-[5px] p-1"
                    aria-label="Toggle menu"
                >
                    <span
                        className={`block h-[1.5px] bg-white transition-all duration-300 ${
                            menuOpen ? "w-6 rotate-45 translate-y-[6.5px]" : "w-6"
                        }`}
                    />
                    <span
                        className={`block h-[1.5px] bg-white transition-all duration-300 ${
                            menuOpen ? "opacity-0 w-0" : "w-4"
                        }`}
                    />
                    <span
                        className={`block h-[1.5px] bg-white transition-all duration-300 ${
                            menuOpen ? "w-6 -rotate-45 -translate-y-[6.5px]" : "w-6"
                        }`}
                    />
                </button>
            </div>

            <div
                className={`md:hidden overflow-hidden transition-all duration-400 bg-black/90 backdrop-blur-md ${
                    menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <ul
                    className="flex flex-col px-6 pb-6 gap-5 pt-2"
                    style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                >
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="text-white/70 hover:text-white text-sm tracking-widest uppercase transition-colors duration-200"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <a
                            href="https://instagram.com/idlechstr"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMenuOpen(false)}
                            className="inline-flex border border-white/30 text-white text-xs tracking-widest uppercase px-5 py-2 hover:bg-white hover:text-black transition-all duration-200"
                        >
                            @idlechstr
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}