import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [token]);

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(users.filter((user) => user._id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Manage Users</h1>
      <div className="mt-6">
        {users.map((user) => (
          <div key={user._id} className="p-4 bg-white shadow-md rounded-lg mt-4 flex justify-between">
            <span>{user.email} ({user.role})</span>
            <button onClick={() => deleteUser(user._id)} className="bg-red-500 text-white p-2 rounded">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
