"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useRouter } from "next/navigation";

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 25 });

  const router = useRouter();

  const [scrollY, setScrollY] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Handle mouse + scroll + resize properly
  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set(e.clientX - 80);
      mouseY.set(e.clientY - 80);
    };

    const handleScroll = () => setScrollY(window.scrollY);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // initial check

    if (window.innerWidth >= 768) {
      window.addEventListener("mousemove", handleMove);
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [mouseX, mouseY]);

  // ✅ Prevent multiple clicks spam
  const handleStart = () => {
    if (isExiting) return;
    setIsExiting(true);

    setTimeout(() => {
      router.push("/builder");
    }, 1000);
  };

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* 🌌 3D */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <Scene isExiting={isExiting} />
      </div>

      {/* ✨ Cursor Glow */}
      {!isMobile && (
        <motion.div
          className="fixed pointer-events-none w-40 h-40 rounded-full blur-3xl opacity-20 bg-cyan-400 z-50"
          style={{ x: springX, y: springY, mixBlendMode: "screen" }}
        />
      )}

      {/* ⚪ Exit Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isExiting ? 1 : 0 }}
        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed inset-0 bg-gray-950 z-[60] ${
          isExiting ? "pointer-events-auto" : "pointer-events-none"
        }`}
      />

      <motion.div
        animate={{
          opacity: isExiting ? 0 : 1,
          scale: isExiting ? 1.05 : 1,
          filter: isExiting ? "blur(8px)" : "blur(0px)",
        }}
        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 will-change-transform"
      >
        {/* 🟢 SECTION 1 */}
        <section className="h-screen flex flex-col items-center justify-center text-center relative z-10 px-6">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl font-black leading-tight tracking-tighter drop-shadow-2xl"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Build. Impress.
            </span>
            <br />
            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Get Hired.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-lg text-gray-400 max-w-xl leading-relaxed"
            style={{ textShadow: "0 0 30px rgba(0,255,255,0.2)" }}
          >
            Create stunning resumes & cover letters in a next-gen 3D experience.
          </motion.p>

          <p className="mt-2 text-sm text-gray-500">
            Designed for developers, designers & dreamers.
          </p>

          <motion.button
            onClick={handleStart}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.98 }}
            className="mt-10 px-10 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] transition-shadow"
          >
            START CREATING
          </motion.button>
        </section>

        {/* 🟣 SECTION 2 */}
        <section className="h-screen flex items-center justify-end relative z-10 px-10">
          <motion.div
            initial={{ opacity: 0, x: 150 }}
            whileInView={{ opacity: 1, x: 0 }}
            animate={{ y: [0, -20, 0] }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              duration: 0.9,
            }}
            viewport={{ amount: 0.5 }}
            className="max-w-md text-right"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] tracking-[0.2em] text-purple-400 mb-6 uppercase font-bold">
              Smart System
            </div>

            <h2 className="text-5xl font-black mb-6 leading-tight tracking-tight text-white">
              AI Powered <br />
              <span className="text-purple-400">Resume Builder</span>
            </h2>

            <p className="text-gray-400 mb-8 leading-relaxed">
              Automatically generate industry-ready resumes with smart
              suggestions, optimized keywords, and real-time formatting.
            </p>

            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center justify-end gap-2">
                <span>Real-time preview</span>
                <span className="text-purple-400 font-bold">✔</span>
              </li>
              <li className="flex items-center justify-end gap-2">
                <span>ATS optimized structure</span>
                <span className="text-purple-400 font-bold">✔</span>
              </li>
              <li className="flex items-center justify-end gap-2">
                <span>Clean templates</span>
                <span className="text-purple-400 font-bold">✔</span>
              </li>
            </ul>

            <div className="mt-8 h-[2px] w-full bg-gradient-to-l from-purple-500 to-transparent opacity-50" />
          </motion.div>
        </section>

        {/* 🔵 SECTION 3 */}
        <section className="h-screen flex items-center justify-start relative z-10 px-10">
          <motion.div
            initial={{ opacity: 0, x: -150 }}
            whileInView={{ opacity: 1, x: 0 }}
            animate={{ y: [0, 20, 0] }}
            transition={{
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              duration: 0.9,
            }}
            viewport={{ amount: 0.5 }}
            className="max-w-md text-left"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] tracking-[0.2em] text-cyan-400 mb-6 uppercase font-bold">
              Final Step
            </div>

            <h2 className="text-5xl font-black mb-6 leading-tight tracking-tight text-white">
              Export. Apply. <br />
              <span className="text-cyan-400">Stand Out 🚀</span>
            </h2>

            <p className="text-gray-400 mb-8 leading-relaxed">
              Download high-quality PDFs instantly and apply with confidence.
            </p>

            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center justify-start gap-2">
                <span className="text-cyan-400 font-bold">✔</span>
                <span>One-click export</span>
              </li>
              <li className="flex items-center justify-start gap-2">
                <span className="text-cyan-400 font-bold">✔</span>
                <span>Beautiful layouts</span>
              </li>
              <li className="flex items-center justify-start gap-2">
                <span className="text-cyan-400 font-bold">✔</span>
                <span>Lightning fast</span>
              </li>
            </ul>

            <div className="mt-8 h-[2px] w-full bg-gradient-to-r from-cyan-500 to-transparent opacity-50" />
          </motion.div>
        </section>
      </motion.div>

      {/* 🔽 Scroll Hint */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{
          opacity: scrollY > 50 ? 0 : 1,
          y: [0, 10, 0],
        }}
        transition={{
          y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-cyan-400 font-bold">
          Scroll
        </span>

        <div className="mt-2 w-[2px] h-7 bg-gradient-to-b from-cyan-400 via-cyan-400/60 to-transparent opacity-70" />

        <span className="text-cyan-400 text-xs -mt-3 font-bold">V</span>
      </motion.div>
    </div>
  );
}