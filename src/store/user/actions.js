export default {
  addUser({ commit }, { email, isAuth }) {
    commit("setUserData", { email, isAuth });
  },
  setAuth({ commit }, { isAuth }) {
    commit("setAuth", { isAuth });
  },
  addSearchState({ commit }, { searchStatus, searchValue }) {
    commit("setSearchState", { searchStatus, searchValue });
  },
};
