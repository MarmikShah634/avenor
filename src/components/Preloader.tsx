import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const telemetryLogs = [
  "INITIALIZING AVENOR REASONING ARCHITECTURE...",
  "ESTABLISHING SECURE QUANTUM HANDSHAKE...",
  "LOADING SYNTHESIS PIPELINES & GRID CALIBRATORS...",
  "MOUNTING COGNITIVE WORKFLOW ENGINES...",
  "INJECTING HIGH-FIDELITY UX/UI SYNTHESIS MODULES...",
  "GRID SYSTEM OPERATIONAL. DEPTH RESOLUTION STABLE.",
  "ALL SYSTEMS OPERATIONAL. AVENOR IS READY."
];

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Smooth progress counter reaching 100% in 3.2s
    const duration = 3200; 
    const intervalTime = 30;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setShow(false);
            setTimeout(onComplete, 800); // Allow exit transition to complete
          }, 400);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    // Cycle through telemetry logs as progress increases
    const triggerThresholds = [5, 20, 40, 60, 75, 90, 98];
    const checkLog = () => {
      const currentThreshold = triggerThresholds[logIndex];
      if (progress >= currentThreshold && logIndex < telemetryLogs.length - 1) {
        setLogIndex((prev) => prev + 1);
      }
    };
    checkLog();
  }, [progress, logIndex]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -100,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 w-full h-full z-[9999] bg-[#07070a] flex flex-col items-center justify-center font-sans select-none"
        >
          {/* Subtle cybernetic space glow in the background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.06),transparent_60%)] pointer-events-none" />
          
          <div className="z-10 flex flex-col items-center max-w-md w-full px-8 text-center">
            
            {/* Elegant SVG holographic Avenor logo mark */}
            <div className="relative mb-8 flex items-center justify-center">
              {/* Pulsing glow ring around the logo */}
              <motion.div 
                animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-28 h-28 rounded-full bg-[radial-gradient(circle,rgba(226,184,83,0.15)_0%,transparent_70%)]" 
              />
              
              <svg viewBox="0 0 100 100" className="w-20 h-20 relative">
                {/* Outer crystalline facets */}
                <motion.polygon
                  points="50,12 82,78 18,78"
                  fill="none"
                  stroke="rgba(226, 184, 83, 0.15)"
                  strokeWidth="1"
                />
                {/* Inner crystalline "A" shape with gold stroke paths */}
                <motion.path
                  d="M50 15 L80 75 L62 75 L50 48 L38 75 L20 75 Z"
                  fill="none"
                  stroke="#e2b853"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                />
                {/* Cyan energy bridge line */}
                <motion.path
                  d="M32 60 L68 60"
                  fill="none"
                  stroke="#14b8a6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1.4, ease: "easeInOut" }}
                />
                {/* Indigo logic core node */}
                <motion.circle
                  cx="50"
                  cy="48"
                  r="3.5"
                  fill="#6366f1"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.6, type: "spring" }}
                />
              </svg>
            </div>

            {/* Avenor Title wordmark */}
            <motion.h1 
              initial={{ letterSpacing: "0.25em", opacity: 0 }}
              animate={{ letterSpacing: "0.1em", opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="font-display text-2xl font-bold uppercase tracking-[0.15em] text-[#f4f4f5] mb-2"
            >
              Avenor
            </motion.h1>
            
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#e2b853] mb-12 opacity-80">
              AI-Native Synthesizer
            </p>

            {/* Simulated Live System Logs */}
            <div className="w-full h-8 flex items-center justify-center font-mono text-[10px] text-zinc-500 mb-4 overflow-hidden select-none">
              <motion.div
                key={logIndex}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="w-full text-center truncate tracking-wider"
              >
                {telemetryLogs[logIndex]}
              </motion.div>
            </div>

            {/* Luxury sleek progress bar with gold fluid glow */}
            <div className="w-full h-[2px] bg-zinc-900 rounded-full relative overflow-hidden mb-3">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-teal-400 to-[#e2b853] absolute left-0 top-0 shadow-[0_0_10px_#e2b853]"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            {/* Progress percentages metrics */}
            <div className="w-full flex justify-between font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
              <span>SYSTEM BOOT</span>
              <span className="text-[#e2b853] font-bold">{Math.round(progress)}%</span>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
