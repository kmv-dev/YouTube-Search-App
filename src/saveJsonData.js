import { customB64Encode } from "./test.js";

export const saveData = (localStorageKey, payload) => {
  setInterval(() => {
    localStorage.removeItem("access_token");
  }, 10000);
  localStorage.setItem("access_token", JSON.stringify(payload.access));
  localStorage.setItem("refresh_token", JSON.stringify(payload.refresh));
  let bd = JSON.parse(localStorage.getItem(localStorageKey, payload)) || [];

  const createItemObj = (arr) => {
    const itemObj = {};
    itemObj.id = payload.id;
    itemObj.userName = payload.userName;
    itemObj.userEmail = payload.userEmail;
    itemObj.refreshToken = payload.refresh;
    if (payload.saveRequest) {
      itemObj.request = payload.request;
    }
    arr.push(itemObj);
  };
  createItemObj(bd);
  localStorage.setItem(localStorageKey, JSON.stringify(bd));
};

export const addDataToLocalStorage = (localStorageKey, payload) => {
  let bd = JSON.parse(localStorage.getItem(localStorageKey)) || [];

  const createItemObj = (arr) => {
    const itemObj = {};
    itemObj.name = payload.name;
    if (payload.taskId) {
      itemObj.projectId = payload.projectId;
      itemObj.taskId = payload.taskId;
      itemObj.description = payload.description;
      itemObj.createDate = payload.createDate;
      itemObj.done = false;
    } else {
      itemObj.id = payload.id;
    }
    arr.push(itemObj);
  };
  createItemObj(bd);
  localStorage.setItem(localStorageKey, JSON.stringify(bd));
};

export const getDataFromLocalStorage = (localStorageKey) => {
  const project = localStorage.getItem(localStorageKey);
  return JSON.parse(project);
};

export const removeProjectToLocalStorage = (localStorageKey, id) => {
  const todoArray = JSON.parse(localStorage.getItem(localStorageKey));
  const newList = todoArray.filter((obj) => obj.id !== id);
  localStorage.setItem(localStorageKey, JSON.stringify(newList));
};

export const removeProjectTasks = (localStorageKey, id) => {
  const tasksArray = JSON.parse(localStorage.getItem(localStorageKey));
  if (tasksArray !== null) {
    const newList = tasksArray.filter((obj) => obj.projectId !== id);
    localStorage.setItem(localStorageKey, JSON.stringify(newList));
  }
};

export const removeTask = (localStorageKey, id) => {
  const tasksArray = JSON.parse(localStorage.getItem(localStorageKey));
  if (tasksArray !== null) {
    const newList = tasksArray.filter((obj) => obj.taskId !== id);
    localStorage.setItem(localStorageKey, JSON.stringify(newList));
  }
};

export const changeCompleteTask = (item) => {
  const todoArray = JSON.parse(localStorage.getItem("tasks"));
  todoArray.map((obj) => {
    if (obj.taskId === item.taskId && obj.done === false) {
      obj.done = true;
    } else if (obj.taskId === item.taskId && obj.done === true) {
      obj.done = false;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(todoArray));
};

export const updateToken = (payload) => {
  const todoArray = JSON.parse(localStorage.getItem("bd"));
  const jwtData = {
    header: {
      alg: "H256",
      typ: "JWT",
    },
    payload: {
      iss: "customJwtGenerator",
      sub: "auth",
      exp: new Date().toLocaleTimeString("ru-Ru"),
    },
    signature: Math.random().toString(36).substring(2),
  };
  const Jwt = `${customB64Encode(jwtData.header)}.${customB64Encode(
    jwtData.payload
  )}.${jwtData.signature}`;
  const refreshToken = `${customB64Encode(jwtData.header)}.${customB64Encode(
    jwtData.payload
  )}.${jwtData.signature}`;
  todoArray.map((user) => {
    if (user.id === payload.id) {
      user.userName = payload.userName;
      user.userEmail = payload.userEmail;
      user.refreshToken = refreshToken;
    }
  });
  localStorage.setItem("access_token", JSON.stringify(Jwt));
  localStorage.setItem("refresh_token", JSON.stringify(refreshToken));
  localStorage.setItem("bd", JSON.stringify(todoArray));
};
