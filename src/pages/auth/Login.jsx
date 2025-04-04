import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }

      setLoading(false);
      navigate("/dashboard", { replace: true });
      navigate(0);
    } catch (error) {
      setLoading(false);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Welcome Back</h2>
        <p className="text-gray-500 text-center mt-1">Sign in to your account</p>

        <form onSubmit={handleLogin} className="mt-6">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 transition" 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 transition" 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                onChange={() => setRememberMe(!rememberMe)} 
              />
              <span className="text-gray-600 text-sm">Remember me</span>
            </label>
            <a href="#" className="text-blue-500 text-sm hover:underline">Forgot password?</a>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span> : "Sign In"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account? 
          <a href="/register" className="text-blue-500 hover:underline"> Sign up</a>
        </p>
      </div>
    </div>
  );
}
