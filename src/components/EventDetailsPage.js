import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';
import moment from 'moment';

import Navbar from './Navbar';

function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/events/${id}`)
      .then(res => setEvent(res.data))
      .catch(err => console.error('Failed to fetch event details:', err));
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      axios.delete(`http://localhost:5000/events/${id}`)
        .then(() => navigate('/')) // Redirect to homepage or list
        .catch(err => console.error('Failed to delete event:', err));
    }
  };

  if (!event) return <div className="text-center mt-10">No such event with id ${id}.</div>;

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
        <p className="text-gray-600 mb-2">Type: {event.type}</p>
        <p className="text-gray-700">
          {moment(event.startDate).format('MMMM D, YYYY h:mm A')} → {moment(event.endDate).format('MMMM D, YYYY h:mm A')}
        </p>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => navigate(`/events/${event.id}/edit`)}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            ✏️ Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventDetailsPage;
