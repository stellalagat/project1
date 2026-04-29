import "./history.css";

const History = ({ tasks }) => {
  const completed = tasks.filter((t) => t.status === "Completed");
  const missed = tasks.filter((t) => t.status === "Missed");

  return (
    <div className="history-container">
      <h1>Task History</h1>

      {/* COMPLETED */}
      <div className="history-section">
        <h2>Completed</h2>
        {completed.length === 0 && <p>No completed tasks</p>}

        {completed.map((task) => (
          <div key={task._id} className="history-card completed">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
        ))}
      </div>

      {/* MISSED */}
      <div className="history-section">
        <h2>Missed</h2>
        {missed.length === 0 && <p>No missed tasks</p>}

        {missed.map((task) => (
          <div key={task._id} className="history-card missed">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;