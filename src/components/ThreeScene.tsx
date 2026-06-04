import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import FluidConstellation from './FluidConstellation';

interface SharedState {
  scrollProgress: number;
  velocity: number;
  targetScroll: number;
}

// Spline Keyframe definition for cinematic camera flight path
interface Keyframe {
  p: number;
  pos: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
}

// Panoramic Bezier-Spline parameters through the galaxy
const keyframes: Keyframe[] = [
  { p: 0.0,  pos: [0.0, 1.8, 5.5],    lookAt: [0.0, 0.0, 0.0],  fov: 52 },  // Hero: Majestic spinning moon up close!
  { p: 0.16, pos: [3.8, 1.2, 4.2],    lookAt: [0.0, 0.0, 0.0],  fov: 55 },  // About: Panoramic view of moon shards/asteroids spinning in indigo space!
  { p: 0.32, pos: [5.2, 0.8, -2.2],   lookAt: [0.0, 0.0, 0.0],  fov: 55 },  // Services: Cruising low across outer teal arm
  { p: 0.48, pos: [1.8, -2.5, -5.0],  lookAt: [0.0, 0.0, 0.0],  fov: 56 },  // Process: Looking up through plane from underneath
  { p: 0.65, pos: [-4.2, 2.0, -4.5],  lookAt: [0.0, 0.0, 0.0],  fov: 56 },  // Projects: Wide orbital view from the side
  { p: 0.82, pos: [-5.5, 1.0, 2.5],   lookAt: [0.0, 0.0, 0.0],  fov: 56 },  // Advantage/Tech: Orbit far side, looking at the beautiful dark indigo arm
  { p: 1.0,  pos: [-2.0, 0.5, 5.8],   lookAt: [0.0, 0.0, 0.0],  fov: 54 }   // Contact: Serene profile slow spin
];

// Spline Position Interpolator
function getCameraState(p: number) {
  const progress = Math.max(0, Math.min(1, p));
  
  // Find active keyframe segment
  let i = 0;
  for (; i < keyframes.length - 1; i++) {
    if (progress <= keyframes[i + 1].p) break;
  }
  
  const k1 = keyframes[i];
  const k2 = keyframes[i + 1];
  
  // Calculate relative progress inside segment
  const localP = (progress - k1.p) / (k2.p - k1.p);
  
  // Hermite smoothstep spline interpolation factor (prevents visual jerking)
  const t = localP * localP * (3 - 2 * localP);
  
  // Interpolate 3D coordinates
  const x = k1.pos[0] + (k2.pos[0] - k1.pos[0]) * t;
  const y = k1.pos[1] + (k2.pos[1] - k1.pos[1]) * t;
  const z = k1.pos[2] + (k2.pos[2] - k1.pos[2]) * t;
  
  // Interpolate camera focal points
  const lx = k1.lookAt[0] + (k2.lookAt[0] - k1.lookAt[0]) * t;
  const ly = k1.lookAt[1] + (k2.lookAt[1] - k1.lookAt[1]) * t;
  const lz = k1.lookAt[2] + (k2.lookAt[2] - k1.lookAt[2]) * t;
  
  // Interpolate FOV
  const fov = k1.fov + (k2.fov - k1.fov) * t;
  
  return {
    pos: [x, y, z] as [number, number, number],
    lookAt: [lx, ly, lz] as [number, number, number],
    fov
  };
}

interface CosmicControllerProps {
  sharedStateRef: React.MutableRefObject<SharedState>;
}

function CosmicController({ sharedStateRef }: CosmicControllerProps) {
  const smoothVelocityRef = useRef<number>(0);

  useFrame((state) => {
    // 1. Move scroll progress smoothly towards target
    const currentProgress = sharedStateRef.current.scrollProgress;
    const targetProgress = sharedStateRef.current.targetScroll;
    
    // Luxurious inertial glide
    const newProgress = currentProgress + (targetProgress - currentProgress) * 0.055;
    sharedStateRef.current.scrollProgress = newProgress;

    // 2. Track scroll velocity
    const velocity = Math.abs(targetProgress - newProgress);
    smoothVelocityRef.current += (velocity - smoothVelocityRef.current) * 0.085;
    sharedStateRef.current.velocity = smoothVelocityRef.current;

    // 3. Compute camera coordinates
    const cameraState = getCameraState(newProgress);
    
    // Dynamic Warp FOV Stretch: rapid scrolls compress focal length (radial speed lines effect!)
    const camera = state.camera as THREE.PerspectiveCamera;
    camera.fov = cameraState.fov + smoothVelocityRef.current * 35.0;
    camera.position.set(cameraState.pos[0], cameraState.pos[1], cameraState.pos[2]);
    
    // Set camera lookAt
    camera.lookAt(
      cameraState.lookAt[0],
      cameraState.lookAt[1],
      cameraState.lookAt[2]
    );

    // Apply projection updates
    camera.updateProjectionMatrix();
  });

  return null;
}

export default function ThreeScene() {
  const sharedStateRef = useRef<SharedState>({
    scrollProgress: 0,
    velocity: 0,
    targetScroll: 0
  });

  useEffect(() => {
    const handleScroll = () => {
      // Find scroll progression boundaries
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        sharedStateRef.current.targetScroll = window.scrollY / totalHeight;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Execute immediately to catch baseline scroll coordinates
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-[#060608] pointer-events-none overflow-hidden">
      {/* Rich chromatic backdrop layers aligned with particle colors */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(99,102,241,0.08),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_75%,rgba(226,184,83,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(244,63,94,0.05),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,rgba(20,184,166,0.05),transparent_40%)]" />
      
      {/* High-Fidelity 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0.0, 5.2, 9.2], fov: 60, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.65} />
        
        {/* Persistent Camera Spline Controller */}
        <CosmicController sharedStateRef={sharedStateRef} />
        
        {/* Dynamic Multi-Scale Particle System */}
        <FluidConstellation sharedStateRef={sharedStateRef} />
      </Canvas>
    </div>
  );
}
