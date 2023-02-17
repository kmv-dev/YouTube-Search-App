export default {
  addUser({ commit }, { email, isAuth }) {
    commit("setUserData", { email, isAuth });
  },
  setAuth({ commit }, { isAuth }) {
    commit("setAuth", { isAuth });
  },
};
