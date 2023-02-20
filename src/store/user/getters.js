export default {
  getUserName: (state) => state.user.email,
  getAuthStatus: (state) => state.user.isAuth,
  getSearchState: (state) => state.search,
};
