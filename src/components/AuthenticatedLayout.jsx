import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  Bell,
  User,
  LogOut,
  Home,
  MapPin,
  ClipboardList,
  Settings,
  ShieldCheck,
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", to: "/dashboard", icon: Home },
  { id: "services", label: "Services", to: "/services", icon: MapPin },
  { id: "requests", label: "My Requests", to: "/services", icon: ClipboardList },
  { id: "profile", label: "Profile", to: "/profile", icon: User },
  { id: "settings", label: "Settings", to: "/profile", icon: Settings },
];

function AuthenticatedLayout({ title, subtitle, children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "User", email: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser({
          name: parsed.fullName || parsed.name || "User",
          email: parsed.email || parsed.identifier || "",
        });
      } catch (err) {
        console.error("Unable to parse user data", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-blue-500 grid place-items-center text-white text-lg font-bold">
                N
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">NearFix</p>
                <h1 className="text-2xl font-semibold text-white">Service management for every home</h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-between md:justify-end">
            <button
              type="button"
              aria-label="Notifications"
              className="rounded-2xl bg-slate-900/70 p-3 text-slate-300 transition hover:bg-slate-800"
            >
              <Bell size={18} />
            </button>
            <div className="rounded-3xl bg-slate-900/70 px-4 py-3 text-slate-200">
              <p className="text-xs text-slate-400">Signed in as</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-2xl bg-blue-500 px-4 py-2 text-slate-950 font-semibold transition hover:bg-blue-400"
            >
              <span className="inline-flex items-center gap-2">
                <LogOut size={16} /> Logout
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-800/70 bg-slate-900/90 p-6 shadow-2xl shadow-black/20">
              <div className="flex items-center gap-4 mb-5">
                <div className="h-14 w-14 rounded-3xl bg-blue-500 grid place-items-center text-white text-xl font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm text-slate-400">Welcome back</p>
                  <p className="font-semibold text-white">{user.name}</p>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">Manage your bookings, track requests, and review your profile details in one place.</p>
            </div>

            <div className="rounded-3xl border border-slate-800/70 bg-slate-900/90 p-6 shadow-2xl shadow-black/20">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500 mb-4">Quick nav</p>
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.id}
                      to={item.to}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
                          isActive
                            ? "bg-blue-500 text-slate-950"
                            : "text-slate-300 hover:bg-slate-800"
                        }`
                      }
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            <div className="rounded-3xl border border-slate-800/70 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-900 p-6 shadow-2xl shadow-black/20">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={22} className="text-blue-400" />
                <p className="font-semibold text-white">Secure service booking</p>
              </div>
              <p className="text-sm text-slate-400">Your data stays local until your backend is available. Bookings are stored securely on your device for demo use.</p>
            </div>
          </aside>

          <main>
            <div className="rounded-[2rem] border border-slate-800/60 bg-slate-900/90 p-8 shadow-2xl shadow-black/20">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-blue-400">{title}</p>
                  <h2 className="mt-2 text-3xl font-semibold text-white">{subtitle}</h2>
                </div>
                <div className="grid gap-3 sm:auto-cols-max sm:grid-flow-col">
                  <button
                    type="button"
                    onClick={() => navigate("/services")}
                    className="rounded-2xl bg-blue-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-400"
                  >
                    Browse Services
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/profile")}
                    className="rounded-2xl border border-slate-700 bg-slate-950 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-blue-500 hover:text-white"
                  >
                    Update Profile
                  </button>
                </div>
              </div>

              <div className="mt-8">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AuthenticatedLayout;
