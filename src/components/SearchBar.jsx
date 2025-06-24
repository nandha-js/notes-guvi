import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-4 relative">
      {/* Accessible label (screen reader only) */}
      <label htmlFor="search" className="sr-only">Search notes</label>

      {/* Search Icon */}
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
        <FiSearch />
      </div>

      {/* Input */}
      <input
        type="text"
        id="search"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search notes"
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default SearchBar;
