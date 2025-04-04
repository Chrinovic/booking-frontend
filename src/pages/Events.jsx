import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [sortBy, setSortBy] = useState("date"); // Default sorting by date
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/events")
      .then((res) => {
        setEvents(res.data);
        setFilteredEvents(res.data);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  useEffect(() => {
    let filtered = events.filter(event =>
      event.name.toLowerCase().includes(search.toLowerCase()) &&
      (locationFilter ? event.location.toLowerCase().includes(locationFilter.toLowerCase()) : true)
    );

    if (sortBy === "date") {
      filtered = filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === "price") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    }

    setFilteredEvents(filtered);
  }, [search, locationFilter, sortBy, events]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">Upcoming Events</h1>

      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Filter by location..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="border px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="date">Sort by Date</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>

      {filteredEvents.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event._id} className="border rounded-lg shadow-lg p-6 bg-white">
              <h2 className="text-2xl font-bold text-blue-600">{event.name}</h2>
              <p className="text-gray-600 mt-2">
                📅 {new Date(event.date).toLocaleDateString()} | 📍 {event.location}
              </p>
              <p className="text-gray-700 mt-4">{event.description}</p>

              <div className="mt-4">
                <p className="text-sm text-gray-500">Max Seats: {event.maxSeats}</p>
                <p className={`text-sm ${event.availableSeats > 0 ? "text-green-500" : "text-red-500"}`}>
                  Available Seats: {event.availableSeats}
                </p>
                <p className="text-lg font-bold text-gray-800 mt-2">💰 €{event.price}</p>
              </div>

              {event.availableSeats > 0 ? (
                <button
                  onClick={() => navigate(`/buy-ticket/${event._id}`)}
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Buy Ticket
                </button>
              ) : (
                <button
                  className="mt-4 w-full bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed"
                  disabled
                >
                  Sold Out
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
