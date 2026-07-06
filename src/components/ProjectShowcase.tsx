import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { ExternalLink, X, Play, ArrowRight } from "lucide-react";

const GithubIcon = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const PROJECTS = [
  {
    stacks: ["React", "Vite", "TypeScript", "FastAPI", "Python"],
    name: "ZipLens",
    desc: "Convert ZIP files into clean, AI-friendly Markdown documents while preserving folder structure, enabling seamless project sharing, documentation, and code analysis without manual extraction.",
    features: [
      "Preserves complete folder hierarchy in the generated Markdown",
      "Optimizes code formatting for LLM context windows",
      "Drag-and-drop web interface with local browser processing",
      "Real-time token count estimation for AI prompt planning",
    ],
    floatDelay: "0s",
    floatDur: "3.4s",
    githubUrl:
      "https://github.com/MarmikShah634/ZipLens-From-ZIP-to-Readable-Markdown",
    liveUrl: "https://ziplens.netlify.app/",
    demoAvailable: true,
    imageUrl: "/images/ziplens_thumbnail.png",
    videoUrl: "/videos/zipToMd.mp4",
  },
  {
    stacks: ["React", "TailwindCSS", "Node.js", "Docker", "Gemini AI"],
    name: "GitGuru",
    desc: "AI-powered Git sandbox that generates real-world Git scenarios inside isolated Docker environments, helping developers safely practice merges, rebases, reflog recovery, and advanced workflows.",
    features: [
      "Real-time dynamic visualization of the Git commit tree",
      "Interactive terminal running inside sandboxed Docker containers",
      "AI-driven scenario builder powered by Gemini",
      "Built-in verification engine for conflict resolution checks",
    ],
    floatDelay: "0s",
    floatDur: "3.4s",
    githubUrl: "https://github.com/MarmikShah634/gitguru",
    liveUrl: "",
    demoAvailable: false,
    imageUrl: "/images/gitguru_thumbnail.png",
    videoUrl: "/videos/gitguru.mp4",
  },
  {
    stacks: ["React", "Vite", "FastAPI", "Docker", "SQL"],
    name: "ChartGenie",
    desc: "Full-stack data visualization platform that transforms CSV files and SQL query results into interactive charts, with project management, chart customization, and exportable code generation.",
    features: [
      "Interactive custom chart builder (axes, legends, color schemes)",
      "Direct CSV imports and remote SQL database connections",
      "Exportable chart components (React + D3 & Python scripts)",
      "Project dashboards with saved visualization sharing",
    ],
    floatDelay: "0s",
    floatDur: "3.4s",
    githubUrl: {
      frontend: "https://github.com/MarmikShah634/chartgenie-frontend",
      backend: "https://github.com/MarmikShah634/chartgenie-backend",
    },
    liveUrl: "https://chartgenie.netlify.app/",
    demoAvailable: true,
    imageUrl: "/images/chartgenie_thumbnail.png",
    videoUrl: "/videos/chartGenie.mp4",
  },
  {
    stacks: ["React", "Vite", "FastAPI", "WebSockets", "Docker"],
    name: "NexusDrop",
    desc: "Secure real-time file sharing platform that enables one-time transfers through temporary rooms, leveraging WebSockets for direct delivery and automatic session expiration for enhanced privacy.",
    features: [
      "Peer-to-peer real-time file signalling using WebSockets",
      "One-time ephemeral data rooms with automated auto-destruct timers",
      "Transfer queue monitor with pause/resume functionality",
      "Zero server storage requirements preserving files locally",
    ],
    floatDelay: "0s",
    floatDur: "3.4s",
    githubUrl:
      "https://github.com/MarmikShah634/NexusDrop-Centralized-File-Exchange-Seamless-Data-Hub",
    liveUrl: "",
    demoAvailable: false,
    imageUrl: "/images/nexusdrop_thumbnail.png",
    videoUrl: "/videos/nexusDrop.mp4",
  },
  {
    stacks: ["JavaScript", "WebExtensions API", "HTML5", "CSS3"],
    name: "Universal Input Assistant",
    desc: "A productivity-focused Firefox extension designed to create, manage, and instantly insert custom text snippets and dynamic templates into any web input field, fully integrated with Firefox's secure storage sync.",
    features: [
      "Smart auto-detection of snippet types (email, phone, address, and templates)",
      "Dynamic template engine supporting custom {{variable}} placeholders",
      "Cross-device synchronization using Firefox Storage Sync with local storage fallback",
      "Drag-and-drop organization with real-time search, tagging, and type filtering",
    ],
    floatDelay: "0.2s",
    floatDur: "3.2s",
    githubUrl: "https://github.com/MarmikShah634/universal-input-assistant",
    liveUrl: "https://addons.mozilla.org/en-US/firefox/addon/universal-input-assistant/",
    demoAvailable: true,
    imageUrl: "/images/Universal_Input_Assistant.png",
    videoUrl: "/videos/autocomplete_extension.mp4",
  },
  {
    stacks: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "MySQL",
      "Tailwind",
      "Redux Toolkit",
    ],
    name: "Crystal Billing",
    desc: "A SaaS billing and operations platform for a diamond-cutting business (jagad order handling and party billing) in Surat — managing parties, orders with diamond lots, staff attendance, and PDF invoice generation.",
    features: [
      "Order management with dynamic diamond lots (carat, count, price per carat) and party/staff dropdowns",
      "Billing module that generates per-party PDF invoices by date range, with invoice history and payment recording",
      "Staff management with monthly attendance grid (Present/Absent/Half-day) and summary cards",
      "Client-side reports & analytics dashboard — revenue by month, top parties, status breakdown, and KPIs",
    ],
    floatDelay: "0s",
    floatDur: "3.4s",
    githubUrl: {
      frontend: "",
      backend: "",
    },
    liveUrl: "https://crystal-billing-frontend.vercel.app/",
    demoAvailable: true,
    imageUrl: "",
    videoUrl: "",
  },
];

interface Project {
  stacks: string[];
  name: string;
  desc: string;
  features?: string[];
  floatDelay: string;
  floatDur: string;
  githubUrl: string | { frontend: string; backend: string };
  liveUrl: string;
  demoAvailable: boolean;
  imageUrl: string;
  videoUrl: string;
}

type LenisWindow = Window & typeof globalThis & {
  lenis?: {
    stop: () => void;
    start: () => void;
  };
};

export default function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Bridge direct DOM clicks to React states
  const onCardClickRef = useRef<(idx: number) => void>(null);
  useEffect(() => {
    onCardClickRef.current = (idx: number) => {
      setSelectedProject(PROJECTS[idx]);
    };
  }, []);

  // Close video modal with Escape key and toggle body scroll locking
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      (window as LenisWindow).lenis?.stop();
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      (window as LenisWindow).lenis?.start();
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      (window as LenisWindow).lenis?.start();
    };
  }, [selectedProject]);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    const dotsContainer = dotsRef.current;
    const section = sectionRef.current;
    if (!track || !viewport || !dotsContainer || !section) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>(".c-card"));
    const dots = Array.from(
      dotsContainer.querySelectorAll<HTMLElement>(".cs-dot"),
    );
    const n = cards.length;

    // Set 3D radius based on screen size dynamically
    let R = window.innerWidth < 640 ? 220 : 390;
    const STEP = 360 / n;

    let angle = 0;

    let vel = 0;
    let dragging = false;
    let lastX = 0;
    let activeI = -1;
    let snapping = false;
    let snapTarget = 0;
    let rafId: number;

    const handleResize = () => {
      R = window.innerWidth < 640 ? 220 : 390;
      cards.forEach((c, i) => {
        c.style.transform = `rotateY(${STEP * i}deg) translateZ(${R}px)`;
      });
    };
    window.addEventListener("resize", handleResize);

    cards.forEach((c, i) => {
      c.style.transform = `rotateY(${STEP * i}deg) translateZ(${R}px)`;
    });

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function setActive(i: number) {
      if (i === activeI) return;
      if (activeI >= 0) {
        cards[activeI].classList.remove("active");
        cards[activeI].classList.remove("settled");
        if (dots[activeI]) dots[activeI].classList.remove("active");
      }
      activeI = i;
      cards[activeI].classList.add("active");
      if (dots[activeI]) dots[activeI].classList.add("active");
    }

    function updateVisuals() {
      cards.forEach((c, i) => {
        const worldAngle = (((STEP * i + angle) % 360) + 360) % 360;
        const norm = worldAngle > 180 ? worldAngle - 360 : worldAngle;
        const dist = Math.abs(norm);

        // Premium opacity decay curve based on distance from the camera
        const opacity =
          dist < 85
            ? lerp(1, 0.9, dist / 85)
            : Math.max(0.82, lerp(0.9, 0.82, (dist - 85) / 95));
        c.style.opacity = String(opacity);
        c.style.pointerEvents = dist > 92 ? "none" : "auto";
        c.style.filter = "none";
      });
      const newActive = ((Math.round(-angle / STEP) % n) + n) % n;
      setActive(newActive);
    }

    function raf() {
      if (!dragging) {
        if (snapping) {
          angle = lerp(angle, snapTarget, 0.1);
          if (Math.abs(angle - snapTarget) < 0.04) {
            angle = snapTarget;
            snapping = false;
            if (activeI >= 0 && cards[activeI]) {
              cards[activeI].classList.add("settled");
            }
          }
        } else {
          vel *= 0.91;
          angle += vel;
          if (Math.abs(vel) < 0.22) {
            snapTarget = -Math.round(-angle / STEP) * STEP;
            snapping = true;
            vel = 0;
          }
        }
      }
      track!.style.transform = `rotateY(${angle}deg)`;
      updateVisuals();
      rafId = requestAnimationFrame(raf);
    }

    const onMouseDown = (e: MouseEvent) => {
      dragging = true;
      vel = 0;
      snapping = false;
      cards.forEach((c) => c.classList.remove("settled"));
      lastX = e.clientX;
      track.style.cursor = "grabbing";
      e.preventDefault();
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      vel = dx * 0.28;
      angle += dx * 0.28;
      lastX = e.clientX;
    };
    const onMouseUp = () => {
      dragging = false;
      track.style.cursor = "grab";
    };

    const onTouchStart = (e: TouchEvent) => {
      dragging = true;
      vel = 0;
      snapping = false;
      cards.forEach((c) => c.classList.remove("settled"));
      lastX = e.touches[0].clientX;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging) return;
      const dx = e.touches[0].clientX - lastX;
      vel = dx * 0.28;
      angle += dx * 0.28;
      lastX = e.touches[0].clientX;
    };
    const onTouchEnd = () => {
      dragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      cards.forEach((c) => c.classList.remove("settled"));
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      vel += delta * 0.055;
      snapping = false;
    };

    track.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    track.addEventListener("wheel", onWheel, { passive: false });

    const prevBtn = document.getElementById("csPrev");
    const nextBtn = document.getElementById("csNext");
    const prevHandler = () => {
      cards.forEach((c) => c.classList.remove("settled"));
      snapTarget = angle + STEP;
      snapping = true;
      vel = 0;
    };
    const nextHandler = () => {
      cards.forEach((c) => c.classList.remove("settled"));
      snapTarget = angle - STEP;
      snapping = true;
      vel = 0;
    };
    if (prevBtn) prevBtn.addEventListener("click", prevHandler);
    if (nextBtn) nextBtn.addEventListener("click", nextHandler);

    dots.forEach((d, i) => {
      d.addEventListener("click", () => {
        cards.forEach((c) => c.classList.remove("settled"));
        const ti = Math.round(-angle / STEP);
        const cur = ((ti % n) + n) % n;
        let diff = i - cur;
        if (diff > n / 2) diff -= n;
        if (diff < -n / 2) diff += n;
        snapTarget = angle - diff * STEP;
        snapping = true;
        vel = 0;
      });
    });

    cards.forEach((c, i) => {
      c.addEventListener("click", (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        // Do not open video popup or rotate card when clicking interactive buttons
        if (
          target.closest("a") ||
          target.closest("button") ||
          target.closest(".c-btn")
        ) {
          return;
        }
        if (i === activeI) {
          onCardClickRef.current?.(i);
          return;
        }
        cards.forEach((c) => c.classList.remove("settled"));
        const cur = ((Math.round(-angle / STEP) % n) + n) % n;
        let diff = i - cur;
        if (diff > n / 2) diff -= n;
        if (diff < -n / 2) diff += n;
        snapTarget = angle - diff * STEP;
        snapping = true;
        vel = 0;
      });
    });

    setActive(0);
    if (cards[0]) cards[0].classList.add("settled");
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      track.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      track.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      track.removeEventListener("wheel", onWheel);
      if (prevBtn) prevBtn.removeEventListener("click", prevHandler);
      if (nextBtn) nextBtn.removeEventListener("click", nextHandler);
    };
  }, []);

  return (
    <section
      id="showcases"
      ref={sectionRef}
      className={`relative min-h-screen flex flex-col justify-center items-center px-6 sm:px-12 bg-transparent pt-28 pb-28 sm:pt-36 sm:pb-36 overflow-hidden select-none transition-all duration-300 ${selectedProject ? "z-50" : "z-10"}`}
    >
      {/* 3D Variables definition local scoping */}
      <div
        style={
          {
            "--ac": "#e2b853",
            "--bg3": "rgba(13, 13, 16, 0.96)",
            "--bg2": "rgba(30, 30, 36, 0.4)",
            "--bg": "rgba(9, 9, 11, 0.98)",
            "--br": "rgba(255, 255, 255, 0.05)",
            "--ff": '"Outfit", sans-serif',
            "--fg": "#f4f4f5",
            "--fg2": "#a1a1aa",
            "--fg3": "#52525b",
            width: "100%",
            maxWidth: "1200px",
          } as React.CSSProperties
        }
        className="mx-auto"
      >
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-20 sm:mb-28">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3 font-mono text-[9px] text-[#e2b853] uppercase tracking-[0.3em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e2b853] animate-ping" />
              Projects Showcase
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#f4f4f5]">
              Featured Synthesis
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed font-sans font-light mt-4 max-w-lg">
              A curated selection of our digital products, engineered with
              precision, reliability, and clean code to solve real-world
              challenges.
            </p>
          </div>
          <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest hidden sm:inline mt-2">
            DRAG · SCROLL · CLICK CARD
          </span>
        </div>

        {/* 3D Cylinder Frame Viewport */}
        <div
          style={{
            position: "relative",
            padding: "10px 0 0",
            userSelect: "none",
          }}
        >
          <div
            ref={viewportRef}
            style={{
              height: "var(--vp-h)",
              perspective: 1400,
              perspectiveOrigin: "50% 44%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "visible",
              position: "relative",
            }}
          >
            {/* Bottom cylinder reflective gradient blur light leaks */}
            <div
              style={{
                content: "",
                position: "absolute",
                bottom: 10,
                left: "50%",
                transform: "translateX(-50%)",
                width: "50%",
                height: 40,
                background:
                  "radial-gradient(ellipse at center,rgba(226,184,83,.12),transparent 70%)",
                filter: "blur(12px)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />

            {/* Pivot rotating track container */}
            <div
              ref={trackRef}
              style={{
                width: "var(--card-w)",
                height: "var(--card-h)",
                position: "relative",
                transformStyle: "preserve-3d",
                cursor: "grab",
              }}
            >
              {PROJECTS.map((p, i) => (
                <div
                  key={i}
                  className="c-card"
                  data-i={i}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "var(--card-w)",
                    height: "var(--card-h)",
                  }}
                >
                  {/* Slow sinusoidal floating height offset */}
                  <div
                    className="c-float"
                    style={
                      {
                        width: "100%",
                        height: "100%",
                        animation: `cflt ${p.floatDur} ease-in-out infinite`,
                        animationDelay: p.floatDelay,
                      } as React.CSSProperties
                    }
                  >
                    {/* Crystalline Glass container */}
                    <div
                      className="c-inner"
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        background: "var(--bg3)",
                        border: "1px solid var(--br)",
                        borderRadius: 24,
                        overflow: "hidden",
                        transform: "scale(1)",
                        transition:
                          "width .5s cubic-bezier(.16,1,.3,1), height .5s cubic-bezier(.16,1,.3,1), transform .55s cubic-bezier(.16,1,.3,1), border-color .4s, box-shadow .4s",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      {/* Left: Image Preview & Play Overlay */}
                      <div
                        className="c-media-container"
                        style={{
                          width: "180px",
                          height: "100%",
                          position: "relative",
                          overflow: "hidden",
                          flexShrink: 0,
                          background: "var(--bg2)",
                        }}
                      >
                        {/* Static Thumbnail Image */}
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="c-thumbnail"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            position: "absolute",
                            inset: 0,
                            opacity: 0.85,
                            zIndex: 1,
                          }}
                        />
                        {/* Play Overlay Indicator */}
                        <div
                          className="c-play-overlay"
                          style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "rgba(0, 0, 0, 0.45)",
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                            zIndex: 2,
                            pointerEvents: "none",
                          }}
                        >
                          <div
                            style={{
                              width: 44,
                              height: 44,
                              borderRadius: "50%",
                              background: "var(--ac)",
                              boxShadow: "0 0 15px rgba(226, 184, 83, 0.35)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#09090b",
                              transform: "scale(0.9)",
                              transition: "transform 0.3s ease",
                            }}
                            className="c-play-btn"
                          >
                            <Play
                              size={18}
                              fill="currentColor"
                              className="ml-0.5"
                            />
                          </div>
                          <span
                            style={{
                              marginTop: 10,
                              fontSize: 7.5,
                              fontFamily: "var(--ff)",
                              fontWeight: 600,
                              textTransform: "uppercase",
                              letterSpacing: "0.1em",
                              color: "var(--fg)",
                              background: "rgba(9, 9, 11, 0.75)",
                              padding: "2px 8px",
                              borderRadius: 4,
                            }}
                          >
                            Play Demo
                          </span>
                        </div>
                        {/* Focused golden aura overlay */}
                        <div
                          className="c-glow"
                          style={{
                            position: "absolute",
                            inset: 0,
                            background:
                              "radial-gradient(ellipse at 50% 110%,rgba(226,184,83,.25),transparent 60%)",
                            opacity: 0,
                            transition: "opacity .45s",
                            pointerEvents: "none",
                            zIndex: 3,
                          }}
                        />
                      </div>

                      {/* Right: Project Details & Meta */}
                      <div
                        style={{
                          padding: "16px 20px",
                          display: "flex",
                          flexDirection: "column",
                          flexGrow: 1,
                          justifyContent: "space-between",
                          overflow: "hidden",
                        }}
                      >
                        <div>
                          {/* Stacks horizontal line */}
                          <div
                            style={{
                              display: "flex",
                              gap: 5,
                              flexWrap: "wrap",
                              marginBottom: 8,
                            }}
                          >
                            {p.stacks.slice(0, 3).map((s) => (
                              <span
                                key={s}
                                className="c-stk font-mono"
                                style={{
                                  fontSize: 8,
                                  letterSpacing: "0.07em",
                                  textTransform: "uppercase",
                                  color: "var(--fg2)",
                                  border: "1px solid var(--br)",
                                  borderRadius: 100,
                                  padding: "2px 7px",
                                  transition: "border-color .35s, color .35s",
                                }}
                              >
                                {s}
                              </span>
                            ))}
                          </div>

                          {/* Product Title */}
                          <h3
                            style={{
                              fontFamily: "var(--ff)",
                              fontSize: 16,
                              fontWeight: 700,
                              color: "var(--fg)",
                              letterSpacing: "-0.02em",
                              marginBottom: 4,
                            }}
                          >
                            {p.name}
                          </h3>

                          {/* Brief Description */}
                          <p
                            className="c-desc"
                            style={{
                              fontSize: 11,
                              color: "var(--fg2)",
                              lineHeight: 1.5,
                              fontWeight: 300,
                              maxHeight: "68px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {p.desc}
                          </p>
                        </div>

                        {/* Action buttons active reveal */}
                        <div
                          className="c-actions"
                          style={{
                            display: "flex",
                            gap: 8,
                            opacity: 0,
                            transform: "translateY(8px)",
                            transition:
                              "opacity .38s .15s, transform .38s .15s",
                            pointerEvents: "none",
                          }}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProject(p);
                            }}
                            className="c-btn c-btn-explore"
                            style={{
                              flex: 1,
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 4,
                              fontFamily: "var(--ff)",
                              fontSize: 10,
                              fontWeight: 600,
                              letterSpacing: "0.03em",
                              color: "var(--bg)",
                              borderRadius: 8,
                              padding: "6px 8px",
                              background: "var(--ac)",
                              cursor: "pointer",
                            }}
                          >
                            Explore
                            <ArrowRight size={11} />
                          </button>

                          {p.demoAvailable && (
                            <a
                              href={p.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="c-btn c-btn-demo"
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                flex: 1,
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 4,
                                fontFamily: "var(--ff)",
                                fontSize: 10,
                                fontWeight: 600,
                                letterSpacing: "0.03em",
                                color: "var(--ac)",
                                border: "1px solid rgba(226, 184, 83, 0.25)",
                                borderRadius: 8,
                                padding: "6px 8px",
                                background: "rgba(226, 184, 83, 0.03)",
                              }}
                            >
                              <ExternalLink size={11} />
                              Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Dot Navigation indicators */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 16,
              marginTop: 36,
            }}
          >
            <button
              id="csPrev"
              aria-label="Previous"
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                border: "1px solid var(--br)",
                background: "transparent",
                color: "var(--fg2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "border-color .2s, color .2s, background .2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--ac)";
                el.style.color = "var(--ac)";
                el.style.background = "var(--adim)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--br)";
                el.style.color = "var(--fg2)";
                el.style.background = "transparent";
              }}
              className="cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M9 2L4 7l5 5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div
              ref={dotsRef}
              style={{ display: "flex", alignItems: "center", gap: 9 }}
            >
              {PROJECTS.map((_, i) => (
                <button
                  key={i}
                  className="cs-dot cursor-pointer"
                  aria-label={`Card ${i + 1}`}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    border: "none",
                    background: "var(--fg3)",
                    opacity: 0.35,
                    transition: "opacity .3s, transform .3s, background .3s",
                  }}
                />
              ))}
            </div>

            <button
              id="csNext"
              aria-label="Next"
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                border: "1px solid var(--br)",
                background: "transparent",
                color: "var(--fg2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "border-color .2s, color .2s, background .2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--ac)";
                el.style.color = "var(--ac)";
                el.style.background = "var(--adim)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--br)";
                el.style.color = "var(--fg2)";
                el.style.background = "transparent";
              }}
              className="cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M5 2l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div
            style={{
              textAlign: "center",
              marginTop: 14,
              fontSize: 9,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--fg3)",
              opacity: 0.5,
            }}
            className="font-mono"
          >
            drag · scroll · click card to play video demo
          </div>
        </div>
      </div>

      {/* Cinematic Video Popup Modal */}
      {createPortal(
        <AnimatePresence>
          {selectedProject && (
            <div
              className="fixed inset-0 z-40 flex items-start justify-center p-4 pt-24 md:pt-28 overflow-y-auto"
              data-lenis-prevent
            >
              {/* Backdrop Blur */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/85 backdrop-blur-md"
              />

              {/* Modal Body */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={
                  {
                    "--ac": "#e2b853",
                    "--br": "rgba(255, 255, 255, 0.08)",
                    width: "100%",
                    maxWidth: "1024px",
                  } as React.CSSProperties
                }
                className="relative bg-[#121216]/95 border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row h-auto md:h-[580px] max-h-[90vh] md:max-h-none"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full border border-white/10 bg-black/60 text-zinc-400 flex items-center justify-center hover:text-[var(--ac)] hover:border-[var(--ac)] transition-all cursor-pointer"
                  aria-label="Close details"
                >
                  <X size={18} />
                </button>

                {/* Left: Video Preview with controls */}
                <div className="w-full md:w-[60%] lg:w-[65%] h-[240px] sm:h-[320px] md:h-full bg-black relative flex items-center justify-center">
                  <video
                    src={selectedProject.videoUrl}
                    poster={selectedProject.imageUrl}
                    loop
                    controls
                    playsInline
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Right: Info/Details panel */}
                <div className="w-full md:w-[40%] lg:w-[35%] h-auto md:h-full p-6 sm:p-8 flex flex-col justify-between overflow-y-auto custom-scroll border-t md:border-t-0 md:border-l border-white/10 bg-[#0d0d10]/40 backdrop-blur-sm">
                  <div className="flex flex-col gap-5">
                    {/* Title & Stacks */}
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                        {selectedProject.name}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {selectedProject.stacks.map((stack: string) => (
                          <span
                            key={stack}
                            className="font-mono text-[9px] uppercase tracking-wider text-[var(--ac)] bg-[var(--ac)]/5 border border-[var(--ac)]/15 px-2.5 py-0.5 rounded-full"
                          >
                            {stack}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Highlights */}
                    {selectedProject.features && (
                      <div>
                        <h4 className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500 mb-3">
                          Key Features
                        </h4>
                        <ul className="flex flex-col gap-2.5">
                          {selectedProject.features.map(
                            (feat: string, idx: number) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2.5 text-xs text-zinc-300 font-light leading-relaxed"
                              >
                                <span className="text-[var(--ac)] mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--ac)]" />
                                <span>{feat}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* References */}
                  <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-white/5">
                    <h4 className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500 mb-1">
                      Project References
                    </h4>

                    {/* Github Links */}
                    {typeof selectedProject.githubUrl === "string" ? (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2.5 font-sans text-[11px] font-semibold tracking-wide text-white border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 rounded-xl py-3 px-4 transition-all duration-200 shadow-md cursor-pointer"
                      >
                        <GithubIcon size={14} />
                        Codebase
                      </a>
                    ) : (
                      <div className="flex flex-col gap-2">
                        {selectedProject.githubUrl?.frontend && (
                          <a
                            href={selectedProject.githubUrl.frontend}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2.5 font-sans text-[11px] font-semibold tracking-wide text-white border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 rounded-xl py-2.5 px-4 transition-all duration-200 shadow-md cursor-pointer"
                          >
                            <GithubIcon size={14} />
                            Frontend Codebase
                          </a>
                        )}
                        {selectedProject.githubUrl?.backend && (
                          <a
                            href={selectedProject.githubUrl.backend}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2.5 font-sans text-[11px] font-semibold tracking-wide text-white border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 rounded-xl py-2.5 px-4 transition-all duration-200 shadow-md cursor-pointer"
                          >
                            <GithubIcon size={14} />
                            Backend Codebase
                          </a>
                        )}
                      </div>
                    )}

                    {/* Live Demo CTA */}
                    {selectedProject.demoAvailable &&
                      selectedProject.liveUrl && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2.5 font-sans text-[11px] font-bold tracking-wide text-black bg-[var(--ac)] hover:bg-[#f5d170] rounded-xl py-3 px-4 transition-all duration-200 shadow-lg shadow-[var(--ac)]/10 cursor-pointer"
                        >
                          <ExternalLink size={14} />
                          Launch Live Demo
                        </a>
                      )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body,
      )}

      {/* Dynamic styles */}
      <style>{`
        :root {
          --card-w: 460px;
          --card-h: 280px;
          --vp-h: 400px;
        }
        @media (max-width: 640px) {
          :root {
            --card-w: 280px;
            --card-h: 360px;
            --vp-h: 470px;
          }
        }
        .c-card.active.settled {
          z-index: 10;
        }
        .c-inner {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .c-card.active .c-inner {
          border-color: rgba(226,184,83,.5) !important;
          box-shadow: 0 0 0 1px rgba(226,184,83,.12),
                      0 20px 48px rgba(0,0,0,.5),
                      0 0 60px rgba(226,184,83,.07) !important;
          transform: scale(1.02) !important;
        }
        .c-card.active .c-play-overlay {
          opacity: 1 !important;
        }
        .c-card.active:hover .c-play-btn {
          transform: scale(1.06) !important;
          background: #f5d170 !important;
        }
        .c-card.active .c-glow {
          opacity: 1 !important;
        }
        .c-card.active .c-stk {
          border-color: rgba(226,184,83,.38) !important;
          color: var(--ac) !important;
        }
        .c-card.active .c-actions {
          opacity: 1 !important;
          transform: translateY(0) !important;
          pointer-events: auto !important;
        }
        .c-btn {
          cursor: pointer;
          transition: all .25s ease-out;
        }
        .c-btn:hover {
          transform: translateY(-2px);
        }
        .c-btn-explore:hover {
          background: #f5d170 !important;
          box-shadow: 0 4px 15px rgba(226, 184, 83, 0.35);
        }
        .c-btn-git:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(226, 184, 83, 0.4) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        .c-btn-demo:hover {
          background: rgba(226, 184, 83, 0.08) !important;
          border-color: rgba(226, 184, 83, 0.5) !important;
          box-shadow: 0 4px 12px rgba(226, 184, 83, 0.15);
        }
        
        @media (max-width: 640px) {
          .c-inner {
            flex-direction: column !important;
          }
          .c-media-container {
            width: 100% !important;
            height: 140px !important;
          }
        }
        
        .cs-dot.active {
          opacity: 1 !important;
          transform: scale(1.5) !important;
          background: var(--ac) !important;
        }
        
        .custom-scroll::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: var(--ac);
          border-radius: 9999px;
        }
      `}</style>
    </section>
  );
}
