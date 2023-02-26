<template>
  <div :class="fieldClass" class="base-field">
    <label v-if="label" class="base-field__label"
      ><span v-if="isRequired" class="base-field_required">*</span>
      {{ label }}</label
    >
    <div class="base-field__control">
      <input
        :value="value"
        class="base-field__input"
        :placeholder="placeholder"
        :readonly="isReadonly"
        :name="name"
        :type="type"
        @input="updateValue"
      />
      <div class="base-field__slot">
        <button>
          <span
            v-if="isPassword"
            class="ui-kit__icon"
            :class="passwordFieldIcon"
            @click="showPassword"
          ></span>
        </button>
        <slot name="button"></slot>
      </div>
    </div>
    <TransitionGroup>
      <div class="base-field__error" v-for="item of error" :key="item.$uid">
        <span class="base-field__error-message">{{ item.$message }}</span>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { computed } from "vue";

const emit = defineEmits(["update:value", "showPassword"]);
const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  name: {
    type: String,
    default: "",
  },
  error: {
    type: Array,
    required: false,
  },
  isPassword: {
    type: Boolean,
    default: false,
  },
  isReadonly: {
    type: Boolean,
    default: false,
  },
  isTextCenter: {
    type: Boolean,
    default: false,
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
});

const fieldClass = computed(() => {
  return [
    {
      "base-field_is-readonly": props.isReadonly,
      "base-field_is-password": props.type === "password",
      "base-field_is-center": props.isTextCenter,
    },
  ];
});

const passwordFieldIcon = computed(() => {
  return props.type === "password" ? "icon-eye-off" : "icon-eye";
});

const updateValue = (e) => {
  emit("update:value", e.target.value);
};
const showPassword = (e) => {
  emit("showPassword", e.target.value);
};
</script>

<style lang="scss" scoped>
.base-field {
  position: relative;
  font-size: 20px;
  margin-bottom: 10px;
  &__label {
    color: #272727;
    min-height: 30px;
    margin-bottom: 0;
    font-size: 16px;
  }
  &_required {
    color: #ff0000;
  }
  &__control {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 48px;
    padding: 0 15px;
    line-height: 145%;
    border: 1px solid rgba(23, 23, 25, 0.1);
    border-radius: 10px;
    transition: 0.2s ease-in-out;
    &:focus-within {
      background: rgba(197, 228, 249, 0.3);
      border-color: #1390e5;
    }
  }
  &__input {
    position: relative;
    width: 100%;
    border: none;
    background: transparent;
    color: #282f39;
    &::placeholder {
      color: #272727;
      opacity: 0.3;
      font-size: 20px;
    }
  }
  &__slot {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 0;
    height: 100%;
    span {
      width: 25px;
      &:before {
        font-size: 26px;
      }
    }
  }
  &__error {
    background: #ff647c;
    margin-top: 2px;
    border-radius: 10px;
    font-size: 12px;
    color: #fff;
    padding: 2px 10px;
  }
  &_is-password {
    &:focus-within {
      .ui-kit {
        &__icon {
          &::before {
            color: #1390e5;
          }
        }
      }
    }
  }
  &_is-readonly {
    .base-field__control {
      background: #fafafa;
    }
  }
  &_is-center &__input {
    text-align: center;
  }
  &_is-center {
    min-width: 100px;
  }
  @include _380 {
    font-size: 14px;
    &__control {
      font-size: 14px;
      height: 44px;
    }
  }
}
</style>
