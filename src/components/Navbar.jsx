import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, User, Menu, X, LayoutDashboard, Briefcase, UserPlus } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `text-sm font-medium transition duration-200 px-3 py-2 rounded-xl flex items-center gap-2 ${
      isActive(path)
        ? "text-blue-400 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.15)] border border-blue-500/20"
        : "text-slate-300 hover:text-white hover:bg-slate-900/60"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-900 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link to={user ? "/home" : "/"} className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                N
              </div>
              <span className="text-xl font-bold tracking-tight text-white sm:block">
                Near<span className="text-blue-400">Fix</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            {user && (
              <div className="hidden md:flex md:items-center md:gap-2">
                <Link to="/home" className={linkClass("/home")}>
                  Home
                </Link>
                <Link to="/services" className={linkClass("/services")}>
                  Browse Workers
                </Link>
                {user.role === "worker" ? (
                  <Link to="/worker-dashboard" className={linkClass("/worker-dashboard")}>
                    <Briefcase size={16} /> Worker Dashboard
                  </Link>
                ) : (
                  <Link to="/worker-register" className={linkClass("/worker-register")}>
                    <UserPlus size={16} /> Become Worker
                  </Link>
                )}
                <Link to="/user-dashboard" className={linkClass("/user-dashboard")}>
                  <LayoutDashboard size={16} /> My Dashboard
                </Link>
              </div>
            )}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex md:items-center md:gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/profile"
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl border transition ${
                    isActive("/profile")
                      ? "border-blue-500/50 bg-blue-500/10 text-white"
                      : "border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  <div className="h-7 w-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs uppercase border border-blue-500/30">
                    {user.fullname?.charAt(0) || "U"}
                  </div>
                  <span className="text-sm font-medium pr-1">{user.fullname}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
                >
                  <span className="flex items-center gap-2">
                    <LogOut size={15} /> Logout
                  </span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="rounded-2xl bg-blue-500 px-6 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.25)]"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="rounded-2xl border border-slate-800 bg-slate-900/50 px-6 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-blue-500/40"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-xl border border-slate-800 p-2 text-slate-400 hover:bg-slate-900 hover:text-white"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-900 bg-slate-950/95 backdrop-blur-xl md:hidden">
          <div className="space-y-1 px-4 py-4">
            {user ? (
              <>
                <Link
                  to="/home"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-base font-medium ${
                    isActive("/home") ? "bg-slate-900 text-blue-400" : "text-slate-300 hover:bg-slate-900"
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-base font-medium ${
                    isActive("/services") ? "bg-slate-900 text-blue-400" : "text-slate-300 hover:bg-slate-900"
                  }`}
                >
                  Browse Workers
                </Link>
                {user.role === "worker" ? (
                  <Link
                    to="/worker-dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-base font-medium ${
                      isActive("/worker-dashboard") ? "bg-slate-900 text-blue-400" : "text-slate-300 hover:bg-slate-900"
                    }`}
                  >
                    Worker Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/worker-register"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-base font-medium ${
                      isActive("/worker-register") ? "bg-slate-900 text-blue-400" : "text-slate-300 hover:bg-slate-900"
                    }`}
                  >
                    Become Worker
                  </Link>
                )}
                <Link
                  to="/user-dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-base font-medium ${
                    isActive("/user-dashboard") ? "bg-slate-900 text-blue-400" : "text-slate-300 hover:bg-slate-900"
                  }`}
                >
                  My Dashboard
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-base font-medium ${
                    isActive("/profile") ? "bg-slate-900 text-blue-400" : "text-slate-300 hover:bg-slate-900"
                  }`}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left rounded-xl px-4 py-3 text-base font-semibold text-red-400 hover:bg-red-500/10"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="grid gap-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl bg-blue-500 px-4 py-3 text-center text-sm font-semibold text-slate-950"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3 text-center text-sm font-semibold text-slate-200"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
