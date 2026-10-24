import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";
import Title from "./components/Title";
import { filterTasks } from "./taskFilters";
import { loadTaskState, saveTasks } from "./taskStorage";


// Original study reference: https://youtu.be/2RWsLmu8yVc?t=7369
function App() {
  const [initialStorage] = useState(() => loadTaskState());
  const [tasks, setTasks] = useState(initialStorage.tasks);
  const [storageWarning, setStorageWarning] = useState(initialStorage.warning);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const visibleTasks = filterTasks(tasks, query, status);

  useEffect(() => {
    // Preserve invalid stored data instead of replacing it with an empty list.
    if (!initialStorage.persistenceEnabled) return;
    setStorageWarning(saveTasks(tasks) ? null : "unavailable");
  }, [tasks, initialStorage.persistenceEnabled]);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-full min-h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-full max-w-[500px] space-y-4">

        <Title>
          Gerenciador de Tarefas
        </Title>
        {storageWarning && (
          <p role="alert" className="rounded bg-amber-100 p-3 text-sm text-amber-950">
            {storageWarning === "invalid"
              ? "Os dados salvos não puderam ser lidos e foram preservados. Novas tarefas ficarão apenas nesta sessão."
              : "Não foi possível salvar no navegador. As alterações podem ficar apenas nesta sessão."}
          </p>
        )}

        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <section className="rounded bg-slate-200 p-4 space-y-3" aria-label="Filtros de tarefas">
          <p role="status">{tasks.filter(task => !task.isCompleted).length} pendentes de {tasks.length} tarefas</p>
          <label htmlFor="task-search" className="block">Buscar tarefas</label>
          <input id="task-search" type="search" value={query}
            className="w-full rounded p-2" onChange={event => setQuery(event.target.value)} />
          <label htmlFor="task-status" className="block">Situação</label>
          <select id="task-status" value={status} className="w-full rounded p-2"
            onChange={event => setStatus(event.target.value)}>
            <option value="all">Todas</option>
            <option value="pending">Pendentes</option>
            <option value="completed">Concluídas</option>
          </select>
          {visibleTasks.length === 0 && <p>Nenhuma tarefa encontrada.</p>}
        </section>
        <Tasks
          tasks={visibleTasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
