<template>
  <modalFavourites isEdit @save="updateData" />
  <div class="favourite-list">
    <span v-if="!savedRequests[0]">К сожалению тут ничего нет</span>
    <TransitionGroup v-else name="list">
      <div
        v-for="(item, index) in savedRequests"
        class="favourite-list__item item"
        :key="item.requestId"
      >
        <div class="item__inner" @click="redirectToSearch(item)">
          <span class="item__title">{{ item.requestName }}</span>
        </div>
        <div class="item__action">
          <button
            class="item__button item__button_edit"
            @click="showModal(index)"
          ></button>
          <button
            class="item__button item__button_delete"
            @click="deleteRequest(item.requestId)"
          ></button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { removeSavedRequest } from "../../api/localStorageParser";
import modalFavourites from "../modals/modalFavourites.vue";

const router = useRouter();
const store = useStore();
const currentRequest = ref(0);

const emit = defineEmits(["update"]);
const props = defineProps({
  savedRequests: {
    type: Array,
    default: () => [],
  },
});

// actions
const setStateModalData = (payload) =>
  store.dispatch("addModalDataToState", payload);

const setStateRequestData = (payload, isClick) =>
  store.dispatch("setSavedRequestParams", { payload, isClick });

const setSearchState = (searchStatus, searchValue) =>
  store.dispatch("addSearchState", { searchStatus, searchValue });

const setModalShow = (value) => store.dispatch("showModal", value);

// computed
const getSavedValue = computed(() => {
  return props.savedRequests[currentRequest.value];
});

// methods
const showModal = async (index) => {
  currentRequest.value = index;
  const payload = {
    requestId: getSavedValue.value.requestId,
    searchValue: getSavedValue.value.searchValue,
    requestName: getSavedValue.value.requestName,
    sortMethod: getSavedValue.value.sortMethod,
    maxResult: getSavedValue.value.maxResult,
  };
  await setStateModalData(payload);
  setModalShow(true);
  document.body.style.overflow = "hidden";
};

const redirectToSearch = async (item) => {
  await setSearchState(true, item.searchValue);
  await setStateRequestData(item, true);
  router.push("/");
};

const deleteRequest = (id) => {
  removeSavedRequest("saveRequests", id);
  updateData();
};

const updateData = () => {
  emit("update");
};
</script>

<style lang="scss" scoped>
.favourite-list {
  position: relative;
  margin-bottom: 50px;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 0 0;
    background: #ffffff;
    border-bottom: 1px solid #f1f1f1;
    transition: 0.3s ease-in-out;
    overflow: hidden;
    &:hover {
      background: rgba(197, 228, 249, 0.3);
    }
    &:first-child {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    &:last-child {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    &__inner {
      padding: 12px 20px;
      cursor: pointer;
      width: 100%;
    }
    &__title {
      font-weight: 500;
    }
    &__action {
      display: flex;
    }
    &__button {
      position: relative;
      height: 20px;
      width: 20px;
      background-size: 20px 20px;
      background-repeat: no-repeat;
      background-position: center;
      transition: 0.2s ease-in-out;
      &:hover {
        opacity: 1;
      }
      &_edit {
        background-image: url("../../assets/img/edit.svg");
        opacity: 0.3;
      }
      &_delete {
        background-image: url("../../assets/img/delete.svg");
        margin-left: 10px;
        opacity: 0.3;
      }
    }
  }
}
</style>
