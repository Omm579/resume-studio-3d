"use client";

import Modern from "./templates/Modern";
import Classic from "./templates/Classic";
import Minimal from "./templates/Minimal";
import ATSPro from "./templates/ATSPro";

const splitInput = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return val.split(/[,\n]/).map(item => item.trim()).filter(Boolean);
};

export default function Preview({ data, template }) {
  const safeData = {
    ...(data || {}),
    achievements: splitInput(data?.achievements),
    certifications: splitInput(data?.certifications),
    activities: splitInput(data?.activities),
    projects: Array.isArray(data?.projects) ? data.projects : [],
    internships: Array.isArray(data?.internships)
      ? data.internships
      : [],
    education: Array.isArray(data?.education) ? data.education : [],
  };

  switch (template) {
    case "classic":
      return <Classic data={safeData} />;
    case "minimal":
      return <Minimal data={safeData} />;
    case "atspro":
      return <ATSPro data={safeData} />;
    default:
      return <Modern data={safeData} />;
  }
}