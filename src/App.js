import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import CreateEventForm from './components/CreateEventForm';
import EventDetailsPage from './components/EventDetailsPage';
import EditEventPage from './components/EditEventPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateEventForm />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/events/:id/edit" element={<EditEventPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
