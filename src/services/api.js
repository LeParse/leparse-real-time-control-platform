import axios from "axios";

const api = axios.create({
  baseURL: "https://api.leparse.tech:3030",
  // baseURL: "http://localhost:3030/",
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
