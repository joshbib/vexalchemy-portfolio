"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const vertexShader = `
  uniform vec2 uCursor;
  uniform float uCursorRadius;
  uniform float uTime;
  uniform float uScrollFactor;
  
  attribute vec3 originalPosition;
  
  varying float vAlpha;

  void main() {
    vec3 pos = originalPosition;
    
    // Imperceptible idle drift
    pos.x += sin(originalPosition.x * 0.2 + uTime * 0.08) * 0.02;
    pos.y += cos(originalPosition.y * 0.2 + uTime * 0.06) * 0.02;
    
    // Cursor repulsion (local only)
    vec2 toPoint = pos.xy - uCursor;
    float dist = length(toPoint);
    float influence = smoothstep(uCursorRadius, uCursorRadius * 0.4, dist);
    
    if (influence > 0.0 && dist > 0.01) {
      pos.xy += normalize(toPoint) * influence * 0.2;
    }
    
    // Scroll: subtle opacity modulation only
    float scrollOpacity = 1.0 - abs(sin(uScrollFactor * 1.57)) * 0.15;
    
    // Base alpha - very low
    vAlpha = 0.22 * scrollOpacity;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 2.8;
  }
`;

const fragmentShader = `
  varying float vAlpha;
  uniform vec3 uColor;

  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    if (dist > 0.5) discard;
    
    float alpha = smoothstep(0.5, 0.25, dist) * vAlpha;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

// Device-specific configurations
const DEVICE_CONFIG = {
  mobile: {
    particleCount: 5000, // Higher density for mobile as requested
    pointSize: 2.5,
    spreadMultiplier: 1.3, // Extra coverage for mobile
    cursorRadius: 4.0,
    opacity: 0.24, // Slightly higher for better visibility
  },
  desktop: {
    particleCount: 8000,
    pointSize: 2.8,
    spreadMultiplier: 1.2,
    cursorRadius: 5.0,
    opacity: 0.22,
  },
};

function BackgroundParticles({ isMobile }: { isMobile: boolean }) {
  const { camera, size } = useThree();
  
  const cursorPos = useRef(new THREE.Vector2(0, 0));
  const targetCursor = useRef(new THREE.Vector2(0, 0));
  const scrollFactor = useRef(0);

  // Select config based on device
  const config = isMobile ? DEVICE_CONFIG.mobile : DEVICE_CONFIG.desktop;

  // Calculate responsive spread - STABLE (only recalculates on device type change)
  const { spreadX, spreadY } = useMemo(() => {
    const aspect = size.width / size.height;
    const fov = 50;
    const distance = 30;
    
    const vFOV = (fov * Math.PI) / 180;
    const visibleHeight = 2 * Math.tan(vFOV / 2) * distance;
    const visibleWidth = visibleHeight * aspect;
    
    // Use device-specific multiplier
    const spreadX = visibleWidth * config.spreadMultiplier;
    const spreadY = visibleHeight * config.spreadMultiplier;
    
    return { spreadX, spreadY };
  }, [isMobile, config.spreadMultiplier]); // Only depend on device type, not size

  // Stable geometry - only regenerates on device type change
  const geometry = useMemo(() => {
    const count = config.particleCount;
    
    const positions = new Float32Array(count * 3);
    const originals = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * spreadX;
      const y = (Math.random() - 0.5) * spreadY;
      const z = (Math.random() - 0.5) * 2;
      
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      
      originals[i3] = x;
      originals[i3 + 1] = y;
      originals[i3 + 2] = z;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("originalPosition", new THREE.BufferAttribute(originals, 3));
    return geom;
  }, [isMobile, config.particleCount, spreadX, spreadY]); // Stable dependencies

  const material = useMemo(() => {
    const vertShader = vertexShader.replace("gl_PointSize = 2.8;", `gl_PointSize = ${config.pointSize};`);
    const fragShader = fragmentShader.replace("vAlpha = 0.22", `vAlpha = ${config.opacity}`);
    
    return new THREE.ShaderMaterial({
      uniforms: {
        uCursor: { value: new THREE.Vector2(0, 0) },
        uCursorRadius: { value: config.cursorRadius },
        uTime: { value: 0 },
        uScrollFactor: { value: 0 },
        uColor: { value: new THREE.Color(0.14, 0.14, 0.14) },
      },
      vertexShader: vertShader,
      fragmentShader: fragShader,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
  }, [isMobile, config]);

  useEffect(() => {
    const vector = new THREE.Vector3();

    const updateCursor = (clientX: number, clientY: number) => {
      const x = (clientX / size.width) * 2 - 1;
      const y = -(clientY / size.height) * 2 + 1;

      vector.set(x, y, 0.5).unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      targetCursor.current.set(pos.x, pos.y);
    };

    const onPointerMove = (e: PointerEvent) => updateCursor(e.clientX, e.clientY);
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches[0]) updateCursor(e.touches[0].clientX, e.touches[0].clientY);
    };

    const onScroll = () => {
      const progress = window.scrollY / Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      scrollFactor.current = progress;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("scroll", onScroll);
    };
  }, [camera, size]);

  useFrame(({ clock }) => {
    cursorPos.current.lerp(targetCursor.current, 0.06);
    
    material.uniforms.uCursor.value.copy(cursorPos.current);
    material.uniforms.uTime.value = clock.getElapsedTime();
    material.uniforms.uScrollFactor.value = scrollFactor.current;
  });

  return <points geometry={geometry} material={material} />;
}

type SphericalDotGridProps = {
  className?: string;
};

export default function SphericalDotGrid({ className }: SphericalDotGridProps) {
  // Detect device type on mount - stable across resize
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Detect mobile once on mount
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || 
                    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    
    checkMobile();
    
    // Only re-check on orientation change (not on every resize)
    const handleOrientationChange = () => {
      checkMobile();
    };
    
    window.addEventListener('orientationchange', handleOrientationChange);
    
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  // Prevent hydration mismatch
  if (!isClient) {
    return <div className={className} />;
  }

  return (
    <Canvas
      className={className}
      gl={{ 
        antialias: false,
        alpha: true,
        powerPreference: isMobile ? "low-power" : "default",
      }}
      dpr={1}
      camera={{ position: [0, 0, 30], fov: 50 }}
      frameloop="always"
    >
      <BackgroundParticles isMobile={isMobile} />
    </Canvas>
  );
}