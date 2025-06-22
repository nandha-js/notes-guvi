import NoteCard from './NoteCard';

const NoteList = ({ notes, onEdit, onDelete, onArchive, onTogglePin, onRestore }) => {
  if (notes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No notes found. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {[...notes.filter(n => n.pinned), ...notes.filter(n => !n.pinned)].map(note => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
          onArchive={onArchive}
          onTogglePin={onTogglePin}
          onRestore={onRestore} // ✅ Ensure restore is passed
        />
      ))}
    </div>
  );
};

export default NoteList;