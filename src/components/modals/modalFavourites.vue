<template>
  <BaseModal :title="'Сохранить запрос'" v-model:isShow="isModalShow" isShadow
    ><template v-slot:body>
      <form action="#" @submit.prevent="saveRequest" id="favourites">
        <BaseField
          v-model:value="inputValue"
          class="modal-favourites__field"
          :isReadonly="checkReadonly"
          :placeholder="'Введите запрос'"
          :label="'Запрос'"
        ></BaseField>
        <BaseField
          v-model:value="nameRequest"
          class="modal-favourites__field"
          isRequired
          :placeholder="'Укажите название'"
          :label="'Название'"
        ></BaseField>
        <BaseDropdown
          v-model="selected"
          class="modal-favourites__field"
          icon-class="icon-arrow"
          :options="options"
          :label="'Сортировать по'"
          @selected="isSelected"
        />
        <div class="modal-favourites__range">
          <BaseRange v-model="rangeValue" :max="50" :min="1" />
          <BaseField
            v-model:value="rangeValue"
            class="modal-favourites__field_range"
            isTextCenter
            isReadonly
          ></BaseField>
        </div></form></template
    ><template v-slot:footer
      ><BaseButton
        class="modal-favourites__button"
        :mode="'bordered'"
        @click="modalHide"
        :type="'button'"
        >Не сохранять</BaseButton
      ><BaseButton
        class="modal-favourites__button"
        form="favourites"
        :type="'submit'"
        :disabled="nameRequest === ''"
        :name="btnName"
      ></BaseButton></template
  ></BaseModal>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { getRandomId } from "../../utils/idGenerator";
import { setLocalStorage, editSavedData } from "../../api/localStorageParser";
const store = useStore();

const emit = defineEmits(["save", "update"]);
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
});

const inputValue = ref("");
const nameRequest = ref("");
const rangeValue = ref("12");
const selected = ref(-1);
const sort = ref("relevance");
const requestId = ref(null);
const options = ref([
  { label: "По дате", value: "date" },
  { label: "По рейтингу", value: "rating" },
  { label: "В алфавитном порядке", value: "title" },
  { label: "По просмотрам", value: "viewCount" },
]);

const getCurrentValue = computed(() => {
  return props.modelValue;
});

const btnName = computed(() => {
  return !props.isEdit ? "Сохранить" : "Изменить";
});

const checkReadonly = computed(() => {
  if (props.isEdit) {
    return false;
  } else {
    return true;
  }
});

//getters
const isModalShow = computed(() => store.getters.getShowModalStatus);
const savedData = computed(() => store.getters.getModalData);

watch(
  () => isModalShow.value,
  () => {
    if (!props.isEdit) {
      inputValue.value = getCurrentValue.value;
      nameRequest.value = "";
      rangeValue.value = "12";
      sort.value = -1;
    } else {
      inputValue.value = savedData.value.searchValue;
      nameRequest.value = savedData.value.requestName;
      rangeValue.value = savedData.value.maxResult;
      sort.value = savedData.value.sortMethod;
      requestId.value = savedData.value.requestId;
      selected.value = savedData.value.sortMethod;
    }
  }
);

//action
const setModalShow = (value) => store.dispatch("showModal", value);

const saveRequest = () => {
  const payload = {};
  if (props.isEdit) {
    payload.requestId = requestId.value;
  } else {
    payload.requestId = getRandomId(0, 89755738883);
  }
  payload.email = localStorage.getItem("userEmail");
  payload.value = inputValue.value;
  payload.name = nameRequest.value;
  payload.sort = sort.value;
  payload.maxResult = rangeValue.value;
  if (!props.isEdit) {
    setLocalStorage("saveRequests", payload);
  } else {
    editSavedData(payload);
  }
  emit("save");
  emit("update");
  modalHide();
};

const isSelected = (i) => {
  selected.value = i;
  sort.value = i;
};

const modalHide = () => {
  nameRequest.value = "";
  sort.value = "relevance";
  setModalShow(false);
  document.body.style.overflow = "auto";
};
</script>

<style lang="scss" scoped>
.modal-favourites__field {
  min-width: 430px;
  &_range {
    max-width: 100px;
    margin-left: 20px;
  }
}
.modal-favourites__range {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0 0;
}
.modal-favourites__button {
  min-width: 210px;
  margin: 0 6px;
}
</style>
