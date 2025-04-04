import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function BuyTicket() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [quantity, setQuantity] = useState(1);
  
  const handlePurchase = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to purchase tickets.");
      navigate("/login");
      return;
    }

    if (!eventId || quantity <= 0) {
      console.error("Invalid event or quantity:", { eventId, quantity });
      alert("Please select a valid event and enter a valid quantity.");
      return;
    }

    const confirmPurchase = window.confirm(`Confirm purchase of ${quantity} ticket(s)?`);
    if (!confirmPurchase) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/tickets/buy",
        { eventId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        alert("Ticket purchased successfully!");
        navigate("/dashboard", { replace: true });
      } else {
        throw new Error("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Purchase failed:", error.response?.data || error.message);
      alert(`Failed to buy ticket: ${error.response?.data?.message || "Please try again later."}`);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Buy Ticket</h1>

      <label className="block mb-2 text-gray-700 font-semibold">Quantity:</label>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))} // ✅ Convert input to a number
        className="p-2 border rounded w-full"
      />

      <button
        onClick={handlePurchase}
        className="bg-green-500 hover:bg-green-600 text-white p-2 mt-4 w-full rounded"
      >
        Buy Ticket
      </button>
    </div>
  );
}
