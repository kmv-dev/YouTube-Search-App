<template>
  <div class="favourites">
    <div class="favourites__inner">
      <h1 class="favourites__title">Избранное</h1>
      <FavouritesList :savedRequests="requests" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import FavouritesList from "../components/FavouritesList/index.vue";

const requests = ref([]);

onMounted(async () => {
  requests.value = await JSON.parse(localStorage.getItem("saveRequests"));
  requests.value = requests.value.filter(
    (el) => el.email === localStorage.getItem("userEmail")
  );
});
</script>

<style lang="scss" scoped>
.favourites {
  &__inner {
    @include container;
  }
  &__title {
    font-weight: 400;
    font-size: 28px;
    margin: 40px 0;
  }
}
</style>
