import instance from "../config/axios";

export function getCardList(setId) {
  return instance({
    url: `/card/${setId}`,
    method: "get"
  });
}

export function getStudyList(setId) {
  return instance({
    url: `/card/${setId}/study`,
    method: "get"
  });
}

export function createCard(data) {
  return instance({
    url: "/card",
    method: "post",
    data
  });
}

export function updateCard(data) {
  return instance({
    url: "/card",
    method: "put",
    data
  });
}

export function updateCardProgress(data) {
  return instance({
    url: "/card/progress",
    method: "put",
    data
  });
}

export function deleteCard(cardId) {
  return instance({
    url: `/card/${cardId}`,
    method: "delete"
  });
}
