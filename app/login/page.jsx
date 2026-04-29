"use client";

import Scene from "@/components/Scene";
import { useState } from "react";
import { signIn, signUp } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleAuth = async () => {
    let res;

    if (!isLogin) {
      if (!name) {
        alert("Enter your name");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match ❌");
        return;
      }
    }

    if (isLogin) {
      res = await signIn(email, password, true);
    } else {
      res = await signUp(email, password, name);
    }

    if (res.error) {
      if (res.error.message.includes("Email not confirmed")) {
        alert("Please verify your email first 📩");
      } else {
        alert(res.error.message);
      }
    } else {
      router.push("/builder");
    }
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-[#050505]">
      {/* 🌌 3D BACKGROUND */}
      <div className="fixed inset-0 z-0 opacity-40 grayscale-[0.5]">
        <Scene />
      </div>

      {/* DARK OVERLAY */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black z-0" />

      {/* CONTENT */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-2xl w-[320px] shadow-2xl">
          <h1 className="text-3xl font-black mb-5 text-center tracking-wider text-white relative">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Resume Studio
            </span>
            <div className="absolute inset-0 blur-xl opacity-30 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
          </h1>

          <h2 className="text-lg mb-4 text-center text-gray-300">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          {!isLogin && (
            <input
              className="w-full mb-3 px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder:text-gray-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            className="w-full mb-3 px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder:text-gray-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative mb-4">
            <input
              className="w-full px-4 py-3 pr-10 bg-black/40 border border-white/10 rounded-xl text-white placeholder:text-gray-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          {!isLogin && (
            <div className="relative mb-4">
              <input
                className="w-full px-4 py-3 pr-10 bg-black/40 border border-white/10 rounded-xl text-white placeholder:text-gray-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          )}

          <button
            onClick={handleAuth}
            className="w-full py-3 rounded-xl font-bold text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 active:scale-95"
          >
            {isLogin ? "🚀 Login" : "✨ Signup"}
          </button>

          <p
            className="text-sm mt-4 text-center text-gray-400 cursor-pointer hover:text-cyan-400 transition"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "New user? Signup" : "Already have account? Login"}
          </p>
        </div>
      </div>
    </div>
  );
}
