import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import BuyTicket from "./pages/BuyTicket";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageEvents from "./pages/admin/ManageEvents";
import ManageUsers from "./pages/admin/ManageUsers";
import ViewPurchases from "./pages/admin/ViewPurchases";
import PrivateRoute from "./components/PrivateRoute"; // ✅ Protects admin routes

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<Events />} />
        <Route path="/buy-ticket/:eventId" element={<BuyTicket />} />

        {/* User Route */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Admin Routes (Protected) */}
        <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/events" element={<PrivateRoute><ManageEvents /></PrivateRoute>} />
        <Route path="/admin/users" element={<PrivateRoute><ManageUsers /></PrivateRoute>} />
        <Route path="/admin/purchases" element={<PrivateRoute><ViewPurchases /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}
