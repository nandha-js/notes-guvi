const NOTES_KEY = 'notes';

// Check if localStorage is available
const isLocalStorageAvailable = () => {
  try {
    const testKey = '__test';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

// Get all notes from localStorage or fallback
export const getNotes = () => {
  try {
    if (!isLocalStorageAvailable()) {
      console.warn('LocalStorage not available - using fallback');
      return window.__notesFallback || [];
    }

    const notes = localStorage.getItem(NOTES_KEY);
    return notes ? JSON.parse(notes) : [];
  } catch (error) {
    console.error('❌ Error getting notes:', error);
    return [];
  }
};

// Save all notes to localStorage or fallback
export const saveNotes = (notes) => {
  try {
    if (!Array.isArray(notes)) throw new Error('Notes must be an array');

    if (!isLocalStorageAvailable()) {
      window.__notesFallback = notes;
      return;
    }

    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('❌ Error saving notes:', error);
  }
};

// Add or update a note
export const upsertNote = (note) => {
  const notes = getNotes();
  const index = notes.findIndex(n => n.id === note.id);

  if (index > -1) {
    notes[index] = note;
  } else {
    notes.push(note);
  }

  saveNotes(notes);
};

// Archive a note by ID
export const archiveNote = (id) => {
  const notes = getNotes().map(note =>
    note.id === id ? { ...note, archived: true } : note
  );
  saveNotes(notes);
};

// Unarchive a note
export const unarchiveNote = (id) => {
  const notes = getNotes().map(note =>
    note.id === id ? { ...note, archived: false } : note
  );
  saveNotes(notes);
};

// Move a note to trash
export const moveToTrash = (id) => {
  const notes = getNotes().map(note =>
    note.id === id ? { ...note, deleted: true, deletedAt: new Date().toISOString() } : note
  );
  saveNotes(notes);
};

// Restore a note from trash
export const restoreNote = (id) => {
  const notes = getNotes().map(note =>
    note.id === id ? { ...note, deleted: false } : note
  );
  saveNotes(notes);
};

// Permanently delete a note
export const deleteNotePermanently = (id) => {
  const notes = getNotes().filter(note => note.id !== id);
  saveNotes(notes);
};

// Get all unique tags
export const getTags = () => {
  const tags = new Set();
  getNotes().forEach(note => {
    (note.tags || []).forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
};

// Online/offline handling
export const checkOnlineStatus = () => navigator.onLine;

export const setupOfflineListener = (callback) => {
  if (typeof callback !== 'function') return () => {};
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);

  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
};
