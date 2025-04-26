import React, { useState, useEffect } from 'react';

import axios from 'axios';

import EventItem from './EventItem';

function EventListView() {
    const [events, setEvents] = useState([]);
  
    useEffect(() => {
        axios.get('http://localhost:5000/events')
            .then(res => setEvents(res.data))
            .catch(err => console.error('Failed to fetch events:', err));
    }, []);

    if (events.length === 0) {
        return <div className="text-center mt-10 text-gray-500">No events found.</div>;
    }
  
    return (
        <div>
            <h2 className="text-2xl font-bold text-center mb-6">Event List View</h2>
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {events.map(event => (
                    <EventItem key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
  }
  
  export default EventListView;