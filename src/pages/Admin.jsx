import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminPanel() {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http:/localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.role !== "admin") {
          navigate("/dashboard"); // Redirect non-admin users
          return;
        }

        const eventsRes = await axios.get("http://localhost:5000/api/events");
        const usersRes = await axios.get("http://localhost:5000/api/users");

        setEvents(eventsRes.data);
        setUsers(usersRes.data);
        setLoading(false);
      } catch (error) {
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  const deleteEvent = async (id) => {
    await axios.delete(`http://localhost:5000/api/events/${id}`);
    setEvents(events.filter((event) => event.id !== id));
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    setUsers(users.filter((user) => user.id !== id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Admin Panel</h1>

      {/* Manage Events */}
      <h2 className="text-2xl mt-4">Events</h2>
      {events.map((event) => (
        <div key={event.id} className="border p-4 mt-2 flex justify-between">
          <span>{event.name} - {event.date}</span>
          <button onClick={() => deleteEvent(event.id)} className="bg-red-500 text-white p-2">Delete</button>
        </div>
      ))}

      {/* Manage Users */}
      <h2 className="text-2xl mt-6">Users</h2>
      {users.map((user) => (
        <div key={user.id} className="border p-4 mt-2 flex justify-between">
          <span>{user.email} - {user.role}</span>
          <button onClick={() => deleteUser(user.id)} className="bg-red-500 text-white p-2">Delete</button>
        </div>
      ))}
    </div>
  );
}
