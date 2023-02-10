<template>
  <Transition>
    <div class="base-modal" v-if="isShow">
      <div class="base-modal__wrapper">
        <div class="base-modal__container" :class="containerClass">
          <span
            v-if="isCloseActive"
            class="base-modal__close"
            @click="modalHide"
          />
          <div class="base-modal__header header">
            <a
              v-if="isLogo"
              class="header__logo-link"
              href="https://sibdev.pro/"
            >
              <img
                class="header__logo-img"
                src="@/assets/img/sibdev-logo.svg"
                alt="logo"
              />
            </a>
            <h2 class="header__title" v-if="title">{{ title }}</h2>
          </div>

          <div class="base-modal__body">
            <slot name="body"></slot>
          </div>

          <div class="base-modal__footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from "vue";
const emit = defineEmits(["update:isShow"]);
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  isLogo: {
    type: Boolean,
    default: false,
  },
  isShow: {
    type: Boolean,
    default: false,
  },
  isCloseActive: {
    type: Boolean,
    default: false,
  },
  isShadow: {
    type: Boolean,
    default: false,
  },
});

const containerClass = computed(() => {
  return [
    {
      "base-modal__container_is-shadow": props.isShadow,
    },
  ];
});

const modalHide = () => {
  emit("update:isShow", false);
  document.body.style.overflow = "auto";
};
</script>

<style lang="scss" scoped>
.base-modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: table;
  &__wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  &__container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 510px;
    margin: 0px auto;
    padding: 40px 88px 60px;
    background: #ffffff;
    border: 1px solid rgba(39, 39, 39, 0.1);
    border-radius: 10px;
    &_is-shadow {
      box-shadow: 0px 10px 50px rgba(19, 144, 229, 0.8);
    }
  }
  &__body {
    margin-bottom: 30px;
  }
  &__footer {
    display: flex;
    justify-content: center;
  }
  &__close {
    position: absolute;
    top: 12px;
    right: 15px;
    width: 16px;
    height: 16px;
    opacity: 0.2;
    cursor: pointer;
    transition: opacity ease 0.5s;
    &:hover {
      opacity: 1;
    }
    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 10px;
      display: block;
      width: 16px;
      height: 2px;
      background: #000;
    }
    &::before {
      transform: rotate(45deg);
    }
    &::after {
      transform: rotate(-45deg);
    }
  }
  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    .header {
      &__logo-link {
        display: inline-block;
        text-decoration: none;
        margin-bottom: 10px;
      }
      &__logo-img {
        min-width: 88px;
        height: 88px;
      }
      &__title {
        text-align: center;
        font-weight: 500;
        font-size: 18px;
        color: #000000;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
