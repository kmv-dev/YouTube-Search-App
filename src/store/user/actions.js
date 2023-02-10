export default {
  addUser({ commit }, { email, isAuth }) {
    commit("setUserData", { email, isAuth });
  },
};
