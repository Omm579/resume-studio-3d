"use client";
import { User, Code, Briefcase, GraduationCap, Award } from "lucide-react";
import { X } from "lucide-react";

export default function ResumeForm({ data, setData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value.startsWith(" ") ? value.trimStart() : value,
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    setData((prev) => {
      const updated = [...(prev[section] || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, [section]: updated };
    });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleBlur = () => {
    if (!validateEmail(data.email)) {
      setError("Invalid email");
    }
  };

  const handleNestedArrayChange = (
    section,
    index,
    listName,
    listIndex,
    value,
  ) => {
    setData((prev) => {
      const updatedSection = [...(prev[section] || [])];
      const updatedItem = { ...updatedSection[index] };
      const updatedList = [...(updatedItem[listName] || [])];
      if (!value.trim()) return;
      updatedList[listIndex] = value;
      updatedItem[listName] = updatedList;
      updatedSection[index] = updatedItem;
      return { ...prev, [section]: updatedSection };
    });
  };

  const addItem = (section, newItem) => {
    setData((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), newItem],
    }));
  };

  const removeItem = (section, index) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const addNestedItem = (section, index, listName) => {
    setData((prev) => {
      const updatedSection = [...(prev[section] || [])];
      const updatedItem = { ...updatedSection[index] };
      updatedItem[listName] = [...(updatedItem[listName] || []), ""];
      updatedSection[index] = updatedItem;
      return { ...prev, [section]: updatedSection };
    });
  };

  return (
    <div className="space-y-10 text-white/90">
      {/* ✉️ COVER LETTER INFO */}
      <Section title="Application Details" icon={<Briefcase size={14} />}>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Company Name"
            name="company"
            value={data.company}
            onChange={handleChange}
          />
          <Input
            label="Hiring Manager (optional)"
            name="hiringManager"
            value={data.hiringManager}
            onChange={handleChange}
          />
        </div>
      </Section>

      {/* 🔹 BASIC INFO */}
      <Section title="Basic Information" icon={<User size={14} />}>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 flex items-end gap-3">
            <div className="flex-1">
              <Input
                label="Profile Image URL"
                name="profileImage"
                value={data.profileImage}
                onChange={handleChange}
              />
            </div>

            <img
              src={data.profileImage || "/default-avatar.png"}
              alt="Profile Preview"
              onError={(e) => {
                e.target.src = "/default-avatar.png";
              }}
              className="w-11 h-11 rounded-xl object-cover border border-white/10 bg-white/5"
            />
          </div>
          <Input
            label="Full Name"
            name="name"
            value={data.name}
            autoComplete="name"
            onChange={handleChange}
            required
          />
          <Input
            label="Role"
            name="role"
            value={data.role}
            onChange={handleChange}
            required
          />
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            value={data.email}
            onChange={handleChange}
            required
            onBlur={handleBlur}
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={data.phone}
            onChange={handleChange}
            pattern="[0-9+ ]{10,15}"
            required
          />
          <Input
            label="Location"
            name="location"
            value={data.location}
            onChange={handleChange}
          />
          <Input
            label="LinkedIn"
            name="linkedin"
            value={data.linkedin}
            onChange={handleChange}
          />
          <Input
            label="GitHub"
            name="github"
            value={data.github}
            onChange={handleChange}
          />
          <Input
            label="Portfolio"
            name="portfolio"
            value={data.portfolio}
            onChange={handleChange}
          />
        </div>
      </Section>

      <Textarea
        label="Professional Summary"
        name="summary"
        value={data.summary}
        onChange={handleChange}
      />

      {/* 🔹 SKILLS */}
      <Section title="Technical Skills" icon={<Code size={14} />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Languages"
            name="languages"
            value={data.languages}
            onChange={handleChange}
          />
          <Input
            label="Frontend"
            name="frontend"
            value={data.frontend}
            onChange={handleChange}
          />
          <Input
            label="Backend"
            name="backend"
            value={data.backend}
            onChange={handleChange}
          />
          <Input
            label="Database"
            name="database"
            value={data.database}
            onChange={handleChange}
          />
          <Input
            label="Tools"
            name="tools"
            value={data.tools}
            onChange={handleChange}
          />
          <Input
            label="AI / APIs"
            name="ai"
            value={data.ai}
            onChange={handleChange}
          />
          <Input
            label="Core CS Fundamentals"
            name="coreCsfundamentals"
            value={data.coreCsfundamentals}
            onChange={handleChange}
          />
        </div>
      </Section>

      {/* 🔹 PROJECTS */}
      <Section title="Projects" icon={<Briefcase size={14} />}>
        {data.projects?.map((proj, i) => (
          <Card key={proj.id || i} onRemove={() => removeItem("projects", i)}>
            <Input
              label="Project Title"
              value={proj.title}
              onChange={(e) =>
                handleArrayChange("projects", i, "title", e.target.value)
              }
            />
            <Input
              label="Project URL"
              type="url"
              placeholder="https://example.com"
              value={proj.url}
              onChange={(e) =>
                handleArrayChange("projects", i, "url", e.target.value)
              }
            />
            <Input
              label="Technologies Used"
              value={proj.tech}
              onChange={(e) =>
                handleArrayChange("projects", i, "tech", e.target.value)
              }
            />

            <BulletList
              label="Project Details"
              items={proj.points}
              onChange={(j, val) =>
                handleNestedArrayChange("projects", i, "points", j, val)
              }
              onAdd={() => addNestedItem("projects", i, "points")}
              onRemove={(j) => {
                setData((prev) => {
                  const updated = [...(prev.projects || [])];
                  const points = updated[i].points.filter(
                    (_, idx) => idx !== j,
                  );
                  updated[i].points = points;
                  return { ...prev, projects: updated };
                });
              }}
            />
          </Card>
        ))}

        <AddButton
          onClick={() =>
            addItem("projects", {
              id: Date.now(),
              title: "",
              url: "",
              tech: "",
              points: [""],
            })
          }
        >
          + Add Project
        </AddButton>
      </Section>

      {/* 🔹 EXPERIENCE */}
      <Section title="Experience" icon={<Briefcase size={14} />}>
        {data.internships?.map((exp, i) => (
          <Card key={i} onRemove={() => removeItem("internships", i)}>
            <Input
              label="Company"
              value={exp.company}
              onChange={(e) =>
                handleArrayChange("internships", i, "company", e.target.value)
              }
            />
            <Input
              label="Role"
              value={exp.role}
              onChange={(e) =>
                handleArrayChange("internships", i, "role", e.target.value)
              }
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Input
                label="Duration"
                value={exp.duration}
                onChange={(e) =>
                  handleArrayChange(
                    "internships",
                    i,
                    "duration",
                    e.target.value,
                  )
                }
              />
              <Input
                label="Location"
                value={exp.location}
                onChange={(e) =>
                  handleArrayChange(
                    "internships",
                    i,
                    "location",
                    e.target.value,
                  )
                }
              />
            </div>

            <BulletList
              label="Responsibilities / Achievements"
              items={exp.points}
              onChange={(j, val) =>
                handleNestedArrayChange("internships", i, "points", j, val)
              }
              onAdd={() => addNestedItem("internships", i, "points")}
              onRemove={(j) => {
                setData((prev) => {
                  const updated = [...(prev.internships || [])];
                  const points = updated[i].points.filter(
                    (_, idx) => idx !== j,
                  );
                  updated[i].points = points;
                  return { ...prev, internships: updated };
                });
              }}
            />
          </Card>
        ))}

        <AddButton
          onClick={() =>
            addItem("internships", {
              company: "",
              role: "",
              duration: "",
              location: "",
              points: [""],
            })
          }
        >
          + Add Experience
        </AddButton>
      </Section>

      {/* 🔹 EDUCATION */}
      <Section title="Education" icon={<GraduationCap size={14} />}>
        {data.education?.map((edu, i) => (
          <Card key={i} onRemove={() => removeItem("education", i)}>
            <Input
              label="Institution"
              value={edu.school}
              onChange={(e) =>
                handleArrayChange("education", i, "school", e.target.value)
              }
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <Input
                label="Degree"
                value={edu.degree}
                onChange={(e) =>
                  handleArrayChange("education", i, "degree", e.target.value)
                }
              />
              <Input
                label="Year"
                value={edu.year}
                onChange={(e) =>
                  handleArrayChange("education", i, "year", e.target.value)
                }
              />
              <Input
                label="Score"
                value={edu.score}
                onChange={(e) =>
                  handleArrayChange("education", i, "score", e.target.value)
                }
              />
            </div>
          </Card>
        ))}

        <AddButton
          onClick={() =>
            addItem("education", {
              degree: "",
              school: "",
              year: "",
              score: "",
            })
          }
        >
          + Add Education
        </AddButton>
      </Section>

      {/* 🔹 EXTRA (ATS BOOST) */}
      <Section title="Extra Information" icon={<Award size={14} />}>
        <Textarea
          label="Achievements (comma separated)"
          name="achievements"
          value={data.achievements}
          onChange={handleChange}
        />
        <Textarea
          label="Certifications"
          name="certifications"
          value={data.certifications}
          onChange={handleChange}
        />
        <Textarea
          label="Activities"
          name="activities"
          value={data.activities}
          onChange={handleChange}
        />
        <Input
          label="Strengths"
          name="strengths"
          value={data.strengths}
          onChange={handleChange}
        />
        <Input
          label="Interests"
          name="interests"
          value={data.interests}
          onChange={handleChange}
        />
      </Section>
    </div>
  );
}

/* 🔹 UI COMPONENTS */

function Section({ title, icon, children }) {
  return (
    <div>
      <h3 className="text-[10px] uppercase tracking-[0.2em] text-cyan-400 mb-4 font-bold flex items-center gap-2">
        {icon}
        <span className="opacity-80">{title}</span>
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Card({ children, onRemove }) {
  return (
    <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/10 space-y-3 relative group hover:bg-white/[0.05] transition-colors">
      <button
        onClick={() => {
          if (confirm("❌ Remove this item?")) {
            onRemove();
          }
        }}
        className="absolute top-2 right-3 text-red-400 opacity-70 group-hover:opacity-100 text-xs"
      >
        Remove
      </button>
      {children}
    </div>
  );
}

function Input({ label, value, ...props }) {
  return (
    <div>
      <label htmlFor={props.name} className="text-[10px] text-white/40">
        {label}
      </label>
      <input
        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-cyan-400/50"
        value={value ?? ""}
        {...props}
      />
    </div>
  );
}

function Textarea({ label, value, ...props }) {
  return (
    <div>
      <label className="text-[10px] text-white/40">{label}</label>
      <textarea
        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm h-28 focus:outline-none focus:border-cyan-400/50"
        value={value ?? ""}
        {...props}
      />
    </div>
  );
}

function AddButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-2 border border-dashed border-white/20 rounded-xl text-sm text-white/40 hover:text-cyan-400 hover:border-cyan-400 transition"
    >
      {children}
    </button>
  );
}

function BulletList({ label, items, onChange, onAdd, onRemove }) {
  return (
    <div>
      <label className="text-[10px] text-white/40">{label}</label>
      {(items || []).map((item, i) => (
        <div key={i} className="flex gap-2 mt-1">
          <input
            value={item ?? ""}
            onChange={(e) => onChange(i, e.target.value)}
            className="flex-1 bg-black/20 border border-white/5 rounded-xl p-3 text-sm"
          />

          <button
            onClick={() => {
              if (confirm("❌ Remove this point?")) {
                onRemove(i);
              }
            }}
            className="text-white/30 hover:text-red-400 transition-all duration-200 p-2 rounded-lg hover:bg-red-500/10 hover:scale-110"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>
      ))}
      <button
        onClick={() => {
          if (!items[items.length - 1]?.trim()) {
            alert("Fill current point first ⚠️");
            return;
          }
          onAdd();
        }}
        className="text-cyan-400 text-xs mt-1"
      >
        + Add Point
      </button>
    </div>
  );
}
