import { useState } from "react";
import axios from "axios";

export default function BuyTicket({ eventId }) {
  const [quantity, setQuantity] = useState(1);

  const handlePurchase = async () => {
    try {
      await axios.post("https://your-backend.com/api/tickets/buy", { eventId, quantity });
      alert("Ticket purchased successfully!");
    } catch (error) {
      alert("Failed to buy ticket.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Buy Ticket</h1>
      <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="p-2 border" />
      <button onClick={handlePurchase} className="bg-green-500 text-white p-2 ml-2">Buy</button>
    </div>
  );
}
