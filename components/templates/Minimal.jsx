import React from "react";

const safeArray = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    return val
      .split(/[,\n]/)
      .map((v) => v.trim())
      .filter(Boolean);
  }
  return [];
};

const isValidUrl = (url) => url.startsWith("http");

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-sm font-semibold text-gray-900 mb-3 tracking-wide uppercase">
      {title}
    </h3>
    <div className="text-gray-700 text-sm space-y-1">{children}</div>
  </div>
);

const MinimalTemplate = ({ data }) => {
  const {
    name,
    role,
    email,
    phone,
    location,
    linkedin,
    github,
    portfolio,
    summary,
    education,
    internships,
    projects,
  } = data;

  const skillCategories = [
    ["Languages", data.languages],
    ["Frontend", data.frontend],
    ["Backend", data.backend],
    ["Database", data.database],
    ["Tools", data.tools],
    ["AI & APIs", data.ai],
    ["Core CS Fundamentals", data.coreCsfundamentals],
  ];

  return (
    <div
      className="max-w-3xl mx-auto bg-white p-8 text-gray-800"
      style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
    >
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-medium text-gray-900">
          {name?.trim() || "Your Name"}
        </h1>
        <p className="text-gray-600 mt-1">{role?.trim() || "Professional Role"}</p>

        <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-3">
          {[email, phone, location, linkedin, github, portfolio]
            .filter(Boolean)
            .map((item, i, arr) => (
              <span key={i}>
                {item.includes("http") ? (
                  <a href={item} target="_blank" className="underline">
                    {item}
                  </a>
                ) : (
                  item
                )}
                {i !== arr.length - 1 && " | "}
              </span>
            ))}
        </div>
      </div>

      {/* SUMMARY */}
      {summary && (
        <Section title="Summary">
          <p className="leading-relaxed">{summary}</p>
        </Section>
      )}

      {/* EXPERIENCE */}
      {internships?.length > 0 && (
        <Section title="Experience">
          {internships.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between">
                <div>
                  {exp.role && (
                    <p className="font-medium text-gray-900">{exp.role}</p>
                  )}
                  <p className="text-gray-600 text-sm">{exp.company}</p>
                </div>
                <span className="text-xs text-gray-500">{exp.duration}</span>
              </div>

              <ul className="mt-1 space-y-1">
                {safeArray(exp.points).map((p, j) => (
                  <li key={j}>• {p}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {/* PROJECTS 🔥 */}
      {projects?.length > 0 && (
        <Section title="Projects">
          {projects.map((proj, i) => (
            <div key={i} className="mb-4">
              {proj.title && (
                <p className="font-medium text-gray-900">
                  {proj.title}{" "}
                  <span className="text-xs text-gray-500">• {proj.tech}</span>
                </p>
              )}
              {proj.url && (
                <p className="text-xs text-gray-500">
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    {proj.url.includes("github") ? "GitHub Repo" : "Live Project"}
                  </a>
                </p>
              )}
              <ul className="mt-1 space-y-1">
                {safeArray(proj.points).map((p, j) => (
                  <li key={j}>• {p}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {/* EDUCATION */}
      {education?.length > 0 && (
        <Section title="Education">
          {education.map((edu, i) => (
            <div key={i} className="flex justify-between">
              <div>
                {edu.degree && (
                  <p className="font-medium text-gray-900">{edu.degree}</p>
                )}
                <p className="text-gray-600 text-sm">{edu.school}</p>
              </div>
              <div className="text-xs text-gray-500 text-right">
                <p>{edu.year}</p>
                {edu.score && <p>{edu.score}</p>}
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* SKILLS */}
      {skillCategories.some(([_, v]) => v) && (
        <Section title="Skills">
          <div className="flex flex-wrap gap-2">
            {skillCategories.map(([label, value], i) =>
              value ? (
                <span key={i} className="text-xs px-2 py-1 bg-gray-100 rounded">
                  <b>{label}:</b> {value}
                </span>
              ) : null,
            )}
          </div>
        </Section>
      )}

      {/* EXTRA SECTIONS */}
      <section className="mt-12">
        {safeArray(data.achievements).length > 0 && (
          <Section title="ACHIEVEMENTS">
            {safeArray(data.achievements).map((a, i) => (
              <p key={i}>• {a}</p>
            ))}
          </Section>
        )}

        {safeArray(data.certifications).length > 0 && (
          <Section title="CERTIFICATIONS">
            {safeArray(data.certifications).map((c, i) => (
              <p key={i}>• {c}</p>
            ))}
          </Section>
        )}

        {safeArray(data.activities).length > 0 && (
          <Section title="EXTRACURRICULAR ACTIVITIES">
            {safeArray(data.activities).map((a, i) => (
              <p key={i}>• {a}</p>
            ))}
          </Section>
        )}

        {(data.strengths || data.interests) && (
          <Section title="STRENGTHS & INTERESTS">
            {data.strengths && (
              <p>
                <b>Strengths:</b> {data.strengths}
              </p>
            )}
            {data.interests && (
              <p>
                <b>Interests:</b> {data.interests}
              </p>
            )}
          </Section>
        )}
      </section>
    </div>
  );
};

export default MinimalTemplate;
