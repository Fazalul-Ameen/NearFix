import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Home,
  Settings,
  MessageSquare,
  Clock,
  MapPin,
  Star,
  Plus,
  ChevronRight,
  Bell,
  User,
  CheckCircle2 as CheckCircle,
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats] = useState({
    totalServices: 12,
    completed: 8,
    pending: 2,
    rating: 4.8,
  });
  const [recentActivity] = useState([
    {
      id: 1,
      title: "Plumbing Repair",
      date: "2 hours ago",
      status: "Completed",
      provider: "John Smith",
    },
    {
      id: 2,
      title: "Electrical Installation",
      date: "1 day ago",
      status: "In Progress",
      provider: "Mike Johnson",
    },
    {
      id: 3,
      title: "Carpet Cleaning",
      date: "3 days ago",
      status: "Completed",
      provider: "Sarah Davis",
    },
  ]);

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="text-xl font-semibold text-gray-700">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                {user.name?.charAt(0) || "N"}
              </div>
              <h1 className="text-2xl font-bold text-gray-900">NearFix</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition">
                <Bell size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition">
                <User size={20} />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-4 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition"
              >
                <LogOut size={18} />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name || "User"}!
          </h2>
          <p className="text-gray-600">
            Here's what's happening with your services today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Services</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.totalServices}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Home className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {stats.completed}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">
                  {stats.pending}
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="text-orange-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Rating</p>
                <div className="flex items-center mt-2">
                  <p className="text-3xl font-bold text-yellow-500">
                    {stats.rating}
                  </p>
                  <Star className="text-yellow-500 ml-1" size={20} fill="currentColor" />
                </div>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="flex items-center justify-center space-x-2 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition font-medium">
                  <Plus size={20} />
                  <span>Book a Service</span>
                </button>
                <button className="flex items-center justify-center space-x-2 bg-blue-100 text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-200 transition font-medium">
                  <MessageSquare size={20} />
                  <span>View Messages</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {activity.title}
                        </h4>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center space-x-1">
                            <User size={16} />
                            <span>{activity.provider}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock size={16} />
                            <span>{activity.date}</span>
                          </span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            activity.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full text-indigo-600 hover:text-indigo-700 font-medium flex items-center justify-center space-x-1">
                <span>View All</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* User Profile Card */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="text-center mb-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-400 to-blue-600 mx-auto flex items-center justify-center text-white text-2xl font-bold">
                  {user.name?.charAt(0) || "N"}
                </div>
              </div>
              <h3 className="text-center font-bold text-gray-900 text-lg">
                {user.name || "User"}
              </h3>
              <p className="text-center text-gray-600 text-sm mt-1">
                {user.email}
              </p>
              <button className="w-full mt-4 bg-indigo-100 text-indigo-600 py-2 px-4 rounded-lg hover:bg-indigo-200 transition font-medium text-sm">
                View Profile
              </button>
            </div>

            {/* Navigation Menu */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <nav className="space-y-1">
                <NavItem icon={<Home size={20} />} label="Dashboard" active />
                <NavItem icon={<MapPin size={20} />} label="My Services" />
                <NavItem icon={<MessageSquare size={20} />} label="Messages" />
                <NavItem icon={<Star size={20} />} label="Reviews" />
                <NavItem icon={<Settings size={20} />} label="Settings" />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active = false }) {
  return (
    <button
      className={`w-full flex items-center space-x-3 px-4 py-3 transition ${
        active
          ? "bg-indigo-50 border-l-4 border-indigo-600 text-indigo-600"
          : "text-gray-700 hover:bg-gray-50"
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
      <ChevronRight size={18} className="ml-auto" />
    </button>
  );
}

export default Dashboard;
