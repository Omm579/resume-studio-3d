export default function CoverLetter({ data, setData }) {
  const handleEdit = (e) => {
    setData((prev) => ({ ...prev, coverLetter: e.target.innerText }));
  };

  return (
    <div className="resume-paper bg-white text-gray-800 max-w-[800px] mx-auto p-5 sm:p-8 md:p-12 leading-relaxed text-[13px] md:text-sm font-sans shadow-sm">
      {/* HEADER */}
      <div className="mb-4 md:mb-6 border-b pb-4">
        <h1 className="text-base md:text-lg font-bold uppercase tracking-tight">
          {data.name || "Your Name"}
        </h1>
        <p className="text-xs text-gray-600 mt-1">
          {[data.email, data.phone, data.location].filter(Boolean).join(" | ")}
        </p>
        <p className="text-xs text-gray-500">
          {[data.linkedin, data.github].filter(Boolean).join(" | ")}
        </p>
      </div>

      {/* DATE */}
      <p className="mb-4 text-xs text-gray-500">
        {new Date().toLocaleDateString()}
      </p>

      {/* BODY */}
      <div
        className="mt-4 md:mt-6 min-h-[300px] md:min-h-[400px] outline-none focus:bg-cyan-50/30 p-2 md:p-4 border-2 border-transparent focus:border-cyan-200 rounded-xl transition-all cursor-text whitespace-pre-wrap text-gray-700"
        contentEditable={true}
        suppressContentEditableWarning={true}
        onInput={handleEdit}
      >
        {data.coverLetter ||
          "Your cover letter content will appear here. Click anywhere to edit manually or use the Generate Letter button above to generate a personalized cover letter based on your resume and the job description."}
      </div>

      {/* SIGNATURE */}
      <div className="mt-6 md:mt-8">
        <p>Regards,</p>
        <p className="font-semibold mt-2">{data.name || "Your Name"}</p>
      </div>
    </div>
  );
}
