"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const vertexShader = `
  uniform vec2 uCursor;
  uniform vec2 uMouseDelta;
  uniform float uRadius;
  uniform float uFeather;
  uniform float uIntensity;
  uniform float uTime;
  uniform float uIdleAnimation;
  
  varying float vAlpha;
  varying float vInfluence;
  varying vec2 vUv;

  void main() {
    vec3 pos = position;
    vUv = pos.xy;

    vec2 toPoint = pos.xy - uCursor;
    float dist = length(toPoint);

    // Enhanced falloff - creates smoother sphere boundary
    float influence = 1.0 - smoothstep(uRadius - uFeather, uRadius, dist);
    float innerInfluence = smoothstep(0.0, uRadius * 0.3, dist);
    influence *= innerInfluence; // Softer center
    
    vInfluence = influence;

    if (influence > 0.0) {
      // Inverted rotation angles
      float angleX = -uMouseDelta.y * uIntensity * influence;
      float angleY = -uMouseDelta.x * uIntensity * influence;

      mat3 rotX = mat3(
        1.0, 0.0, 0.0,
        0.0, cos(angleX), -sin(angleX),
        0.0, sin(angleX), cos(angleX)
      );

      mat3 rotY = mat3(
        cos(angleY), 0.0, sin(angleY),
        0.0, 1.0, 0.0,
        -sin(angleY), 0.0, cos(angleY)
      );

      vec3 centered = pos - vec3(uCursor, 0.0);
      centered = rotY * rotX * centered;
      pos = centered + vec3(uCursor, 0.0);

      // Enhanced spherical depth
      float depthCurve = influence * influence * (1.0 - influence * 0.3);
      pos.z += depthCurve * uRadius * 0.3;
      
      // Ripple wave on interaction
      float wave = sin(dist * 0.8 - uTime * 3.0) * influence * 0.12;
      pos.z += wave;
    }
    
    // Subtle idle breathing animation
    float idleWave = sin(pos.x * 0.25 + uTime * 0.4) * cos(pos.y * 0.25 - uTime * 0.3);
    pos.z += idleWave * 0.08 * uIdleAnimation;

    // Adaptive alpha for sphere fade
    vAlpha = influence * 0.4 + 0.6;
    
    // Edge glow
    float edgeGlow = smoothstep(uRadius - uFeather * 0.4, uRadius - uFeather, dist);
    vAlpha += edgeGlow * influence * 0.25;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Fixed point size (no scaling animation)
    gl_PointSize = 4.4;
  }
`;

const fragmentShader = `
  varying float vAlpha;
  varying float vInfluence;
  varying vec2 vUv;
  
  uniform vec3 uColorInactive;
  uniform vec3 uColorActive;
  uniform float uTime;

  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);

    if (dist > 0.5) discard;

    // Smoother anti-aliased edges
    float alpha = smoothstep(0.5, 0.2, dist) * vAlpha;
    
    // Color transition on interaction
    vec3 color = mix(uColorInactive, uColorActive, vInfluence * 0.6);
    
    // Subtle shimmer
    float shimmer = sin(vUv.x * 8.0 + uTime * 0.8) * cos(vUv.y * 8.0 - uTime * 0.6);
    color += shimmer * 0.015 * vInfluence;
    
    // Inner glow
    float innerGlow = smoothstep(0.5, 0.0, dist) * 0.2;
    alpha += innerGlow * vInfluence;

    gl_FragColor = vec4(color, alpha);
  }
`;

function DotGridPoints() {
  const { camera, size } = useThree();

  const mouse = useRef(new THREE.Vector2(0, 0));
  const lastMouse = useRef(new THREE.Vector2(0, 0));
  const mouseDelta = useRef(new THREE.Vector2(0, 0));
  const targetDelta = useRef(new THREE.Vector2(0, 0));
  const idleAnimation = useRef(1);
  const targetIdle = useRef(1);
  const interactionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const geometry = useMemo(() => {
    const gridSize = 100; // Dense grid
    const spacing = 0.7;
    const positions = new Float32Array(gridSize * gridSize * 3);
    let index = 0;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        positions[index++] = (i - gridSize / 2) * spacing;
        positions[index++] = (j - gridSize / 2) * spacing;
        positions[index++] = 0;
      }
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geom;
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uCursor: { value: new THREE.Vector2(0, 0) },
          uMouseDelta: { value: new THREE.Vector2(0, 0) },
          uRadius: { value: 5.0 },
          uFeather: { value: 2.8 },
          uIntensity: { value: 0.12 },
          uTime: { value: 0 },
          uIdleAnimation: { value: 1 },
          uColorInactive: { value: new THREE.Color(0.18, 0.17, 0.16) },
          uColorActive: { value: new THREE.Color(0.28, 0.27, 0.25) },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthTest: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      }),
    []
  );

  useEffect(() => {
    const vector = new THREE.Vector3();

    const updateMousePosition = (clientX: number, clientY: number) => {
      const x = (clientX / size.width) * 2 - 1;
      const y = -(clientY / size.height) * 2 + 1;

      targetDelta.current.set(x - lastMouse.current.x, y - lastMouse.current.y);
      lastMouse.current.set(x, y);

      vector.set(x, y, 0.5).unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      mouse.current.set(pos.x, pos.y);
      
      // Pause idle animation during interaction
      targetIdle.current = 0;
      
      if (interactionTimeout.current) {
        clearTimeout(interactionTimeout.current);
      }
      interactionTimeout.current = setTimeout(() => {
        targetIdle.current = 1;
      }, 800);
    };

    const onPointerMove = (event: PointerEvent) => {
      updateMousePosition(event.clientX, event.clientY);
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        updateMousePosition(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
      if (interactionTimeout.current) {
        clearTimeout(interactionTimeout.current);
      }
    };
  }, [camera, size.width, size.height]);

  useFrame(({ clock }) => {
    // Smooth interpolation
    mouseDelta.current.lerp(targetDelta.current, 0.1);
    targetDelta.current.multiplyScalar(0.87);
    
    // Smooth idle transition
    idleAnimation.current += (targetIdle.current - idleAnimation.current) * 0.04;

    material.uniforms.uCursor.value.copy(mouse.current);
    material.uniforms.uMouseDelta.value.copy(mouseDelta.current);
    material.uniforms.uTime.value = clock.getElapsedTime();
    material.uniforms.uIdleAnimation.value = idleAnimation.current;
  });

  return <points geometry={geometry} material={material} frustumCulled={false} />;
}

type SphericalDotGridProps = {
  className?: string;
};

export default function SphericalDotGrid({ className }: SphericalDotGridProps) {
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    const value =
      typeof window === "undefined"
        ? 1
        : Math.min(window.devicePixelRatio || 1, 2);
    setDpr(value);
  }, []);

  return (
    <Canvas
      className={className}
      gl={{ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
      }}
      dpr={dpr}
      camera={{ position: [0, 0, 30], fov: 50 }}
    >
      <DotGridPoints />
    </Canvas>
  );
}
