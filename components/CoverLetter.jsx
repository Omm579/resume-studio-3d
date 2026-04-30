"use client";
import { useEffect, useRef } from "react";

export default function CoverLetter({ data, setData }) {
  const ref = useRef(null);
  const timeoutRef = useRef(null);

  // ✅ Debounced input
  const handleEdit = () => {
    if (!ref.current) return;

    const value = ref.current.innerText;

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setData((prev) => ({
        ...prev,
        coverLetter: value,
      }));
    }, 200);
  };

  // ✅ Sync state -> DOM (safe, no cursor jump)
  useEffect(() => {
    if (!ref.current) return;

    if (document.activeElement !== ref.current) {
      ref.current.innerText = data.coverLetter || "";
    }
  }, [data.coverLetter]);

  return (
    <div className="resume-paper bg-white text-gray-800 max-w-[800px] mx-auto p-5 sm:p-8 md:p-12 leading-relaxed text-[13px] md:text-sm font-sans shadow-sm">
      
      {/* HEADER */}
      <div className="mb-4 md:mb-6 border-b pb-4">
        <h1 className="text-base md:text-lg font-bold uppercase tracking-tight">
          {data.name || "Your Name"}
        </h1>
        <p className="text-xs text-gray-600 mt-1">
          {[data.email, data.phone, data.location].filter(Boolean).join(" | ")}
        </p>
        <p className="text-xs text-gray-500">
          {[data.linkedin, data.github].filter(Boolean).join(" | ")}
        </p>
      </div>

      {/* DATE */}
      <p className="mb-4 text-xs text-gray-500">
        {new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </p>

      {/* ✅ HINT (clean placeholder UX) */}
      {!data.coverLetter && (
        <p className="text-xs text-gray-400 mb-2">
          Your cover letter will appear here. Click “Generate Letter” to get started.
        </p>
      )}

      {/* BODY */}
      <div
        ref={ref}
        className="mt-4 md:mt-6 min-h-[300px] md:min-h-[400px] outline-none focus:bg-cyan-50/30 p-2 md:p-4 border-2 border-transparent focus:border-cyan-200 rounded-xl transition-all cursor-text whitespace-pre-wrap text-gray-700"
        contentEditable
        suppressContentEditableWarning
        onInput={handleEdit}
      />

      {/* SIGNATURE */}
      <div className="mt-6 md:mt-8">
        <p>Regards,</p>
        <p className="font-semibold mt-2">{data.name || "Your Name"}</p>
      </div>
    </div>
  );
}