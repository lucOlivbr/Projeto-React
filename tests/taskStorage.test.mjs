import test from "node:test";
import assert from "node:assert/strict";
import { loadTaskState, saveTasks } from "../src/taskStorage.js";

const task = { id: "task-1", title: "Estudar", description: "Revisar React", isCompleted: false };
function memoryStorage(raw = null) {
  let value = raw;
  return { getItem: () => value, setItem: (_key, next) => { value = next; } };
}

test("first visit starts empty with persistence enabled", () => {
  assert.deepEqual(loadTaskState(() => memoryStorage()), { tasks: [], persistenceEnabled: true, warning: null });
});
test("loads existing tasks without changing their fields", () => {
  assert.deepEqual(loadTaskState(() => memoryStorage(JSON.stringify([task]))).tasks, [task]);
});
test("accepts an empty stored list", () => {
  assert.equal(loadTaskState(() => memoryStorage("[]")).persistenceEnabled, true);
});
for (const raw of ["{invalid", "{}", "null", "42", '"text"', '[null]', '[{}]', JSON.stringify([{ ...task, isCompleted: "false" }])]) {
  test(`invalid stored data is preserved: ${raw}`, () => {
    const storage = memoryStorage(raw);
    const result = loadTaskState(() => storage);
    assert.deepEqual(result, { tasks: [], persistenceEnabled: false, warning: "invalid" });
    assert.equal(storage.getItem("tasks"), raw);
  });
}
test("does not silently discard the invalid part of a mixed list", () => {
  const raw = JSON.stringify([task, { ...task, title: null }]);
  const storage = memoryStorage(raw);
  assert.equal(loadTaskState(() => storage).persistenceEnabled, false);
  assert.equal(storage.getItem("tasks"), raw);
});
test("handles browsers that block access to localStorage", () => {
  assert.equal(loadTaskState(() => { throw new Error("blocked"); }).warning, "unavailable");
});
test("handles a failed storage read", () => {
  assert.equal(loadTaskState(() => ({ getItem() { throw new Error("read failed"); } })).warning, "unavailable");
});
test("saves completed and new tasks with a round trip", () => {
  const storage = memoryStorage();
  const tasks = [{ ...task, isCompleted: true }];
  assert.equal(saveTasks(tasks, () => storage), true);
  assert.deepEqual(loadTaskState(() => storage).tasks, tasks);
});
test("a full storage does not throw or overwrite old data", () => {
  const raw = JSON.stringify([task]);
  const storage = { getItem: () => raw, setItem() { throw new Error("quota"); } };
  assert.equal(saveTasks([], () => storage), false);
  assert.equal(storage.getItem("tasks"), raw);
});
test("saving without browser storage does not throw", () => {
  assert.equal(saveTasks([task], () => { throw new Error("blocked"); }), false);
});
