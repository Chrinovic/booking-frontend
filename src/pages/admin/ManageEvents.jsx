import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
    price: "",
    maxSeats: "",
    availableSeats: "",
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [token]);

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.filter((event) => event._id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };
  const formatDateForInput = (date) => {
    if (!date) return '';
  
    // If date is an ISO string, convert to Date object first
    const dateObj = typeof date === 'string' ? new Date(date) : date;
  
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(dateObj.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };
  const handleEventChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleCreateEvent = async () => {
    if (!newEvent.name || !newEvent.date || !newEvent.location) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/events", newEvent, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents([...events, response.data]);
      setNewEvent({
        name: "",
        date: "",
        location: "",
        description: "",
        price: "",
        maxSeats: "",
        availableSeats: "",
      });
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleUpdateEvent = async () => {
    if (!newEvent.name || !newEvent.date || !newEvent.location) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/events/${editingEvent._id}`, newEvent, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.map((event) => (event._id === editingEvent._id ? response.data : event)));
      setEditingEvent(null);
      setNewEvent({
        name: "",
        date: "",
        location: "",
        description: "",
        price: "",
        maxSeats: "",
        availableSeats: "",
      });
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  if (loading) return <p>Loading events...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Manage Events</h1>

      {/* Create / Update Event Form */}
      <h2 className="text-2xl mt-6">{editingEvent ? "Edit Event" : "Create New Event"}</h2>
      <div className="border p-4 bg-gray-100 rounded-md mt-4">
        <input type="text" name="name" placeholder="Event Name" value={newEvent.name} onChange={handleEventChange} className="border p-2 w-full mb-2" />
        <input type="date" name="date" value={formatDateForInput(newEvent.date)} onChange={handleEventChange} className="border p-2 w-full mb-2" />
        <input type="text" name="location" placeholder="Location" value={newEvent.location} onChange={handleEventChange} className="border p-2 w-full mb-2" />
        <textarea name="description" placeholder="Description" value={newEvent.description} onChange={handleEventChange} className="border p-2 w-full mb-2"></textarea>
        <input type="number" name="price" placeholder="Ticket Price" value={newEvent.price} onChange={handleEventChange} className="border p-2 w-full mb-2" />
        <input type="number" name="maxSeats" placeholder="Max Seats" value={newEvent.maxSeats} onChange={handleEventChange} className="border p-2 w-full mb-2" />
        <input type="number" name="availableSeats" placeholder="Available Seats" value={newEvent.availableSeats} onChange={handleEventChange} className="border p-2 w-full mb-2" />

        {editingEvent ? (
          <button onClick={handleUpdateEvent} className="bg-yellow-500 text-white p-2 w-full">Update Event</button>
        ) : (
          <button onClick={handleCreateEvent} className="bg-green-500 text-white p-2 w-full">Create Event</button>
        )}
      </div>

      {/* Event List */}
      <div className="mt-6">
        {events.map((event) => (
          <div key={event._id} className="p-4 bg-white shadow-md rounded-lg mt-4">
            <h3 className="text-xl font-semibold">{event.name}</h3>
            <p>📅 {new Date(event.date).toLocaleDateString()}</p>
            <p>📍 {event.location}</p>
            <p>💰 €{event.price}</p>

            <div className="mt-3 flex space-x-2">
              <button
                onClick={() => {
                  setEditingEvent(event);
                  setNewEvent(event);
                }}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => deleteEvent(event._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
