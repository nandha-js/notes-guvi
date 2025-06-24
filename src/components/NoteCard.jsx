import { useState } from 'react';
import {
  FiEdit2,
  FiTrash2,
  FiArchive,
  FiInbox,
  FiMapPin,
  FiTag,
  FiCloudOff,
  FiRefreshCcw,
} from 'react-icons/fi';

const NoteCard = ({
  note,
  onEdit,
  onDelete,
  onArchive,
  onTogglePin,
  onRestore,
  isOnline,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`relative border rounded-lg p-4 pt-6 pl-6 mb-4 transition-all bg-white shadow-sm ${
        note.pinned ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'
      } ${note.archived ? 'opacity-80' : ''}`}
    >
      {/* Offline Icon */}
      {!isOnline && (
        <div className="absolute top-2 right-2 text-gray-400 animate-pulse">
          <FiCloudOff title="Offline note" />
        </div>
      )}

      {/* Archived Badge */}
      {note.archived && (
        <div className="absolute top-2 left-2 bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
          Archived
        </div>
      )}

      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg break-words w-3/4">{note.title}</h3>
        <div className="flex space-x-3">
          {/* 🔁 Restore */}
          {onRestore && (
            <button
              onClick={() => onRestore(note.id)}
              className="text-gray-500 hover:text-green-500"
              title="Restore"
            >
              <FiRefreshCcw />
            </button>
          )}

          {/* 📌 Pin */}
          {!onRestore && onTogglePin && (
            <button
              onClick={() => onTogglePin(note.id)}
              className={`text-gray-500 hover:text-yellow-500 ${
                note.pinned ? 'text-yellow-500' : ''
              }`}
              title={note.pinned ? 'Unpin' : 'Pin'}
            >
              <FiMapPin />
            </button>
          )}

          {/* 📨 Unarchive or 🗂 Archive */}
          {!onRestore && onArchive && (
            <button
              onClick={() => onArchive(note.id)}
              className="text-gray-500 hover:text-purple-600"
              title={note.archived ? 'Unarchive' : 'Archive'}
            >
              {note.archived ? <FiInbox /> : <FiArchive />}
            </button>
          )}

          {/* ✏️ Edit */}
          {!onRestore && onEdit && (
            <button
              onClick={() => onEdit(note)}
              className="text-gray-500 hover:text-green-500"
              title="Edit"
            >
              <FiEdit2 />
            </button>
          )}

          {/* 🗑️ Delete */}
          <button
            onClick={() => onDelete(note.id)}
            className="text-gray-500 hover:text-red-500"
            title={onRestore ? 'Delete permanently' : 'Move to Trash'}
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      {/* Note Content */}
      <div className="text-gray-700">
        {isExpanded ? (
          <p className="whitespace-pre-wrap">{note.content}</p>
        ) : (
          <p className="truncate">{note.content}</p>
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 text-sm mt-1"
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      </div>

      {/* Tags */}
      {note.tags?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2 items-center">
          <FiTag className="text-gray-400 text-sm" />
          {note.tags.map(tag => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Updated time */}
      <div className="mt-3 text-xs text-gray-400">
        Updated: {new Date(note.updatedAt || note.createdAt).toLocaleString()}
      </div>
    </div>
  );
};

export default NoteCard;
