export default function TaskCard({ task, onDelete, onToggle }) {
  return (
    <div className="card flex justify-between items-center">
      
      <div>
        <h3 className={`font-semibold text-lg ${task.done ? "line-through text-gray-400" : ""}`}>
          {task.title}
        </h3>
        <p className="text-sm text-gray-500">{task.priority}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onToggle(task.id)}
          className="btn btn-success"
        >
          {task.done ? "Undo" : "Done"}
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
}