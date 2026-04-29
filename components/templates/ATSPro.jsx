export default function ATSPro({ data }) {
  return (
    <div className="bg-white text-black p-10 text-[12px] leading-relaxed font-sans w-full max-w-[800px] mx-auto">
      {/* HEADER */}
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold uppercase">
          {data.name || "Your Name"}
        </h1>
        {data.role && <p className="text-sm">{data.role}</p>}

        <div className="text-[11px] mt-1 flex justify-center gap-1">
          {[data.phone, data.email, data.location].filter(Boolean).join(" | ")}
        </div>

        <div className="text-[11px] flex justify-center gap-1 flex-wrap">
          {[data.linkedin, data.github, data.portfolio]
            .filter(Boolean)
            .map((link, i, arr) => (
              <span key={i}>
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  {link}
                </a>
                {i !== arr.length - 1 && " | "}
              </span>
            ))}
        </div>
      </div>

      <Divider />

      {/* SUMMARY */}
      {data.summary && (
        <Section title="PROFESSIONAL SUMMARY">
          <p>{data.summary}</p>
        </Section>
      )}

      {/* SKILLS */}
      <Section title="TECHNICAL SKILLS">
        <div className="space-y-0.5">
          {data.languages && (
            <p>
              <b>Languages:</b> {data.languages}
            </p>
          )}
          {data.frontend && (
            <p>
              <b>Frontend:</b> {data.frontend}
            </p>
          )}
          {data.backend && (
            <p>
              <b>Backend:</b> {data.backend}
            </p>
          )}
          {data.database && (
            <p>
              <b>Databases:</b> {data.database}
            </p>
          )}
          {data.tools && (
            <p>
              <b>Tools:</b> {data.tools}
            </p>
          )}
          {data.ai && (
            <p>
              <b>AI & APIs:</b> {data.ai}
            </p>
          )}
          {data.coreCsfundamentals && (
            <p>
              <b>Core CS Fundamentals:</b> {data.coreCsfundamentals}
            </p>
          )}
        </div>
      </Section>

      {/* PROJECTS */}
      {data.projects?.some((p) => p?.title) && (
        <Section title="PROJECTS">
          {data.projects.map((proj, i) => (
            <div key={i} className="mb-2">
              <p className="font-bold">
                {proj.title} {proj.tech && `| ${proj.tech}`}
              </p>

              <ul className="list-disc ml-5">
                {proj.points?.map((p, j) => p && <li key={j}>{p}</li>)}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {/* EXPERIENCE */}
      {data.internships?.length > 0 && data.internships[0]?.company && (
        <Section title="PROFESSIONAL EXPERIENCE">
          {data.internships.map((exp, i) => (
            <div key={i} className="mb-3">
              <p className="font-bold">
                {exp.company} | {exp.role}
              </p>

              <p className="text-[11px]">
                {exp.duration} | {exp.location}
              </p>

              <ul className="list-disc ml-5">
                {exp.points?.map((p, j) => p && <li key={j}>{p}</li>)}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {/* EDUCATION */}
      {data.education?.length > 0 && data.education[0]?.school && (
        <Section title="EDUCATION">
          {data.education.map((edu, i) => (
            <div key={i} className="mb-1">
              <p className="font-bold">{edu.school}</p>
              <p>
                {edu.degree} | {edu.year} {edu.score && `| ${edu.score}`}
              </p>
            </div>
          ))}
        </Section>
      )}

      {/* ACHIEVEMENTS */}
      {data.achievements?.length > 0 && (
        <Section title="ACHIEVEMENTS">
          <List text={data.achievements} />
        </Section>
      )}

      {/* CERTIFICATIONS */}
      {data.certifications?.length > 0 && (
        <Section title="CERTIFICATIONS">
          <List text={data.certifications} />
        </Section>
      )}

      {/* ACTIVITIES */}
      {data.activities?.length > 0 && (
        <Section title="EXTRACURRICULAR ACTIVITIES">
          <List text={data.activities} />
        </Section>
      )}

      {/* EXTRA */}
      {(data.strengths || data.interests) && (
        <Section title="ADDITIONAL INFORMATION">
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
    </div>
  );
}

/* 🔹 COMPONENTS */

function Section({ title, children }) {
  return (
    <div className="mb-4">
      <h2 className="text-[12px] font-bold border-b border-black mb-1 uppercase">
        {title}
      </h2>
      <div className="text-[12px]">{children}</div>
    </div>
  );
}

function Divider() {
  return <div className="border-t border-black mb-3" />;
}

// 🔥 Converts comma text → bullet list
function List({ text }) {
  if (!text) return null;

  const items = Array.isArray(text)
    ? text
    : text.split(",").map((t) => t.trim());

  return (
    <ul className="list-disc ml-5">
      {items.map((item, i) => item && <li key={i}>{item}</li>)}
    </ul>
  );
}
