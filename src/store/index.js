import { createStore } from "vuex";
import user from "./user/index.js";
import youTube from "./youTube/index.js";
import modal from "./modal/index.js";

const store = createStore({
  modules: {
    user,
    youTube,
    modal,
  },
});

export default store;
