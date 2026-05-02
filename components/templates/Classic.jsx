import React from "react";

const ClassicTemplate = ({ data = {} }) => {
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
    education = [],
    internships = [],
    projects = [],
    languages,
    frontend,
    backend,
    database,
    tools,
    ai,
    coreCsfundamentals,
    achievements,
    certifications,
    activities = [],
    strengths,
    interests,
  } = data;

  // ✅ SAFE URL FORMATTER
  const formatUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return "https://" + url;
  };

  // 🔥 SAFE LIST PARSER
  const parseList = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (typeof value === "string") {
      return value.split("\n").filter((item) => item.trim() !== "");
    }
    return [];
  };

  return (
    <div
      className="max-w-4xl mx-auto bg-white p-10 text-gray-800 shadow-lg"
      style={{ fontFamily: "Georgia, serif" }}
    >
      {/* HEADER */}
      <div className="text-center mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold tracking-wide">
          {name?.trim() || "Your Name"}
        </h1>

        <h2 className="text-lg text-gray-600 mt-1">
          {role || "Professional Role"}
        </h2>

        <p className="text-sm mt-2 text-gray-600">
          {email && (
            <>
              <a href={`mailto:${email}`}>{email}</a>
              {" • "}
            </>
          )}

          {phone && (
            <>
              <a href={`tel:${phone}`}>{phone}</a>
              {" • "}
            </>
          )}

          {location && <span>{location}</span>}

          {linkedin && (
            <>
              {" • "}
              <a href={formatUrl(linkedin)} target="_blank" rel="noreferrer">
                {linkedin}
              </a>
            </>
          )}

          {github && (
            <>
              {" • "}
              <a href={formatUrl(github)} target="_blank" rel="noreferrer">
                {github}
              </a>
            </>
          )}

          {portfolio && (
            <>
              {" • "}
              <a href={formatUrl(portfolio)} target="_blank" rel="noreferrer">
                {portfolio}
              </a>
            </>
          )}
        </p>
      </div>

      {/* SUMMARY */}
      {summary && (
        <Section title="Professional Summary">
          <p className="text-sm leading-relaxed">{summary}</p>
        </Section>
      )}

      {/* EXPERIENCE */}
      {internships.length > 0 && (
        <Section title="Professional Experience">
          {internships.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between">
                <div>
                  {exp.role && <p className="font-semibold">{exp.role}</p>}
                  <p className="text-sm text-gray-600">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-500">{exp.duration}</span>
              </div>

              <ul className="list-disc ml-5 text-sm mt-1 space-y-1">
                {parseList(exp.points).map((p, j) => (
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
            <div key={i} className="mb-4">
              {proj.title && (
                <p className="font-semibold">
                  {proj.title}{" "}
                  <span className="text-gray-500 text-sm">({proj.tech})</span>
                </p>
              )}

              {/* 🔥 BOTH LINKS */}
              {(proj.url || proj.githubUrl) && (
                <p className="text-sm text-gray-600">
                  {proj.url && (
                    <a
                      href={formatUrl(proj.url)}
                      target="_blank"
                      rel="noreferrer"
                      className="underline"
                    >
                      Live Project
                    </a>
                  )}

                  {proj.url && proj.githubUrl && " | "}

                  {proj.githubUrl && (
                    <a
                      href={formatUrl(proj.githubUrl)}
                      target="_blank"
                      rel="noreferrer"
                      className="underline"
                    >
                      GitHub Repo
                    </a>
                  )}
                </p>
              )}

              <ul className="list-disc ml-5 text-sm mt-1 space-y-1">
                {parseList(proj.points).map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <Section title="Education">
          {education.map((edu, i) => (
            <div key={i} className="flex justify-between mb-2">
              <div>
                {edu.degree && <p className="font-semibold">{edu.degree}</p>}
                <p className="text-sm text-gray-600">{edu.school}</p>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p>{edu.year}</p>
                {edu.score && <p>{edu.score}</p>}
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* SKILLS */}
      <Section title="Technical Skills">
        <div className="text-sm space-y-1">
          {languages && (
            <p>
              <b>Languages:</b> {languages}
            </p>
          )}
          {frontend && (
            <p>
              <b>Frontend:</b> {frontend}
            </p>
          )}
          {backend && (
            <p>
              <b>Backend:</b> {backend}
            </p>
          )}
          {database && (
            <p>
              <b>Database:</b> {database}
            </p>
          )}
          {tools && (
            <p>
              <b>Tools:</b> {tools}
            </p>
          )}
          {ai && (
            <p>
              <b>AI & APIs:</b> {ai}
            </p>
          )}
          {coreCsfundamentals && (
            <p>
              <b>Core CS Fundamentals:</b> {coreCsfundamentals}
            </p>
          )}
        </div>
      </Section>

      {/* ACHIEVEMENTS */}
      {parseList(achievements).length > 0 && (
        <Section title="Achievements">
          <ul className="text-sm space-y-1">
            {parseList(achievements).map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* CERTIFICATIONS */}
      {parseList(certifications).length > 0 && (
        <Section title="Certifications">
          <ul className="text-sm space-y-1">
            {parseList(certifications).map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* ACTIVITIES */}
      {activities.length > 0 && (
        <Section title="Extracurricular Activities">
          <ul className="text-sm space-y-1 list-disc ml-5">
            {activities.map((a, i) => (
              <li key={i}>
                {typeof a === "object"
                  ? `${a.title}${a.description ? " — " + a.description : ""}`
                  : a}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* EXTRA */}
      {strengths && (
        <Section title="Strengths">
          <p className="text-sm">{strengths}</p>
        </Section>
      )}

      {interests && (
        <Section title="Interests">
          <p className="text-sm">{interests}</p>
        </Section>
      )}
    </div>
  );
};

export default ClassicTemplate;

// 🔹 Section
function Section({ title, children }) {
  return (
    <section className="mb-6">
      <h3 className="text-lg font-bold border-b border-gray-300 mb-2 uppercase tracking-wide">
        {title}
      </h3>
      {children}
    </section>
  );
}
