import { useEffect, useState } from "react";
import axios from "axios";

export default function ViewPurchases() {
  const [purchases, setPurchases] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tickets/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPurchases(response.data);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    };

    fetchPurchases();
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Purchase History</h1>
      <table className="w-full mt-6 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">User</th>
            <th className="border p-2">Event</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => (
            <tr key={purchase._id} className="text-center">
              <td className="border p-2">{purchase.user.email}</td>
              <td className="border p-2">{purchase.event.name}</td>
              <td className="border p-2">{purchase.quantity}</td>
              <td className="border p-2">€{purchase.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
