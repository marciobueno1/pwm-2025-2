import axios from "axios";

const headerJson = {
  "Content-Type": "application/json",
};

const instance = axios.create({
  baseURL: "https://parseapi.back4app.com",
  timeout: 1000,
  headers: {
    "X-Parse-Application-Id": "b44WHXPs2YqHDajovVVALA8b6labKQP4nDbR2WsG",
    "X-Parse-JavaScript-Key": "SJvyjqtUsQlMIdYeckPIv5FNT7sILBDmBnmQVSCN",
  },
});

export async function getTasks() {
  const response = await instance.get("/classes/Task");
  return response.data;
}

export async function getTask(objectId) {
  console.log("getTask(objectId)", objectId);
  const response = await instance.get(`/classes/Task/${objectId}`);
  return response.data;
}

export async function addTask(task) {
  return await instance.post("/classes/Task", task, {
    headers: headerJson,
  });
}

export async function deleteTask(objectId) {
  return await instance.delete(`/classes/Task/${objectId}`);
}

export async function updateTask({ objectId, done }) {
  return await instance.put(
    `/classes/Task/${objectId}`,
    { done: !done },
    {
      headers: headerJson,
    }
  );
}
