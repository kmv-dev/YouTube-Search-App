import axios from "axios";
const apiKey = "AIzaSyD1mHzBUhjdur7bswl9H7B4TiexmGsFE3o";

export default {
  async getYouTubeVideos({ commit }, { maxResults, search }) {
    try {
      await axios
        .get(
          `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&type=video&part=snippet&maxResults=${maxResults}&q=${search}`
        )
        .then(function (response) {
          console.log(response);
          commit("setYouTubeVideos", response);
        });
    } catch (e) {
      console.log(e);
    }
  },
};
