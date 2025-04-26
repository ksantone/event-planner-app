import React from 'react';
import { useNavigate } from 'react-router-dom';

import moment from 'moment';

function EventItem({ event }) {
  const navigate = useNavigate();

  const handleEdit = (id) => navigate(`/events/${id}/edit`);
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      // Make a DELETE request or call a delete callback
      fetch(`http://localhost:5000/events/${id}`, { method: 'DELETE' })
        .then(() => window.location.reload()); // reload after delete
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">{event.title}</h3>
        <div className="space-x-2">
          <button onClick={() => handleEdit(event.id)} className="text-blue-600 hover:text-blue-800">✏️</button>
          <button onClick={() => handleDelete(event.id)} className="text-red-600 hover:text-red-800">🗑️</button>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-1">Type: {event.type}</p>
      <p className="text-sm text-gray-700">
        {moment(event.startDate).format('MMMM D, YYYY h:mm A')} → {moment(event.endDate).format('MMMM D, YYYY h:mm A')}
      </p>
    </div>
  );
}

export default EventItem;
