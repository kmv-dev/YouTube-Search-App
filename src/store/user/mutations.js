export default {
  setUserData(state, { email, isAuth }) {
    state.user.email = email;
    state.user.isAuth = isAuth;
  },
  setAuth(state, { isAuth }) {
    state.user.isAuth = isAuth;
  },
  setSearchState(state, { searchStatus, searchValue }) {
    state.search.searchStatus = searchStatus;
    state.search.searchValue = searchValue;
  },
};
