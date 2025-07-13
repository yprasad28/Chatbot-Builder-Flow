export default function Sidebar({ onAddNode }) {
  return (
    <div className="fixed right-0 top-0 h-full w-full max-w-xs md:w-48 bg-white shadow-lg flex flex-col gap-4 p-4 z-10 overflow-auto">
      <h2 className="text-lg font-bold mb-2">Add Node</h2>
      <button
        className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
        onClick={() => onAddNode('message')}
      >
        + Message Node
      </button>
      <button
        className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
        onClick={() => onAddNode('userInput')}
      >
        + User Input Node
      </button>
    </div>
  );
} 