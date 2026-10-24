import test from "node:test";
import assert from "node:assert/strict";
import { filterTasks } from "../src/taskFilters.js";
const tasks = [
  { id: "1", title: "Revisar API", description: "Java e SQL", isCompleted: false },
  { id: "2", title: "Entregar", description: "Documentação", isCompleted: true },
];
test("searches title and description ignoring case and outer whitespace", () => {
  assert.deepEqual(filterTasks(tasks, " JAVA "), [tasks[0]]);
  assert.deepEqual(filterTasks(tasks, "documentação"), [tasks[1]]);
});
test("combines search and completion filter", () => {
  assert.deepEqual(filterTasks(tasks, "API", "completed"), []);
  assert.deepEqual(filterTasks(tasks, "", "pending"), [tasks[0]]);
  assert.deepEqual(filterTasks(tasks, "", "completed"), [tasks[1]]);
});
test("empty search returns all without modifying the source", () => {
  const original = structuredClone(tasks);
  assert.deepEqual(filterTasks(tasks), tasks);
  assert.deepEqual(filterTasks([], "API"), []);
  assert.deepEqual(tasks, original);
});
