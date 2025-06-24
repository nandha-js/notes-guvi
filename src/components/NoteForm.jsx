import { useEffect, useState } from 'react';
import { getTags } from '../utils/storage';

const NoteForm = ({ noteToEdit, onSave, onCancel }) => {
  const [title, setTitle] = useState(noteToEdit?.title || '');
  const [content, setContent] = useState(noteToEdit?.content || '');
  const [tags, setTags] = useState(noteToEdit?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [allTags, setAllTags] = useState([]);

  // Load all existing tags
  useEffect(() => {
    setAllTags(getTags());
  }, []);

  const handleAddTag = () => {
    const cleanTag = tagInput.trim().toLowerCase();
    if (cleanTag && !tags.includes(cleanTag)) {
      setTags([...tags, cleanTag]);
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;

    const newNote = {
      ...noteToEdit,
      title: title.trim(),
      content: content.trim(),
      tags,
      pinned: noteToEdit?.pinned || false,
      archived: noteToEdit?.archived || false,
      deleted: noteToEdit?.deleted || false,
      updatedAt: new Date().toISOString(),
      createdAt: noteToEdit?.createdAt || new Date().toISOString(),
      id: noteToEdit?.id || Date.now()
    };

    onSave(newNote);
    setTitle('');
    setContent('');
    setTags([]);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {noteToEdit ? 'Edit Note' : 'Add New Note'}
      </h2>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-3">
        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border px-3 py-2 rounded h-32 resize-none"
        />
      </div>

      {/* Tags Section */}
      <div className="mb-3">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Add tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="flex-1 border px-2 py-1 rounded"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="bg-blue-500 text-white px-3 rounded hover:bg-blue-600"
          >
            Add Tag
          </button>
        </div>

        {/* Show added tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span
                key={tag}
                className="bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded-full flex items-center gap-1"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-red-500 ml-1 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm text-gray-500 hover:text-black"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600"
        >
          {noteToEdit ? 'Update Note' : 'Add Note'}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
