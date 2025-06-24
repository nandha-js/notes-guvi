import { useEffect, useState } from 'react';
import NoteCard from './NoteCard';
import { setupOfflineListener } from '../utils/storage';

const NoteList = ({
  notes,
  onEdit,
  onDelete,
  onArchive,
  onTogglePin,
  onRestore, // ✅ Add this line
}) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    return setupOfflineListener(() => {
      setIsOnline(navigator.onLine);
    });
  }, []);

  const pinnedNotes = notes.filter(note => note.pinned);
  const regularNotes = notes.filter(note => !note.pinned);

  if (notes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          {isOnline ? 'No notes yet. Start by adding one!' : 'No notes available offline'}
        </p>
        {!isOnline && (
          <p className="text-sm text-gray-400 mt-2">
            Some notes may sync when you reconnect.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {!isOnline && (
        <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-800">
          You are offline. Some features may not be available.
        </div>
      )}

      {/* Pinned Notes */}
      {pinnedNotes.length > 0 && (
        <div>
          <h2 className="text-sm text-yellow-600 font-semibold mb-2">📌 Pinned</h2>
          <div className="grid gap-4">
            {pinnedNotes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={onEdit}
                onDelete={onDelete}
                onArchive={onArchive}
                onTogglePin={onTogglePin}
                onRestore={onRestore} // ✅ Pass it to NoteCard
                isOnline={isOnline}
              />
            ))}
          </div>
        </div>
      )}

      {/* Regular Notes */}
      {regularNotes.length > 0 && (
        <div>
          {pinnedNotes.length > 0 && (
            <h2 className="text-sm text-gray-600 font-semibold mb-2">🗒 All Notes</h2>
          )}
          <div className="grid gap-4">
            {regularNotes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={onEdit}
                onDelete={onDelete}
                onArchive={onArchive}
                onTogglePin={onTogglePin}
                onRestore={onRestore} // ✅ Pass it here too
                isOnline={isOnline}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteList;
