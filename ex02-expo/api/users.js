import {
  headerJson,
  headerRevocableSession,
  instance,
  xParseSessionTokenKey,
} from "./config";

// user has fields: username, password, email
async function signingUp(user) {
  const response = await instance.post("/users", user, {
    headers: { ...headerJson, ...headerRevocableSession },
  });
  return response.data;
}

async function loggingOut({ sessionToken }) {
  const response = await instance.post("/logout", "", {
    headers: { [xParseSessionTokenKey]: sessionToken },
  });
  return response.data;
}

async function loggingIn({ username, password }) {
  const response = await instance.post(
    "/login",
    new URLSearchParams({
      username,
      password,
    }),
    {
      headers: headerRevocableSession,
    }
  );
  return response.data;
}

export { loggingIn, loggingOut, signingUp };
