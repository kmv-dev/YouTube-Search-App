export default {
  setUserData(state, { email, isAuth }) {
    state.user.email = email;
    state.user.isAuth = isAuth;
  },
};
