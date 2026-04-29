"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import Scene from "@/components/Scene";

const cards = [
  {
    title: "Resume",
    id: "resume",
    desc: "Build ATS-friendly resume",
    color: "from-cyan-500/20 to-blue-500/20",
    glow: "hover:shadow-cyan-500/40",
    icon: "📄",
  },
  {
    title: "Cover Letter",
    id: "cover",
    desc: "Write personalized letters",
    color: "from-purple-500/20 to-pink-500/20",
    glow: "hover:shadow-purple-500/40",
    icon: "✉️",
  },
];

export default function FloatingCards({ setSection }) {
  const [isExiting, setIsExiting] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [userName, setUserName] = useState("");

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const getUserName = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log("USER:", user);

      if (!user) return;

      const { data, error } = await supabase
        .from("users")
        .select("name")
        .eq("id", user.id)
        .single();

      console.log("DATA:", data);

      if (data?.name) {
        setUserName(data.name);
      } else {
        setUserName(user.email); // fallback
      }
    };

    getUserName();
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    let frame;

    const move = (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        mouseX.set(x * 40);
        mouseY.set(y * 40);
        frame = null;
      });
    };

    const touchMove = (e) => {
      const touch = e.touches[0];
      const x = touch.clientX / window.innerWidth - 0.5;
      const y = touch.clientY / window.innerHeight - 0.5;
      mouseX.set(x * 40);
      mouseY.set(y * 40);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", touchMove);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", touchMove);
    };
  }, []);

  const handleCardClick = (id) => {
    if (isExiting || selectedId) return;
    setSelectedId(id);
    setIsExiting(true);

    setTimeout(() => {
      setSection(id);
    }, 900);
  };

  const particles = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 6 + 6,
      })),
    [],
  );

  return (
    <div className="h-screen flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 px-4 bg-black text-white relative overflow-hidden">
      {/* 🌌 BACKGROUND */}
      <motion.div
        className="fixed inset-0 z-0"
        animate={{
          scale: isExiting ? 1.1 : 1,
          filter: isExiting ? "blur(20px) brightness(0.5)" : "blur(0px)",
        }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 opacity-40 grayscale-[0.5]">
          <Scene isExiting={isExiting} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black" />
      </motion.div>

      {/* ✨ particles */}
      <div className="absolute inset-0 z-0">
        {mounted &&
          particles.map((p) => (
            <motion.div
              key={p.id}
              animate={{
                opacity: [0.1, 0.5, 0.1],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
              }}
              className="absolute bg-white rounded-full"
              style={{
                top: p.top,
                left: p.left,
                width: p.size,
                height: p.size,
              }}
            />
          ))}
      </div>

      {/* 🌌 glow */}
      <motion.div
        style={{ x: springX, y: springY }}
        animate={{
          opacity: isExiting ? 0 : [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-cyan-500/10 blur-[140px] rounded-full top-[-150px] md:top-[-200px] left-[-100px] md:left-[-150px]"
      />

      {/* 👋 USER GREETING */}
      {userName && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="
      absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-20
      px-4 sm:px-6 py-2
      rounded-full
      bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10
      backdrop-blur-xl border border-white/10
      text-[12px] sm:text-sm
      flex items-center gap-1.5 sm:gap-2
      text-white/80
      shadow-[0_0_25px_rgba(0,255,255,0.2)]
      max-w-[90%] justify-center
    "
        >
          {/* glow */}
          <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl opacity-20" />

          <span className="text-gray-400">Hi,</span>

          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-semibold truncate max-w-[120px] sm:max-w-none">
            {userName}
          </span>

          <span className="inline-block text-lg sm:text-xl scale-110 animate-[wave_2s_infinite] origin-[70%_70%]">
            👋
          </span>
        </motion.div>
      )}

      {/* 🃏 CARDS */}
      {cards.map((card, i) => {
        const isSelected = selectedId === card.id;

        return (
          <motion.div
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleCardClick(card.id)}
            key={card.id}
            initial={{ opacity: 0, y: 80 }}
            animate={
              isExiting
                ? isSelected
                  ? {
                      scale: 3,
                      zIndex: 50,
                      rotateY: 0,
                      x: 0,
                      y: -50,
                    }
                  : {
                      opacity: 0,
                      scale: 0.5,
                      x: i === 0 ? -300 : 300,
                    }
                : { opacity: 1, y: 0 }
            }
            transition={{ duration: 0.8, ease: "easeInOut" }}
            whileHover={{
              scale: 1.08,
              rotateY: i === 0 ? -8 : 8,
              rotateX: 5,
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCardClick(card.id)}
            className={`relative z-10 group w-full max-w-[280px] h-[360px] md:w-72 md:h-96 rounded-3xl cursor-pointer
              flex flex-col items-center justify-center p-6 md:p-8 text-center
              backdrop-blur-2xl bg-white/5 border border-white/10
              shadow-2xl ${card.glow}`}
          >
            {/* gradient */}
            <div
              className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${card.color} opacity-40 group-hover:opacity-100`}
            />

            {/* content */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity }}
              className="relative z-10"
            >
              <div className="text-5xl md:text-6xl mb-4 md:mb-6">
                {card.icon}
              </div>

              <h2 className="text-xl md:text-2xl font-bold mb-2">
                {card.title}
              </h2>

              <p className="text-xs md:text-sm text-gray-400 opacity-0 group-hover:opacity-100">
                {card.desc}
              </p>
            </motion.div>

            {/* shine */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute w-1/2 h-full bg-white/10 blur-xl rotate-12 translate-x-[-150%] group-hover:translate-x-[200%] transition-all duration-1000" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
