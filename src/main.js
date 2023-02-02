import { createApp } from "vue";
import router from "./router";
import store from "./store";
import App from "./App.vue";

// global import components
import BaseButton from "@/components/ui-kit/BaseButton/index.vue";
import BaseField from "@/components/ui-kit/BaseField/index.vue";

const app = createApp(App);
app.component("BaseButton", BaseButton);
app.component("BaseField", BaseField);
app.use(store);
app.use(router);
app.mount("#app");
