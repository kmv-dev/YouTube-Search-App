import { createApp } from "vue";
import router from "./router";
import store from "./store";
import App from "./App.vue";

// global import ui-kit components
import BaseButton from "@/components/ui-kit/BaseButton/index.vue";
import BaseField from "@/components/ui-kit/BaseField/index.vue";
import BaseDropdown from "@/components/ui-kit/BaseDropdown/index.vue";
import BaseRange from "@/components/ui-kit/BaseRange/index.vue";
import BaseModal from "@/components/ui-kit/BaseModal/index.vue";

const app = createApp(App);
app.component("BaseButton", BaseButton);
app.component("BaseField", BaseField);
app.component("BaseDropdown", BaseDropdown);
app.component("BaseRange", BaseRange);
app.component("BaseModal", BaseModal);
app.use(store);
app.use(router);
app.mount("#app");
