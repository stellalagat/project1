export const getNextTask = (tasks) => {
  const priorityWeight = {
    High: 3,
    Medium: 2,
    Low: 1,
  };

  const pendingTasks = tasks.filter((t) => !t.done);

  if (pendingTasks.length === 0) return null;

  const scored = pendingTasks.map((task) => {
    const score = priorityWeight[task.priority] || 1;
    return { ...task, score };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored[0];
};