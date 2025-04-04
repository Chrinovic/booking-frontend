import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [adminDropdown, setAdminDropdown] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      logout();
      navigate("/login");
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* Left Side: Navigation Links */}
      <div className="flex space-x-6">
        <Link to="/" className="hover:text-gray-300 transition">Home</Link>
        <Link to="/events" className="hover:text-gray-300 transition">Events</Link>
        {user && <Link to="/dashboard" className="hover:text-gray-300 transition">Dashboard</Link>}
        
        {/* Admin Dropdown Menu */}
        {user?.role === "admin" && (
          <div className="relative">
            <button
              onClick={() => setAdminDropdown(!adminDropdown)}
              className="hover:text-gray-300 transition"
            >
              Admin ▼
            </button>
            {adminDropdown && (
              <div className="absolute left-0 mt-2 w-40 bg-white text-gray-800 rounded shadow-lg">
                <Link to="/admin" className="block px-4 py-2 hover:bg-gray-200">Admin Panel</Link>
                <Link to="/admin/events" className="block px-4 py-2 hover:bg-gray-200">Manage Events</Link>
                <Link to="/admin/users" className="block px-4 py-2 hover:bg-gray-200">Manage Users</Link>
                <Link to="/admin/purchases" className="block px-4 py-2 hover:bg-gray-200">View Purchases</Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Side: User Authentication Links */}
      <div>
        {user ? (
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="bg-blue-500 px-4 py-2 rounded mx-2 hover:bg-blue-600 transition">
              Login
            </Link>
            <Link to="/register" className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
