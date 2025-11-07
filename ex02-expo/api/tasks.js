import { headerJson, instance } from "./config";

async function getTasks() {
  const response = await instance.get("/classes/Task");
  return response.data;
}

async function getTask(objectId) {
  console.log("getTask(objectId)", objectId);
  const response = await instance.get(`/classes/Task/${objectId}`);
  return response.data;
}

async function addTask(task) {
  return await instance.post("/classes/Task", task, {
    headers: headerJson,
  });
}

async function deleteTask(objectId) {
  return await instance.delete(`/classes/Task/${objectId}`);
}

async function updateTask({ objectId, done }) {
  return await instance.put(
    `/classes/Task/${objectId}`,
    { done: !done },
    {
      headers: headerJson,
    }
  );
}

export { addTask, deleteTask, getTask, getTasks, updateTask };
