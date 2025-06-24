import { useEffect, useState } from 'react';
import { getNotes, saveNotes } from '../utils/storage';
import NoteList from '../components/NoteList';

const Trash = () => {
  const [trashedNotes, setTrashedNotes] = useState([]);

  const refresh = () => {
    const data = getNotes().filter(n => n.deleted);
    setTrashedNotes(data);
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

  const handleDeleteForever = (id) => {
    const updatedNotes = getNotes().filter(n => n.id !== id);
    saveNotes(updatedNotes);
    refresh();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🗑 Trash</h2>
      <NoteList
        notes={trashedNotes}
        onDelete={handleDeleteForever}
        onRestore={handleRestore}
        onEdit={() => {}}
        onArchive={() => {}}
        onTogglePin={() => {}}
      />
      <p className="text-sm text-gray-500 mt-4">
        Restore to recover or delete permanently.
      </p>
    </div>
  );
};

export default Trash;
