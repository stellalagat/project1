import { useDraggable } from "@dnd-kit/core";

const TaskCard = ({ task, onEdit, onUpdateStatus }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task._id,
    });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`task-card ${task.status === "Overdue" ? "overdue" : ""}`}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
      }}
    >
      {/* STATUS */}
      <span className="status-badge">{task.status}</span>

      {/* TITLE */}
      <h3>{task.title}</h3>

      {/* DESCRIPTION */}
      <p>{task.description}</p>

      {/* ACTIONS */}
      <div className="task-actions">

        {/* EDIT */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(task);
          }}
        >
          Edit
        </button>

        {/* COMPLETE */}
        {task.status !== "Completed" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpdateStatus(task._id, "Completed");
            }}
          >
            Complete
          </button>
        )}

        {/* MISSED */}
        {task.status === "Overdue" && (
          <button
            className="delete"
            onClick={(e) => {
              e.stopPropagation();
              onUpdateStatus(task._id, "Missed");
            }}
          >
            Mark Missed
          </button>
        )}

      </div>
    </div>
  );
};

export default TaskCard;