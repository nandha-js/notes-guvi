import { useState, useEffect } from 'react';
import { getNotes, saveNotes } from '../utils/storage';

const NoteForm = ({ noteToEdit, onSubmit, onCancel, allTags }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Load note to edit
  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setTags(noteToEdit.tags || []);
    }
  }, [noteToEdit]);

  // Detect online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Handle form submit
  const handleSubmit = (e) => {
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

    const currentNotes = getNotes();
    const updatedNotes = noteToEdit
      ? currentNotes.map(note => note.id === noteData.id ? noteData : note)
      : [...currentNotes, noteData];

    saveNotes(updatedNotes);
    onSubmit(noteData);
  };

  // Tag operations
  const addTag = () => {
    const tag = newTag.trim();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Offline warning */}
      {!isOnline && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
          <p className="text-yellow-700 text-sm">
            You're currently offline. Changes will be saved locally and synced later.
          </p>
        </div>
      )}

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter note title"
          required
        />
      </div>

      {/* Content */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          id="content"
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your note here"
          required
        />
      </div>

      {/* Tags */}
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
        <div className="mt-1 flex">
          <input
            type="text"
            id="tags"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            className="w-full border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Type and press Enter"
            aria-label="New tag input"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-700 hover:bg-gray-100"
            aria-label="Add tag"
          >
            Add
          </button>
        </div>

        {/* Current Tags */}
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-blue-400 hover:text-blue-600 font-bold"
                  aria-label={`Remove tag ${tag}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Suggested Tags */}
        {allTags.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-1">Suggested tags:</p>
            <div className="flex flex-wrap gap-2">
              {allTags
                .filter(tag => !tags.includes(tag))
                .map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setTags([...tags, tag])}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200"
                    aria-label={`Add suggested tag ${tag}`}
                  >
                    {tag}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          {noteToEdit ? 'Update Note' : 'Add Note'}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
