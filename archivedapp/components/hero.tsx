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
    const trackRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    useGSAP(() => {
        if (!trackRef.current) return;

        gsap.to(trackRef.current, {
            xPercent: -current * 100,
            duration: 1,
            ease: "back.inOut(1)",
        });
    }, [current]);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">

            {/* Video track */}
            <div
                ref={trackRef}
                className="flex w-full h-full"
            >
                {slides.map((src, i) => (
                    <video
                        key={i}
                        src={src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover flex-shrink-0"
                    />
                ))}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

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
                            className="md:w-14 md:h-14 w-12 h-12 object-cover"
                        />
                    </div>
                ))}
            </div>

        </div>
    );
}