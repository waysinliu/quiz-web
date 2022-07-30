import instance from "../config/axios";

export function getSetInfo(setId) {
  return instance({
    url: `/set/${setId}`,
    method: "get"
  });
}

export function getSetList() {
  return instance({
    url: "/set",
    method: "get"
  });
}

export function updateSet(data) {
  return instance({
    url: "/set",
    method: "put",
    data
  });
}
