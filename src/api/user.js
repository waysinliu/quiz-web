import instance from "../config/axios";

export function login(data) {
  return instance({
    url: "/user/login",
    method: "post",
    data
  });
}

export function signup(data) {
  return instance({
    url: "/user/signup",
    method: "post",
    data
  });
}

export function getUserInfo() {
  return instance({
    url: "/user",
    method: "get"
  });
}
