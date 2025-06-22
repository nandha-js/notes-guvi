import { FiHome, FiArchive, FiTrash2 } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <nav className="space-y-1">
        <NavLink
          to="/"
          className={({ isActive }) => `flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          <FiHome className="mr-3" />
          All Notes
        </NavLink>
        <NavLink
          to="/archives"
          className={({ isActive }) => `flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          <FiArchive className="mr-3" />
          Archives
        </NavLink>
        <NavLink
          to="/trash"
          className={({ isActive }) => `flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          <FiTrash2 className="mr-3" />
          Trash
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;