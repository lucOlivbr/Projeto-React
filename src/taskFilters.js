export function filterTasks(tasks, query = "", status = "all") {
  const term = query.trim().toLocaleLowerCase("pt-BR");
  return tasks.filter(task =>
    (status === "all" || (status === "completed" ? task.isCompleted : !task.isCompleted)) &&
    (task.title + " " + task.description).toLocaleLowerCase("pt-BR").includes(term)
  );
}
