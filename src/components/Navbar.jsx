import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios.get("http://localhost:5000/api/auth", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => setRole(res.data.role))
      .catch(() => setRole(null));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="flex space-x-4">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/events" className="hover:text-gray-300">Events</Link>
        {role && <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>}
        {role === "admin" && <Link to="/admin" className="hover:text-gray-300">Admin</Link>}
      </div>
      <div>
        {role ? (
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
        ) : (
          <>
            <Link to="/login" className="bg-blue-500 px-3 py-1 rounded mx-2">Login</Link>
            <Link to="/register" className="bg-green-500 px-3 py-1 rounded">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
