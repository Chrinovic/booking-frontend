import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tickets/mine", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Sort tickets by purchase date (newest first)
        const sortedTickets = response.data.sort(
          (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate)
        );
        setTickets(sortedTickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [navigate]);

  // Separate tickets into upcoming and past events
  const now = new Date();
  const upcomingTickets = tickets.filter(ticket => new Date(ticket.event.date) > now);
  const pastTickets = tickets.filter(ticket => new Date(ticket.event.date) <= now);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">🎟 Your Dashboard</h1>
        <p className="text-center text-gray-500 mt-2">Manage and view your event tickets.</p>

        {loading ? (
          <p className="text-center text-gray-500 mt-6">Loading tickets...</p>
        ) : tickets.length === 0 ? (
          <p className="text-center text-gray-500 mt-6">
            You haven't purchased any tickets yet. <br />
            <a href="/events" className="text-blue-500 hover:underline">Browse Events</a>
          </p>
        ) : (
          <div className="mt-6">
            {/* UPCOMING EVENTS */}
            {upcomingTickets.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-green-600">🎉 Upcoming Events</h2>
                <div className="mt-4 space-y-4">
                  {upcomingTickets.map((ticket) => (
                    <TicketCard key={ticket._id} ticket={ticket} isUpcoming />
                  ))}
                </div>
              </div>
            )}

            {/* PAST EVENTS */}
            {pastTickets.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold text-red-600">📅 Past Events</h2>
                <div className="mt-4 space-y-4">
                  {pastTickets.map((ticket) => (
                    <TicketCard key={ticket._id} ticket={ticket} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// 🏷 Ticket Card Component
function TicketCard({ ticket, isUpcoming }) {
  return (
    <div className={`p-4 border-l-4 rounded-lg shadow-md bg-white 
        ${isUpcoming ? "border-green-500" : "border-red-500"}`}>
      <h3 className="text-xl font-semibold text-gray-800">{ticket.event.name}</h3>
      <p className="text-gray-600">
        📅 Event Date: <strong>{new Date(ticket.event.date).toLocaleDateString()}</strong>
      </p>
      <p className="text-gray-600">📍 Location: {ticket.event.location}</p>
      <p className="text-gray-600">🎫 Tickets Bought: {ticket.quantity}</p>
      <p className="text-gray-600">💰 Total Price: €{ticket.totalPrice}</p>
      <p className="text-gray-400 text-sm">Purchased on {new Date(ticket.purchaseDate).toLocaleString()}</p>
    </div>
  );
}
