<template>
  <BaseModal :title="'Сохранить запрос'" v-model:isShow="isModalShow" isShadow
    ><template v-slot:body>
      <form action="#" @submit.prevent="saveRequest" id="favourites">
        <BaseField
          v-model:value="v.requestValue.$model"
          class="modal-favourites__field"
          :isReadonly="readonly"
          :error="v.requestValue.$errors"
          :placeholder="'Введите запрос'"
          :label="'Запрос'"
        ></BaseField>
        <BaseField
          v-model:value="v.nameRequest.$model"
          class="modal-favourites__field"
          isRequired
          :error="v.nameRequest.$errors"
          :placeholder="'Укажите название'"
          :label="'Название'"
        ></BaseField>
        <BaseDropdown
          v-model="selected"
          class="modal-favourites__field"
          icon-class="icon-arrow"
          :options="options"
          :label="'Сортировать по'"
          @select="isSelected()"
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
        >Не сохранять</BaseButton
      ><BaseButton class="modal-favourites__button"
        >Сохранить</BaseButton
      ></template
    ></BaseModal
  >
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { required, helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
const store = useStore();

const props = defineProps({
  searchValue: {
    type: String,
    default: "",
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
});

const requestValue = ref(props.searchValue);
const nameRequest = ref("");
const rangeValue = ref(20);
const readonly = ref(!props.isEdit);

//getters
const isModalShow = computed(() => store.getters.getShowModalStatus);

//action
const setModalShow = (value) => store.dispatch("showModal", value);

// правила валидации
const rules = computed(() => ({
  requestValue: {
    required: helpers.withMessage("Поле не может быть пустым", required),
  },
  nameRequest: {
    required: helpers.withMessage("Поле не может быть пустым", required),
  },
}));

// инициализайия полей валидации
const v = useVuelidate(rules, {
  requestValue,
  nameRequest,
});

const saveRequest = () => {
  console.log("save");
};

const modalHide = () => {
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
