<div align="center">

<!-- ═══════════════════ HERO BANNER ═══════════════════ -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f0f0f,50:00ffe0,100:7b2fff&height=220&section=header&text=ResumeVerse%203D&fontSize=62&fontColor=ffffff&fontAlignY=38&desc=Build%20·%20Impress%20·%20Get%20Hired&descAlignY=58&descSize=18&animation=fadeIn&fontFamily=Raleway" width="100%"/>

<br/>

<!-- ANIMATED TAGLINE -->
<p>
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=18&pause=1000&color=00FFE0&center=true&vCenter=true&width=600&lines=A+cinematic+3D+resume+builder;Real-time+ATS+scoring+%E2%9C%A6;One-click+PDF+export;Built+with+React+%2B+Three.js+%2B+Framer+Motion" alt="Typing SVG"/>
</p>

<br/>

<!-- TECH BADGES -->
<p>
  <img src="https://img.shields.io/badge/Next.js_16.2-000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/React_19-0d1117?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Three.js_r183-000?style=for-the-badge&logo=threedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Supabase-1C1C1C?style=for-the-badge&logo=supabase&logoColor=3ECF8E"/>
  <img src="https://img.shields.io/badge/Tailwind_v4-0d1117?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8"/>
  <img src="https://img.shields.io/badge/Framer_Motion_v12-0d1117?style=for-the-badge&logo=framer&logoColor=white"/>
</p>

<br/>

<!-- CTA BUTTONS -->
<a href="https://www.resumeverse3d.me">
  <img src="https://img.shields.io/badge/▶%20%20LIVE%20DEMO%20—%20resumeverse3d.me-00FFE0?style=for-the-badge&logoColor=black" height="36"/>
</a>
&nbsp;&nbsp;
<a href="https://github.com/Omm579/resume-studio-3d">
  <img src="https://img.shields.io/badge/★%20%20Star%20on%20GitHub-7b2fff?style=for-the-badge&logo=github&logoColor=white" height="36"/>
</a>

<br/><br/>

</div>

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=0:00ffe0,100:7b2fff&height=2" width="100%"/>

<br/>

## 〈 What Is This? 〉

> **ResumeVerse 3D** is a full-stack resume & cover letter builder wrapped in a cinematic WebGL experience — built for developers, designers, and early-career professionals who want their tools to match the quality of their work.

```
  ┌──────────┐    ┌──────┐    ┌─────────────────┐    ┌──────────────┐    ┌────────────┐
  │3D Landing│ →  │ Auth │ →  │Builder Workspace│ →  │Live Preview  │ →  │ PDF Export │
  └──────────┘    └──────┘    └─────────────────┘    └──────────────┘    └────────────┘
```

<br/>

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=0:00ffe0,100:7b2fff&height=2" width="100%"/>

<br/>

## ✦ Features at a Glance

<div align="center">

| &nbsp; | Feature | Detail |
|:---:|:---|:---|
| 🌌 | **Immersive 3D Scene** | Scroll-reactive torus knot · bloom glow · 800-particle warp · cursor trail |
| 🎬 | **Cinematic Transitions** | Camera fly-through · overlay blur · spring-card scatter on exit |
| 🔐 | **Auth via Supabase** | Email sign-up · confirmation flow · protected builder route |
| 🏗️ | **Split-Pane Builder** | Drag-to-resize · `localStorage` auto-save · Supabase cloud sync |
| 📊 | **ATS Score Engine** | 100-pt real-time scoring · color-graded bar · 3 actionable tips |
| 🎨 | **4 Resume Templates** | Modern · Classic · Minimal · ATS Pro — live preview with thumbnails |
| ✉️ | **Cover Letter Gen** | 7 templates · auto-injects name, role, company & project data |
| 📥 | **PDF Export** | `window.print()` · A4-optimized · `print-color-adjust: exact` |
| 🤖 | **Local AI — Ollama** | Streaming `llama3` proxy · NDJSON chunk parsing · Node.js runtime |

</div>

<br/>

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=0:00ffe0,100:7b2fff&height=2" width="100%"/>

<br/>

## 🛠 Tech Stack

<div align="center">

| Layer | Tools |
|:---|:---|
| **Frontend** | Next.js 16.2 · React 19 · TypeScript · Tailwind CSS v4 |
| **3D & Graphics** | Three.js r183 · @react-three/fiber · drei · postprocessing |
| **Animation** | Framer Motion v12 |
| **Auth & Database** | Supabase Auth · `users` table · `resumes` table |
| **AI / Backend** | Ollama (llama3) · OpenAI SDK · @google/genai · OpenRouter |
| **Icons & UI** | lucide-react · react-icons |
| **Export** | html2pdf.js (installed) · `window.print()` (active) |

</div>

<br/>

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=0:00ffe0,100:7b2fff&height=2" width="100%"/>

<br/>

## 🗂 Project Structure

```
📦 resume-studio-3d/
│
├── 📁 app/
│   ├── 🏠 page.jsx                  ← Landing page + 3D scene
│   ├── 🔐 login/page.jsx            ← Auth with parallax 3D background
│   ├── 🏗️  builder/page.jsx          ← Main workspace (form, preview, ATS)
│   └── 🤖 api/generate/route.js     ← Ollama streaming proxy
│
├── 📁 components/
│   ├── 🌌 Scene.jsx                 ← WebGL canvas — particles, bloom, camera
│   ├── 📝 ResumeForm.jsx            ← Full data-entry form (9 sections)
│   ├── 👁️  Preview.jsx               ← Template router + data normalizer
│   ├── ✉️  CoverLetter.jsx           ← Cover letter editor + display
│   └── 📁 templates/                ← Modern · Classic · Minimal · ATSPro
│
└── 📁 lib/
    └── supabase.js · auth.js · utils.js
```

<br/>

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=0:00ffe0,100:7b2fff&height=2" width="100%"/>

<br/>

## 🚀 Quick Start

**Prerequisites:** `Node ≥ 18` &nbsp;·&nbsp; Supabase project &nbsp;·&nbsp; *(optional)* Ollama

```bash
# ① Clone & install
git clone https://github.com/Omm579/resume-studio-3d.git
cd resume-studio-3d && npm install

# ② Configure environment
cp .env.example .env.local

# ③ Fire it up
npm run dev   #  → http://localhost:3000
```

**`.env.local`**
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Optional — Local AI
OLLAMA_HOST=http://localhost:11434
```

<details>
<summary><b>🗄️ &nbsp; Supabase Schema</b></summary>
<br/>

```sql
create table users (
  id uuid primary key references auth.users(id),
  email text,
  name  text
);

create table resumes (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) unique,
  content    jsonb,
  updated_at timestamp default now()
);

alter table users   enable row level security;
alter table resumes enable row level security;

create policy "own data"    on users   for all using (auth.uid() = id);
create policy "own resumes" on resumes for all using (auth.uid() = user_id);
```

</details>

<details>
<summary><b>🤖 &nbsp; Optional — Local AI (Ollama)</b></summary>
<br/>

```bash
# Install from https://ollama.com, then:
ollama pull llama3
ollama serve
```

</details>

<br/>

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=0:00ffe0,100:7b2fff&height=2" width="100%"/>

<br/>

## 📈 Roadmap

```
 ○  AI bullet-point gen from job descriptions  (OpenAI / Gemini)
 ○  LinkedIn PDF auto-import & form fill
 ○  Multiple saved resume versions
 ○  ATS keyword gap analysis vs job description
 ○  Real-time collaboration via shared URL
 ○  Dark / light toggle for the preview pane
```

<br/>

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=0:00ffe0,100:7b2fff&height=2" width="100%"/>

<br/>

## 👤 Author

<div align="center">

   <img src="https://avatars.githubusercontent.com/Omm579"
       width="110"
       style="
       border-radius:50%;
       padding:4px;
       background: linear-gradient(135deg, #00ffe0, #7b2fff);
       box-shadow: 0 6px 18px rgba(0,0,0,0.4);
       " />
   
<br/>

**Om Debasish**

[![GitHub](https://img.shields.io/badge/@Omm579-0d1117?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Omm579)

*B.Tech CSE (Data Science) · Gandhi Engineering College, Bhubaneswar*

</div>

<br/>

<!-- ═══════════════════ FOOTER WAVE ═══════════════════ -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:7b2fff,50:00ffe0,100:0f0f0f&height=130&section=footer&text=Built%20with%20%E2%9C%A6%20useFrame%20magic&fontSize=18&fontColor=ffffff&fontAlignY=65&animation=fadeIn" width="100%"/>

<div align="center">

*© 2026 ResumeVerse 3D · All rights reserved*

</div>