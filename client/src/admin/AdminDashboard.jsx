import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 shadow-md">
        <h1 className="text-2xl font-bold">Election Commissioners Dashboard</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-1/4 bg-white shadow-md px-4 py-6">
          <nav>
            <ul className="space-y-4">
              <li className="text-blue-600 font-medium cursor-pointer hover:text-blue-800">
                <Link to="/admin/register-voter">Add Voters</Link>
              </li>
              <li className="text-blue-600 font-medium cursor-pointer hover:text-blue-800">
                <Link to="/admin/register-candidate">Add Candidates</Link>
              </li>
              <li className="text-blue-600 font-medium cursor-pointer hover:text-blue-800">
                <Link to="/admin/register-election">Set Election Details</Link>
              </li>
              <li className="text-blue-600 font-medium cursor-pointer hover:text-blue-800">
                <Link to="/admin/view-results">View Results</Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-gray-50 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Voters Section */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Voters</h2>
              <p className="text-gray-600">View voter details.</p>
              <Link to="/admin/view-voters" className="text-blue-500 hover:underline">View Voters</Link>
            </div>

            {/* Candidates Section */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Candidates</h2>
              <p className="text-gray-600">View candidate profiles.</p>
              <Link to="/admin/view-candidates" className="text-blue-500 hover:underline">View Candidates</Link>
            </div>

            {/* Election Details Section */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Election Details</h2>
              <p className="text-gray-600">Set the date, start, and end time for elections.</p>
              <Link to="/admin/view-elections" className="text-blue-500 hover:underline">View Election Details</Link>
            </div>

            {/* Results Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 col-span-1 md:col-span-2">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Results</h2>
              <p className="text-gray-600">View election results and insights.</p>
              <Link to="/admin/view-results" className="text-blue-500 hover:underline">View Results</Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
