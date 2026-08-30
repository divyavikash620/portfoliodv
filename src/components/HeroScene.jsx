import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider.jsx";

const palettes = {
  dark: {
    shell: "#e8e5d9",
    shellDeep: "#c9c5b3",
    joint: "#4a483f",
    visor: "#1a1a16",
    eye: "#d6cf8f",
    accent: "#a8a274",
    poster: "#f4f1e4",
    posterInk: "#1c1c17",
    posterAccent: "#8a7f45",
    light: "#fff4d6",
    shadow: "#000000",
  },
  light: {
    shell: "#fffbea",
    shellDeep: "#e6ddb8",
    joint: "#6d6446",
    visor: "#2a271d",
    eye: "#7a6a34",
    accent: "#7a6a34",
    poster: "#fffdf2",
    posterInk: "#24231d",
    posterAccent: "#7a6a34",
    light: "#fff6c8",
    shadow: "#4a4326",
  },
};

function usePosterTexture(colors) {
  return useMemo(() => {
    const w = 1024;
    const h = 640;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = colors.poster;
    ctx.fillRect(0, 0, w, h);

    // subtle paper speckle
    ctx.globalAlpha = 0.05;
    for (let i = 0; i < 2600; i++) {
      ctx.fillStyle = colors.posterInk;
      ctx.fillRect(Math.random() * w, Math.random() * h, 1.6, 1.6);
    }
    ctx.globalAlpha = 1;

    ctx.strokeStyle = colors.posterInk;
    ctx.lineWidth = 6;
    ctx.strokeRect(34, 34, w - 68, h - 68);
    ctx.lineWidth = 2;
    ctx.strokeRect(58, 58, w - 116, h - 116);

    ctx.textAlign = "center";
    ctx.fillStyle = colors.posterAccent;
    ctx.font = "500 34px ui-monospace, monospace";
    ctx.fillText("H E L L O  —  I ' M   D I V Y A ' S   B O T", w / 2, 150);

    ctx.fillStyle = colors.posterInk;
    ctx.font = "300 120px Georgia, serif";
    ctx.fillText("Know about me", w / 2, 300);

    ctx.font = "italic 300 92px Georgia, serif";
    ctx.fillStyle = colors.posterAccent;
    ctx.fillText("by asking questions", w / 2, 410);

    ctx.strokeStyle = colors.posterInk;
    ctx.globalAlpha = 0.25;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(200, 470);
    ctx.lineTo(w - 200, 470);
    ctx.stroke();
    ctx.globalAlpha = 1;

    ctx.fillStyle = colors.posterInk;
    ctx.font = "400 34px ui-monospace, monospace";
    ctx.fillText("projects · education · skills · coding", w / 2, 540);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }, [colors]);
}

function Bot({ colors, active, reduced }) {
  const root = useRef();
  const head = useRef();
  const poster = useRef();
  const leftArm = useRef();
  const rightArm = useRef();
  const eyeL = useRef();
  const eyeR = useRef();
  const antenna = useRef();
  const { viewport } = useThree();
  const posterTex = usePosterTexture(colors);
  const blink = useRef({ next: 2, closing: 0 });

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const p = state.pointer;

    if (root.current) {
      const ty = p.x * 0.45;
      const tx = -p.y * 0.16;
      root.current.rotation.y += (ty - root.current.rotation.y) * (1 - Math.exp(-2.4 * dt));
      root.current.rotation.x += (tx - root.current.rotation.x) * (1 - Math.exp(-2.4 * dt));
      const targetY = (reduced ? 0 : Math.sin(t * 1.1) * 0.07) + (active ? 0.12 : 0);
      root.current.position.y += (targetY - root.current.position.y) * (1 - Math.exp(-3 * dt));
      const s = active ? 1.05 : 1;
      root.current.scale.x += (s - root.current.scale.x) * (1 - Math.exp(-3 * dt));
      root.current.scale.y = root.current.scale.z = root.current.scale.x;
    }

    if (head.current) {
      const tilt = p.x * 0.25;
      head.current.rotation.z += (-tilt * 0.4 - head.current.rotation.z) * (1 - Math.exp(-3 * dt));
      head.current.rotation.y += (tilt - head.current.rotation.y) * (1 - Math.exp(-3 * dt));
      head.current.position.y = 1.16 + (reduced ? 0 : Math.sin(t * 1.4) * 0.015);
    }

    if (poster.current) {
      const lift = active ? 0.08 : 0;
      poster.current.rotation.x = -0.14 + (reduced ? 0 : Math.sin(t * 0.9) * 0.035);
      poster.current.position.y += (0.16 + lift - poster.current.position.y) * (1 - Math.exp(-3 * dt));
    }

    // arm sway / little wave when the panel is open
    if (leftArm.current && rightArm.current) {
      const sway = reduced ? 0 : Math.sin(t * 1.3) * 0.05;
      leftArm.current.rotation.z = -0.95 + sway;
      rightArm.current.rotation.z = 0.95 - sway;
    }

    if (antenna.current) {
      antenna.current.rotation.z = reduced ? 0 : Math.sin(t * 2.2) * 0.12;
    }

    // blinking
    const b = blink.current;
    b.next -= dt;
    if (b.next <= 0) {
      b.closing = 0.16;
      b.next = 2.4 + Math.random() * 3;
    }
    const closed = b.closing > 0;
    if (closed) b.closing -= dt;
    const sy = closed ? 0.12 : 1;
    if (eyeL.current && eyeR.current) {
      eyeL.current.scale.y += (sy - eyeL.current.scale.y) * (1 - Math.exp(-22 * dt));
      eyeR.current.scale.y = eyeL.current.scale.y;
    }
  });

  const shell = (extra = {}) => (
    <meshStandardMaterial color={colors.shell} roughness={0.42} metalness={0.18} {...extra} />
  );

  return (
    <group ref={root} position={[0, -0.25, 0]}>
      {/* poster held up above the head */}
      <group ref={poster} position={[0, 0.16, 0.78]}>
        <mesh position={[0, 2.42, 0]}>
          <planeGeometry args={[2.4, 1.5]} />
          <meshStandardMaterial map={posterTex} roughness={0.85} metalness={0} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 2.42, -0.03]}>
          <boxGeometry args={[2.5, 1.6, 0.05]} />
          <meshStandardMaterial color={colors.joint} roughness={0.6} metalness={0.25} />
        </mesh>
        {/* holding rods */}
        {[-1.0, 1.0].map((x) => (
          <mesh key={x} position={[x, 1.5, -0.02]} rotation={[0, 0, x > 0 ? -0.16 : 0.16]}>
            <cylinderGeometry args={[0.035, 0.035, 1.9, 12]} />
            <meshStandardMaterial color={colors.joint} roughness={0.5} metalness={0.4} />
          </mesh>
        ))}
      </group>

      {/* head */}
      <group ref={head} position={[0, 1.16, 0]}>
        <RoundedBox args={[1.12, 0.9, 0.92]} radius={0.24} smoothness={5} castShadow>
          {shell()}
        </RoundedBox>
        {/* visor */}
        <mesh position={[0, 0.03, 0.47]}>
          <RoundedBox args={[0.82, 0.46, 0.08]} radius={0.14} smoothness={5}>
            <meshStandardMaterial color={colors.visor} roughness={0.16} metalness={0.5} />
          </RoundedBox>
        </mesh>
        {[-0.17, 0.17].map((x, i) => (
          <mesh key={x} ref={i === 0 ? eyeL : eyeR} position={[x, 0.04, 0.53]}>
            <capsuleGeometry args={[0.052, 0.05, 4, 12]} />
            <meshStandardMaterial
              color={colors.eye}
              emissive={colors.eye}
              emissiveIntensity={active ? 2.2 : 1.2}
              roughness={0.3}
            />
          </mesh>
        ))}
        {/* ears */}
        {[-0.62, 0.62].map((x) => (
          <mesh key={x} position={[x, -0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.13, 0.13, 0.1, 20]} />
            <meshStandardMaterial color={colors.joint} roughness={0.45} metalness={0.4} />
          </mesh>
        ))}
        {/* antenna */}
        <group ref={antenna} position={[0, 0.45, 0]}>
          <mesh position={[0, 0.16, 0]}>
            <cylinderGeometry args={[0.022, 0.022, 0.34, 10]} />
            <meshStandardMaterial color={colors.joint} roughness={0.4} metalness={0.5} />
          </mesh>
          <mesh position={[0, 0.38, 0]}>
            <sphereGeometry args={[0.075, 20, 20]} />
            <meshStandardMaterial
              color={colors.accent}
              emissive={colors.accent}
              emissiveIntensity={active ? 1.8 : 0.9}
              roughness={0.3}
            />
          </mesh>
        </group>
      </group>

      {/* neck */}
      <mesh position={[0, 0.66, 0]}>
        <cylinderGeometry args={[0.16, 0.19, 0.2, 20]} />
        <meshStandardMaterial color={colors.joint} roughness={0.5} metalness={0.4} />
      </mesh>

      {/* body */}
      <RoundedBox args={[1.0, 1.05, 0.78]} radius={0.3} smoothness={5} position={[0, 0.12, 0]} castShadow>
        {shell()}
      </RoundedBox>
      <mesh position={[0, 0.2, 0.4]}>
        <RoundedBox args={[0.5, 0.34, 0.06]} radius={0.1} smoothness={4}>
          <meshStandardMaterial color={colors.visor} roughness={0.25} metalness={0.4} />
        </RoundedBox>
      </mesh>
      <mesh position={[0, 0.2, 0.44]}>
        <torusGeometry args={[0.1, 0.012, 10, 32]} />
        <meshStandardMaterial color={colors.accent} emissive={colors.accent} emissiveIntensity={0.8} />
      </mesh>

      {/* arms raised to hold the poster */}
      {[
        { ref: leftArm, x: -0.62 },
        { ref: rightArm, x: 0.62 },
      ].map((a) => (
        <group key={a.x} ref={a.ref} position={[a.x, 0.42, 0.12]}>
          <mesh position={[a.x > 0 ? 0.16 : -0.16, 0.3, 0]}>
            <capsuleGeometry args={[0.085, 0.62, 6, 14]} />
            <meshStandardMaterial color={colors.shellDeep} roughness={0.45} metalness={0.2} />
          </mesh>
          <mesh position={[a.x > 0 ? 0.3 : -0.3, 0.66, 0.06]}>
            <sphereGeometry args={[0.12, 18, 18]} />
            <meshStandardMaterial color={colors.joint} roughness={0.45} metalness={0.4} />
          </mesh>
        </group>
      ))}

      {/* hover base instead of legs */}
      <mesh position={[0, -0.52, 0]}>
        <cylinderGeometry args={[0.42, 0.28, 0.16, 28]} />
        <meshStandardMaterial color={colors.shellDeep} roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[0, -0.66, 0]}>
        <coneGeometry args={[0.3, 0.34, 28, 1, true]} />
        <meshStandardMaterial
          color={colors.accent}
          transparent
          opacity={0.35}
          emissive={colors.accent}
          emissiveIntensity={active ? 1.2 : 0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
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
      camera={{ position: [0, 1.35, 6.6], fov: 42 }}
      gl={{ antialias: !mobile, alpha: true }}
      shadows
    >
      <ambientLight intensity={theme === "dark" ? 0.5 : 1} />
      <directionalLight
        position={[3, 6, 4]}
        intensity={theme === "dark" ? 1.5 : 1.8}
        color={colors.light}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-4, 1, -3]} intensity={0.5} color={colors.accent} />
      <Suspense fallback={null}>
        <Float speed={reduced ? 0 : 1} rotationIntensity={0.08} floatIntensity={reduced ? 0 : 0.25}>
          <group scale={0.86} position={[0, -0.55, 0]}>
            <Bot colors={colors} active={active} reduced={reduced || mobile} />
          </group>
        </Float>
        <ContactShadows
          position={[0, -1.28, 0]}
          opacity={theme === "dark" ? 0.5 : 0.3}
          scale={7}
          blur={2.6}
          far={3}
          color={colors.shadow}
        />
        <Environment>
          <Lightformer intensity={2} position={[0, 5, 2]} scale={[8, 8, 1]} />
          <Lightformer
            intensity={1}
            color={colors.accent}
            position={[-5, 1, -1]}
            rotation-y={Math.PI / 2}
            scale={[16, 2, 1]}
          />
        </Environment>
      </Suspense>
    </Canvas>
  );
}
