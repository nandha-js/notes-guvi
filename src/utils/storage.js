export const getNotes = () => {
  const notes = localStorage.getItem('notes');
  return notes ? JSON.parse(notes) : [];
};

export const saveNotes = (notes) => {
  localStorage.setItem('notes', JSON.stringify(notes));
};

export const getTags = () => {
  const notes = getNotes();
  const tags = new Set();
  notes.forEach(note => {
    note.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
};