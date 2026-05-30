"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface VideoItem {
    id: number;
    title: string;
    category: string;
    year: string;
    duration: string;
    src: string;
    poster: string;
    featured?: boolean;
    tag?: string;
}

const FEATURED: VideoItem = {
    id: 0,
    title: "Golden Hour on the Ridgeline",
    category: "Landscape",
    year: "2024",
    duration: "4:32",
    src: "/hero/video1.mp4",
    poster: "/about/archive1.jpg",
    featured: true,
    tag: "Latest Film",
};

const ALL_VIDEOS: VideoItem[] = [
    { id: 1, title: "City at 3AM", category: "Urban", year: "2024", duration: "2:14", src: "/hero/video2.mp4", poster: "/about/archive2.jpg", tag: "New" },
    { id: 2, title: "Tide & Ash", category: "Seascape", year: "2024", duration: "3:07", src: "/hero/video3.mp4", poster: "/about/archive3.jpg" },
    { id: 3, title: "Fog Study No.7", category: "Atmospheric", year: "2023", duration: "1:58", src: "/hero/video1.mp4", poster: "/about/archive4.jpg" },
    { id: 4, title: "Market Hours", category: "Street", year: "2023", duration: "5:21", src: "/hero/video2.mp4", poster: "/about/archive5.jpg" },
    { id: 5, title: "Salt & Light", category: "Portrait", year: "2024", duration: "3:44", src: "/hero/video3.mp4", poster: "/about/archive1.jpg" },
    { id: 6, title: "Meridian", category: "Abstract", year: "2024", duration: "2:59", src: "/hero/video1.mp4", poster: "/about/archive2.jpg" },
    { id: 7, title: "High Plateau", category: "Landscape", year: "2023", duration: "6:11", src: "/hero/video3.mp4", poster: "/about/archive3.jpg", tag: "Extended Cut" },
    { id: 8, title: "Riverbed", category: "Landscape", year: "2023", duration: "4:48", src: "/hero/video1.mp4", poster: "/about/archive4.jpg" },
    { id: 9, title: "Before the Rain", category: "Landscape", year: "2022", duration: "3:30", src: "/hero/video2.mp4", poster: "/about/archive5.jpg" },
    { id: 10, title: "Dusk Inventory", category: "Landscape", year: "2024", duration: "5:02", src: "/hero/video3.mp4", poster: "/about/archive1.jpg" },
    { id: 11, title: "Stone & Sky", category: "Landscape", year: "2023", duration: "2:47", src: "/hero/video1.mp4", poster: "/about/archive2.jpg" },
    { id: 12, title: "Rush Hour Elegy", category: "Urban", year: "2024", duration: "4:15", src: "/hero/video2.mp4", poster: "/about/archive3.jpg" },
    { id: 13, title: "Corner Light", category: "Urban", year: "2023", duration: "1:55", src: "/hero/video3.mp4", poster: "/about/archive4.jpg" },
    { id: 14, title: "Night Market", category: "Urban", year: "2023", duration: "7:03", src: "/hero/video1.mp4", poster: "/about/archive5.jpg", tag: "Fan Favorite" },
    { id: 15, title: "Scaffolding", category: "Urban", year: "2024", duration: "2:22", src: "/hero/video2.mp4", poster: "/about/archive1.jpg" },
    { id: 16, title: "Passage", category: "Urban", year: "2022", duration: "3:18", src: "/hero/video3.mp4", poster: "/about/archive2.jpg" },
];


function VideoCard({ video }: { video: VideoItem }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
        videoRef.current?.play().catch(() => { });
    };
    const handleMouseLeave = () => {
        setHovered(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <div
            className="video-card group relative cursor-pointer"
            style={{
                transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1)",
                zIndex: hovered ? 20 : 1,
                transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="relative overflow-hidden bg-white/5"
                style={{ aspectRatio: "16/9", borderRadius: "3px" }}
            >
                <img
                    src={video.poster}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    style={{
                        filter: hovered ? "grayscale(0)" : "grayscale(0.4) brightness(0.8)",
                        transition: "filter 0.5s ease",
                    }}
                />
                <video
                    ref={videoRef}
                    src={video.src}
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.4s ease" }}
                />

                <div
                    className="absolute inset-0"
                    style={{
                        background: hovered
                            ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)"
                            : "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 80%)",
                        transition: "all 0.4s ease",
                    }}
                />

                {video.tag && (
                    <span
                        className="absolute top-2 left-2 text-black text-[9px] tracking-[0.2em] uppercase px-2 py-[3px] font-medium"
                        style={{
                            background: "white",
                            fontFamily: "var(--font-barlow), sans-serif",
                            borderRadius: "1px",
                        }}
                    >
                        {video.tag}
                    </span>
                )}

                <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease" }}
                >
                    <div
                        className="flex items-center justify-center"
                        style={{
                            width: 44,
                            height: 44,
                            border: "1.5px solid rgba(255,255,255,0.9)",
                            borderRadius: "50%",
                            backdropFilter: "blur(4px)",
                            background: "rgba(255,255,255,0.1)",
                        }}
                    >
                        <svg width="14" height="16" viewBox="0 0 14 16" fill="white">
                            <path d="M1 1l12 7-12 7V1z" />
                        </svg>
                    </div>
                </div>

                <span
                    className="absolute bottom-2 right-2 text-white/70 text-[10px] tracking-wider"
                    style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                >
                    {video.duration}
                </span>
            </div>

            <div
                style={{
                    maxHeight: hovered ? "80px" : "0px",
                    opacity: hovered ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.4s cubic-bezier(0.23,1,0.32,1), opacity 0.3s ease",
                    paddingTop: hovered ? "10px" : "0px",
                }}
            >
                <p
                    className="text-white text-sm font-medium leading-tight mb-1 truncate"
                    style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                >
                    {video.title}
                </p>
                <div className="flex items-center gap-2">
                    <span className="text-white/40 text-[10px] tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-barlow), sans-serif" }}>
                        {video.category}
                    </span>
                    <span className="text-white/20 text-[10px]">·</span>
                    <span className="text-white/40 text-[10px]" style={{ fontFamily: "var(--font-barlow), sans-serif" }}>
                        {video.year}
                    </span>
                </div>
            </div>
        </div>
    );
}

function FeaturedBanner() {
    const bannerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!bannerRef.current) return;

        gsap.to(videoRef.current, {
            scrollTrigger: {
                trigger: bannerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1,
            },
            scale: 1.12,
            y: 60,
        });

        const tl = gsap.timeline({ delay: 0.3 });
        tl.from(contentRef.current?.querySelector(".feat-tag"), {
            y: 20, opacity: 0, duration: 0.8, ease: "expo.out",
        })
            .from(contentRef.current?.querySelector(".feat-title"), {
                y: 40, opacity: 0, duration: 1, ease: "expo.out",
            }, "-=0.5")
            .from(contentRef.current?.querySelector(".feat-meta"), {
                y: 20, opacity: 0, duration: 0.8, ease: "expo.out",
            }, "-=0.6")
            .from(contentRef.current?.querySelectorAll(".feat-btn"), {
                y: 20, opacity: 0, duration: 0.7, ease: "expo.out", stagger: 0.1,
            }, "-=0.5");
    }, []);

    return (
        <div ref={bannerRef} className="relative w-full overflow-hidden bg-black" style={{ height: "clamp(500px, 65vh, 800px)" }}>
            <video
                ref={videoRef}
                src={FEATURED.src}
                autoPlay muted loop playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ transformOrigin: "center center" }}
            />

            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.1) 50%, transparent 100%)" }} />

            <div ref={contentRef} className="absolute inset-0 flex flex-col justify-end pb-14 md:pb-20 px-6 md:px-14">
                <span
                    className="feat-tag text-white/60 text-[10px] tracking-[0.35em] uppercase mb-4 block"
                    style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                >
                    {FEATURED.tag} — {FEATURED.category} · {FEATURED.year}
                </span>
                <h1
                    className="feat-title text-white mb-5"
                    style={{
                        fontFamily: "var(--font-bebas), sans-serif",
                        fontSize: "clamp(3rem, 7vw, 7rem)",
                        lineHeight: 0.9,
                        letterSpacing: "0.02em",
                        maxWidth: "700px",
                    }}
                >
                    {FEATURED.title}
                </h1>
                <div className="feat-meta flex items-center gap-4 mb-8">
                    <span className="text-white/50 text-xs tracking-widest" style={{ fontFamily: "var(--font-barlow), sans-serif" }}>
                        {FEATURED.duration}
                    </span>
                    <span className="text-white/20">|</span>
                    <span className="text-white/50 text-xs tracking-widest" style={{ fontFamily: "var(--font-barlow), sans-serif" }}>
                        4K · Cinematic
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        className="feat-btn flex items-center gap-3 bg-white text-black text-xs tracking-[0.2em] uppercase px-7 py-3 hover:bg-white/90 transition-colors"
                        style={{ fontFamily: "var(--font-barlow), sans-serif", borderRadius: "2px" }}
                    >
                        <svg width="12" height="14" viewBox="0 0 12 14" fill="black"><path d="M0 0l12 7-12 7V0z" /></svg>
                        Play
                    </button>
                    <button
                        className="feat-btn flex items-center gap-3 border border-white/30 text-white text-xs tracking-[0.2em] uppercase px-7 py-3 hover:border-white transition-colors"
                        style={{ fontFamily: "var(--font-barlow), sans-serif", borderRadius: "2px", backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.08)" }}
                    >
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="white" strokeWidth="1.5"><circle cx="6.5" cy="6.5" r="5.5" /><path d="M6.5 4v4M4.5 6.5h4" /></svg>
                        More Info
                    </button>
                </div>
            </div>

            <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundSize: "128px 128px",
                }}
            />
        </div>
    );
}

export default function VideosPage() {
    const pageRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!headingRef.current) return;
        gsap.from(headingRef.current, {
            scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none none" },
            y: 30, opacity: 0, duration: 0.9, ease: "expo.out",
        });

        const cards = gridRef.current?.querySelectorAll(".video-card");
        if (cards) {
            gsap.from(cards, {
                scrollTrigger: { trigger: gridRef.current, start: "top 85%", toggleActions: "play none none none" },
                y: 40, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.05,
            });
        }
    }, []);

    return (
        <div ref={pageRef} className="bg-[#080808] min-h-screen">
            <FeaturedBanner />
            <div ref={headingRef} className="px-6 md:px-14 pt-12 pb-8">
                <p
                    className="text-white/30 text-[10px] tracking-[0.35em] uppercase mb-2"
                    style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                >
                    001 — Collection
                </p>
                <h2
                    className="text-white"
                    style={{
                        fontFamily: "var(--font-bebas), sans-serif",
                        fontSize: "clamp(2rem, 5vw, 4rem)",
                        letterSpacing: "0.05em",
                        lineHeight: 0.95,
                    }}
                >
                    The Video Archive
                </h2>
            </div>

            <div
                ref={gridRef}
                className="px-6 md:px-14 pb-20"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(clamp(200px, 22vw, 300px), 1fr))",
                    gap: "clamp(12px, 1.5vw, 20px)",
                }}
            >
                {ALL_VIDEOS.map((video) => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
}