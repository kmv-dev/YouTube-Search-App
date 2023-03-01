<template>
  <button class="base-btn" :class="btnClass" :type="type" :form="form">
    <span class="base-btn__name">{{ name }}</span>
    <div v-if="isLoading" class="base-btn__loader"></div>
    <slot v-if="!name" class="base-btn__slot"> </slot>
  </button>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
  mode: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  isIcon: {
    type: Boolean,
    default: false,
  },
  iconClass: {
    type: String,
    default: "",
  },
  isSearch: {
    type: Boolean,
    default: false,
  },
  form: {
    type: String,
    default: "",
  },
});

const btnClass = computed(() => {
  return [
    {
      "base-btn_disabled": props.disabled,
      "base-btn_bordered": props.mode === "bordered",
      "base-btn_text": props.mode === "text",
      "base-btn_is-search": props.isSearch,
      "base-btn_is-loading": props.isLoading,
    },
  ];
});
</script>

<style lang="scss" scoped>
.base-btn {
  padding: 14px 20px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: #1390e5;
  border-radius: 10px;
  color: #ffffff;
  min-width: 176px;
  max-height: 52px;
  font-size: 20px;
  transition: 0.2s ease-in-out;
  -webkit-tap-highlight-color: transparent;
  &:hover {
    opacity: 0.7;
  }
  &__name {
    display: inline-block;
    margin-right: 0;
  }
  &__loader {
    width: 18px;
    height: 18px;
    color: #ffffff;
    border: 2px solid currentcolor;
    border-bottom-color: transparent;
    border-radius: 50%;
    animation: 1s loader linear infinite;
  }

  @keyframes loader {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  &__slot {
    text-align: center;
  }
  &_disabled {
    background: rgba(39, 39, 39, 0.1);
    color: rgba(0, 0, 0, 0.2);
    pointer-events: none;
  }
  &_bordered {
    border: 1px solid #1390e5;
    background: transparent;
    color: #1390e5;
  }
  &_text {
    padding: 0;
    min-width: auto;
    background: transparent;
    color: #1390e5;
    transition: 0.3s ease-in-out;
  }
  &_is-search {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-left: 15px;
    margin-right: -16px;
    .base-btn__name {
      margin-right: 10px;
    }
  }
  &_is-loading {
    pointer-events: none;
  }
  @include _575 {
    font-size: 18px;
  }
  @include _380 {
    font-size: 16px;
    padding: 10px 15px;
  }
}
</style>
