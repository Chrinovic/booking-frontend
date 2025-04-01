import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <button onClick={() => { localStorage.removeItem("token"); navigate("/login"); }} className="mt-4 bg-red-500 text-white p-2">
        Logout
      </button>
    </div>
  );
}
