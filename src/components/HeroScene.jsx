import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider.jsx";

const palettes = {
  dark: {
    plane: "#22221e",
    edge: "#5c5a4f",
    accent: "#a8a274",
    node: "#f2f0e9",
    light: "#fff4d6",
  },
  light: {
    plane: "#efe7c6",
    edge: "#a89e70",
    accent: "#7a6a34",
    node: "#3a3728",
    light: "#fff6c8",
  },
};

function ringPoints(radius, segments = 96, y = 0) {
  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    pts.push([Math.cos(a) * radius, y, Math.sin(a) * radius]);
  }
  return pts;
}

function Structure({ colors, active, reduced }) {
  const group = useRef();
  const inner = useRef();
  const { viewport } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const p = state.pointer;
    target.current.x = (p.y * viewport.width) / viewport.width / 6;
    target.current.y = p.x / 5;
    if (!group.current) return;
    const g = group.current;
    g.rotation.x += (target.current.x - g.rotation.x) * (1 - Math.exp(-2 * dt));
    g.rotation.y += (target.current.y - g.rotation.y) * (1 - Math.exp(-2 * dt));
    const scale = active ? 1.06 : 1;
    g.scale.x += (scale - g.scale.x) * (1 - Math.exp(-3 * dt));
    g.scale.y = g.scale.z = g.scale.x;
    if (inner.current && !reduced) {
      inner.current.rotation.y += dt * (active ? 0.28 : 0.14);
    }
  });

  const planes = useMemo(
    () => [
      { y: 0.95, s: 1.5, r: 0.5, o: 0.5 },
      { y: 0.1, s: 2.3, r: -0.25, o: 0.75 },
      { y: -0.85, s: 1.85, r: 0.95, o: 0.6 },
    ],
    [],
  );

  return (
    <group ref={group}>
      <group ref={inner}>
        {planes.map((p, i) => (
          <Float
            key={i}
            speed={reduced ? 0 : 0.7}
            rotationIntensity={0.12}
            floatIntensity={reduced ? 0 : 0.25}
          >
            <group position={[0, p.y, 0]} rotation={[-Math.PI / 2, 0, p.r]}>
              <mesh>
                <planeGeometry args={[p.s, p.s]} />
                <meshStandardMaterial
                  color={colors.plane}
                  transparent
                  opacity={p.o}
                  roughness={0.85}
                  metalness={0.05}
                  side={THREE.DoubleSide}
                />
              </mesh>
              <lineSegments>
                <edgesGeometry args={[new THREE.PlaneGeometry(p.s, p.s)]} />
                <lineBasicMaterial color={colors.edge} transparent opacity={0.9} />
              </lineSegments>
            </group>
          </Float>
        ))}

        <Line points={ringPoints(1.9, 96, 0.1)} color={colors.accent} lineWidth={1} transparent opacity={0.8} />
        <Line
          points={ringPoints(2.45, 96, -0.9)}
          color={colors.edge}
          lineWidth={1}
          transparent
          opacity={0.5}
        />

        <mesh position={[0, 0.1, 0]}>
          <icosahedronGeometry args={[0.42, 1]} />
          <meshStandardMaterial
            color={colors.accent}
            roughness={0.35}
            metalness={0.35}
            flatShading
          />
        </mesh>

        {[0, 1, 2, 3].map((i) => {
          const a = (i / 4) * Math.PI * 2 + 0.4;
          return (
            <mesh key={i} position={[Math.cos(a) * 1.9, 0.1, Math.sin(a) * 1.9]}>
              <sphereGeometry args={[0.055, 12, 12]} />
              <meshStandardMaterial color={colors.node} roughness={0.5} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

export function HeroScene({ active = false }) {
  const { theme } = useTheme();
  const colors = palettes[theme] || palettes.dark;
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setMobile(window.innerWidth < 768);
  }, []);

  if (!mounted) return <div className="h-full w-full" aria-hidden />;

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={mobile ? 1 : [1, 1.6]}
      camera={{ position: [0, 1.8, 6.2], fov: 42 }}
      gl={{ antialias: !mobile, alpha: true }}
    >
      <ambientLight intensity={theme === "dark" ? 0.45 : 0.95} />
      <directionalLight position={[3, 6, 4]} intensity={theme === "dark" ? 1.1 : 1.4} color={colors.light} />
      <directionalLight position={[-4, -2, -3]} intensity={0.35} color={colors.accent} />
      <Suspense fallback={null}>
        <Structure colors={colors} active={active} reduced={reduced || mobile} />
      </Suspense>
    </Canvas>
  );
}
