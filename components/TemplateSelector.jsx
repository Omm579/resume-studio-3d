"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const templates = [
  {
    id: "modern",
    name: "Modern",
    preview: "/templates/modern.png",
  },
  {
    id: "classic",
    name: "Classic",
    preview: "/templates/classic.png",
  },
  {
    id: "minimal",
    name: "Minimal",
    preview: "/templates/minimal.png",
  },
  {
    id: "atspro",
    name: "ATS Pro",
    preview: "/templates/atspro.png",
  },
];

export default function TemplateSelector({ template, setTemplate }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 px-2">
      {templates.map((t) => (
        <motion.div
          key={t.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTemplate(t.id)}
          className={`min-w-[160px] cursor-pointer rounded-2xl overflow-hidden border transition-all relative ${
            template === t.id
              ? "border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)]"
              : "border-white/10 hover:border-white/30"
          }`}
        >
          {/* Thumbnail */}
          <div className="h-44 bg-white flex items-center justify-center">
            <Image
              src={t.preview}
              alt={t.name}
              width={160}
              height={176}
              className="w-full h-full object-cover"
            />

            {template === t.id && (
              <div className="absolute inset-0 bg-cyan-400/10" />
            )}
          </div>

          {/* Name */}
          <div className="text-center py-2 text-sm bg-black/60 backdrop-blur text-white">
            {t.name}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
