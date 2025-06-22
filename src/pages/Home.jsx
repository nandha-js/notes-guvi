import { useState, useEffect } from 'react';
import { getNotes, saveNotes, getTags } from '../utils/storage';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import TagFilter from '../components/TagFilter';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);

  // Load notes on mount (only active notes)
  useEffect(() => {
    const allNotes = getNotes();
    const activeNotes = allNotes.filter(note => !note.archived && !note.deleted);
    setNotes(activeNotes);
    setTags(getTags(allNotes)); // Pass all notes to extract tags
  }, []);

  // Filter notes when search term or tags change
  useEffect(() => {
    let result = notes;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(note =>
        note.title.toLowerCase().includes(term) ||
        note.content.toLowerCase().includes(term)
      );
    }

    if (selectedTags.length > 0) {
      result = result.filter(note =>
        selectedTags.some(tag => note.tags.includes(tag))
      );
    }

    setFilteredNotes(result);
  }, [notes, searchTerm, selectedTags]);

  // Add or update a note
  const handleSubmit = (noteData) => {
    const allNotes = getNotes(); // fresh from localStorage
    let updatedNotes;

    if (noteToEdit) {
      updatedNotes = allNotes.map(note =>
        note.id === noteData.id ? noteData : note
      );
    } else {
      updatedNotes = [...allNotes, noteData];
    }

    saveNotes(updatedNotes);

    const visibleNotes = updatedNotes.filter(note => !note.archived && !note.deleted);
    setNotes(visibleNotes);
    setTags(getTags(updatedNotes));
    setShowForm(false);
    setNoteToEdit(null);
  };

  // Edit existing note
  const handleEdit = (note) => {
    setNoteToEdit(note);
    setShowForm(true);
  };

  // Soft-delete a note
  const handleDelete = (id) => {
    const allNotes = getNotes();
    const updatedNotes = allNotes.map(note =>
      note.id === id ? { ...note, deleted: true, deletedAt: new Date().toISOString() } : note
    );

    saveNotes(updatedNotes);
    setNotes(updatedNotes.filter(note => !note.archived && !note.deleted));
  };

  // Toggle archive (and refresh notes)
  const handleArchive = (id) => {
    const allNotes = getNotes();
    const updatedNotes = allNotes.map(note =>
      note.id === id ? { ...note, archived: !note.archived } : note
    );

    saveNotes(updatedNotes);
    setNotes(updatedNotes.filter(note => !note.archived && !note.deleted));
  };

  // Toggle pinned status
  const handleTogglePin = (id) => {
    const allNotes = getNotes();
    const updatedNotes = allNotes.map(note =>
      note.id === id ? { ...note, pinned: !note.pinned } : note
    );

    saveNotes(updatedNotes);
    setNotes(updatedNotes.filter(note => !note.archived && !note.deleted));
  };

  return (
    <div className="flex-1 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Notes</h1>
        <button
          onClick={() => { setShowForm(true); setNoteToEdit(null); }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Note
        </button>
      </div>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <TagFilter tags={tags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />

      {showForm && (
        <div className="mb-6 bg-white p-6 rounded-lg shadow">
          <NoteForm
            noteToEdit={noteToEdit}
            onSubmit={handleSubmit}
            onCancel={() => { setShowForm(false); setNoteToEdit(null); }}
            allTags={tags}
          />
        </div>
      )}

      <NoteList
        notes={filteredNotes}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onArchive={handleArchive}
        onTogglePin={handleTogglePin}
      />
    </div>
  );
};

export default Home;
