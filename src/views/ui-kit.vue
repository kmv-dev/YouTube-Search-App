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
        <BaseField :label="'isLabel'"></BaseField>
      </div>
      <div class="ui-kit__box">
        <BaseField
          v-model="passwordValue"
          :label="'isPassword'"
          :type="passwordType"
          :placeholder="'password'"
          isPassword
          @showPassword="togglePasswordType()"
        ></BaseField>
      </div>
      <div class="ui-kit__box">
        <BaseField
          v-model="searchValue"
          :placeholder="'поиск'"
          isSearchField
        ></BaseField>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      passwordValue: "",
      passwordType: "password",
      searchValue: "",
    };
  },
  methods: {
    togglePasswordType() {
      this.passwordType === "password"
        ? (this.passwordType = "text")
        : (this.passwordType = "password");
    },
  },
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
}
</style>
