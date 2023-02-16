export const setLocalStorage = (localStorageKey, payload) => {
  let data = JSON.parse(localStorage.getItem(localStorageKey, payload)) || [];

  const createItemObj = (arr) => {
    const itemObj = {};
    itemObj.id = payload.id;
    itemObj.userEmail = payload.userEmail;
    itemObj.userPassword = payload.userPassword;
    arr.push(itemObj);
  };
  createItemObj(data);
  localStorage.setItem(localStorageKey, JSON.stringify(data));
};
