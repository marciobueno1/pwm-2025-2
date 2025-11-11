import { headerJson, instance, xParseSessionTokenKey } from "./config";

//headers: { [xParseSessionTokenKey]: sessionToken }

async function getTasks({ sessionToken }) {
  const response = await instance.get("/classes/Task", {
    headers: { [xParseSessionTokenKey]: sessionToken },
  });
  return response.data;
}

async function getTask({ objectId, sessionToken }) {
  console.log("getTask(objectId)", objectId);
  const response = await instance.get(`/classes/Task/${objectId}`, {
    headers: { [xParseSessionTokenKey]: sessionToken },
  });
  return response.data;
}

async function addTask({ description, sessionToken }) {
  return await instance.post(
    "/classes/Task",
    { description },
    {
      headers: { ...headerJson, [xParseSessionTokenKey]: sessionToken },
    }
  );
}

async function deleteTask({ objectId, sessionToken }) {
  return await instance.delete(`/classes/Task/${objectId}`);
}

async function updateTask({ objectId, done, sessionToken }) {
  return await instance.put(
    `/classes/Task/${objectId}`,
    { done: !done },
    {
      headers: { ...headerJson, [xParseSessionTokenKey]: sessionToken },
    }
  );
}

export { addTask, deleteTask, getTask, getTasks, updateTask };
