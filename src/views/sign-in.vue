<template>
  <BaseModal :isShow="true" :title="'Вход'" isLogo
    ><template v-slot:body>
      <BaseField
        class="sign-in__field"
        :placeholder="'Введите email'"
        :label="'Логин'"
      ></BaseField>
      <BaseField
        class="sign-in__field"
        :placeholder="'Введите пароль'"
        :label="'Пароль'"
      ></BaseField></template
    ><template v-slot:footer
      ><div class="sign-in__buttons">
        <BaseButton>Войти</BaseButton>
        <BaseButton
          class="sign-in__button sign-in__button_to-sign-up"
          :mode="'text'"
          @click="toSignUp"
          >Регистрация</BaseButton
        >
      </div></template
    ></BaseModal
  >
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const toSignUp = () => {
  router.push("/sign-up");
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
    &_to-sign-up {
      margin-top: 15px;
      font-size: 16px;
    }
  }
}
</style>
