import { Star, MapPin, Briefcase, ArrowUpRight } from "lucide-react";

function WorkerCard({ worker, onClick }) {
  const { fullName, profession, experience, location, rating, price } = worker;

  return (
    <article className="group rounded-[2rem] border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-black/30 transition-all duration-300 hover:border-slate-700/60 hover:bg-slate-900/40">
      <div className="flex flex-col gap-5">
        {/* Top details */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl font-bold border border-blue-500/20">
              {fullName?.charAt(0) || "W"}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition">
                {fullName}
              </h3>
              <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mt-1">
                {profession}
              </p>
            </div>
          </div>
          {/* Price badge */}
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-sm font-semibold text-blue-400">
            {price}/hr
          </div>
        </div>

        {/* Mid Stats */}
        <div className="grid grid-cols-3 gap-2 border-y border-slate-900 py-4 text-xs text-slate-400">
          <div className="flex flex-col gap-1 items-center">
            <span className="text-slate-500 uppercase tracking-widest">Experience</span>
            <span className="flex items-center gap-1 font-semibold text-slate-200">
              <Briefcase size={13} className="text-blue-400" /> {experience} Years
            </span>
          </div>
          <div className="flex flex-col gap-1 items-center border-x border-slate-900">
            <span className="text-slate-500 uppercase tracking-widest">Rating</span>
            <span className="flex items-center gap-1 font-semibold text-yellow-500">
              <Star size={13} fill="currentColor" /> {rating}
            </span>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <span className="text-slate-500 uppercase tracking-widest">Location</span>
            <span className="flex items-center gap-1 font-semibold text-slate-200 truncate max-w-full">
              <MapPin size={13} className="text-blue-400" /> {location}
            </span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onClick}
          className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-400"
        >
          View & Book Now
          <ArrowUpRight size={15} />
        </button>
      </div>
    </article>
  );
}

export default WorkerCard;
