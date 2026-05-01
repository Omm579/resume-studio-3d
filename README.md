<div align="center">

```
██████╗ ███████╗███████╗██╗   ██╗███╗   ███╗███████╗██╗   ██╗███████╗██████╗ ███████╗███████╗    ██████╗ ██████╗
██╔══██╗██╔════╝██╔════╝██║   ██║████╗ ████║██╔════╝██║   ██║██╔════╝██╔══██╗██╔════╝██╔════╝    ╚════██╗██╔══██╗
██████╔╝█████╗  ███████╗██║   ██║██╔████╔██║█████╗  ██║   ██║█████╗  ██████╔╝███████╗█████╗       █████╔╝██║  ██║
██╔══██╗██╔══╝  ╚════██║██║   ██║██║╚██╔╝██║██╔══╝  ╚██╗ ██╔╝██╔══╝  ██╔══██╗╚════██║██╔══╝       ╚═══██╗██║  ██║
██║  ██║███████╗███████║╚██████╔╝██║ ╚═╝ ██║███████╗ ╚████╔╝ ███████╗██║  ██║███████║███████╗    ██████╔╝██████╔╝
╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝    ╚═════╝ ╚═════╝
```

### ✦ &nbsp; Build · Impress · Get Hired &nbsp; ✦

*A cinematic 3D resume builder with real-time ATS scoring, live preview & one-click PDF export.*

<br/>

![Next.js](https://img.shields.io/badge/Next.js_16.2-000000?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Three.js](https://img.shields.io/badge/Three.js_r183-000000?style=for-the-badge&logo=threedotjs)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

[![Live Demo →](https://img.shields.io/badge/▶%20LIVE%20DEMO-resumeverse3d.me-00FFFF?style=for-the-badge)](https://www.resumeverse3d.me)

</div>

---

## ◈ &nbsp; What Is This?

ResumeVerse 3D is a **full-stack resume & cover letter builder** wrapped in an immersive WebGL experience. It's built for developers, designers, and early-career professionals who want their tools to match the quality of their work.

```
3D Landing  →  Auth  →  Builder Workspace  →  Live Preview  →  PDF Export
```

---

## ✦ &nbsp; Features at a Glance

| | Feature | Detail |
|--|---------|--------|
| 🌌 | **Immersive 3D Scene** | Scroll-reactive torus knot, bloom post-processing, 800-particle warp effect, cursor glow |
| 🎬 | **Cinematic Transitions** | Page-exit camera fly-through, overlay blur, spring-animated card scatter |
| 🔐 | **Auth (Supabase)** | Email/password sign-up, email confirmation, protected builder route |
| 🏗️ | **Split-Pane Builder** | Drag-to-resize editor/preview, localStorage auto-persist, cloud save |
| 📊 | **ATS Score Engine** | Real-time 100-pt scoring with color-graded bar and 3 actionable tips |
| 🎨 | **4 Resume Templates** | Modern · Classic · Minimal · ATS Pro — live switchable with thumbnails |
| ✉️ | **Cover Letter Gen** | 7 templates that auto-inject your name, role, company & project data |
| 📥 | **PDF Export** | Native `window.print()` with print-optimized A4 CSS, color-accurate |
| 🤖 | **Local AI (Ollama)** | Streaming `llama3` proxy at `/api/generate` with NDJSON chunk parsing |

---

## 🛠️ &nbsp; Tech Stack

```
Frontend       →  Next.js 16.2 · React 19 · TypeScript · Tailwind v4
3D / Graphics  →  Three.js r183 · @react-three/fiber · drei · postprocessing
Animation      →  Framer Motion v12
Auth & DB      →  Supabase (Auth · users table · resumes table)
AI             →  Ollama (llama3) · OpenAI SDK · @google/genai · OpenRouter
Icons          →  lucide-react · react-icons
```

---

## 🗂️ &nbsp; Project Structure

```
resume-studio-3d/
├── app/
│   ├── page.jsx              ← Landing page + 3D scene
│   ├── login/page.jsx        ← Auth with 3D background
│   ├── builder/page.jsx      ← Main workspace
│   └── api/generate/         ← Ollama streaming proxy
│
├── components/
│   ├── Scene.jsx             ← WebGL canvas (particles, bloom, camera)
│   ├── ResumeForm.jsx        ← Full data-entry form
│   ├── Preview.jsx           ← Template router + data normalizer
│   ├── CoverLetter.jsx       ← Cover letter editor/display
│   └── templates/            ← Modern · Classic · Minimal · ATSPro
│
└── lib/
    ├── supabase.js · auth.js · utils.js
```

---

## 🚀 &nbsp; Quick Start

**Prerequisites:** Node ≥ 18 · Supabase project · (optional) Ollama

```bash
# 1. Clone & install
git clone https://github.com/Omm579/resume-studio-3d.git
cd resume-studio-3d && npm install

# 2. Set env vars
cp .env.example .env.local
# → Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

# 3. Run
npm run dev   # → http://localhost:3000
```

<details>
<summary><b>Supabase Schema</b></summary>

```sql
create table users (
  id uuid primary key references auth.users(id),
  email text, name text
);

create table resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) unique,
  content jsonb,
  updated_at timestamp default now()
);

alter table users enable row level security;
alter table resumes enable row level security;

create policy "own data" on users for all using (auth.uid() = id);
create policy "own resumes" on resumes for all using (auth.uid() = user_id);
```

</details>

<details>
<summary><b>Optional: Local AI (Ollama)</b></summary>

```bash
ollama pull llama3 && ollama serve
# Set OLLAMA_HOST=http://localhost:11434 in .env.local
```

</details>

---

## 📈 &nbsp; Roadmap

- [ ] AI bullet-point generation from job descriptions (OpenAI / Gemini)
- [ ] LinkedIn PDF auto-import
- [ ] Multiple saved resume versions
- [ ] ATS keyword gap analysis against a job description
- [ ] Resume versioning & real-time collaboration

---

## 👤 &nbsp; Author

**Om Debasish** · [@Omm579](https://github.com/Omm579)

B.Tech CSE (Data Science) · Gandhi Engineering College, Bhubaneswar

<div align="center">

---

*Built with React, Three.js, Framer Motion, and a lot of `useFrame` magic.*

**© 2026 ResumeVerse 3D**

</div>