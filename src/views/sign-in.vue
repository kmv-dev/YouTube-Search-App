<template>
  <ModalSucces :isShow="isValidate" :title="'Добро пожаловать!'"></ModalSucces>
  <BaseModal :isShow="!isValidate" :title="'Вход'" isLogo
    ><template v-slot:body>
      <form action="#" @submit.prevent="userSignIn" id="signin">
        <BaseField
          v-model:value="v.userEmail.$model"
          class="sign-in__field"
          :error="v.userEmail.$errors"
          :placeholder="'Введите email'"
          :label="'Логин'"
        ></BaseField>
        <BaseField
          v-model:value="v.userPassword.$model"
          class="sign-in__field"
          isPassword
          :error="v.userPassword.$errors"
          :type="passwordType"
          :placeholder="'Введите пароль'"
          :label="'Пароль'"
          @showPassword="togglePasswordType()"
        ></BaseField></form></template
    ><template v-slot:footer
      ><div class="sign-in__buttons">
        <BaseButton :type="'submit'" :form="'signin'">Войти</BaseButton>
        <BaseButton
          class="sign-in__button sign-in__button_to-sign-in"
          :mode="'text'"
          @click="toSignUpPage"
          >Регистрация</BaseButton
        >
      </div></template
    ></BaseModal
  >
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { required, email, helpers } from "@vuelidate/validators";
import { csrfToken } from "../utils/csrfTokenGenerator";
import ModalSucces from "../components/modals/modalSucces.vue";
import useVuelidate from "@vuelidate/core";

const router = useRouter();
const store = useStore();
const isValidate = ref(false);

// store actions
const setSearchState = (searchStatus, searchValue) =>
  store.dispatch("addSearchState", { searchStatus, searchValue });
const logInAction = (isAuth) => store.dispatch("addUser", { isAuth });

const userEmail = ref("");
const userPassword = ref("");
const passwordType = ref("password");

// проверка email в "базе данных(localStorage)"
const isCheckEmail = (value) => {
  const users = JSON.parse(localStorage.getItem("users"));
  return users.some((user) => user.userEmail === value);
};

// проверка password в "базе данных(localStorage)"
const isCheckPassword = (value) => {
  const user = JSON.parse(localStorage.getItem("users"));
  return user.some((user) => user.userPassword === value);
};

// правила валидации
const rules = computed(() => ({
  userEmail: {
    required: helpers.withMessage("Поле не может быть пустым", required),
    email: helpers.withMessage("Некорректный email", email),
    userEmail: helpers.withMessage(
      "такой email не зарегистрирован",
      isCheckEmail
    ),
  },
  userPassword: {
    required: helpers.withMessage("Поле не может быть пустым", required),
    userPassword: helpers.withMessage("Неправильный пароль", isCheckPassword),
  },
}));

// инициализайия полей валидации
const v = useVuelidate(rules, {
  userEmail,
  userPassword,
});

const userSignIn = async () => {
  try {
    const isFormCorrect = await v.value.$validate();
    if (isFormCorrect) {
      await logInAction(true);
      isValidate.value = true; // активация модалки при успешном прохождении валидации формы
      await new Promise((resolve) =>
        setTimeout(() => resolve(console.log("login is succes!")), 2000)
      ); // эмитация задержки ответа от сервера статус ок 200
      csrfToken();
      toHomePage();
      setSearchState(false, "");
      localStorage.setItem("userEmail", userEmail.value);
    } else {
      return;
    }
  } catch (e) {
    console.log(e);
  }
};

const togglePasswordType = () => {
  passwordType.value === "password"
    ? (passwordType.value = "text")
    : (passwordType.value = "password");
};

const toSignUpPage = () => {
  router.push("/sign-up");
};

const toHomePage = () => {
  router.push("/");
};
</script>

<style lang="scss" scoped>
.sign-in {
  &__field {
    min-width: 334px;
  }
  &__buttons {
    display: flex;
    flex-direction: column;
  }
  &__button {
    &_to-sign-in {
      margin-top: 15px;
      font-size: 16px;
    }
  }
}
</style>
