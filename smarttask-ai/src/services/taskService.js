// taskService.js

const STORAGE_KEY = "smarttask_tasks";

// Get all tasks
export const getTasks = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

// Save all tasks
export const saveTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

// Add task
export const addTask = (task) => {
  const tasks = getTasks();
  const newTask = {
    ...task,
    id: Date.now(),
    status: "todo",
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  saveTasks(tasks);

  return newTask;
};

// Update task
export const updateTask = (updatedTask) => {
  let tasks = getTasks();

  tasks = tasks.map((task) =>
    task.id === updatedTask.id ? updatedTask : task
  );

  saveTasks(tasks);
};

// Delete task
export const deleteTask = (id) => {
  const tasks = getTasks().filter((task) => task.id !== id);
  saveTasks(tasks);
};

// Toggle status
export const toggleTaskStatus = (id) => {
  const tasks = getTasks().map((task) => {
    if (task.id === id) {
      return {
        ...task,
        status: task.status === "completed" ? "todo" : "completed",
      };
    }
    return task;
  });

  saveTasks(tasks);
};