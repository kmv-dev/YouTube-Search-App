<template>
  <modalFavourites v-model="inputValue" />
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
              v-if="inputValue && inputValue.length >= 3"
              class="search__save-icon"
              type="button"
              :class="iconSave"
              @click="showModalRequest"
            ></button>
          </Transition>
          <Transition>
            <div v-if="isSave" class="search__tooltip tooltip">
              <p class="tooltip__text">Поиск сохранён в разделе «Избранное»</p>
              <BaseButton :mode="'text'" class="tooltip__btn"
                >Перейти в избранное</BaseButton
              >
            </div>
          </Transition>
          <BaseButton
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
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { required, helpers, minLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import modalFavourites from "../modals/modalFavourites.vue";

const store = useStore();
const props = defineProps({});
const iconSave = ref("icon-like");
const loading = ref(false);
const inputValue = ref("");

//getters
const getSearchState = computed(() => store.getters.getSearchState);

//actions
const getYouTubeVideo = (maxResults, search) =>
  store.dispatch("getYouTubeVideos", { maxResults, search });
const setSearchState = (searchStatus, searchValue) =>
  store.dispatch("addSearchState", { searchStatus, searchValue });
const setModalShow = (value) => store.dispatch("showModal", value);

watch(
  () => inputValue.value,
  () => {
    checkSaveRequest();
  }
);

// блокирую кнопку вызова модалки пока страница поиска не перешла в активное состояние
const iconSaveClass = computed(() => {
  return [
    {
      "search__save-action_event-none": !getSearchState.value.searchStatus,
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
const search = async () => {
  try {
    const isFormCorrect = await v.value.$validate();
    if (isFormCorrect) {
      loading.value = true;
      await getYouTubeVideo(12, inputValue.value);
      await setSearchState(true, inputValue.value);
      loading.value = false;
    } else {
      console.log("форма не корректна");
      return;
    }
  } catch (e) {
    console.log(e);
  }
};

const showModalRequest = () => {
  setModalShow(true);
  document.body.style.overflow = "hidden";
};

const checkSaveRequest = () => {
  !JSON.parse(localStorage.getItem(inputValue.value))
    ? (iconSave.value = "icon-like")
    : (iconSave.value = "icon-like-active");
};
const getSaveData = () => {
  if (JSON.parse(localStorage.getItem(inputValue.value))) {
    iconSave.value = "icon-like-active";
  }
  if (JSON.parse(localStorage.getItem(inputValue.value))) {
    iconSave.value = "icon-like";
    localStorage.removeItem(inputValue.value);
  } else if (!JSON.parse(localStorage.getItem(inputValue.value))) {
    iconSave.value = "icon-like-active";
    localStorage.setItem(inputValue.value, JSON.stringify(inputValue.value));
  }
  if (!JSON.parse(localStorage.getItem(inputValue.value))) {
    iconSave.value = "icon-like";
  }
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
  &_like-position {
    .search__tooltip {
      right: 50px;
    }
  }
  &__tooltip {
    position: absolute;
    bottom: -116px;
    right: -125px;
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
  &_is-search {
    .search {
      &__label {
        display: block;
        font-size: 28px;
        margin-bottom: 12px;
      }
      &__control {
        height: 52px;
        padding: 0 16px 0 16px;
        background: #ffffff;
      }
    }
  }
  &_is-password {
    &:focus-within {
      .ui-kit {
        &__icon {
          &::before {
            color: #1390e5;
          }
        }
      }
    }
  }
  &_is-readonly {
    .search__control {
      background: #fafafa;
    }
  }
  &_is-center &__input {
    text-align: center;
  }
  &_is-center {
    min-width: 100px;
  }
  &_not-save-value {
    .icon-like-active {
      pointer-events: none;
    }
  }
  @include _380 {
    font-size: 14px;
    &__control {
      font-size: 14px;
      height: 44px;
    }
  }
}
</style>
