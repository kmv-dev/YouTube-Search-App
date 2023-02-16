<template>
  <ModalSuccesSignIn :isShow="isValidate"></ModalSuccesSignIn>
  <BaseModal :isShow="!isValidate" :title="'Регистрация'" isLogo
    ><template v-slot:body>
      <form action="#" @submit.prevent="userSignUp" id="signup">
        <BaseField
          v-model:value="v.userEmail.$model"
          :error="v.userEmail.$errors"
          class="sign-up__field"
          :placeholder="'Введите email'"
          :label="'Email'"
        ></BaseField>
        <BaseField
          v-model:value="v.userPassword.$model"
          :error="v.userPassword.$errors"
          :type="passwordType"
          isPassword
          class="sign-up__field"
          :placeholder="'Введите пароль'"
          :label="'Пароль'"
          @showPassword="togglePasswordType()"
        ></BaseField>
        <BaseField
          v-model:value="v.userConfirmPassword.$model"
          :error="v.userConfirmPassword.$errors"
          :type="confirmPasswordType"
          isPassword
          class="sign-up__field"
          :placeholder="'Введите пароль'"
          :label="'Повторите пароль'"
          @showPassword="toggleConfirmPasswordType()"
        ></BaseField>
      </form> </template
    ><template v-slot:footer
      ><div class="sign-up__buttons">
        <BaseButton :type="'submit'" :form="'signup'"
          >Зарегистрироваться</BaseButton
        >
        <BaseButton
          class="sign-up__button sign-up__button_to-sign-up"
          :mode="'text'"
          @click="toSignIn"
          >Войти</BaseButton
        >
      </div></template
    ></BaseModal
  >
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  helpers,
  minLength,
  sameAs,
} from "@vuelidate/validators";
import ModalSuccesSignIn from "../components/modals/modalSuccesSignIn.vue";
import { setLocalStorage } from "../api/localStorageParser";
import { getRandomId } from "../utils/idGenerator";

const router = useRouter();
const userEmail = ref("");
const userPassword = ref("");
const userConfirmPassword = ref("");
const isValidate = ref(false);
const passwordType = ref("password");
const confirmPasswordType = ref("password");

// проверка на уже существующий email
const isDubleEmail = (value) => {
  const user = JSON.parse(localStorage.getItem("users")) || [];
  return user.every((user) => user.userEmail !== value);
};

const rules = computed(() => ({
  userEmail: {
    required: helpers.withMessage("Поле не может быть пустым", required),
    email: helpers.withMessage("Вы ввели неверный email", email),
    userEmail: helpers.withMessage(
      "Пользователь с таким email сушествует",
      isDubleEmail
    ),
  },
  userPassword: {
    required: helpers.withMessage("Поле не может быть пустым", required),
    minLength: helpers.withMessage(
      `Минимальная длина: 6 символов`,
      minLength(6)
    ),
  },
  userConfirmPassword: {
    required: helpers.withMessage("Поле не может быть пустым", required),
    minLength: helpers.withMessage(
      `Минимальная длина: 6 символов`,
      minLength(6)
    ),
    sameAs: helpers.withMessage(
      "Пароли не совпадают",
      sameAs(userPassword.value)
    ),
  },
}));

const v = useVuelidate(rules, {
  userEmail,
  userPassword,
  userConfirmPassword,
});

const userSignUp = async () => {
  const isFormCorrect = await v.value.$validate();
  if (isFormCorrect) {
    isValidate.value = true;
    await new Promise((resolve) =>
      setTimeout(() => resolve(console.log("registration is succes!")), 4000)
    );
    const payload = {
      id: getRandomId(0, 89755738883),
      userEmail: userEmail.value,
      userPassword: userPassword.value,
    };
    setLocalStorage("users", payload);
    toSignIn();
  } else {
    return;
  }
};

const togglePasswordType = () => {
  passwordType.value === "password"
    ? (passwordType.value = "text")
    : (passwordType.value = "password");
};

const toggleConfirmPasswordType = () => {
  confirmPasswordType.value === "password"
    ? (confirmPasswordType.value = "text")
    : (confirmPasswordType.value = "password");
};

const toSignIn = () => {
  router.push("/sign-in");
};
</script>

<style lang="scss" scoped>
.sign-up {
  &__field {
    min-width: 334px;
  }
  &__buttons {
    display: flex;
    flex-direction: column;
  }
  &__button {
    &_to-sign-up {
      margin-top: 15px;
      font-size: 16px;
    }
  }
}
</style>
