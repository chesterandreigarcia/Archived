"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
    { label: "Videos", href: "/videos" },
    { label: "Photos", href: "/photos" },
    { label: "Archive", href: "/archive" },
];

const socialLinks = [
    { label: "Instagram", href: "https://instagram.com/idlechstr" },
];

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const dividerTopRef = useRef<HTMLDivElement>(null);
    const dividerBottomRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const bottomBarRef = useRef<HTMLDivElement>(null);
    const filmGrainRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!footerRef.current) return;

        const ctx = gsap.context(() => {

            gsap.from(dividerTopRef.current, {
                scrollTrigger: {
                    trigger: dividerTopRef.current,
                    start: "top 92%",
                    toggleActions: "play none none none",
                },
                scaleX: 0,
                transformOrigin: "left center",
                duration: 1.4,
                ease: "expo.out",
            });

            const letters = headlineRef.current?.querySelectorAll(".footer-letter");
            if (letters) {
                gsap.from(letters, {
                    scrollTrigger: {
                        trigger: headlineRef.current,
                        start: "top 88%",
                        toggleActions: "play none none none",
                    },
                    yPercent: 110,
                    opacity: 0,
                    duration: 1.1,
                    ease: "expo.out",
                    stagger: 0.04,
                });
            }

            gsap.from(linksRef.current, {
                scrollTrigger: {
                    trigger: linksRef.current,
                    start: "top 92%",
                    toggleActions: "play none none none",
                },
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "expo.out",
                delay: 0.2,
            });

            gsap.from(bottomBarRef.current, {
                scrollTrigger: {
                    trigger: bottomBarRef.current,
                    start: "top 98%",
                    toggleActions: "play none none none",
                },
                y: 20,
                opacity: 0,
                duration: 0.9,
                ease: "expo.out",
                delay: 0.3,
            });

            gsap.from(dividerBottomRef.current, {
                scrollTrigger: {
                    trigger: dividerBottomRef.current,
                    start: "top 95%",
                    toggleActions: "play none none none",
                },
                scaleX: 0,
                transformOrigin: "left center",
                duration: 1.2,
                ease: "expo.out",
            });

            gsap.to(filmGrainRef.current, {
                opacity: 0.025,
                duration: 0.08,
                ease: "none",
                yoyo: true,
                repeat: -1,
                repeatRefresh: true,
            });

        }, footerRef);

        return () => ctx.revert();
    }, []);

    const headline = "Let's make\nsomething\nbeautiful.";
    const lines = headline.split("\n");

    return (
        <footer
            ref={footerRef}
            className="relative bg-[#080808] text-white overflow-hidden"
        >
            <div
                ref={filmGrainRef}
                className="pointer-events-none absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundSize: "128px 128px",
                }}
            />

            <div
                className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px]"
                style={{
                    boxShadow: "0 0 120px 1px rgba(255,255,255,0.06)",
                }}
            />

            <div className="px-6 md:px-14 pt-20 md:pt-28 pb-10 md:pb-12">

                <div
                    ref={dividerTopRef}
                    className="w-full h-[0.5px] bg-white/15 mb-16 md:mb-20"
                />

                <p
                    className="text-white/35 text-xs tracking-[0.3em] uppercase mb-8 md:mb-10"
                    style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                >
                    002 — Contact
                </p>

                <div className="overflow-hidden mb-16 md:mb-20">
                    <h2
                        ref={headlineRef}
                        style={{
                            fontFamily: "var(--font-bebas), sans-serif",
                            fontSize: "clamp(4rem, 13vw, 11rem)",
                            lineHeight: 0.9,
                            letterSpacing: "0.01em",
                        }}
                    >
                        {lines.map((line, li) => (
                            <span key={li} className="block overflow-hidden">
                                {line.split("").map((char, ci) => (
                                    <span
                                        key={ci}
                                        className="footer-letter inline-block"
                                        style={{ whiteSpace: char === " " ? "pre" : undefined }}
                                    >
                                        {char}
                                    </span>
                                ))}
                            </span>
                        ))}
                    </h2>
                </div>

                <div
                    ref={linksRef}
                    className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 mb-20 md:mb-24"
                >
                    <div>
                        <p
                            className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-5"
                            style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                        >
                            Navigation
                        </p>
                        <ul className="flex flex-col gap-3">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="group flex items-center gap-2 text-white/60 hover:text-white text-sm tracking-widest uppercase transition-colors duration-200"
                                        style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                                    >
                                        <span className="w-0 group-hover:w-4 h-[0.5px] bg-white transition-all duration-300 overflow-hidden" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p
                            className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-5"
                            style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                        >
                            Socials
                        </p>
                        <ul className="flex flex-col gap-3">
                            {socialLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-2 text-white/60 hover:text-white text-sm tracking-widest uppercase transition-colors duration-200"
                                        style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                                    >
                                        <span className="w-0 group-hover:w-4 h-[0.5px] bg-white transition-all duration-300 overflow-hidden" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col items-start md:items-end justify-between gap-6">
                        <p
                            className="text-white/50 text-sm leading-relaxed max-w-[220px] md:text-right"
                            style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                        >
                            Open for collaborations, commissions, and conversations.
                        </p>
                        <a
                            href="mailto:chstr.0120@gmail.com"
                            className="group flex items-center gap-3 border border-white/25 hover:border-white text-white text-xs tracking-widest uppercase px-6 py-3 transition-all duration-300 hover:bg-white hover:text-black"
                            style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                        >
                            Get in touch
                            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </a>
                    </div>
                </div>

                <div
                    ref={dividerBottomRef}
                    className="w-full h-[0.5px] bg-white/15 mb-8"
                />

                <div
                    ref={bottomBarRef}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                    <span
                        className="text-white/25 text-[11px] tracking-[0.2em] uppercase"
                        style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                    >
                        © {new Date().getFullYear()} Archive — @idlechstr
                    </span>

                    <div className="flex items-center gap-1 opacity-20">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div
                                key={i}
                                className="bg-white/80 rounded-[1px]"
                                style={{
                                    width: i % 3 === 0 ? "6px" : "3px",
                                    height: "10px",
                                }}
                            />
                        ))}
                    </div>

                    <span
                        className="text-white/25 text-[11px] tracking-[0.2em] uppercase"
                        style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                    >
                        All rights reserved
                    </span>
                </div>

            </div>
        </footer>
    );
}