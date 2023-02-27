<template>
  <div class="favourites">
    <div class="favourites__inner">
      <h1 class="favourites__title">Избранное</h1>
      <FavouritesList :savedRequests="requests" @update="updateList" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import FavouritesList from "../components/FavouritesList/index.vue";

const requests = ref([]);

onMounted(async () => {
  getCurrentUserValue();
});

const getCurrentUserValue = () => {
  requests.value = JSON.parse(localStorage.getItem("saveRequests")) || [];
  if (requests.value) {
    requests.value = requests.value.filter(
      (el) => el.email === localStorage.getItem("userEmail")
    );
  }
  requests.value.reverse();
};

const updateList = () => {
  getCurrentUserValue();
};
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
