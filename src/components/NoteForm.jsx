import { useState, useEffect } from 'react';
import { getNotes, saveNotes } from '../utils/storage';

const NoteForm = ({ noteToEdit, onSubmit, onCancel, allTags }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setTags(noteToEdit.tags || []);
    }
  }, [noteToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const noteData = {
      id: noteToEdit?.id || Date.now().toString(),
      title,
      content,
      tags,
      pinned: noteToEdit?.pinned || false,
      archived: noteToEdit?.archived || false,
      updatedAt: new Date().toISOString(),
    };

    // Save to localStorage immediately
    const currentNotes = getNotes();
    const updatedNotes = noteToEdit
      ? currentNotes.map(note => note.id === noteData.id ? noteData : note)
      : [...currentNotes, noteData];
    
    saveNotes(updatedNotes);
    onSubmit(noteData);
  };

  // ... rest of the component remains the same
  // Add offline warning
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!isOnline && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
          <p className="text-yellow-700">
            You're currently offline. Changes will be saved locally and synced when you're back online.
          </p>
        </div>
      )}
      {/* Rest of your form */}
    </form>
  );
};

export default NoteForm;