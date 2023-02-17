<template>
  <div class="content">
    <div class="content__inner">
      <h1 class="content__title" :class="activeClass">Поиск видео</h1>
      <BaseField
        v-model:value="v.searchValue.$model"
        class="content__field"
        isSearchField
        :class="activeClass"
        :placeholder="'поиск'"
        :error="v.searchValue.$errors"
        ><template v-slot:button
          ><BaseButton isSearch @click="search">Поиск</BaseButton></template
        ></BaseField
      >
      <div v-if="activeClass[0].active">
        {{ getYouTubeResponce }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { useStore } from "vuex";

const store = useStore();
const searchValue = ref("");
const active = ref(false);

const getYouTubeResponce = computed(() => store.getters.getSearchData);

const getYouTubeVideo = (maxResults, search) =>
  store.dispatch("getYouTubeVideos", { maxResults, search });

const activeClass = computed(() => {
  return [
    {
      active: active.value,
    },
  ];
});

// правила валидации
const rules = computed(() => ({
  searchValue: {
    required: helpers.withMessage("Поле не может быть пустым", required),
  },
}));

// инициализайия полей валидации
const v = useVuelidate(rules, {
  searchValue,
});

const search = async () => {
  await getYouTubeVideo(12, searchValue.value);
  active.value = true;
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
    }
  }
}
</style>
