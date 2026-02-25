export default function PresetHabitCard({ name, description, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col gap-1 p-3 text-left border border-gray-200 border-solid rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200"
    >
      <span className="text-sm font-medium text-gray-800">{name}</span>
      <span className="text-xs text-gray-400 line-clamp-2">{description}</span>
    </button>
  );
}
