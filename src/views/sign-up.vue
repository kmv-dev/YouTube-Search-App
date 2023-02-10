<template>
  <BaseModal :isShow="true" :title="'Регистрация'" isLogo
    ><template v-slot:body>
      <BaseField
        class="sign-up__field"
        :placeholder="'Введите email'"
        :label="'Email'"
      ></BaseField>
      <BaseField
        class="sign-up__field"
        :placeholder="'Введите пароль'"
        :label="'Пароль'"
      ></BaseField>
      <BaseField
        class="sign-up__field"
        :placeholder="'Введите пароль'"
        :label="'Повторите пароль'"
      ></BaseField></template
    ><template v-slot:footer
      ><div class="sign-up__buttons">
        <BaseButton>Зарегистрироваться</BaseButton>
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
import { useRouter } from "vue-router";

const router = useRouter();

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
