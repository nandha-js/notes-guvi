import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const loadedNotes = getNotes().filter(note => !note.archived && !note.deleted);
    setNotes(loadedNotes);
    setTags(getTags());

    return setupOfflineListener(() => {
      setIsOnline(navigator.onLine);
      // Refresh data when coming back online
      if (navigator.onLine) {
        const refreshedNotes = getNotes().filter(note => !note.archived && !note.deleted);
        setNotes(refreshedNotes);
        setTags(getTags());
      }
    });
  }, []);

  // ... rest of your component logic

  return (
    <div className="flex-1 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Notes</h1>
        <button
          onClick={() => { setShowForm(true); setNoteToEdit(null); }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!isOnline && !noteToEdit}
          title={!isOnline ? "Can't create new notes offline" : "Create new note"}
        >
          Add Note
        </button>
      </div>
      
      {!isOnline && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <p className="text-yellow-700">
            You're currently offline. Some features may be limited.
          </p>
        </div>
      )}
      
      {/* Rest of your component */}
    </div>
  );
};

export default Home;