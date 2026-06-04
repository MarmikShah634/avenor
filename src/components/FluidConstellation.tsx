import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FluidConstellationProps {
  sharedStateRef: React.MutableRefObject<{
    scrollProgress: number;
    velocity: number;
    targetScroll: number;
  }>;
}

export default function FluidConstellation({ sharedStateRef }: FluidConstellationProps) {
  const starsRef = useRef<THREE.Points>(null);
  const nebulaRef = useRef<THREE.Points>(null);
  const streaksRef = useRef<THREE.Points>(null);
  const streaksGroupRef = useRef<THREE.Group>(null);

  // --- Dynamic High-Fidelity Canvas Textures ---
  
  // 1. Soft Shimmering Star Glow Texture
  const starTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.1, 'rgba(255, 250, 235, 0.95)'); // slightly warm nuclear center
      gradient.addColorStop(0.25, 'rgba(100, 160, 255, 0.5)');  // indigo atmosphere
      gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.15)');   // outer indigo halo
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  // 2. Ultra-Soft Volumetric Nebula Gas Cloud Texture
  const nebulaTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.28)');
      gradient.addColorStop(0.2, 'rgba(139, 92, 246, 0.18)');   // soft violet core
      gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.08)');   // ambient indigo mist
      gradient.addColorStop(0.8, 'rgba(20, 184, 166, 0.02)');   // cosmic teal margins
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  // --- Particle Data Generation ---
  
  // SYSTEM A: Main Spiral Galaxy (8,500 particles)
  const starCount = 8500;
  const [starData] = useState(() => {
    const positions = new Float32Array(starCount * 3);
    const originalPositions = new Float32Array(starCount * 3);
    const randomFactor = new Float32Array(starCount);
    const colors = new Float32Array(starCount * 3);

    const armCount = 2;
    const spiralTension = 2.3;
    const tempColor = new THREE.Color();

    for (let i = 0; i < starCount; i++) {
      // Astrophysics Logarithmic Spiral distribution: r = a * e^(b * theta)
      const distRatio = Math.pow(Math.random(), 1.55); // high density towards core
      const distance = distRatio * 5.2;
      
      const armIndex = i % armCount;
      const angle = distance * spiralTension + (armIndex * Math.PI * 2) / armCount;

      const randomRadiusOffset = (Math.random() - 0.5) * 0.42;
      
      const x = Math.cos(angle) * (distance + randomRadiusOffset);
      const z = Math.sin(angle) * (distance + randomRadiusOffset);
      
      // Vertical core bulge tapering to thin outer disk
      const verticalBound = 0.32 * (5.2 - distance) * Math.pow(Math.random(), 1.1);
      const y = (Math.random() - 0.5) * verticalBound;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      randomFactor[i] = Math.random();

      // Premium Temperature Coloring
      let baseColor;
      if (distance < 0.9) {
        // Core Bulge: High-energy Luxurious Gold
        baseColor = tempColor.set('#e2b853');
      } else if (distance < 2.2) {
        // Inner arms: Warm Coral Sunset Blend
        baseColor = tempColor.set('#f43f5e');
      } else if (distance < 3.8) {
        // Mid Arms: Stellar Deep Indigo
        baseColor = tempColor.set('#6366f1');
      } else {
        // Outer Reaches: Highly excited Electric Teal
        baseColor = tempColor.set('#14b8a6');
      }

      colors[i * 3] = baseColor.r;
      colors[i * 3 + 1] = baseColor.g;
      colors[i * 3 + 2] = baseColor.b;
    }

    return [positions, originalPositions, randomFactor, colors];
  });
  const [starPositions, starOriginalPositions, starRandomFactor, starColors] = starData;

  // SYSTEM B: Volumetric Gas Nebulae Clouds (1,200 large points)
  const nebulaCount = 1200;
  const [nebulaData] = useState(() => {
    const positions = new Float32Array(nebulaCount * 3);
    const originalPositions = new Float32Array(nebulaCount * 3);
    const randomFactor = new Float32Array(nebulaCount);
    const colors = new Float32Array(nebulaCount * 3);

    const armCount = 2;
    const spiralTension = 1.9; // softer, wider spiral sweep
    const tempColor = new THREE.Color();

    for (let i = 0; i < nebulaCount; i++) {
      const distRatio = Math.pow(Math.random(), 1.2);
      const distance = distRatio * 5.6;
      
      const armIndex = i % armCount;
      // Scatter angles wider for gas dispersion
      const angle = distance * spiralTension + (armIndex * Math.PI * 2) / armCount + (Math.random() - 0.5) * 0.45;

      const randomRadiusOffset = (Math.random() - 0.5) * 0.8;
      
      const x = Math.cos(angle) * (distance + randomRadiusOffset);
      const z = Math.sin(angle) * (distance + randomRadiusOffset);
      
      // Much thicker vertical bounds for Volumetric cloud depth
      const verticalBound = 0.85 * (5.6 - distance) * Math.pow(Math.random(), 1.0);
      const y = (Math.random() - 0.5) * verticalBound;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      randomFactor[i] = Math.random();

      // Deep celestial nebula gaseous colors
      let baseColor;
      if (randomFactor[i] < 0.35) {
        baseColor = tempColor.set('#ec4899'); // Neon Pink Gas
      } else if (randomFactor[i] < 0.7) {
        baseColor = tempColor.set('#8b5cf6'); // Violet Cloud
      } else {
        baseColor = tempColor.set('#06b6d4'); // Electric Cyan Mist
      }

      colors[i * 3] = baseColor.r;
      colors[i * 3 + 1] = baseColor.g;
      colors[i * 3 + 2] = baseColor.b;
    }

    return [positions, originalPositions, randomFactor, colors];
  });
  const [nebulaPositions, nebulaOriginalPositions, nebulaRandomFactor, nebulaColors] = nebulaData;

  // SYSTEM C: Hyperdrive Warp Streaks (250 camera-proximal particles)
  const streakCount = 250;
  const [streakData] = useState(() => {
    const positions = new Float32Array(streakCount * 3);
    const speed = new Float32Array(streakCount);

    for (let i = 0; i < streakCount; i++) {
      // Cylinder around camera path (Z-axis span from -12 to +12)
      positions[i * 3] = (Math.random() - 0.5) * 5.0;     // X scatter
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5.0; // Y scatter
      positions[i * 3 + 2] = (Math.random() - 0.5) * 24.0;// Z span
      
      speed[i] = 0.15 + Math.random() * 0.3; // Speed forward
    }

    return [positions, speed];
  });
  const [streakPositions, streakSpeed] = streakData;

  const [streakColors] = useState(() => {
    const colors = new Float32Array(streakCount * 3);
    const tempColor = new THREE.Color();
    for (let i = 0; i < streakCount; i++) {
      // Pure energetic white and celestial blue streaks
      const col = Math.random() > 0.4 ? tempColor.set('#ffffff') : tempColor.set('#93c5fd');
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    return colors;
  });

  // --- Real-time Particle Physics & Animation Loop ---
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { velocity, scrollProgress } = sharedStateRef.current;
    
    // Mouse coordinates mapped to 3D dimensions
    const mouseX = state.pointer.x * 5; 
    const mouseY = state.pointer.y * 5;

    // --- ANIMATING SYSTEM A: Main Stars ---
    if (starsRef.current) {
      const positionsArray = starsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        const x = starOriginalPositions[i3];
        const y = starOriginalPositions[i3 + 1];
        const z = starOriginalPositions[i3 + 2];
        
        // Dynamic solar wind fluctuations + individualized twinkling shimmer
        const shimmer = Math.sin(time * 2.0 + starRandomFactor[i] * 20) * 0.04;
        const waveX = Math.sin(time * 0.3 + y * 0.6 + starRandomFactor[i] * 4) * 0.08 + shimmer;
        const waveZ = Math.cos(time * 0.3 + x * 0.6 + starRandomFactor[i] * 4) * 0.08 + shimmer;

        // Mouse Gravitational Well Ripple
        const dx = x - mouseX;
        const dy = y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let forceX = 0;
        let forceY = 0;
        
        if (dist < 2.0) {
          const strength = (2.0 - dist) * 0.12;
          const direction = starRandomFactor[i] > 0.45 ? 1 : -0.5;
          forceX = (dx / dist) * strength * direction;
          forceY = (dy / dist) * strength * direction;
        }

        positionsArray[i3] = x + waveX + forceX;
        positionsArray[i3 + 1] = y + forceY;
        positionsArray[i3 + 2] = z + waveZ;
      }
      starsRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Galaxy spiral spin - rotation increases slightly with scroll velocity
      starsRef.current.rotation.y = time * 0.02 + scrollProgress * 0.25;
      starsRef.current.rotation.x = Math.sin(time * 0.01) * 0.02;
    }

    // --- ANIMATING SYSTEM B: Nebula Gas Clouds ---
    if (nebulaRef.current) {
      const positionsArray = nebulaRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < nebulaCount; i++) {
        const i3 = i * 3;
        const x = nebulaOriginalPositions[i3];
        const y = nebulaOriginalPositions[i3 + 1];
        const z = nebulaOriginalPositions[i3 + 2];
        
        // Heavy, slow, billowing wind currents for gaseous feel
        const waveX = Math.sin(time * 0.12 + y * 0.2 + nebulaRandomFactor[i] * 5) * 0.22;
        const waveZ = Math.cos(time * 0.12 + x * 0.2 + nebulaRandomFactor[i] * 5) * 0.22;

        // Mouse displacement
        const dx = x - mouseX;
        const dy = y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let forceX = 0;
        let forceY = 0;
        
        if (dist < 3.0) {
          const strength = (3.0 - dist) * 0.22;
          forceX = (dx / dist) * strength * 0.3;
          forceY = (dy / dist) * strength * 0.3;
        }

        positionsArray[i3] = x + waveX + forceX;
        positionsArray[i3 + 1] = y + forceY;
        positionsArray[i3 + 2] = z + waveZ;
      }
      nebulaRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Nebulae orbital lag (moves slightly slower than core stars for parallax depth)
      nebulaRef.current.rotation.y = time * 0.015 + scrollProgress * 0.2;
      nebulaRef.current.rotation.x = Math.cos(time * 0.008) * 0.015;
    }

    // --- ANIMATING SYSTEM C: Hyperdrive Warp Streaks ---
    if (streaksRef.current && streaksGroupRef.current) {
      const positionsArray = streaksRef.current.geometry.attributes.position.array as Float32Array;
      const mat = streaksRef.current.material as THREE.PointsMaterial;

      // Streaks stretch physically along Z-axis proportional to scroll velocity
      // Creates a stunning hyperdrive stretch effect!
      const targetZScale = 1.0 + velocity * 22.0;
      streaksGroupRef.current.scale.z += (targetZScale - streaksGroupRef.current.scale.z) * 0.12;

      // Streaks fade in on high-speed scroll and remain hidden during static browsing
      const targetOpacity = Math.min(0.9, velocity * 8.0);
      mat.opacity += (targetOpacity - mat.opacity) * 0.1;

      for (let i = 0; i < streakCount; i++) {
        const i3 = i * 3;
        
        // Streaks fly forward towards camera. Speed is boosted heavily by scroll velocity!
        const zDelta = streakSpeed[i] * (1.0 + velocity * 35.0);
        positionsArray[i3 + 2] += zDelta;
        
        // Subtle drift in X/Y axes
        positionsArray[i3] += Math.sin(time * 0.5 + i) * 0.002;
        positionsArray[i3 + 1] += Math.cos(time * 0.5 + i) * 0.002;

        // Reset streak to far depth once it flies past camera
        if (positionsArray[i3 + 2] > 12.0) {
          positionsArray[i3] = (Math.random() - 0.5) * 5.0;
          positionsArray[i3 + 1] = (Math.random() - 0.5) * 5.0;
          positionsArray[i3 + 2] = -12.0; // reset far behind
        }
      }
      streaksRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* 1. Main Dense Galactic Star Systems */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[starColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          map={starTexture}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 2. Soft Volumetric Gaseous Nebulae Clouds */}
      <points ref={nebulaRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nebulaPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[nebulaColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.72}
          map={nebulaTexture}
          vertexColors
          transparent
          opacity={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 3. Shooting Hyperdrive Warp Streaks */}
      <group ref={streaksGroupRef}>
        <points ref={streaksRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[streakPositions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[streakColors, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.25}
            map={starTexture}
            vertexColors
            transparent
            opacity={0.0} // starts fully invisible, fades in on fast scroll velocity
            sizeAttenuation={true}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
    </group>
  );
}
