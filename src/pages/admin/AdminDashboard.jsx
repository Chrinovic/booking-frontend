import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.role !== "admin") {
          navigate("/dashboard");
        } else {
          setIsAdmin(true);
        }
      } catch (error) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, [navigate]);

  if (loading) return <p className="text-center text-gray-500 mt-10">Verifying admin access...</p>;
  if (!isAdmin) return null;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>
      <p className="text-center text-gray-500">Manage events, users, and purchases</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Link to="/admin/events" className="p-6 bg-blue-500 text-white rounded-lg text-center shadow-lg hover:bg-blue-600">
          📅 Manage Events
        </Link>
        <Link to="/admin/users" className="p-6 bg-green-500 text-white rounded-lg text-center shadow-lg hover:bg-green-600">
          👤 Manage Users
        </Link>
        <Link to="/admin/purchases" className="p-6 bg-yellow-500 text-white rounded-lg text-center shadow-lg hover:bg-yellow-600">
          💰 View Purchases
        </Link>
      </div>
    </div>
  );
}
