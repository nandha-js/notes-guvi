import { useEffect, useState } from 'react';
import { getNotes, saveNotes } from '../utils/storage';
import NoteList from '../components/NoteList';

const Archives = () => {
  const [archivedNotes, setArchivedNotes] = useState([]);

  const refresh = () => {
    const allNotes = getNotes();
    setArchivedNotes(allNotes.filter(n => n.archived && !n.deleted));
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleUnarchive = (id) => {
    const updatedNotes = getNotes().map(n =>
      n.id === id ? { ...n, archived: false } : n
    );
    saveNotes(updatedNotes);
    refresh();
  };

  const handleDelete = (id) => {
    const updatedNotes = getNotes().map(n =>
      n.id === id ? { ...n, deleted: true, deletedAt: new Date().toISOString() } : n
    );
    saveNotes(updatedNotes);
    refresh();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Archived Notes</h2>
      <NoteList
        notes={archivedNotes}
        onEdit={null}
        onDelete={handleDelete}
        onArchive={handleUnarchive}
        onTogglePin={null}
      />
    </div>
  );
};

export default Archives;