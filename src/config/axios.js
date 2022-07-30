import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "http://weless.top:8080/quiz",
  timeout: 5000
});

instance.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers["token"] = token;
    }
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (resp) => {
    return resp;
  },
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("token");
      location.reload();
    }
    return Promise.reject(err);
  }
);

export default instance;
