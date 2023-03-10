<template>
  <modalFavourites
    v-model="inputValue"
    @save="updateAfterSaved"
    @update="checkAfterSaved"
  />
  <div class="search" :class="activeClass">
    <div class="search__control">
      <form
        class="search__form"
        action="#"
        @submit.prevent="search"
        id="searchForm"
      >
        <input
          v-model="v.inputValue.$model"
          class="search__input"
          placeholder="Поиск"
        />
      </form>
      <div class="search__slot">
        <div v-if="!inputValue" class="search__save-icon_disabled"></div>
        <div class="search__save-action" :class="iconSaveClass">
          <Transition>
            <button
              v-if="inputValue && inputValue.length >= 3 && showIcon"
              class="search__save-icon"
              type="button"
              :class="iconSave"
              @click="showModal"
            ></button>
          </Transition>
          <Transition>
            <div
              v-if="isSave && showIcon"
              ref="tooltip"
              class="search__tooltip tooltip"
            >
              <p class="tooltip__text">Поиск сохранён в разделе «Избранное»</p>
              <BaseButton
                :mode="'text'"
                class="tooltip__btn"
                @click="toFavouritesPage"
                >Перейти в избранное</BaseButton
              >
            </div>
          </Transition>
          <BaseButton
            class="search__button"
            type="submit"
            form="searchForm"
            isSearch
            :isLoading="loading"
            :name="'Поиск'"
            >Поиск</BaseButton
          >
        </div>
      </div>
    </div>
    <TransitionGroup>
      <div
        class="search__error"
        v-for="item of v.inputValue.$errors"
        :key="item.$uid"
      >
        <span class="search__error-message">{{ item.$message }}</span>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { required, helpers, minLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import modalFavourites from "../modals/modalFavourites.vue";

const router = useRouter();
const store = useStore();
const iconSave = ref("icon-like");
const loading = ref(false);
const inputValue = ref("");
const maxResult = ref(12);
const sort = ref("relevance");
const saveData = ref(null);
const showIcon = ref(false);
const options = ref([
  { label: "Без сортировки", value: "relevance" },
  { label: "По дате", value: "date" },
  { label: "По рейтингу", value: "rating" },
  { label: "В алфавитном порядке", value: "title" },
  { label: "По просмотрам", value: "viewCount" },
]);

//getters
const getSearchState = computed(() => store.getters.getSearchState);
const getSavedRequest = computed(() => store.getters.getSavedData);
const isSearchRequestFromFavourites = computed(
  () => store.getters.getIsClickStatus
);

//actions
const getYouTubeVideo = (maxResults, search, sort) =>
  store.dispatch("getYouTubeVideos", { maxResults, search, sort });
const setSearchState = (searchStatus, searchValue) =>
  store.dispatch("addSearchState", { searchStatus, searchValue });
const setModalShow = (value) => store.dispatch("showModal", value);

onMounted(async () => {
  // проверяем запрос из избранного и если да, то формируем соответсвующий запрос с сохраненными данными
  if (isSearchRequestFromFavourites.value) {
    await updateSearchParams();
    await search();
  }
  checkAfterSaved();
});

watch(
  () => inputValue.value,
  () => {
    checkCurrentSearch();
    checkSearchState();
  }
);

// блокирую кнопку вызова модалки пока страница поиска не перешла в активное состояние
const iconSaveClass = computed(() => {
  return [
    {
      "search__save-action_event-none":
        !getSearchState.value.searchStatus || isSave.value,
    },
  ];
});

const activeClass = computed(() => {
  return [
    {
      active: getSearchState.value.searchStatus,
    },
  ];
});

const isSave = computed(() => {
  return iconSave.value === "icon-like-active" ? true : false;
});

// правила валидации
const rules = computed(() => ({
  inputValue: {
    required: helpers.withMessage("Поле не может быть пустым", required),
    minLength: helpers.withMessage("Слишком короткий запрос", minLength(3)),
  },
}));

// инициализайия полей валидации
const v = useVuelidate(rules, {
  inputValue,
});

// methods
const checkSearchState = () => {
  getSearchState.value.searchStatus
    ? (showIcon.value = true)
    : (showIcon.value = false);
};

const search = async () => {
  try {
    const isFormCorrect = await v.value.$validate();
    if (isFormCorrect) {
      loading.value = true;
      await getYouTubeVideo(maxResult.value, inputValue.value, sort.value);
      await setSearchState(true, inputValue.value);
      loading.value = false;
      checkSearchState();
    } else {
      console.log("форма не корректна");
      return;
    }
  } catch (e) {
    console.log(e);
  }
};

const updateSearchParams = async () => {
  maxResult.value = await getSavedRequest.value.maxResult;
  inputValue.value = await getSavedRequest.value.searchValue;
  if (getSavedRequest.value.sortMethod === -1) {
    sort.value = options.value[0].value;
  } else {
    options.value[getSavedRequest.value.sortMethod].value;
  }
};

const updateAfterSaved = () => {
  saveData.value = JSON.parse(localStorage.getItem("saveRequests"));
  inputValue.value = getSearchState.value.searchValue;
};
const checkAfterSaved = () => {
  updateAfterSaved();
  checkCurrentSearch();
};

const checkCurrentSearch = async () => {
  // проверяем есть ли у нас поисковый запрос в сохраненных данных для конкретного юзера,
  // если есть, то отрисовываем соответствующую иконку с тултипом
  if (saveData.value) {
    const saved = await saveData.value.filter(
      (el) =>
        el.searchValue.toLowerCase() === inputValue.value.toLowerCase() &&
        el.email === localStorage.getItem("userEmail")
    );
    saved[0]
      ? (iconSave.value = "icon-like-active")
      : (iconSave.value = "icon-like");
  }
};

const showModal = () => {
  setModalShow(true);
  document.body.style.overflow = "hidden";
};

const toFavouritesPage = () => {
  router.push("/favourites");
};
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  font-size: 20px;
  margin-bottom: 10px;
  margin: 0 auto;
  width: 686px;
  transition: 0.2s ease-in-out;
  &.active {
    width: 100%;
    margin-bottom: 40px;
  }
  &__form {
    width: 100%;
  }
  &__control {
    position: relative;
    height: 52px;
    padding: 0 16px 0 16px;
    background: #ffffff;
    display: flex;
    align-items: center;
    width: 100%;
    border: 1px solid rgba(23, 23, 25, 0.1);
    border-radius: 10px;
    transition: 0.2s ease-in-out;
    &:focus-within {
      background: rgba(197, 228, 249, 0.3);
      border-color: #1390e5;
    }
  }
  &__input {
    position: relative;
    width: 100%;
    border: none;
    background: transparent;
    color: #282f39;
    &::placeholder {
      color: #272727;
      opacity: 0.3;
      font-size: 20px;
    }
  }
  &__slot {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 0;
    height: 100%;
    span {
      width: 25px;
      &:before {
        font-size: 26px;
      }
    }
  }
  &__tooltip {
    position: absolute;
    bottom: -116px;
    right: 50px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: #ffffff;
    padding: 15px;
    max-width: 230px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    z-index: 1000;
    font-size: 16px;
    :before,
    :after {
      content: "";
      position: absolute;
      left: 66px;
      top: -20px;
      border: 10px solid transparent;
      border-bottom: 10px solid rgba(23, 23, 25, 0.1);
      z-index: 1;
      pointer-events: none;
    }
    :after {
      border-bottom: 10px solid white;
      top: -19px;
      z-index: 2;
    }
    .tooltip {
      &__text {
        color: rgba(39, 39, 39, 0.3);
      }
      &__btn {
        font-size: 16px;
      }
    }
  }
  &__save-action {
    display: flex;
    &_event-none .search__save-icon {
      pointer-events: none;
    }
  }
  &__save-icon {
    font-size: 26px;
    &_disabled {
      height: 25px;
      width: 26px;
    }
  }
  &__error {
    background: #ff647c;
    margin-top: 2px;
    border-radius: 10px;
    font-size: 12px;
    color: #fff;
    padding: 2px 10px;
  }
  @include _767 {
    width: 100%;
    &.active {
      margin-bottom: 20px;
    }
    &__button {
      min-width: 100px;
    }
    &__tooltip {
      right: 0;
      :before,
      :after {
        left: 84px;
      }
    }
  }
  @include _575 {
    font-size: 16px;
    &.active {
      margin-bottom: 20px;
    }
    &__tooltip {
      padding: 8px;
      right: 60px;
      bottom: -86px;
      font-size: 14px;
      max-width: 170px;
      :before,
      :after {
        left: 92px;
      }
      .tooltip {
        &__btn {
          font-size: 14px;
        }
      }
    }
    &__save-icon {
      font-size: 20px;
      &_disabled {
        height: 20px;
        width: 20px;
      }
    }
  }
  @include _380 {
    &__control {
      height: 46px;
    }
    &__button {
      padding: 10px 15px;
    }
    &__tooltip {
      bottom: -86px;
      :before,
      :after {
        left: 94px;
      }
      .tooltip {
        &__btn {
          padding: 0;
        }
      }
    }
  }
}
</style>
