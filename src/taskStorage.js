export const TASKS_KEY = "tasks";

const browserStorage = () => window.localStorage;

function isTask(task) {
  return task !== null && typeof task === "object" &&
    typeof task.id === "string" && task.id.length > 0 &&
    typeof task.title === "string" &&
    typeof task.description === "string" &&
    typeof task.isCompleted === "boolean";
}

export function loadTaskState(getStorage = browserStorage) {
  try {
    const raw = getStorage().getItem(TASKS_KEY);
    if (raw === null) {
      return { tasks: [], persistenceEnabled: true, warning: null };
    }
    const tasks = JSON.parse(raw);
    if (!Array.isArray(tasks) || !tasks.every(isTask)) {
      return { tasks: [], persistenceEnabled: false, warning: "invalid" };
    }
    return { tasks, persistenceEnabled: true, warning: null };
  } catch (error) {
    return {
      tasks: [],
      persistenceEnabled: false,
      warning: error instanceof SyntaxError ? "invalid" : "unavailable",
    };
  }
}

export function saveTasks(tasks, getStorage = browserStorage) {
  try {
    getStorage().setItem(TASKS_KEY, JSON.stringify(tasks));
    return true;
  } catch {
    return false;
  }
}
