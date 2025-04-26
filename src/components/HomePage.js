import { useState } from 'react';

import EventListView from './EventListView';
import EventTimelineView from './EventTimelineView';
import Navbar from './Navbar';

function HomePage() {
  const [view, setView] = useState('list');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onViewChange={setView} currentView={view} />
      <div className="p-6">
        {view === 'list' ? <EventListView /> : <EventTimelineView />}
      </div>
    </div>
  );
}

export default HomePage;