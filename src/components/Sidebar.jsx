import { FiHome, FiArchive, FiTrash2 } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const linkBaseClasses = `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 min-h-screen">
      <nav className="space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkBaseClasses} ${
              isActive
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`
          }
        >
          <FiHome className="mr-3 text-lg" />
          All Notes
        </NavLink>

        <NavLink
          to="/archives"
          className={({ isActive }) =>
            `${linkBaseClasses} ${
              isActive
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`
          }
        >
          <FiArchive className="mr-3 text-lg" />
          Archives
        </NavLink>

        <NavLink
          to="/trash"
          className={({ isActive }) =>
            `${linkBaseClasses} ${
              isActive
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`
          }
        >
          <FiTrash2 className="mr-3 text-lg" />
          Trash
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
