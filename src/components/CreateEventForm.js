import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import moment from 'moment';

import Navbar from './Navbar';

function CreateEventForm() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Merger');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const latestAllowedDate = moment().add(12, 'months');

    if (moment(endDate).isAfter(latestAllowedDate)) {
      alert("Events can't end more than 12 months in the future.");
      return;
    }

    const newEvent = {
      title,
      type,
      startDate,
      endDate
    };

    try {
      await axios.post('http://localhost:5000/events', newEvent);
      navigate('/');
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Create Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required className="w-full p-2 border rounded" />

          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2 border rounded">
            <option value="Merger">Merger</option>
            <option value="Dividends">Dividends</option>
            <option value="New Capital">New Capital</option>
            <option value="Hire">Hire</option>
          </select>

          <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} required className="w-full p-2 border rounded" />
          <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} required className="w-full p-2 border rounded" />

          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Create Event</button>
        </form>
      </div>
    </div>
  );
}

export default CreateEventForm;
