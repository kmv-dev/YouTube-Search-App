<template>
  <div class="content">
    <div class="content__inner">
      <h1 class="content__title" :class="activeClass">Поиск видео</h1>
      <form action="#" @submit.prevent="search" id="searchForm">
        <BaseField
          v-model:value="v.searchValue.$model"
          class="content__field"
          isSearchField
          :class="activeClass"
          :placeholder="'поиск'"
          :error="v.searchValue.$errors"
          ><template v-slot:button
            ><BaseButton
              isSearch
              :isLoading="loading"
              :type="'submit'"
              :form="'searchForm'"
              :name="nameButton" /></template
        ></BaseField>
      </form>
      <div v-if="activeClass[0].active">
        <VideoList
          :videos="getYouTubeResponce"
          :searchRequest="searchValue"
        ></VideoList>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { required, helpers, minLength } from "@vuelidate/validators";
import { useStore } from "vuex";
import VideoList from "../components/VideoList/index.vue";
import useVuelidate from "@vuelidate/core";

const store = useStore();
const searchValue = ref("");
const nameButton = ref("Поиск");
const loading = ref(false);
const searchPageActive = ref(false);

//getters
const getYouTubeResponce = computed(() => store.getters.getSearchData);
const getSearchState = computed(() => store.getters.getSearchState);

//actions
const getYouTubeVideo = (maxResults, search) =>
  store.dispatch("getYouTubeVideos", { maxResults, search });
const setSearchState = (searchStatus, searchValue) =>
  store.dispatch("addSearchState", { searchStatus, searchValue });

onMounted(() => {
  // проверяем состояние поиска и если он активный, то состояние страницы не изменяется, если нет, то сбрасыватся на начальное(при перезагрузке страницы например)
  if (getSearchState.value.searchStatus) {
    searchPageActive.value = true;
    searchValue.value = getSearchState.value.searchValue;
  }
});

const activeClass = computed(() => {
  return [
    {
      active: searchPageActive.value,
    },
  ];
});

// правила валидации
const rules = computed(() => ({
  searchValue: {
    required: helpers.withMessage("Поле не может быть пустым", required),
    minLength: helpers.withMessage("Слишком короткий запрос", minLength(3)),
  },
}));

// инициализайия полей валидации
const v = useVuelidate(rules, {
  searchValue,
});

const search = async () => {
  try {
    const isFormCorrect = await v.value.$validate();
    if (isFormCorrect) {
      loading.value = true;
      await getYouTubeVideo(12, searchValue.value);
      await setSearchState(true, searchValue.value);
      loading.value = false;
      searchPageActive.value = true;
    } else {
      return;
    }
  } catch (e) {
    console.log(e);
  }
};
</script>

<style lang="scss">
.content {
  &__inner {
    @include container;
  }
  &__title {
    margin-left: 40%;
    margin-top: 20%;
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
  &__field {
    margin: 0 auto;
    width: 686px;
    transition: all 0.3s ease-in-out;
    &.active {
      width: 100%;
      margin-bottom: 40px;
    }
  }
}
</style>
