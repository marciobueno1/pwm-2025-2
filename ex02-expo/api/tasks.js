import { headerJson, instance, xParseSessionTokenKey } from "./config";

//headers: { [xParseSessionTokenKey]: sessionToken }

async function getTasks(sessionToken) {
  const response = await instance.get("/classes/Task", {
    headers: { [xParseSessionTokenKey]: sessionToken },
  });
  return response.data;
}

async function getTask({ objectId, sessionToken }) {
  const headers = { [xParseSessionTokenKey]: sessionToken };
  console.log("getTask(objectId)", objectId);
  const response = await instance.get(`/classes/Task/${objectId}`, {
    headers,
  });
  console.log("getTask - response.data", objectId, response.data);
  return response.data;
}

async function addTask({ description, sessionToken }) {
  const headers = { ...headerJson, [xParseSessionTokenKey]: sessionToken };
  console.log("--------------------------------------");
  console.log("addTask(description)", description);
  console.log("headers", headers);
  console.log("--------------------------------------");
  const response = await instance.post(
    "/classes/Task",
    { description },
    { headers }
  );
  console.log("--------------------------------------");
  console.log("addTask(response.data)", response.data);
  console.log("--------------------------------------");
  return response.data;
}

async function deleteTask({ objectId, sessionToken }) {
  const headers = { [xParseSessionTokenKey]: sessionToken };
  const response = await instance.delete(`/classes/Task/${objectId}`, {
    headers,
  });
  return response.data;
}

async function updateTask({ objectId, done, sessionToken }) {
  const headers = { ...headerJson, [xParseSessionTokenKey]: sessionToken };
  console.log("--------------------------------------");
  console.log("updateTask(objectId, done)", objectId, done);
  console.log("headers", headers);
  console.log("--------------------------------------");
  const response = await instance.put(
    `/classes/Task/${objectId}`,
    { done: !done },
    { headers }
  );
  console.log("--------------------------------------");
  console.log("response", response.data);
  console.log("--------------------------------------");
  return response.data;
}

export { addTask, deleteTask, getTask, getTasks, updateTask };
