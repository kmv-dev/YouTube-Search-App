<template>
  <div class="ui-kit">
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
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { helpers, minLength, numeric, email } from "@vuelidate/validators";

const passwordValue = ref("");
const passwordType = ref("password");
const searchValue = ref("");
const emailField = ref("");

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
      `Минимальная длина: 3 символа`,
      minLength(3)
    ),
    numeric: helpers.withMessage(`Вы можете ввести только цифры`, numeric),
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
}
</style>
