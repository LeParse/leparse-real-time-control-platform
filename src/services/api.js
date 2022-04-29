import axios from "axios";

const api = axios.create({
  // baseURL: "http://vps38322.publiccloud.com.br:3030",
  baseURL: "http://localhost:3030/",
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
