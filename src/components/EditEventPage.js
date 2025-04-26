import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';

import Navbar from './Navbar';

function EditEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    title: '',
    type: 'Merger',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/events/${id}`)
      .then(res => setEvent(res.data))
      .catch(err => console.error('Failed to load event:', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/events/${id}`, event)
      .then(() => navigate(`/events/${id}`))
      .catch(err => console.error('Failed to update event:', err));
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Edit Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={event.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 border rounded"
            required
          />

          <select
            name="type"
            value={event.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Merger">Merger</option>
            <option value="Dividends">Dividends</option>
            <option value="New Capital">New Capital</option>
            <option value="Hire">Hire</option>
          </select>

          <input
            type="datetime-local"
            name="startDate"
            value={event.startDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="datetime-local"
            name="endDate"
            value={event.endDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditEventPage;
