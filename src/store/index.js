import { createStore } from "vuex";
import user from "./user/index.js";
import youTube from "./youTube/index.js";

const store = createStore({
  modules: {
    user,
    youTube,
  },
});

export default store;
