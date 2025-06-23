const isLocalStorageAvailable = () => {
  try {
    const testKey = 'test';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

export const getNotes = () => {
  try {
    if (!isLocalStorageAvailable()) {
      console.warn('LocalStorage not available - using fallback');
      return window.__notesFallback || [];
    }
    
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
  } catch (error) {
    console.error('Error accessing notes:', error);
    return [];
  }
};

export const saveNotes = (notes) => {
  try {
    if (!isLocalStorageAvailable()) {
      console.warn('LocalStorage not available - using fallback');
      window.__notesFallback = notes;
      return;
    }
    
    localStorage.setItem('notes', JSON.stringify(notes));
    
    if (navigator.onLine && window.syncNotes) {
      window.syncNotes();
    }
  } catch (error) {
    console.error('Error saving notes:', error);
  }
};

export const getTags = () => {
  const notes = getNotes();
  const tags = new Set();
  notes.forEach(note => {
    note.tags?.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
};

export const checkOnlineStatus = () => {
  return navigator.onLine;
};

export const setupOfflineListener = (callback) => {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
};