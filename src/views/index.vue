<template>
  <div class="content">
    <div class="content__inner">
      <h1 class="content__title" :class="activeClass">Поиск видео</h1>
      <BaseField
        v-model:value="v.searchValue.$model"
        class="content__field"
        isSearchField
        :class="activeClass"
        :placeholder="'поиск'"
        :error="v.searchValue.$errors"
        ><template v-slot:button
          ><BaseButton isSearch @click="test">Поиск</BaseButton></template
        ></BaseField
      >
      <div v-if="activeClass[0].active">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio eum ea
        doloribus delectus ut maxime optio, quae cum voluptate, in modi corporis
        excepturi, nam fuga aut aspernatur. Aspernatur, voluptates atque?
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

const searchValue = ref("");
const active = ref(false);

const activeClass = computed(() => {
  return [
    {
      active: active.value,
    },
  ];
});

// правила валидации
const rules = computed(() => ({
  searchValue: {
    required: helpers.withMessage("Поле не может быть пустым", required),
  },
}));

// инициализайия полей валидации
const v = useVuelidate(rules, {
  searchValue,
});

const test = () => {
  active.value = true;
};
</script>

<style lang="scss">
.content {
  &__inner {
    @include container;
  }
  &__title {
    margin-left: 40%;
    margin-top: 20%;
    font-weight: 400;
    font-size: 36px;
    color: #000000;
    margin-bottom: 40px;
    transition: all 0.3s ease-in-out;
    &.active {
      margin: 40px 0 20px;
      font-size: 28px;
    }
  }
  &__field {
    margin: 0 auto;
    width: 686px;
    transition: all 0.3s ease-in-out;
    &.active {
      width: 100%;
    }
  }
}
</style>
