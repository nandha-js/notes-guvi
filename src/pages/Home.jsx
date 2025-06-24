import { useEffect, useState } from 'react';
import NoteList from '../components/NoteList';
import NoteForm from '../components/NoteForm';
import { getNotes, saveNotes } from '../utils/storage';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

  // Load notes from localStorage
  const loadNotes = () => {
    const allNotes = getNotes().filter(note => !note.archived && !note.deleted);
    setNotes(allNotes);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  // ✅ Add or Update Note
  const handleSaveNote = (note) => {
    const allNotes = getNotes();
    const updatedNotes = allNotes.some(n => n.id === note.id)
      ? allNotes.map(n => (n.id === note.id ? note : n))
      : [...allNotes, note];

    saveNotes(updatedNotes);
    setShowForm(false);
    setNoteToEdit(null);
    loadNotes();
  };

  const handleDelete = (id) => {
    const updatedNotes = getNotes().map(note =>
      note.id === id ? { ...note, deleted: true } : note
    );
    saveNotes(updatedNotes);
    loadNotes();
  };

  const handleEdit = (note) => {
    setNoteToEdit(note);
    setShowForm(true);
  };

  const handleArchive = (id) => {
    const updatedNotes = getNotes().map(note =>
      note.id === id ? { ...note, archived: true } : note
    );
    saveNotes(updatedNotes);
    loadNotes();
  };

  const handlePinToggle = (id) => {
    const updatedNotes = getNotes().map(note =>
      note.id === id ? { ...note, pinned: !note.pinned } : note
    );
    saveNotes(updatedNotes);
    loadNotes();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📝 My Notes</h1>
        <button
          onClick={() => {
            setNoteToEdit(null);
            setShowForm(true);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Note
        </button>
      </div>

      {showForm && (
        <NoteForm
          noteToEdit={noteToEdit}
          onSave={handleSaveNote}
          onCancel={() => {
            setShowForm(false);
            setNoteToEdit(null);
          }}
        />
      )}

      <NoteList
        notes={notes}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onArchive={handleArchive}
        onTogglePin={handlePinToggle}
      />
    </div>
  );
};

export default Home;
