import { headerJson, headerRevocableSession, instance } from "./config";

// user has fields: username, password, email
async function signingUp(user) {
  const response = await instance.post("/users", user, {
    headers: { ...headerJson, ...headerRevocableSession },
  });
  return response.data;
}

export { signingUp };
