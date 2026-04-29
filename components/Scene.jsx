"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Stars,
  Float,
  MeshDistortMaterial,
  Icosahedron,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef, useEffect, useState, useMemo } from "react";

// 💡 CLEAN LIGHTING
function Lights() {
  return (
    <>
      <ambientLight intensity={0.05} />
      <directionalLight position={[3, 3, 3]} intensity={2} color="#00ffff" />
      <directionalLight position={[-3, -3, -3]} intensity={1} color="#aa00ff" />
    </>
  );
}

// 🔵 CORE SHAPE
function CoreShape({ scrollY }) {
  const ref = useRef();
  const prevScrollY = useRef(0);
  const scrollVelocity = useRef(0);
  const materials = useRef([]); // 👈 yaha

  useEffect(() => {
    if (ref.current) {
      materials.current = ref.current.children
        .map((c) => c.material)
        .filter(Boolean);
    }
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const t = clock.elapsedTime;
    const currentScrollY =
      typeof scrollY.get === "function" ? scrollY.get() : scrollY;
    const scrollProgress =
      typeof window !== "undefined" ? currentScrollY / window.innerHeight : 0; // 0 to 3+

    // 🎯 smooth position shift (Interpolated)
    // Moves from 0 to -2 between section 0 and 1, then to +2 towards section 2
    let targetX = 0;
    if (scrollProgress <= 1) targetX = -2 * scrollProgress;
    else targetX = -2 + 4 * (scrollProgress - 1);

    ref.current.position.x += (targetX - ref.current.position.x) * 0.05;

    // 🎯 depth
    ref.current.position.z = currentScrollY * 0.001;

    // 🎯 dynamic rotation (scroll-speed dependent)
    // Calculate how much the user scrolled since the last frame
    const scrollDelta = Math.abs(currentScrollY - prevScrollY.current);
    // Smoothly interpolate the velocity to avoid jitter and create momentum
    scrollVelocity.current += (scrollDelta - scrollVelocity.current) * 0.1;
    prevScrollY.current = currentScrollY;

    ref.current.rotation.y += 0.002 + scrollVelocity.current * 0.0005;

    // 🎯 floating
    ref.current.position.y = Math.sin(t * 0.6) * 0.2;

    // 🎯 breathing scale
    const scale = 1 + Math.sin(t) * 0.03;
    ref.current.scale.set(scale, scale, scale);

    // 🎨 SMOOTH COLOR LERP
    const colorFactor = Math.min(scrollProgress / 2, 1);
    const color = `hsl(${180 + colorFactor * 100}, 100%, 60%)`;

    // 👉 apply to all meshes inside group
    materials.current.forEach((mat) => {
      mat.color?.set?.(color);
      mat.emissive?.set?.(color);

      const pulse = 0.5 + Math.sin(t) * 0.2;
      if (mat.emissiveIntensity !== undefined) {
        mat.emissiveIntensity = pulse;
      }
    });
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={ref}>
        {/* 🔥 Liquid Core */}
        <mesh>
          <torusKnotGeometry args={[1, 0.28, 150, 32]} />
          <MeshDistortMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.5}
            metalness={1}
            roughness={0.2}
            distort={0.4}
            speed={2}
          />
        </mesh>

        {/* 🕸️ Wireframe */}
        <mesh scale={1.02}>
          <torusKnotGeometry args={[1, 0.28, 150, 32]} />
          <meshBasicMaterial
            color="#00ffff"
            wireframe
            transparent
            opacity={0.1}
          />
        </mesh>

        {/* 🧠 Inner Core */}
        <mesh>
          <sphereGeometry args={[0.45, 64, 64]} />
          <meshStandardMaterial
            emissive="#aa00ff"
            emissiveIntensity={0.8}
            color="black"
          />
        </mesh>
      </group>
    </Float>
  );
}

function FloatingDebris({ scrollY }) {
  const debris = useMemo(() => {
    return Array.from({ length: 15 }, () => ({
      position: [
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 10 - 5,
      ],
      scale: 0.05 + Math.random() * 0.15,
      speed: 0.5 + Math.random() * 1.5,
    }));
  }, []);

  const scrollFactor =
    typeof window !== "undefined" ? scrollY / (window.innerHeight * 2) : 0;
  const hue = 200 + scrollFactor * 60;
  const color = `hsl(${hue}, 100%, 60%)`;

  return (
    <group>
      {debris.map((item, i) => (
        <Float
          key={i}
          speed={item.speed}
          rotationIntensity={6}
          floatIntensity={2}
        >
          <Icosahedron position={item.position} scale={item.scale}>
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={2}
              wireframe
            />
          </Icosahedron>
        </Float>
      ))}
    </group>
  );
}

// 🌌 SUBTLE PARTICLES
function Particles({ scrollY, isExiting }) {
  const ref = useRef();
  const prevScrollY = useRef(0);
  const scrollVelocity = useRef(0);

  const count =
    typeof window !== "undefined" && window.innerWidth < 768 ? 400 : 800;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, [count]);

  useFrame(() => {
    if (!ref.current) return;

    // 🎯 Calculate scroll velocity with smoothing
    const scrollDelta = Math.abs(scrollY - prevScrollY.current);

    // Cinematic warp spike during exit
    const targetVelocity = isExiting ? 600 : scrollDelta;
    scrollVelocity.current += (targetVelocity - scrollVelocity.current) * 0.1;

    prevScrollY.current = scrollY;

    // 🎯 Warp effect: Boost rotation and stretch the field on the Z axis
    ref.current.rotation.y += 0.0002 + scrollVelocity.current * 0.0002;

    const warpFactor = 1 + scrollVelocity.current * 0.015;
    ref.current.scale.set(1, 1, warpFactor);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.01} color="#88ccff" />
    </points>
  );
}

// 🎥 SUBTLE CAMERA MOTION
function CameraMotion({ isExiting }) {
  const { camera } = useThree();

  useFrame(({ clock }, delta) => {
    if (isExiting) {
      // Fly forward through the scene
      camera.position.z -= delta * 20;
    } else {
      const t = clock.elapsedTime * 0.2;
      camera.position.x = Math.sin(t) * 0.5;
      camera.position.y = Math.sin(t * 0.5) * 0.2;
      camera.position.z += (6 - camera.position.z) * 0.05;
    }
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// 🚀 MAIN SCENE
export default function Scene({ isExiting, mode = "full" }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 1.5]}>
      {/* 🖤 BACKGROUND */}
      <color attach="background" args={["#050505"]} />
      <fogExp2 attach="fog" args={["#050505", 0.06]} />

      {/* ⭐ STARS */}
      <Stars radius={100} depth={50} count={1500} factor={3} fade />

      {/* 🎥 CAMERA + LIGHT */}
      <CameraMotion isExiting={isExiting} />
      <Lights />

      {/* 🔵 OBJECT */}
      <CoreShape scrollY={scrollY} />
      <FloatingDebris scrollY={scrollY} />

      {/* 🌌 EFFECT */}
      <Particles scrollY={scrollY} isExiting={isExiting} />

      {/* ✨ BLOOM */}
      <EffectComposer>
        <Bloom intensity={0.6} luminanceThreshold={0.2} />
      </EffectComposer>
    </Canvas>
  );
}
