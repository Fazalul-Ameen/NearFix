import React from "react";
import { Wrench, Zap, BookOpen, Snowflake } from "lucide-react";

const iconMap = {
  plumber: Wrench,
  electrician: Zap,
  tutor: BookOpen,
  "ac technician": Snowflake,
};

function ServiceCard({ name, description, onClick }) {
  const normalizedKey = name.toLowerCase();
  const Icon = iconMap[normalizedKey] || Wrench;

  // Custom styling depending on the profession
  const borderColors = {
    plumber: "hover:border-blue-500/50 group-hover:text-blue-400",
    electrician: "hover:border-yellow-500/50 group-hover:text-yellow-400",
    tutor: "hover:border-emerald-500/50 group-hover:text-emerald-400",
    "ac technician": "hover:border-cyan-500/50 group-hover:text-cyan-400",
  };

  const bgGradients = {
    plumber: "from-blue-500/5 to-transparent",
    electrician: "from-yellow-500/5 to-transparent",
    tutor: "from-emerald-500/5 to-transparent",
    "ac technician": "from-cyan-500/5 to-transparent",
  };

  const borderColorClass = borderColors[normalizedKey] || "hover:border-blue-500/50 group-hover:text-blue-400";
  const bgGradientClass = bgGradients[normalizedKey] || "from-blue-500/5 to-transparent";

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-[2rem] border border-slate-800 bg-gradient-to-br ${bgGradientClass} p-8 shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-900/60 cursor-pointer ${borderColorClass}`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 transition duration-300 group-hover:scale-110">
          <Icon className="h-6 w-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white tracking-wide">{name}</h3>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
