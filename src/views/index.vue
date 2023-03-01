<template>
  <div class="content">
    <div class="content__inner">
      <h1 class="content__title" :class="activeClass">Поиск видео</h1>
      <SearchField />
      <div v-if="activeClass[0].active">
        <VideoList
          :videos="getYouTubeResponce"
          :searchRequest="getSearchState.searchValue"
        ></VideoList>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import VideoList from "../components/VideoList/index.vue";
import SearchField from "../components/SearchField/index.vue";

const store = useStore();

//getters
const getYouTubeResponce = computed(() => store.getters.getSearchData);
const getSearchState = computed(() => store.getters.getSearchState);

const activeClass = computed(() => {
  return [
    {
      active: getSearchState.value.searchStatus,
    },
  ];
});
</script>

<style lang="scss">
.content {
  &__inner {
    @include container;
  }
  &__title {
    margin-left: calc(50% - 120px);
    margin-top: 18%;
    font-weight: 400;
    font-size: 36px;
    color: #000000;
    margin-bottom: 40px;
    transition: all 0.3s ease-in-out;
    &.active {
      margin: 40px 0 20px;
      font-size: 28px;
    }
  }
  @include _575 {
    &__title {
      margin-top: 30%;
      &.active {
        margin: 20px 0 10px;
        font-size: 20px;
      }
    }
  }
}
</style>
