// src/App.jsx
import { useState, useMemo } from 'react';
import defaultAvatar from "./images/defaultAvatar.png";

const DataTable = () => {
  // Sample data
  const initialData = [
    { id: 1, username: 'john_doe', email: 'john@example.com', profile: defaultAvatar },
    { id: 2, username: 'jane_smith', email: 'jane@example.com', profile: defaultAvatar },
    { id: 3, username: 'bob_jones', email: 'bob@example.com', profile: defaultAvatar },
    { id: 4, username: 'alice_wong', email: 'alice@example.com', profile: defaultAvatar },
    { id: 5, username: 'charlie_brown', email: 'charlie@example.com', profile: defaultAvatar },
  ];

  const [data] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [isLoading] = useState(false); // Set to true if fetching data

  // Filter data based on search term
  const filteredData = useMemo(() => {
    return data.filter(item =>
      item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  // Handlers
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-color bg-[var(--custom-bg-secondary)] px-4 py-2 rounded-lg focus:outline-none focus:border-focus-color w-full md:w-auto"
          />
          <div className="flex items-center gap-2">
            <label className="lable-color">Rows per page:</label>
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="border-color bg-[var(--custom-bg-secondary)] px-2 py-1 rounded-lg focus:outline-none"
            >
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="border-color rounded-lg overflow-hidden hidden md:block">
          <table className="w-full">
            <thead className="header">
              <tr className="border-b-color">
                <th className="p-4 text-left cursor-pointer">
                  ID
                </th>
                <th className="p-4 text-left cursor-pointer" >
                  Username
                </th>
                <th className="p-4 text-left cursor-pointer">
                  Email
                </th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center font-secondary-color">Loading...</td>
                </tr>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <tr key={item.id} className="border-b-color hover:bg-[var(--custom-hover)]">

                    <td className="p-4">{item.id}</td>
                    <td className="p-4 flex items-center gap-2">
                      <img src={item.profile} alt={item.username} className="w-8 h-8 object-cover rounded-full" />
                      <span>{item.username}</span>
                    </td>
                    <td className="p-4 font-secondary-color">{item.email}</td>
                    <td className="p-4">
                      <button className="btn py-1 px-4 text-sm">View</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center font-secondary-color">No data found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {isLoading ? (
            <div className="p-4 text-center font-secondary-color">Loading...</div>
          ) : paginatedData.length > 0 ? (
            paginatedData.map((item) => (
              <div key={item.id} className="border-color rounded-lg p-4 hover:bg-[var(--custom-hover)]">
                <div className="flex justify-between items-center">
                  <button className="btn py-1 px-4 text-sm">View</button>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <img src={item.profile} alt={item.username} className="w-8 h-8 rounded-full" />
                  <span>{item.username}</span>
                </div>
                <div className="font-secondary-color mt-2">{item.email}</div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center font-secondary-color">No data found</div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
          <div className="font-secondary-color">
            Showing {(currentPage - 1) * rowsPerPage + 1} to{' '}
            {Math.min(currentPage * rowsPerPage, filteredData.length)} of {filteredData.length} entries
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-color bg-[var(--custom-bg-secondary)] px-4 py-2 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg ${currentPage === page
                  ? 'bg-[var(--custom-light)] text-[var(--custom-bg)]'
                  : 'border-color bg-[var(--custom-bg-secondary)]'
                  }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border-color bg-[var(--custom-bg-secondary)] px-4 py-2 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;