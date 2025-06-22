import { useState } from 'react';
import { FiEdit2, FiTrash2, FiArchive, FiTag, FiRotateCcw } from 'react-icons/fi';
import { MdPushPin } from 'react-icons/md';

const NoteCard = ({ note, onEdit, onDelete, onArchive, onTogglePin, onRestore }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`border rounded-lg p-4 ${note.pinned ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'} ${note.archived ? 'opacity-70' : ''}`}>
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg">{note.title}</h3>
        <div className="flex space-x-2">
          {onTogglePin && <button onClick={() => onTogglePin(note.id)} className="text-gray-500 hover:text-yellow-500"><MdPushPin className={note.pinned ? 'text-yellow-500' : ''} /></button>}
          {onArchive && <button onClick={() => onArchive(note.id)} className="text-gray-500 hover:text-blue-500"><FiArchive /></button>}
          {onEdit && <button onClick={() => onEdit(note)} className="text-gray-500 hover:text-green-500"><FiEdit2 /></button>}
          {onRestore && <button onClick={() => onRestore(note.id)} className="text-gray-500 hover:text-purple-500"><FiRotateCcw /></button>}
          {onDelete && <button onClick={() => onDelete(note.id)} className="text-gray-500 hover:text-red-500"><FiTrash2 /></button>}
        </div>
      </div>
      <div className="mt-2">
        {isExpanded ? <p>{note.content}</p> : <p className="truncate">{note.content}</p>}
        <button onClick={() => setIsExpanded(!isExpanded)} className="text-blue-500 text-sm mt-2">
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      </div>
      {note.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          <FiTag className="text-gray-400 mt-1" />
          {note.tags.map(tag => (
            <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">{tag}</span>
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