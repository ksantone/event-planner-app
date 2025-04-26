import { Link, useLocation } from 'react-router-dom';

function Navbar({ onViewChange, currentView }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center border-b">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-blue-700 hover:underline">
        Event Planner App
      </Link>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        {isHome && (
          <div>
            <button
              onClick={() => onViewChange('list')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                currentView === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => onViewChange('timeline')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                currentView === 'timeline'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              Timeline View
            </button>
          </div>
        )}
        <Link to="/create">
          <button className="px-4 py-2 rounded-md bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition">
            Create Event
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;