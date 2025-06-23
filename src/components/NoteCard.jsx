import { useState } from 'react';
import { FiEdit2, FiTrash2, FiArchive, FiPin, FiTag, FiCloudOff } from 'react-icons/fi';

const NoteCard = ({ note, onEdit, onDelete, onArchive, onTogglePin, isOnline }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`border rounded-lg p-4 mb-4 relative ${
      note.pinned ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'
    } ${note.archived ? 'opacity-75' : ''}`}>
      
      {!isOnline && (
        <div className="absolute top-2 right-2 text-gray-400">
          <FiCloudOff title="Available offline" />
        </div>
      )}
      
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg">{note.title}</h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => onTogglePin(note.id)} 
            className="text-gray-500 hover:text-yellow-500"
            disabled={!isOnline}
            title={note.pinned ? 'Unpin note' : 'Pin note'}
          >
            <FiPin className={note.pinned ? 'text-yellow-500' : ''} />
          </button>
          <button 
            onClick={() => onArchive(note.id)} 
            className="text-gray-500 hover:text-blue-500"
            disabled={!isOnline}
            title={note.archived ? 'Unarchive note' : 'Archive note'}
          >
            <FiArchive />
          </button>
          <button 
            onClick={() => onEdit(note)} 
            className="text-gray-500 hover:text-green-500"
            title="Edit note"
          >
            <FiEdit2 />
          </button>
          <button 
            onClick={() => onDelete(note.id)} 
            className="text-gray-500 hover:text-red-500"
            disabled={!isOnline}
            title="Delete note"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
      
      <div className="mt-2">
        {isExpanded ? (
          <p className="whitespace-pre-line">{note.content}</p>
        ) : (
          <p className="truncate">{note.content}</p>
        )}
        <button 
          onClick={() => setIsExpanded(!isExpanded)} 
          className="text-blue-500 text-sm mt-2"
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      </div>
      
      {note.tags?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          <FiTag className="text-gray-400 mt-1" />
          {note.tags.map(tag => (
            <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="mt-2 text-xs text-gray-400">
        Last updated: {new Date(note.updatedAt).toLocaleString()}
      </div>
    </div>
  );
};

export default NoteCard;