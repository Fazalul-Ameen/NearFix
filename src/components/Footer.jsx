import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-400 py-8 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
            N
          </div>
          <span className="text-base font-bold tracking-tight text-white">
            Near<span className="text-blue-400">Fix</span>
          </span>
        </div>
        <p className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} NearFix Services Inc. All rights reserved. Secure Local Mode.
        </p>
        <div className="flex gap-4 text-xs">
          <Link to="/services" className="hover:text-white transition">Browse Services</Link>
          <Link to="/profile" className="hover:text-white transition">My Profile</Link>
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
