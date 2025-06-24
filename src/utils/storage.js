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

const fallbackKey = '__notesFallback';

export const getNotes = () => {
  try {
    if (!isLocalStorageAvailable()) {
      console.warn('LocalStorage not available - using in-memory fallback');
      return window[fallbackKey] || [];
    }

    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
  } catch (error) {
    console.error('❌ Error getting notes:', error);
    return [];
  }
};

export const saveNotes = (notes) => {
  try {
    if (!Array.isArray(notes)) {
      throw new Error('Notes must be an array');
    }

    if (!isLocalStorageAvailable()) {
      console.warn('LocalStorage not available - storing in memory');
      window[fallbackKey] = notes;
      return;
    }

    localStorage.setItem('notes', JSON.stringify(notes));

    if (navigator.onLine && typeof window.syncNotes === 'function') {
      window.syncNotes();
    }
  } catch (error) {
    console.error('❌ Error saving notes:', error);
  }
};

export const getTags = () => {
  const tagsSet = new Set();

  getNotes().forEach(note => {
    (note.tags || []).forEach(tag => {
      const cleanTag = tag.trim().toLowerCase();
      if (cleanTag) tagsSet.add(cleanTag);
    });
  });

  return Array.from(tagsSet);
};

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
