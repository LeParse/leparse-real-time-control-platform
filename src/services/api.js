import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:3030",
  // baseURL: "http://192.168.100.8:3030/",
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (401 === error.response.status) {
      window.location = "/?noToken=true";
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
