<template>
  <button class="base-btn" :class="btnClass" :type="type">
    <slot class="base-btn__slot" />
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
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
  },
  computed: {
    btnClass() {
      const { mode, disabled, isSearch } = this;
      return [
        {
          "base-btn_disabled": disabled,
          "base-btn_bordered": mode === "bordered",
          "base-btn_text": mode === "text",
          "base-btn_is-search": isSearch,
        },
      ];
    },
  },
};
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
  }
  &_is-search {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-left: 15px;
    margin-right: -16px;
  }
}
</style>
