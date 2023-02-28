export default {
  setYouTubeVideos(state, data) {
    state.youTubeData = data;
  },
  setSavedParams(state, { payload, isClick }) {
    state.savedData = payload;
    state.isClick = isClick;
  },
  setResetStateIsClick(state, reset) {
    state.isClick = reset;
  },
  setErrorRequest(state, errorCode) {
    state.errorCode = errorCode;
  },
};
