const TagFilter = ({ tags, selectedTags, setSelectedTags }) => {
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by tags:</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              aria-pressed={isSelected}
              className={`px-3 py-1 text-xs rounded-full border transition-colors duration-200 
                ${isSelected
                  ? 'bg-blue-100 text-blue-800 border-blue-300'
                  : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'}`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TagFilter;
