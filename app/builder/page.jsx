"use client";

import { useState, useEffect } from "react";
import Scene from "@/components/Scene";
import ResumeForm from "@/components/ResumeForm";
import Preview from "@/components/Preview";
import CoverLetter from "@/components/CoverLetter";
import FloatingCards from "@/components/FloatingCards";
import TemplateSelector from "@/components/TemplateSelector";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Download,
  Eye,
  RotateCcw,
  Undo,
  Sparkles,
  BarChart3,
  Menu,
  Save,
  LogOut,
} from "lucide-react";

const DEFAULT_DATA = {
  name: "",
  role: "",
  email: "",
  phone: "",
  linkedin: "",
  github: "",
  summary: "",

  languages: "",
  frontend: "",
  backend: "",
  database: "",
  tools: "",
  ai: "",
  coreCsfundamentals: "",

  projects: [{ title: "", tech: "", points: [""] }],
  internships: [
    { company: "", role: "", duration: "", location: "", points: [""] },
  ],
  education: [{ degree: "", school: "", year: "", score: "" }],

  achievements: "",
  certifications: "",
  activities: "",

  strengths: "",
  interests: "",
  company: "",
  hiringManager: "",
  coverLetter: "",
};

const coverLetterTemplates = [
  //================================Template-1===================================================
  (data) => `Dear ${data.hiringManager || "Hiring Manager"},

I am writing to express my strong interest in the ${data.role} position at ${data.company}. As a dedicated and detail-oriented individual with a solid foundation in software development and problem-solving, I am eager to contribute to your team and support the development of impactful, scalable solutions.

Throughout my academic journey and hands-on experience, I have developed strong technical skills in ${data.frontend}, ${data.backend}, and ${data.database}. I have worked on projects such as ${data.projects[0]?.title || "full-stack applications"}, where I was responsible for designing user-friendly interfaces, integrating APIs, and optimizing application performance. These experiences have given me a deep understanding of real-world development workflows and best practices.

In addition to my technical expertise, I bring strong communication, adaptability, and a continuous learning mindset. My internship experiences have helped me collaborate effectively within teams, manage deadlines, and deliver high-quality solutions in dynamic environments. I am always eager to learn new technologies and improve my existing skill set.

I am particularly impressed by ${data.company}'s commitment to innovation and excellence. I would welcome the opportunity to contribute my skills and enthusiasm to your organization and be part of a team that is building meaningful technology solutions.

Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to your team.`,

  //================================Template-2===================================================
  (data) => `Dear ${data.hiringManager || "Hiring Manager"},

I am excited to apply for the ${data.role} role at ${data.company}. With a strong passion for building scalable, efficient, and user-centric applications, I am confident in my ability to contribute effectively to your team.

My experience includes working with technologies such as ${data.frontend}, ${data.backend}, and tools like ${data.tools}. I have developed projects including ${data.projects[0]?.title || "modern web applications"}, where I handled end-to-end development, from designing responsive interfaces to implementing backend logic and ensuring performance optimization. These experiences have strengthened my problem-solving abilities and my understanding of full-stack development.

During my internships and project work, I have gained hands-on experience in real-world scenarios, including debugging, deployment, and collaboration within teams. I take pride in writing clean, maintainable code and continuously improving my development practices.

What excites me most about ${data.company} is its focus on innovation and delivering impactful solutions. I am eager to contribute my technical expertise, creativity, and dedication to help drive meaningful results.

Thank you for your time and consideration. I look forward to the opportunity to contribute and grow within your organization.`,

  //================================Template-3===================================================
  (data) => `Dear ${data.hiringManager || "Hiring Manager"},

I am writing to apply for the ${data.role} position at ${data.company}. As an enthusiastic and motivated individual with a strong interest in software development, I am eager to begin my professional journey and contribute to a forward-thinking organization.

I have built a solid foundation in technologies such as ${data.frontend}, ${data.backend}, and ${data.database} through my academic projects and practical experience. I have worked on projects like ${data.projects[0]?.title || "web-based applications"}, where I gained hands-on experience in designing, developing, and testing applications. These projects have helped me strengthen my technical skills and problem-solving abilities.

In addition to technical knowledge, I bring a strong willingness to learn, adapt, and grow in a professional environment. I am highly motivated to improve my skills and stay updated with the latest technologies and industry trends.

I am particularly drawn to ${data.company} because of its reputation for innovation and excellence. I am confident that working in such an environment will allow me to grow while contributing positively to the team.

Thank you for considering my application. I would greatly appreciate the opportunity to discuss how I can contribute to your organization.`,

  //================================Template-4===================================================
  (data) => `Dear ${data.hiringManager || "Hiring Manager"},

I am writing to apply for the ${data.role} position at ${data.company}. With a strong foundation in software development and a focus on delivering measurable results, I am confident in my ability to contribute effectively to your team.

Over time, I have developed hands-on experience working with ${data.frontend}, ${data.backend}, and ${data.database}. Through projects such as ${data.projects[0]?.title || "real-world applications"}, I have built scalable solutions, optimized performance, and ensured clean, maintainable code. These experiences have strengthened my ability to approach problems logically and deliver efficient solutions.

I have also gained practical exposure through internships where I collaborated with teams, worked on deadlines, and contributed to production-level features. My ability to quickly adapt, learn new technologies, and stay consistent under pressure allows me to perform effectively in dynamic environments.

I am particularly drawn to ${data.company} because of its commitment to innovation and high-quality engineering standards. I am eager to contribute my technical skills and problem-solving mindset to help build impactful solutions.

Thank you for your time and consideration. I look forward to the opportunity to discuss how I can contribute to your team.`,

  //================================Template-5===================================================
  (data) => `Dear ${data.hiringManager || "Hiring Manager"},

I am excited to submit my application for the ${data.role} role at ${data.company}. As someone deeply passionate about technology and continuous learning, I am eager to begin and grow my career in a challenging and innovative environment.

I have built a strong technical base in ${data.frontend}, ${data.backend}, and ${data.tools}. My academic and personal projects, including ${data.projects[0]?.title || "web applications"}, have allowed me to work on real-world scenarios involving UI design, backend integration, and performance optimization. These experiences have strengthened both my technical skills and my ability to think critically.

Beyond technical knowledge, I bring a proactive attitude and a willingness to learn quickly. I enjoy solving problems, exploring new tools, and continuously improving my development practices. My internships have further helped me understand team collaboration, communication, and professional workflows.

I am highly impressed by ${data.company}'s vision and the impact it creates through technology. I am confident that this role will allow me to grow while contributing meaningfully to your team.

Thank you for considering my application. I would welcome the opportunity to discuss my profile further.`,

  //================================Template-6===================================================
  (data) => `Dear ${data.hiringManager || "Hiring Manager"},

I am writing to express my interest in the ${data.role} position at ${data.company}. With a strong background in software development and a keen interest in building efficient and scalable applications, I believe I am well-suited for this role.

I have worked extensively with technologies such as ${data.frontend}, ${data.backend}, and ${data.database}. Through projects like ${data.projects[0]?.title || "application development"}, I have gained experience in designing, developing, and optimizing applications. These projects have helped me build a solid understanding of full-stack development and problem-solving.

Additionally, my internship experience has given me exposure to real-world development environments, where I collaborated with teams, handled debugging, and contributed to feature development. I focus on writing clean code and continuously improving my technical skills.

I am excited about the opportunity to work at ${data.company} and contribute to impactful projects. I look forward to discussing how my skills align with your requirements.

Thank you for your time and consideration.`,

  //================================Template-7===================================================
  (data) => `Dear ${data.hiringManager || "Hiring Manager"},

I am applying for the ${data.role} position at ${data.company}, and I am confident that my technical skills and dedication make me a strong candidate for this role.

I have developed hands-on experience with ${data.frontend}, ${data.backend}, and ${data.tools}, and have applied these skills in projects such as ${data.projects[0]?.title || "practical applications"}. These projects involved solving real-world problems, building scalable systems, and optimizing performance, which has strengthened my technical and analytical abilities.

My internship experience has further enhanced my understanding of software development processes, teamwork, and time management. I am comfortable working in fast-paced environments and adapting to new challenges while maintaining quality and consistency.

${data.company}'s focus on innovation and excellence strongly aligns with my career goals. I am eager to contribute my skills, learn from experienced professionals, and grow within your organization.

Thank you for your time and consideration. I look forward to the opportunity to connect and discuss further.`,
];

const calculateATSScore = (data) => {
  let score = 0;
  let feedback = [];

  // ✅ 1. Basic Info (20)
  if (data.name) score += 5;
  else feedback.push("Add your name");

  if (data.role) score += 5;
  else feedback.push("Add target role");

  if (data.email) score += 5;
  else feedback.push("Add email");

  if (data.phone) score += 5;
  else feedback.push("Add phone number");

  // ✅ 2. Skills (15)
  const skills = `${data.frontend} ${data.backend} ${data.database} ${data.tools}`;
  if (skills.length > 30) score += 15;
  else feedback.push("Add more technical skills");

  // ✅ 3. Projects (15)
  if (data.projects[0]?.title) score += 10;
  else feedback.push("Add at least one project");

  if (data.projects[0]?.points?.length >= 2) score += 5;
  else feedback.push("Add more project bullet points");

  // ✅ 4. Experience (10)
  if (data.internships[0]?.company) score += 10;
  else feedback.push("Add internship or experience");

  // ✅ 5. Education (10)
  if (data.education[0]?.degree && data.education[0]?.school) {
    score += 10;
  } else {
    feedback.push("Complete education details");
  }

  // ✅ 6. Summary (10)
  if (data.summary.length > 80) score += 10;
  else feedback.push("Improve summary (min 80 chars)");

  // ✅ 7. Achievements + Certifications (10)
  if (data.achievements?.length > 0) score += 5;
  else feedback.push("Add achievements");

  if (data.certifications?.length > 0) score += 5;
  else feedback.push("Add certifications");

  // ✅ 8. Keyword Matching (10)
  if (data.role) {
    const roleWords = data.role.toLowerCase().split(" ");
    const skillWords = skills.toLowerCase();

    const matchCount = roleWords.filter((word) =>
      skillWords.includes(word),
    ).length;

    if (matchCount > 0) {
      score += Math.min(matchCount * 3, 10);
    } else {
      feedback.push("Add role-related keywords in skills");
    }
  }

  return {
    score: Math.min(score, 100),
    feedback,
  };
};

async function loadUserData(userId) {
  const { data } = await supabase
    .from("resumes")
    .select("content")
    .eq("user_id", userId)
    .single();

  return data?.content || null;
}

async function loadUserProfile(userId) {
  const { data } = await supabase
    .from("users")
    .select("name, email")
    .eq("id", userId)
    .single();

  return data;
}

function initializeData() {
  const savedData =
    typeof window !== "undefined" ? localStorage.getItem("resumeData") : null;

  if (savedData && Object.keys(savedData).length > 0) {
    try {
      const parsedData = JSON.parse(savedData);
      return { ...DEFAULT_DATA, ...parsedData };
    } catch (e) {
      console.error("Failed to parse saved resume data", e);
      localStorage.removeItem("resumeData");
      return DEFAULT_DATA;
    }
  }

  return DEFAULT_DATA;
}

export default function Builder() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [template, setTemplate] = useState("modern");
  const [section, setSection] = useState(null);
  const [activeTab, setActiveTab] = useState("edit"); // 'edit' or 'preview'
  const [isGenerating, setIsGenerating] = useState(false);
  const [undoBuffer, setUndoBuffer] = useState(null);
  const [atsResult, setAtsResult] = useState(null);
  const [showATS, setShowATS] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [height, setHeight] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("panelHeight");
      return saved ? Number(saved) : 140;
    }
    return 140;
  });
  const [isDragging, setIsDragging] = useState(false);
  const getATSLevel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Average";
    return "Poor";
  };

  const [data, setData] = useState(initializeData);

  const handleExport = () => {
    window.print();
  };

  const handleSave = async () => {
    if (!user) {
      alert("User not logged in");
      return;
    }

    const { error } = await supabase.from("resumes").upsert({
      user_id: user.id,
      content: data,
    });

    if (error) {
      console.error(error);
      alert("Save failed ❌");
    } else {
      alert("Saved successfully ✅");
    }
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset? This will clear all entered data.",
      )
    ) {
      setUndoBuffer(data);
      setData(DEFAULT_DATA);
      localStorage.removeItem("resumeData");
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    e.preventDefault(); // 🔥 add this

    setHeight((prev) => {
      const newHeight = prev + e.movementY;
      return Math.max(80, Math.min(300, newHeight));
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const generateCoverLetter = () => {
    if (!data.name || !data.role || !data.company) {
      alert("Fill Name, Role, Company first");
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const randomIndex = Math.floor(
        Math.random() * coverLetterTemplates.length,
      );
      const generated = coverLetterTemplates[randomIndex](data);

      setData((prev) => ({
        ...prev,
        coverLetter: generated,
      }));

      setIsGenerating(false);
    }, 400);
  };

  const handleUndo = () => {
    if (undoBuffer) {
      setData(undoBuffer);
      setUndoBuffer(null);
    }
  };

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("panelHeight", height);
  }, [height]);

  useEffect(() => {
    window.addEventListener("pointermove", handleMouseMove);
    window.addEventListener("pointerup", handleMouseUp);

    return () => {
      window.removeEventListener("pointermove", handleMouseMove);
      window.removeEventListener("pointerup", handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const result = calculateATSScore(data);
      setAtsResult(result);
      setShowATS(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [data]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
      } else {
        const user = data.user;
        setUser(user);

        // 🔥 STEP 1: load resume (if exists)
        const savedData = await loadUserData(user.id);

        // 🔥 STEP 2: load profile (users table)
        const profile = await loadUserProfile(user.id);

        // 🔥 STEP 3: merge data
        if (savedData) {
          setData(savedData);
        } else if (profile) {
          setData((prev) => ({
            ...prev,
            name: profile.name || "",
            email: profile.email || "",
          }));
        }
      }
    };

    checkUser();
  }, []);

  if (!section) return <FloatingCards setSection={setSection} />;

  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-[#050505]">
      {/* 🖨️ PRINT OPTIMIZATION */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 0;
            size: auto;
          }
          header,
          aside,
          .no-print,
          .fixed,
          .bg-gradient-to-b,
          .mobile-tabs {
            display: none !important;
          }
          main {
            display: block !important;
            height: auto !important;
            padding: 0 !important;
            overflow: visible !important;
          }
          section {
            display: block !important;
            background: none !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
          }
          .custom-scrollbar {
            overflow: visible !important;
          }
          .resume-paper {
            box-shadow: none !important;
            border: none !important;
            width: 210mm !important;
            min-height: 297mm !important;
            margin: 0 auto !important;
            border-radius: 0 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          body {
            background: white !important;
            color: black !important;
          }
        }
      `}</style>

      {/* 🌌 3D BACKGROUND */}
      <div className="fixed inset-0 z-0 opacity-40 grayscale-[0.5]">
        <Scene />
      </div>

      <div className="fixed inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black z-0" />

      {/* 🏗️ STUDIO HEADER */}
      <header className="relative z-30 min-h-16 py-2 border-b border-white/10 backdrop-blur-md bg-black/20 flex items-center justify-between px-4 md:px-6">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSection(null)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="h-6 w-[1px] bg-white/10" />

          <h1 className="text-[10px] md:text-[15px] font-bold tracking-widest uppercase text-cyan-400">
            Resume Studio <span className="text-white/20 ml-2">v1.0</span>
          </h1>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">
          {/* DESKTOP BUTTONS */}
          <div className="hidden sm:flex items-center gap-3">
            {section === "cover" && (
              <button
                onClick={generateCoverLetter}
                disabled={isGenerating}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 text-xs font-bold hover:bg-cyan-500/20 transition-all disabled:opacity-50"
              >
                <Sparkles
                  size={14}
                  className={isGenerating ? "animate-pulse" : ""}
                />
                {isGenerating ? "Writing..." : "Generate Letter"}
              </button>
            )}

            {undoBuffer && (
              <button
                onClick={handleUndo}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 text-xs font-bold hover:bg-cyan-500/20 transition-all"
              >
                <Undo size={14} />
                Undo Reset
              </button>
            )}

            <button
              onClick={handleReset}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/50 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-all"
            >
              <RotateCcw size={14} />
              Reset
            </button>

            <button
              onClick={() => {
                const result = calculateATSScore(data);
                setAtsResult(result);
                setShowATS(true);
              }}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/50 text-purple-400 text-xs font-bold hover:bg-purple-500/20 transition-all"
            >
              <BarChart3 size={14} />
              Check ATS
            </button>

            <button
              onClick={async () => {
                await handleSave();
                setMenuOpen(false);
              }}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/50 text-green-400 text-xs font-bold hover:bg-green-500/20 transition-all"
            >
              <Save size={17} /> Save
            </button>

            <button
              onClick={handleExport}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-gray-200 transition-all"
            >
              <Download size={14} />
              Export PDF
            </button>
            <button
              onClick={async () => {
                if (confirm("Are you sure you want to log out?")) {
                  await supabase.auth.signOut();
                  router.push("/login");
                }
              }}
              className="px-4 py-2 rounded-full bg-white/10 text-white text-xs"
            >
              Logout
            </button>
          </div>

          {/* MOBILE QUICK BUTTONS */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => {
                const result = calculateATSScore(data);
                setAtsResult(result);
                setShowATS(true);
              }}
              className="flex items-center justify-center px-3 py-2 rounded-full bg-purple-500/10 border border-purple-500/50 text-purple-400 text-xs font-bold"
            >
              <BarChart3 size={14} />
            </button>

            <button
              onClick={handleExport}
              className="flex items-center justify-center px-3 py-2 rounded-full bg-white text-black text-xs font-bold"
            >
              <Download size={14} />
            </button>

            {/* HAMBURGER */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-full bg-white/10"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute top-full right-2 mt-3 w-64 bg-zinc-900/95 border border-white/10 rounded-2xl p-2 flex flex-col gap-1 z-50 sm:hidden shadow-2xl backdrop-blur-xl"
          >
            {/* HEADER */}
            <div className="px-3 py-2 text-xs text-white/40 uppercase tracking-wider">
              Quick Actions
            </div>

            <button
              onClick={async () => {
                await handleSave();
                setMenuOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/10 text-green-400 text-[15px] font-medium transition"
            >
              <Save size={17} /> Save
            </button>

            {section === "cover" && (
              <button
                onClick={() => {
                  generateCoverLetter();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-cyan-500/10 text-cyan-400 text-[15px] font-medium transition"
              >
                ✨ Generate Letter
              </button>
            )}

            {undoBuffer && (
              <button
                onClick={() => {
                  handleUndo();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/10 text-white text-[15px] font-medium transition"
              >
                <Undo size={14} />
                Undo Reset
              </button>
            )}

            <div className="h-[1px] bg-white/10 my-1" />

            <button
              onClick={() => {
                handleReset();
                setMenuOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-red-500/20 text-red-400 text-[15px] font-medium transition"
            >
              <RotateCcw size={14} />
              Reset Data
            </button>

            <button
              onClick={async () => {
                if (confirm("Are you sure you want to log out?")) {
                  await supabase.auth.signOut();
                  router.push("/login");
                  setMenuOpen(false);
                }
              }}
              className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/10 text-white text-[15px] font-medium transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </header>

      {/* 🎨 MAIN WORKSPACE */}
      <main className="relative z-10 flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
        {/* 🛠️ LEFT SIDEBAR: EDITOR */}
        <aside
          className={`${activeTab === "edit" ? "flex" : "hidden"} lg:flex w-full lg:w-[420px] xl:w-[480px] border-r border-white/10 bg-black/30 backdrop-blur-2xl flex-col h-full overflow-hidden lg:sticky lg:top-16`}
        >
          <div
            style={{ height }}
            className="border-b border-white/5 overflow-hidden"
          >
            <div className="p-4 md:p-6">
              <h2 className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-4  font-semibold">
                Select Style
              </h2>
              <TemplateSelector template={template} setTemplate={setTemplate} />
            </div>
          </div>

          {/* DRAG BAR */}
          <div
            onPointerDown={handleMouseDown}
            onDoubleClick={() => setHeight(140)}
            style={{ touchAction: "none" }}
            className="h-3 cursor-row-resize bg-white/10 hover:bg-cyan-500/40 transition touch-none"
          />

          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar scroll-smooth">
            <ResumeForm data={data} setData={setData} />
          </div>
        </aside>

        {/* 📄 RIGHT CONTENT: LIVE PREVIEW */}
        <section
          className={`${activeTab === "preview" ? "flex" : "hidden"} lg:flex flex-1 bg-zinc-900/50 p-4 md:p-12 overflow-y-auto custom-scrollbar justify-center items-start`}
        >
          {/* ATS SCORE */}
          {atsResult && showATS && (
            <div className="fixed z-50 top-20 right-2 sm:right-6 w-[92%] max-w-xs bg-black/90 border border-purple-500/40 px-4 py-4 rounded-xl text-xs backdrop-blur-md shadow-lg">
              {/* ❌ Close Button */}
              <button
                onClick={() => setShowATS(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-white text-sm"
              >
                ✕
              </button>
              <div className="text-purple-400 font-bold mb-2 text-sm">
                ATS Score: {atsResult.score}/100
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${atsResult.score}%` }}
                  transition={{ duration: 0.8 }}
                  className={`h-full ${
                    atsResult.score >= 85
                      ? "bg-green-400"
                      : atsResult.score >= 65
                        ? "bg-yellow-400"
                        : atsResult.score >= 55
                          ? "bg-orange-400"
                          : "bg-red-400"
                  }`}
                />
              </div>

              {/* Level */}
              <div className="text-xs sm:text-sm font-semibold mb-2 text-white">
                {getATSLevel(atsResult.score)}
              </div>

              {/* Feedback */}
              <ul className="text-gray-400 list-disc ml-4 space-y-1 text-[10px] sm:text-xs">
                {atsResult.feedback.slice(0, 3).map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="resume-paper w-full max-w-[850px] shadow-[0_20px_60px_rgba(0,0,0,0.6)] lg:shadow-[0_40px_100px_rgba(0,0,0,0.8)] rounded-sm overflow-hidden bg-white relative group"
          >
            {/* Preview Badge */}
            <div className="absolute top-4 right-4 bg-black/5 text-[10px] font-bold px-2 py-1 rounded border border-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-black/40 uppercase tracking-tighter">
              <Eye size={12} /> Live Preview
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={section + template}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {section === "resume" ? (
                  <Preview data={data} template={template} />
                ) : (
                  <CoverLetter
                    data={data}
                    template={template}
                    setData={setData}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </section>
      </main>

      {/* 📱 MOBILE NAVIGATION BAR */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full p-1.5 flex gap-1 shadow-2xl mobile-tabs">
        <button
          onClick={() => setActiveTab("edit")}
          className={`px-6 py-2 rounded-full text-[10px] font-bold transition-all uppercase tracking-widest ${activeTab === "edit" ? "bg-cyan-500 text-black" : "text-white/60 hover:text-white"}`}
        >
          Editor
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`px-6 py-2 rounded-full text-[10px] font-bold transition-all uppercase tracking-widest ${activeTab === "preview" ? "bg-cyan-500 text-black" : "text-white/60 hover:text-white"}`}
        >
          Preview
        </button>
      </div>
    </div>
  );
}
