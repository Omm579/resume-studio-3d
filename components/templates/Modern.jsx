import React from "react";
import { Mail, Phone, MapPin, Globe, Calendar } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
// 🔥 Safe array helper
const safeArray = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    return val.split("\n").filter((v) => v.trim() !== "");
  }
  return [];
};

const ModernTemplate = ({ data = {} }) => {
  const {
    name,
    role,
    email,
    phone,
    location,
    portfolio,
    summary,
    education = [],
    internships = [],
    projects = [],
    languages,
    frontend,
    backend,
    database,
    tools,
    ai,
    achievements,
    certifications,
    activities,
    strengths,
    interests,
  } = data;

  return (
    <div className="max-w-5xl mx-auto bg-white text-slate-800 shadow-xl">
      {/* 🔥 HEADER */}
      <div className="bg-slate-900 text-white p-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-wide">
              {name || "Your Name"}
            </h1>

            <h2 className="text-lg text-slate-300 mt-1">
              {role || "Professional Role"}
            </h2>
          </div>

          <div className="space-y-2 text-sm md:text-right">
            {email && (
              <p>
                <Mail size={14} className="inline mr-2" />
                {email}
              </p>
            )}
            {phone && (
              <p>
                <Phone size={14} className="inline mr-2" />
                {phone}
              </p>
            )}
            {location && (
              <p>
                <MapPin size={14} className="inline mr-2" />
                {location}
              </p>
            )}
            {data.linkedin && (
              <p>
                <FaLinkedin className="inline mr-2" />
                {data.linkedin}
              </p>
            )}
            {data.github && (
              <p>
                <FaGithub className="inline mr-2" />
                {data.github}
              </p>
            )}
            {portfolio && (
              <p>
                <Globe size={14} className="inline mr-2" />
                {portfolio}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 🔥 BODY */}
      <div className="grid md:grid-cols-2 gap-12 p-8">
        {/* 🟢 LEFT SIDE */}
        <div className="space-y-10">
          {/* SUMMARY */}
          {summary && (
            <Section title="Summary">
              <p className="text-sm text-slate-600 leading-relaxed">
                {summary}
              </p>
            </Section>
          )}

          {/* EXPERIENCE */}
          {internships.length > 0 && (
            <Section title="Experience">
              {internships.map((exp, i) => (
                <div key={i} className="mb-5">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">{exp.role}</h4>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar size={12} /> {exp.duration}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 mb-1">
                    {exp.company} {exp.location && `• ${exp.location}`}
                  </p>

                  <ul className="list-disc ml-5 text-sm space-y-1">
                    {exp.points?.map((p, j) => (
                      <li key={j}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Section>
          )}

          {/* PROJECTS */}
          {projects.length > 0 && (
            <Section title="Projects">
              {projects.map((proj, i) => (
                <div key={i} className="mb-5">
                  <h4 className="font-semibold">{proj.title}</h4>
                  <p className="text-sm text-slate-500 mb-1">{proj.tech}</p>

                  <ul className="list-disc ml-5 text-sm text-slate-700">
                    {proj.points?.map((p, j) => (
                      <li key={j}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Section>
          )}
        </div>

        {/* 🔵 RIGHT SIDE */}
        <div className="space-y-10 max-w-sm">
          {/* SKILLS */}
          <Section title="Skills">
            {[
              ["Languages", languages],
              ["Frontend", frontend],
              ["Backend", backend],
              ["Database", database],
              ["Tools", tools],
              ["AI & APIs", ai],
              ["Core CS Fundamentals", data.coreCsfundamentals],
            ].map(([label, value], i) =>
              value ? (
                <p key={i} className="text-sm">
                  <b>{label}:</b> {value}
                </p>
              ) : null,
            )}
          </Section>

          {/* EDUCATION */}
          {education.length > 0 && (
            <Section title="Education">
              {education.map((edu, i) => (
                <div key={i} className="mb-3">
                  <p className="font-semibold text-sm">{edu.degree}</p>
                  <p className="text-sm">{edu.school}</p>
                  <p className="text-xs text-slate-500">
                    {edu.year} {edu.score && `| ${edu.score}`}
                  </p>
                </div>
              ))}
            </Section>
          )}

          {/* ACHIEVEMENTS */}
          {safeArray(achievements).length > 0 && (
            <Section title="Achievements">
              <ul className="text-sm space-y-1">
                {safeArray(achievements).map((a, i) => (
                  <li key={i}>• {a}</li>
                ))}
              </ul>
            </Section>
          )}

          {/* CERTIFICATIONS */}
          {safeArray(certifications).length > 0 && (
            <Section title="Certifications">
              <ul className="text-sm space-y-1">
                {safeArray(certifications).map((c, i) => (
                  <li key={i}>• {c}</li>
                ))}
              </ul>
            </Section>
          )}

          {/* ACTIVITIES */}
          {safeArray(activities).length > 0 && (
            <Section title="Activities">
              <ul className="text-sm space-y-1 list-disc ml-5">
                {safeArray(activities).map((a, i) => (
                  <li key={i}>
                    {a && typeof a === "object"
                      ? `${a.title}${a.description ? " — " + a.description : ""}`
                      : a}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* EXTRA */}
          {(strengths || interests) && (
            <Section title="Additional">
              {strengths && (
                <p className="text-sm">
                  <b>Strengths:</b> {strengths}
                </p>
              )}
              {interests && (
                <p className="text-sm mt-1">
                  <b>Interests:</b> {interests}
                </p>
              )}
            </Section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;

// 🔹 Section
function Section({ title, children }) {
  return (
    <section>
      <h3 className="text-lg font-bold mb-3 border-b border-slate-300 pb-1 tracking-wide">
        {title}
      </h3>
      {children}
    </section>
  );
}
