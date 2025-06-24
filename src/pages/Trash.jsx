import { useEffect, useState, useCallback } from 'react';
import { getNotes, saveNotes } from '../utils/storage';
import NoteList from '../components/NoteList';

const Trash = () => {
  const [trashedNotes, setTrashedNotes] = useState([]);

  const refresh = useCallback(() => {
    const allNotes = getNotes();
    setTrashedNotes(allNotes.filter(note => note.deleted));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleRestore = (id) => {
    const updatedNotes = getNotes().map(note =>
      note.id === id ? { ...note, deleted: false } : note
    );
    saveNotes(updatedNotes);
    refresh();
  };

  const handlePermanentDelete = (id) => {
    const updatedNotes = getNotes().filter(note => note.id !== id);
    saveNotes(updatedNotes);
    refresh();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🗑️ Trashed Notes</h2>

      <NoteList
        notes={trashedNotes}
        onEdit={() => {}} // avoids undefined errors
        onDelete={handlePermanentDelete}
        onArchive={() => {}}
        onTogglePin={() => {}}
        onRestore={handleRestore} // supports restore functionality
      />

      {trashedNotes.length > 0 ? (
        <p className="text-sm text-gray-500 mt-4">
          ✅ You can restore notes or delete them permanently.
        </p>
      ) : (
        <p className="text-sm text-gray-400 mt-4">
          Your trash is empty.
        </p>
      )}
    </div>
  );
};

export default Trash;
