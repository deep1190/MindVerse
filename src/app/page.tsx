"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { audio } from "@/lib/audio";
import { Compass, ShieldAlert, Cpu, Layers, Disc, GraduationCap } from "lucide-react";

interface Planet {
  id: string;
  name: string;
  description: string;
  status: "Available" | "Coming Soon";
  progress: number;
  radiusX: number;
  radiusY: number;
  speed: number;
  color: string;
  icon: any;
  angleOffset: number;
  size: number;
}

const PLANETS: Planet[] = [
  {
    id: "news",
    name: "🌍 News Planet",
    description: "Explore WHY events are trending. Multi-agent timeline synthesis & social discourse decoder.",
    status: "Available",
    progress: 100,
    radiusX: 180,
    radiusY: 100,
    speed: 0.005,
    color: "from-cyan-400 to-blue-500 shadow-cyan-400/50",
    icon: Compass,
    angleOffset: 0,
    size: 40,
  },
  {
    id: "detective",
    name: "🕵 Detective Planet",
    description: "Investigate claims, factcheck rumors, and map misinformation footprints in real-time.",
    status: "Coming Soon",
    progress: 15,
    radiusX: 260,
    radiusY: 140,
    speed: 0.0035,
    color: "from-red-500 to-orange-600 shadow-red-500/40",
    icon: ShieldAlert,
    angleOffset: 1.2,
    size: 32,
  },
  {
    id: "history",
    name: "📚 History Planet",
    description: "AI-generated alternate timelines. Alter past events and simulate parallel world history.",
    status: "Coming Soon",
    progress: 5,
    radiusX: 340,
    radiusY: 180,
    speed: 0.002,
    color: "from-yellow-400 to-amber-500 shadow-yellow-400/40",
    icon: Layers,
    angleOffset: 2.4,
    size: 28,
  },
  {
    id: "startup",
    name: "💡 Startup Planet",
    description: "Business incubation agents. Synthesize ideas, model economics, and pitch virtual startups.",
    status: "Coming Soon",
    progress: 0,
    radiusX: 420,
    radiusY: 220,
    speed: 0.0012,
    color: "from-emerald-400 to-teal-500 shadow-emerald-400/40",
    icon: Cpu,
    angleOffset: 3.6,
    size: 24,
  },
  {
    id: "psychology",
    name: "🧠 Psychology Planet",
    description: "Cognitive feedback loops. Mapping collective internet comments to digital personality matrices.",
    status: "Coming Soon",
    progress: 0,
    radiusX: 500,
    radiusY: 260,
    speed: 0.0008,
    color: "from-purple-500 to-fuchsia-600 shadow-purple-500/40",
    icon: GraduationCap,
    angleOffset: 4.8,
    size: 20,
  }
];

export default function LandingPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<Planet | null>(null);
  const [focusedPlanet, setFocusedPlanet] = useState<Planet | null>(null);
  const [isWarping, setIsWarping] = useState(false);
  const [restrictedAlert, setRestrictedAlert] = useState<string | null>(null);
  
  // Animation coordinates
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});
  const angleRef = useRef<Record<string, number>>(
    PLANETS.reduce((acc, p) => ({ ...acc, [p.id]: p.angleOffset }), {})
  );

  useEffect(() => {
    // 1. Particle Starfield Canvas Setup
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const starCount = 300;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width - width / 2,
      y: Math.random() * height - height / 2,
      z: Math.random() * width,
      size: Math.random() * 1.5 + 0.5,
    }));

    // Orbit Animation Loop
    const tick = () => {
      // Clear canvas with deep space translucent fade
      ctx.fillStyle = isWarping ? "rgba(5, 8, 22, 0.25)" : "rgba(5, 8, 22, 0.9)";
      ctx.fillRect(0, 0, width, height);

      // Draw standard coordinate system translation to center
      ctx.save();
      ctx.translate(width / 2, height / 2);

      // Render starfield (3D travel effect)
      stars.forEach(star => {
        let starSpeed = isWarping ? 35 : 0.2;
        star.z -= starSpeed;
        
        // Wrap around if stars fly past camera
        if (star.z <= 0) {
          star.z = width;
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
        }

        // Project 3D points to 2D canvas
        const k = 400 / star.z;
        const px = star.x * k;
        const py = star.y * k;

        if (px > -width / 2 && px < width / 2 && py > -height / 2 && py < height / 2) {
          ctx.beginPath();
          if (isWarping) {
            // Draw speed streaks
            ctx.strokeStyle = `rgba(76, 201, 240, ${Math.min(1, (1 - star.z / width) * 1.5)})`;
            ctx.lineWidth = star.size * 1.5;
            ctx.moveTo(px, py);
            // Streaks go outwards from center
            ctx.lineTo(px - (px * 0.15), py - (py * 0.15));
            ctx.stroke();
          } else {
            // Standard twinkling points
            const opacity = Math.min(1, (1 - star.z / width) * 1.2);
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.arc(px, py, star.size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      // Render orbiting planet paths on layout matrix
      if (!isWarping) {
        ctx.strokeStyle = "rgba(76, 201, 240, 0.05)";
        ctx.lineWidth = 1;
        PLANETS.forEach(p => {
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radiusX, p.radiusY, 0, 0, Math.PI * 2);
          ctx.stroke();
        });
      }

      ctx.restore();

      // 2. Calculations for DOM Planet elements overlay
      const newPositions: Record<string, { x: number; y: number }> = {};
      PLANETS.forEach(p => {
        // Increment angle
        angleRef.current[p.id] += p.speed;
        const currentAngle = angleRef.current[p.id];
        
        // Calculate coords (ellipse centered on screen)
        const x = width / 2 + Math.cos(currentAngle) * p.radiusX;
        const y = height / 2 + Math.sin(currentAngle) * p.radiusY;
        
        newPositions[p.id] = { x, y };
      });
      setPositions(newPositions);

      animationId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isWarping]);

  const handlePlanetClick = (p: Planet) => {
    if (isWarping) return;

    if (p.id === "news") {
      audio.playWarpSweep();
      setIsWarping(true);
      setFocusedPlanet(p);

      // Delay to complete warp animation, then redirect
      setTimeout(() => {
        router.push("/news");
      }, 1300);
    } else {
      audio.playAccessDenied();
      setRestrictedAlert(p.name);
      setTimeout(() => {
        setRestrictedAlert(null);
      }, 3000);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#050816] select-none font-sans">
      
      {/* 3D background starry universe */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 block" />

      {/* Orbit System Header overlay */}
      <header className="relative z-10 w-full p-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl tracking-widest font-extrabold text-glow-cyan font-orbitron bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
            MINDVERSE
          </h1>
          <p className="text-xs text-cyan-400/60 font-mono mt-1">SECTOR: 0P-1 // AI GALAXY GRID</p>
        </div>
        
        <div className="text-right font-mono text-[10px] text-indigo-400/80 leading-relaxed bg-[#0B1220]/60 border border-white/5 p-2 rounded backdrop-blur-sm">
          <div>COORD_X: 44.92 / COORD_Y: 10.98</div>
          <div>SIMULATORS: 5 ACTIVE</div>
          <div className="text-emerald-400 flex items-center justify-end gap-1 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            STATION ONLINE
          </div>
        </div>
      </header>

      {/* Main Galaxy System Container */}
      <div className="flex-1 w-full relative flex items-center justify-center">
        
        {/* Core Intelligence Nebula Center */}
        {!isWarping && (
          <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-indigo-600/30 to-purple-600/30 blur-2xl flex items-center justify-center animate-pulse-slow">
            <div className="w-12 h-12 rounded-full border border-indigo-500/20 bg-indigo-950/40 flex items-center justify-center">
              <Disc className="w-6 h-6 text-indigo-400/40 animate-spin" />
            </div>
          </div>
        )}

        {/* Orbiting Planets elements overlay */}
        <AnimatePresence>
          {!isWarping &&
            PLANETS.map(p => {
              const pos = positions[p.id];
              if (!pos) return null;

              const isAvailable = p.status === "Available";

              return (
                <div
                  key={p.id}
                  style={{
                    left: `${pos.x}px`,
                    top: `${pos.y}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                  className="absolute z-10 cursor-pointer group"
                  onMouseEnter={() => {
                    setHoveredPlanet(p);
                    audio.playHoverChime();
                  }}
                  onMouseLeave={() => setHoveredPlanet(null)}
                  onClick={() => handlePlanetClick(p)}
                >
                  {/* Planet Sphere Ring Border */}
                  <div className="relative flex items-center justify-center">
                    
                    {/* Glowing orbit halo */}
                    <div
                      className={`absolute rounded-full transition-all duration-300 ${
                        hoveredPlanet?.id === p.id 
                          ? "w-16 h-16 scale-110 opacity-70"
                          : "w-10 h-10 opacity-30"
                      } bg-gradient-to-r ${p.color} blur-md`}
                    />

                    {/* Actual Planet Sphere */}
                    <div
                      style={{ width: `${p.size + 8}px`, height: `${p.size + 8}px` }}
                      className={`relative rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center text-white border border-white/20 transition-transform duration-300 group-hover:scale-110 shadow-lg`}
                    >
                      <p.icon className="w-1/2 h-1/2" />
                      
                      {/* Interactive ring for News Planet */}
                      {isAvailable && (
                        <div className="absolute inset-0 rounded-full border border-cyan-300/40 scale-125 animate-ping opacity-60" />
                      )}
                    </div>

                    {/* Miniature Holographic tag */}
                    <div className="absolute top-[120%] text-[10px] font-orbitron font-semibold text-cyan-300 whitespace-nowrap bg-space-black/70 px-2 py-0.5 border border-white/5 rounded backdrop-blur">
                      {p.name.split(" ")[1]}
                    </div>
                  </div>
                </div>
              );
            })}
        </AnimatePresence>

        {/* Warp Drive Speed tunnel visual */}
        {isWarping && (
          <div className="text-center z-10 px-4">
            <h2 className="text-5xl font-extrabold tracking-widest text-glow-cyan font-orbitron animate-pulse text-cyan-300">
              WARPING TO NEWS PLANET
            </h2>
            <p className="text-sm font-mono text-cyan-400 mt-4 tracking-widest animate-pulse duration-75">
              ESTABLISHING SYNERGY INGESTION MATRIX [8 AGENTS CONNECTING]...
            </p>
          </div>
        )}

        {/* Floating Holographic Planet Panel Information */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-80 sm:w-[480px]">
          <AnimatePresence mode="wait">
            {hoveredPlanet ? (
              <motion.div
                key={hoveredPlanet.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="glass-panel border-glow-cyan p-5 rounded-lg flex flex-col gap-3"
              >
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <h3 className="text-lg font-bold font-orbitron text-cyan-300 flex items-center gap-2">
                    <hoveredPlanet.icon className="w-5 h-5" />
                    {hoveredPlanet.name}
                  </h3>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      hoveredPlanet.status === "Available"
                        ? "bg-cyan-950/40 border-cyan-400/40 text-cyan-400"
                        : "bg-purple-950/40 border-purple-400/40 text-purple-400"
                    }`}
                  >
                    {hoveredPlanet.status}
                  </span>
                </div>
                
                <p className="text-xs text-slate-300 leading-relaxed">
                  {hoveredPlanet.description}
                </p>

                {/* Progress bar info */}
                <div className="grid grid-cols-[1fr_80px] items-center gap-3 mt-1">
                  <div className="w-full bg-[#050816] rounded-full h-1.5 overflow-hidden border border-white/5">
                    <div
                      style={{ width: `${hoveredPlanet.progress}%` }}
                      className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full rounded-full"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400/80 text-right">
                    LAUNCH: {hoveredPlanet.progress}%
                  </span>
                </div>
              </motion.div>
            ) : (
              !isWarping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center font-mono text-[11px] text-cyan-400/50"
                >
                  [HOVER OVER A PLANET TO COMPASS DATA // CLICK TO ZOOMS CAMERA]
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>

        {/* Access Denied Warning Toast alert */}
        <AnimatePresence>
          {restrictedAlert && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="absolute top-10 inset-x-0 mx-auto w-max z-50 glass-panel border border-red-500 bg-red-950/30 text-red-300 px-4 py-2 rounded shadow-2xl flex items-center gap-2 font-mono text-xs text-glow-red"
            >
              <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
              RESTRICTED SECTOR ERROR: Access to {restrictedAlert} requires Level-4 Administrator Clearance.
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Footer System Console */}
      <footer className="relative z-10 w-full p-4 flex flex-col sm:flex-row justify-between items-center border-t border-cyan-400/5 bg-[#050816]/80 text-[10px] font-mono text-cyan-400/40">
        <div>ORBITAL ANGLE: RESOLVED (60fps)</div>
        <div className="mt-2 sm:mt-0">[MINDVERSE MVP V1 - DEVELOPED BY DEEPMIND TEAM]</div>
      </footer>

    </div>
  );
}
