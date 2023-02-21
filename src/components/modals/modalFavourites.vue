<template>
  <BaseModal :title="'Сохранить запрос'" v-model:isShow="isModalShow" isShadow
    ><template v-slot:body>
      <form action="#" @submit.prevent="saveRequest" id="favourites">
        <BaseField
          v-model:value="getCurrentValue"
          class="modal-favourites__field"
          :isReadonly="readonly"
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
        >Сохранить</BaseButton
      ></template
    ></BaseModal
  >
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

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

const nameRequest = ref("");
const rangeValue = ref("12");
const readonly = ref(!props.isEdit);
const selected = ref(-1);
const options = ref([
  { label: "one", value: "1" },
  { label: "two", value: "2" },
]);

const getCurrentValue = computed(() => {
  return props.modelValue;
});

//getters
const isModalShow = computed(() => store.getters.getShowModalStatus);

//action
const setModalShow = (value) => store.dispatch("showModal", value);

const saveRequest = () => {
  console.log("save");
};

const isSelected = (i) => {
  selected.value = i;
};

const modalHide = () => {
  nameRequest.value = "";
  setModalShow(false);
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
