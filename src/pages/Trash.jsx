import { useEffect, useState } from 'react';
import { getNotes, saveNotes } from '../utils/storage';
import NoteList from '../components/NoteList';

const Trash = () => {
  const [trashedNotes, setTrashedNotes] = useState([]);

  const refresh = () => {
    const allNotes = getNotes();
    setTrashedNotes(allNotes.filter(n => n.deleted));
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleRestore = (id) => {
    const updatedNotes = getNotes().map(n =>
      n.id === id ? { ...n, deleted: false } : n
    );
    saveNotes(updatedNotes);
    refresh();
  };

  const handlePermanentDelete = (id) => {
    const updatedNotes = getNotes().filter(n => n.id !== id);
    saveNotes(updatedNotes);
    refresh();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Trashed Notes</h2>
      <NoteList
        notes={trashedNotes}
        onEdit={null}
        onDelete={handlePermanentDelete}
        onArchive={null}
        onTogglePin={null}
        onRestore={handleRestore} // ✅ This is critical
      />
      <p className="text-sm text-gray-400 mt-4">Restore to recover or click trash icon to delete permanently.</p>
    </div>
  );
};

export default Trash;