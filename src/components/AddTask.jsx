import { useState } from "react";
import Input from "./input";

function AddTask({ onAddTaskSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Preencha o título e a descrição da tarefa.");
      return;
    }
    onAddTaskSubmit(title.trim(), description.trim());
    setTitle("");
    setDescription("");
    setError("");
  }

  return (
    <form onSubmit={submit} className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
      <label htmlFor="task-title">Título</label>
      <Input id="task-title" required maxLength={120} value={title}
        aria-describedby={error ? "task-error" : undefined}
        onChange={event => setTitle(event.target.value)} />
      <label htmlFor="task-description">Descrição</label>
      <Input id="task-description" required maxLength={2000} value={description}
        aria-describedby={error ? "task-error" : undefined}
        onChange={event => setDescription(event.target.value)} />
      {error && <p id="task-error" role="alert">{error}</p>}
      <button type="submit" className="bg-slate-700 text-white px-4 py-2 rounded-md font-medium">
        Adicionar
      </button>
    </form>
  );
}
export default AddTask;
