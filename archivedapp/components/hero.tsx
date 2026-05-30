"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const slides = [
    "/hero/video2.mp4",
    "/hero/video1.mp4",
    "/hero/video3.mp4",
];

export default function Hero() {
    const [current, setCurrent] = useState(0);
    const [loaded, setLoaded] = useState<boolean[]>(slides.map(() => false));
    const trackRef = useRef<HTMLDivElement | null>(null);
    const scrollArrowRef = useRef<HTMLButtonElement | null>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    // Mark a video as loaded
    const handleCanPlay = (i: number) => {
        setLoaded((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
        });
    };

    // Auto-advance slides
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    // Play the current video, pause others
    useEffect(() => {
        videoRefs.current.forEach((vid, i) => {
            if (!vid) return;
            if (i === current) {
                // Reset to beginning and play
                vid.currentTime = 0;
                vid.play().catch(() => {});
            } else {
                vid.pause();
            }
        });
    }, [current]);

    // Slide transition
    useGSAP(() => {
        if (!trackRef.current) return;
        gsap.to(trackRef.current, {
            xPercent: -current * 100,
            duration: 1,
            ease: "back.inOut(1)",
        });
    }, [current]);

    // Scroll arrow bounce
    useGSAP(() => {
        if (!scrollArrowRef.current) return;
        gsap.to(scrollArrowRef.current, {
            y: 8,
            duration: 1.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
        });
    }, []);

    const scrollToAbout = () => {
        const about = document.getElementById("about");
        if (about) about.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">

            {/* Video track */}
            <div ref={trackRef} className="flex w-full h-full">
                {slides.map((src, i) => (
                    <div key={i} className="relative w-full h-full flex-shrink-0">

                        {/* Low-res blur placeholder shown until video is ready */}
                        {!loaded[i] && (
                            <div className="absolute inset-0 bg-black/80 animate-pulse" />
                        )}

                        <video
                            ref={(el) => { videoRefs.current[i] = el; }}
                            src={src}
                            // Only autoplay the first slide; others are triggered by useEffect
                            autoPlay={i === 0}
                            muted
                            loop
                            playsInline
                            // preload="auto" tells the browser to fetch the video immediately
                            preload="auto"
                            // poster gives a thumbnail to show before the video loads (optional — add a jpg per video)
                            // poster={`/hero/poster${i + 1}.jpg`}
                            onCanPlay={() => handleCanPlay(i)}
                            className="w-full h-full object-cover"
                            style={{
                                opacity: loaded[i] ? 1 : 0,
                                transition: "opacity 0.4s ease",
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

            {/* Hero text — centered */}
            <div className="absolute bottom-36 md:bottom-44 left-1/2 -translate-x-1/2 z-10 w-full px-6 flex flex-col items-center text-center">
                <h1
                    className="hero-headline text-white w-full"
                    style={{ lineHeight: 0.92 }}
                >
                    Let's turn stories
                    <br />
                    into moving pictures.
                </h1>
                <p className="mt-4 md:mt-5 text-sm md:text-base text-white/75 leading-relaxed hero-body max-w-md">
                    A curated archive of cinematic moments, emotions, and memories captured through film.
                </p>
            </div>

            {/* Thumbnail strip — bottom center */}
            <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-3 md:gap-5 z-10">
                {slides.map((src, i) => (
                    <div
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-300
                        ${i === current
                                ? "scale-110 border-white shadow-lg"
                                : "opacity-50 border-white/30 hover:opacity-70"
                            }`}
                    >
                        <video
                            src={src}
                            muted
                            playsInline
                            preload="metadata"
                            className="md:w-14 md:h-14 w-12 h-12 object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Scroll down arrow */}
            <button
                ref={scrollArrowRef}
                onClick={scrollToAbout}
                aria-label="Scroll to about"
                className="absolute right-6 md:right-14 bottom-10 z-10 flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 cursor-pointer"
                style={{ fontFamily: "var(--font-barlow), sans-serif" }}
            >
                <span className="text-[10px] tracking-[0.25em] uppercase rotate-90 mb-2">
                    Scroll
                </span>
                <svg
                    width="16"
                    height="28"
                    viewBox="0 0 16 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect x="7" y="0" width="2" height="20" rx="1" fill="currentColor" opacity="0.4" />
                    <path
                        d="M1 18L8 26L15 18"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

        </div>
    );
}