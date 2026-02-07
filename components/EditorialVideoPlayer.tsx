"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface EditorialVideoPlayerProps {
    src: string;
    poster?: string;
    collection?: string;
    designerTop?: string;
    designerBottom?: string;
    season?: string;
    currentIndex?: number;
    totalCount?: number;
}

// Format seconds to MM:SS
function formatTime(seconds: number): string {
    if (!seconds || !isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function EditorialVideoPlayer({
    src,
    poster,
    collection = "COLLECTION",
    designerTop = "HELIOT",
    designerBottom = "EMIL",
    season = "SS2025",
    currentIndex = 7,
    totalCount = 13,
}: EditorialVideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // State
    const [isHovered, setIsHovered] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMobileOverlayVisible, setIsMobileOverlayVisible] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    // Initial hydration and browser checks
    useEffect(() => {
        setHasMounted(true);

        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);

        const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener("change", listener);
        return () => mediaQuery.removeEventListener("change", listener);
    }, []);

    // Auto-play on mount
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = true;
        video.loop = true;
        video.playsInline = true;

        video.play().catch(() => {
            // Silently handle autoplay restrictions
        });
    }, []);

    // Progress and time tracking
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateProgress = () => {
            if (video.duration) {
                setProgress((video.currentTime / video.duration) * 100);
                setCurrentTime(video.currentTime);
            }
        };

        const updateDuration = () => {
            if (video.duration && isFinite(video.duration)) {
                setDuration(video.duration);
            }
        };

        video.addEventListener("timeupdate", updateProgress);
        video.addEventListener("loadedmetadata", updateDuration);
        video.addEventListener("durationchange", updateDuration);

        return () => {
            video.removeEventListener("timeupdate", updateProgress);
            video.removeEventListener("loadedmetadata", updateDuration);
            video.removeEventListener("durationchange", updateDuration);
        };
    }, []);

    // Sync playing state with video
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        video.addEventListener("play", handlePlay);
        video.addEventListener("pause", handlePause);

        return () => {
            video.removeEventListener("play", handlePlay);
            video.removeEventListener("pause", handlePause);
        };
    }, []);

    // Play/Pause toggle
    const handlePlayPause = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play().catch(() => { });
        } else {
            video.pause();
        }
    }, []);

    // Mute toggle
    const handleMuteToggle = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = !video.muted;
        setIsMuted(video.muted);
    }, []);

    // Mobile tap handler
    const handleContainerClick = useCallback(
        (e: React.MouseEvent | React.TouchEvent) => {
            if (!isTouchDevice) return;

            // Check if tapped on a control button
            const target = e.target as HTMLElement;
            if (target.closest(".editorial-control-btn")) {
                return; // Let the button handle it
            }

            // Toggle overlay visibility
            setIsMobileOverlayVisible((prev) => !prev);
        },
        [isTouchDevice]
    );

    // Determine if overlay should be visible
    const showOverlay = isTouchDevice ? isMobileOverlayVisible : isHovered;

    // Format indices with leading zeros
    const indexStart = String(currentIndex).padStart(2, "0");
    const indexEnd = String(totalCount).padStart(2, "0");

    return (
        <div
            ref={containerRef}
            className={`editorial-video-container ${showOverlay ? "is-active" : ""}`}
            onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
            onMouseLeave={() => !isTouchDevice && setIsHovered(false)}
            onClick={handleContainerClick}
        >
            {/* Video Element */}
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="editorial-video"
                muted
                loop
                playsInline
                preload="auto"
                crossOrigin="anonymous"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                draggable={false}
                controlsList="nodownload nofullscreen noremoteplayback"
                disablePictureInPicture
            />


            {/* Overlay Container */}
            <div
                className="editorial-video-overlay"
                style={{
                    opacity: hasMounted && showOverlay ? 1 : 0,
                    pointerEvents: hasMounted && showOverlay ? "auto" : "none",
                    transition: hasMounted && prefersReducedMotion ? "none" : undefined,
                }}
            >
                {/* Row 1: COLLECTION — SS2025 */}
                <div className="editorial-row editorial-row-top">
                    <span className="editorial-label">{collection}</span>
                    <span className="editorial-season">{season}</span>
                </div>

                {/* Row 2: Timeline with time */}
                <div className="editorial-row editorial-row-timeline">
                    <span className="editorial-time">{formatTime(currentTime)}</span>
                    <div className="editorial-timeline">
                        <div
                            className="editorial-timeline-progress"
                            style={{ transform: `scaleX(${progress / 100})` }}
                        />
                    </div>
                    <span className="editorial-time">{formatTime(duration)}</span>
                </div>

                {/* Row 3: PLAY — 07 — EMIL — 13 — MUTE */}
                <div className="editorial-row editorial-row-bottom">
                    <button
                        className="editorial-control-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePlayPause();
                        }}
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? "PAUSE" : "PLAY"}
                    </button>

                    <span className="editorial-index">{indexStart}</span>

                    <span className="editorial-designer-bottom">{designerBottom}</span>

                    <span className="editorial-index">{indexEnd}</span>

                    <button
                        className="editorial-control-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleMuteToggle();
                        }}
                        aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? "UNMUTE" : "MUTE"}
                    </button>
                </div>
            </div>
        </div>
    );
}
