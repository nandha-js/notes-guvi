import NoteCard from './NoteCard';
import { useEffect, useState } from 'react';
import { setupOfflineListener } from '../utils/storage';

const NoteList = ({ notes, onEdit, onDelete, onArchive, onTogglePin }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    return setupOfflineListener(() => {
      setIsOnline(navigator.onLine);
    });
  }, []);

  if (notes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          {isOnline ? 'No notes found. Create one to get started!' : 'No notes available offline'}
        </p>
        {!isOnline && (
          <p className="text-sm text-gray-400 mt-2">
            Some notes may not be available until you're back online
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {!isOnline && (
        <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-800">
          You're viewing offline notes. Some features may be limited.
        </div>
      )}
      
      {/* Pinned notes */}
      {notes.filter(note => note.pinned).map(note => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
          onArchive={onArchive}
          onTogglePin={onTogglePin}
          isOnline={isOnline}
        />
      ))}
      
      {/* Regular notes */}
      {notes.filter(note => !note.pinned).map(note => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
          onArchive={onArchive}
          onTogglePin={onTogglePin}
          isOnline={isOnline}
        />
      ))}
    </div>
  );
};

export default NoteList;