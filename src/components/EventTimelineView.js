import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Timeline, { TimelineHeaders, DateHeader } from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';

import axios from 'axios';
import moment from 'moment';

function EventTimelineView() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Set up event data when page is entered
  useEffect(() => {
    axios.get('https://event-planner-app-b1q0.onrender.com/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  if (events.length === 0) {
    return <div>No events created.</div>;
  }

  const groups = [
    { id: 1, title: 'Track 1' },
    { id: 2, title: 'Track 2' },
    { id: 3, title: 'Track 3' },
  ];

  const items = events.map((event, index) => {
    const start = moment(event.startDate);
    let end = moment(event.endDate);
  
    // Enforce minimum duration for better visual width
    if (end.diff(start, 'days') < 4) {
      end = start.clone().add(4, 'day');
    }
  
    return {
      id: event.id,
      group: (index % groups.length) + 1,
      title: event.title,
      start_time: start,
      end_time: end,
      canMove: false,
      canResize: false,
    };
  });
  

  // Fixed to exactly 90 days from start of current month
  const fixedStart = moment().startOf('month').valueOf();
  const fixedEnd = moment(fixedStart).add(90, 'days').valueOf();
  const fixedDuration = fixedEnd - fixedStart;

  return (
    <div
      className="timeline-lock-wrapper"
      onWheel={(e) => e.preventDefault()}
      onTouchMove={(e) => e.preventDefault()}
      style={{ overflow: 'hidden' }}
    >
      <Timeline
        groups={groups}
        items={items}
        visibleTimeStart={fixedStart}
        visibleTimeEnd={fixedEnd}
        minTime={fixedStart}
        maxTime={fixedEnd}
        minZoom={fixedDuration}
        maxZoom={fixedDuration}
        defaultTimeStart={moment(fixedStart)}
        defaultTimeEnd={moment(fixedEnd)}
        onTimeChange={(start, end, updateScrollCanvas) => {
          updateScrollCanvas(fixedStart, fixedEnd);
        }}
        sidebarWidth={120}
        showCursorLine={false}
        stackItems
        lineHeight={50}
        itemRenderer={({ item, itemContext, getItemProps }) => (
            <div
              {...getItemProps({
                onClick: () => navigate(`/events/${item.id}`),
                style: {
                  ...itemContext.style,
                  backgroundColor: '#facc15',
                  color: 'black',
                  fontSize: '12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%',
                  cursor: 'pointer',
                }
              })}
              title={item.title} // native tooltip
              onClick={() => window.location.href = `/events/${item.id}`} // optional redirect
            >
              {item.title}
            </div>
        )}
      >
        <TimelineHeaders>
          <DateHeader unit="year" labelFormat="YYYY" />
          <DateHeader unit="month" labelFormat="MMMM" />
        </TimelineHeaders>
      </Timeline>
    </div>
  );
}

export default EventTimelineView;
