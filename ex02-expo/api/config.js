import axios from "axios";

export const headerJson = {
  "Content-Type": "application/json",
};

export const headerRevocableSession = {
  "X-Parse-Revocable-Session": "1",
};

export const instance = axios.create({
  baseURL: "https://parseapi.back4app.com",
  timeout: 1000,
  headers: {
    "X-Parse-Application-Id": "b44WHXPs2YqHDajovVVALA8b6labKQP4nDbR2WsG",
    "X-Parse-JavaScript-Key": "SJvyjqtUsQlMIdYeckPIv5FNT7sILBDmBnmQVSCN",
  },
});
