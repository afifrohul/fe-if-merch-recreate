import axios from "axios";

export const api = axios.create({
  baseURL: "https://be-if-merch-recreate.test/api",
  withCredentials: true,
});
