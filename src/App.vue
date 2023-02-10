<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import guestLayout from "./layouts/guest.vue";
import defaultLayout from "./layouts/default.vue";

const route = useRoute();
const layout = computed(() => {
  const layout = route.meta.layout;
  return layout === "default" ? defaultLayout : guestLayout;
});
</script>
