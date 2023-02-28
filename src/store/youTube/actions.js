import axios from "axios";
const apiKey = "AIzaSyD1mHzBUhjdur7bswl9H7B4TiexmGsFE3o";

export default {
  async getYouTubeVideos({ commit }, { maxResults, search, sort }) {
    try {
      await axios
        .get(
          `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&type=video&part=snippet&order=${sort}&maxResults=${maxResults}&q=${search}`
        )
        .then(async function (response) {
          const results = await Promise.all(
            response.data.items.map(async (item) => {
              item.viewCount = await axios.get(
                `https://www.googleapis.com/youtube/v3/videos?id=${item.id.videoId}&key=${apiKey}&part=statistics`
              );
              item.totalVideos = response.data.pageInfo.totalResults;
              return item;
            })
          );
          results.totalVideos = response.data.pageInfo.totalResults;
          commit("setYouTubeVideos", results);
        });
    } catch (e) {
      console.log(e);
      commit("setErrorRequest", e.response.status);
    }
  },

  // дополнительно добавил состояние клика isClick чтобы определять на странице поиска перешел ли юзер с сохраненного item или с навигации
  setSavedRequestParams({ commit }, { payload, isClick }) {
    commit("setSavedParams", { payload, isClick });
  },

  //сброс состояния клика если мы переходим не кликая по сохраненному запросу на странице избранное, а переходим с навигации
  resetStateIsClick({ commit }, reset) {
    commit("setResetStateIsClick", reset);
  },
};
