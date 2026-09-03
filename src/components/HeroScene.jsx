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
  const thrusterRing = useRef();
  const projectorBeam = useRef();
  const posterTex = usePosterTexture(colors);

  const blink = useRef({ next: 2, closing: 0 });
  const prevPointer = useRef({ x: 0, y: 0 });
  const recoil = useRef(0);
  const prevActive = useRef(active);

  // Trigger tactile recoil pulse whenever active state toggles
  if (prevActive.current !== active) {
    recoil.current = active ? 0.35 : -0.2;
    prevActive.current = active;
  }

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const p = state.pointer;

    // Decay recoil spring
    recoil.current += (0 - recoil.current) * (1 - Math.exp(-9 * dt));

    // Pointer velocity for banking physics
    const vx = (p.x - prevPointer.current.x) / (dt || 0.016);
    prevPointer.current = { x: p.x, y: p.y };

    if (root.current) {
      // Lateral drift & spring responsiveness
      const tx = p.x * 0.38;
      root.current.position.x += (tx - root.current.position.x) * (1 - Math.exp(-4 * dt));

      // Drone banking roll into the turn
      const targetRoll = reduced ? 0 : -Math.max(-0.25, Math.min(0.25, vx * 0.04));
      root.current.rotation.z += (targetRoll - root.current.rotation.z) * (1 - Math.exp(-6 * dt));

      // Floating altitude + active lift + tactile deployment recoil bounce
      const floatY = reduced ? 0 : Math.sin(t * 1.4) * 0.05 + Math.cos(t * 2.8) * 0.015;
      const targetY = floatY + (active ? 0.22 : 0) + recoil.current;
      root.current.position.y += (targetY - root.current.position.y) * (1 - Math.exp(-5 * dt));

      const s = (active ? 1.05 : 1) + Math.abs(recoil.current) * 0.1;
      root.current.scale.x += (s - root.current.scale.x) * (1 - Math.exp(-5 * dt));
      root.current.scale.y = root.current.scale.z = root.current.scale.x;
    }

    if (head.current) {
      // Organic multi-joint look-at tracking
      head.current.position.y = 1.16 + (reduced ? 0 : Math.sin(t * 1.8) * 0.012);

      // When active, nod down to project the console; otherwise follow pointer with soft damping
      const targetRotX = active ? 0.28 : -p.y * 0.22;
      const targetRotY = p.x * 0.38;
      const targetRotZ = -p.x * 0.08;
      head.current.rotation.x += (targetRotX - head.current.rotation.x) * (1 - Math.exp(-5 * dt));
      head.current.rotation.y += (targetRotY - head.current.rotation.y) * (1 - Math.exp(-5 * dt));
      head.current.rotation.z += (targetRotZ - head.current.rotation.z) * (1 - Math.exp(-5 * dt));
    }

    if (antenna.current) {
      // Flexible antenna spring wobble
      const antWobbleZ = Math.sin(t * 8) * 0.08 + -root.current.rotation.z * 1.5;
      const antWobbleX = Math.cos(t * 7) * 0.06 - (active ? 0.2 : 0);
      antenna.current.rotation.z +=
        (antWobbleZ - antenna.current.rotation.z) * (1 - Math.exp(-8 * dt));
      antenna.current.rotation.x +=
        (antWobbleX - antenna.current.rotation.x) * (1 - Math.exp(-8 * dt));
    }

    if (poster.current) {
      const lift = active ? 0.12 : 0;
      poster.current.position.y +=
        (0.16 + lift - poster.current.position.y) * (1 - Math.exp(-4 * dt));
    }

    if (leftArm.current && rightArm.current) {
      const armWave = active ? Math.sin(t * 4.5) * 0.1 : Math.sin(t * 1.4) * 0.03;
      leftArm.current.rotation.z = -0.95 + armWave;
      rightArm.current.rotation.z = 0.95 - armWave;
    }

    if (thrusterRing.current) {
      const ringScale = (active ? 1.4 : 1) + Math.sin(t * 12) * 0.15;
      thrusterRing.current.scale.x = thrusterRing.current.scale.z = ringScale;
      thrusterRing.current.rotation.y += dt * 3;
    }

    if (projectorBeam.current) {
      const targetOpacity = active ? 0.55 + Math.sin(t * 8) * 0.12 : 0;
      projectorBeam.current.material.opacity +=
        (targetOpacity - projectorBeam.current.material.opacity) * (1 - Math.exp(-7 * dt));
    }

    // Interactive blinking & pupil shifting
    const b = blink.current;
    b.next -= dt;
    if (b.next <= 0) {
      b.closing = 0.14;
      b.next = 1.8 + Math.random() * 3.5;
    }
    const closed = b.closing > 0;
    if (closed) b.closing -= dt;
    const sy = closed ? 0.08 : 1;

    // Pupil look-at offset
    const pupilOffsetX = p.x * 0.03;
    const pupilOffsetY = p.y * 0.02 - (active ? 0.03 : 0);

    if (eyeL.current && eyeR.current) {
      eyeL.current.scale.y += (sy - eyeL.current.scale.y) * (1 - Math.exp(-26 * dt));
      eyeR.current.scale.y = eyeL.current.scale.y;

      eyeL.current.position.x = -0.17 + pupilOffsetX;
      eyeR.current.position.x = 0.17 + pupilOffsetX;
      eyeL.current.position.y = 0.04 + pupilOffsetY;
      eyeR.current.position.y = 0.04 + pupilOffsetY;
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
          <meshStandardMaterial
            map={posterTex}
            roughness={0.85}
            metalness={0}
            side={THREE.DoubleSide}
          />
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
              emissiveIntensity={active ? 3.0 : 1.2}
              roughness={0.2}
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
              emissiveIntensity={active ? 2.5 : 0.9}
              roughness={0.2}
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
      <RoundedBox
        args={[1.0, 1.05, 0.78]}
        radius={0.3}
        smoothness={5}
        position={[0, 0.12, 0]}
        castShadow
      >
        {shell()}
      </RoundedBox>
      <mesh position={[0, 0.2, 0.4]}>
        <RoundedBox args={[0.5, 0.34, 0.06]} radius={0.1} smoothness={4}>
          <meshStandardMaterial color={colors.visor} roughness={0.25} metalness={0.4} />
        </RoundedBox>
      </mesh>
      <mesh position={[0, 0.2, 0.44]}>
        <torusGeometry args={[0.1, 0.012, 10, 32]} />
        <meshStandardMaterial
          color={colors.accent}
          emissive={colors.accent}
          emissiveIntensity={active ? 1.6 : 0.8}
        />
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
          opacity={active ? 0.6 : 0.35}
          emissive={colors.accent}
          emissiveIntensity={active ? 2.0 : 0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Thruster energy ring */}
      <mesh ref={thrusterRing} position={[0, -0.74, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.26, 0.02, 16, 32]} />
        <meshStandardMaterial
          color={colors.accent}
          transparent
          opacity={active ? 0.9 : 0.45}
          emissive={colors.accent}
          emissiveIntensity={active ? 2.4 : 0.8}
        />
      </mesh>

      {/* Holographic Projection Beam (pointing downwards towards the deployed panel) */}
      <mesh ref={projectorBeam} position={[0, -1.2, 0.3]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.1, 1.4, 1.4, 24, 1, true]} />
        <meshStandardMaterial
          color={colors.accent}
          transparent
          opacity={0}
          emissive={colors.accent}
          emissiveIntensity={1.2}
          side={THREE.DoubleSide}
          depthWrite={false}
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
        <Float speed={reduced ? 0 : 0.9} rotationIntensity={0} floatIntensity={reduced ? 0 : 0.22}>
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
