import { useState, useEffect, useCallback } from 'react';
import { getNotes, saveNotes, getTags, setupOfflineListener } from '../utils/storage';
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
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Refresh notes from storage
  const refreshNotes = useCallback(() => {
    const allNotes = getNotes().filter(note => !note.archived && !note.deleted);
    setNotes(allNotes);
    setTags(getTags());
  }, []);

  useEffect(() => {
    refreshNotes();

    return setupOfflineListener(() => {
      setIsOnline(navigator.onLine);
      if (navigator.onLine) {
        refreshNotes();
      }
    });
  }, [refreshNotes]);

  // Filtering notes
  useEffect(() => {
    let result = [...notes];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(note =>
        note.title.toLowerCase().includes(term) ||
        note.content.toLowerCase().includes(term)
      );
    }

    if (selectedTags.length > 0) {
      result = result.filter(note =>
        selectedTags.some(tag => note.tags?.includes(tag))
      );
    }

    setFilteredNotes(result);
  }, [notes, searchTerm, selectedTags]);

  const handleSubmit = (noteData) => {
    const updatedNotes = noteToEdit
      ? notes.map(note => (note.id === noteData.id ? noteData : note))
      : [...notes, noteData];

    setNotes(updatedNotes.filter(note => !note.archived && !note.deleted));
    saveNotes(updatedNotes);
    setShowForm(false);
    setNoteToEdit(null);
    setTags(getTags());
  };

  const handleEdit = (note) => {
    setNoteToEdit(note);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, deleted: true, deletedAt: new Date().toISOString() } : note
    );
    setNotes(updatedNotes.filter(note => !note.deleted && !note.archived));
    saveNotes(updatedNotes);
  };

  const handleArchive = (id) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, archived: !note.archived } : note
    );
    setNotes(updatedNotes.filter(note => !note.archived && !note.deleted));
    saveNotes(updatedNotes);
  };

  const handleTogglePin = (id) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, pinned: !note.pinned } : note
    );
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  return (
    <div className="flex-1 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">📝 All Notes</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setNoteToEdit(null);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!isOnline && !noteToEdit}
          title={!isOnline && !noteToEdit ? "Can't create new notes offline" : "Create new note"}
        >
          + Add Note
        </button>
      </div>

      {!isOnline && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 text-yellow-700 text-sm rounded">
          You're currently offline. Some features may be limited.
        </div>
      )}

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <TagFilter tags={tags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />

      {showForm && (
        <div className="mb-6 bg-white p-6 rounded-lg shadow">
          <NoteForm
            noteToEdit={noteToEdit}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setNoteToEdit(null);
            }}
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
