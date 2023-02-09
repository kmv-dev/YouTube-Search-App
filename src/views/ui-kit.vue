<template>
  <div class="ui-kit">
    <BaseModal v-model:isShow="showModal" :title="'Вход'" isCloseActive isLogo
      ><template v-slot:body>
        <BaseField
          v-model:value="userName"
          class="ui-kit__base-field"
          :placeholder="'BaseField'"
          :label="'Label'"
        ></BaseField>
        <BaseField
          v-model:value="userEmail"
          class="ui-kit__base-field"
          :placeholder="'BaseField'"
          :label="'Label'"
          type="'email'"
        ></BaseField></template
      ><template v-slot:footer
        ><BaseButton @click="registration">Кнопка</BaseButton></template
      ></BaseModal
    >
    <div class="ui-kit__inner">
      <div class="ui-kit__box">
        <BaseButton class="ui-kit__btn">Войти</BaseButton>
      </div>
      <div class="ui-kit__box">
        <BaseButton class="ui-kit__btn" disabled>Войти</BaseButton>
      </div>
      <div class="ui-kit__box">
        <BaseButton class="ui-kit__btn" :mode="'bordered'">Войти</BaseButton>
      </div>
      <div class="ui-kit__box">
        <BaseButton class="ui-kit__btn" :mode="'text'">Войти</BaseButton>
      </div>
      <div class="ui-kit__box">
        <BaseField :placeholder="'default'"></BaseField>
      </div>
      <div class="ui-kit__box">
        <BaseField
          :label="'isLabel'"
          :type="'email'"
          :placeholder="'emeil'"
          v-model:value="v.emailField.$model"
          :error="v.emailField.$errors"
        ></BaseField>
      </div>
      <div class="ui-kit__box">
        <BaseField
          :label="'isPassword'"
          :type="passwordType"
          :placeholder="'password'"
          isPassword
          @showPassword="togglePasswordType()"
          v-model:value="v.passwordValue.$model"
          :error="v.passwordValue.$errors"
        ></BaseField>
      </div>
      <div class="ui-kit__box">
        <BaseField
          :placeholder="'поиск'"
          isSearchField
          v-model:value="v.searchValue.$model"
          :error="v.searchValue.$errors"
        ></BaseField>
      </div>
      <div class="ui-kit__box">
        <BaseDropdown
          v-model="selected"
          :options="options"
          icon-class="icon-arrow"
          :label="'Сортировать по'"
          @select="isSelected()"
        />
      </div>
      <div class="ui-kit__box">
        <BaseRange v-model="rangeValue" :max="50" :min="1" />
      </div>
      <div class="ui-kit__box">
        <BaseButton class="ui-kit__btn" @click="openModal()"
          >BaseModal</BaseButton
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { helpers, minLength, numeric, email } from "@vuelidate/validators";
import { customB64Encode } from "./../test.js";
import { saveData } from "./../saveJsonData.js";

const passwordValue = ref("");
const passwordType = ref("password");
const searchValue = ref("");
const rangeValue = ref("20");
const emailField = ref("");
const selected = ref(-1);
const showModal = ref(false);
const userName = ref("");
const userEmail = ref("");
const options = ref([
  { label: "one", value: "1" },
  { label: "two", value: "2" },
]);

const togglePasswordType = () => {
  passwordType.value === "password"
    ? (passwordType.value = "text")
    : (passwordType.value = "password");
};

const rules = computed(() => ({
  searchValue: {
    minLength: helpers.withMessage(
      `Минимальная длина: 3 символа`,
      minLength(3)
    ),
  },
  passwordValue: {
    minLength: helpers.withMessage(
      `Минимальная длина: 6 символов`,
      minLength(6)
    ),
  },
  emailField: {
    email: helpers.withMessage("Вы ввели неверный email", email),
  },
}));

const v = useVuelidate(rules, {
  searchValue,
  passwordValue,
  emailField,
});

const isSelected = (i) => {
  selected.value = i;
};
const openModal = () => {
  showModal.value = true;
  document.body.style.overflow = "hidden";
};
const registration = () => {
  if (userEmail.value && userName.value) {
    const payload = {
      header: {
        alg: "H256",
        typ: "JWT",
      },
      payload: {
        iss: "customJwtGenerator",
        sub: "auth",
        exp: new Date().toLocaleTimeString("ru-Ru"),
      },
      signature: Math.random().toString(36).substring(2),
    };
    const Jwt = `${customB64Encode(payload.header)}.${customB64Encode(
      payload.payload
    )}.${payload.signature}`;
    const refreshToken = `${customB64Encode(payload.header)}.${customB64Encode(
      payload.payload
    )}.${payload.signature}`;
    const data = {
      id: Math.floor(Math.random() * 111) + Math.floor(Math.random() * 7888),
      userName: userName.value,
      userEmail: userEmail.value,
      access: Jwt,
      refresh: refreshToken,
    };

    saveData("bd", data);
  }
};
</script>

<style lang="scss" scoped>
.ui-kit {
  &__inner {
    @include container;
    display: grid;
    grid-template-columns: max-content;
    justify-content: center;
    justify-items: center;
    padding-top: 30px;
  }
  &__box {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 10px auto;
  }
  &__btn {
    margin-bottom: 10px;
  }
  &__base-field {
    width: 334px;
    margin-bottom: 10px;
  }
}
</style>
