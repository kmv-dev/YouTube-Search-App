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
        <div
          v-if="!value && isSearchField"
          class="base-field__save-icon_disabled"
        ></div>
        <button>
          <span
            v-if="isPassword"
            class="ui-kit__icon"
            :class="passwordFieldIcon"
            @click="showPassword"
          ></span>
        </button>
        <div class="base-field__save-action">
          <Transition>
            <button
              v-if="value && isSearchField"
              class="base-field__save-icon"
              :class="iconSave"
              @click="getSaveData"
            ></button>
          </Transition>
          <Transition>
            <div
              v-if="isSearchField && isSave"
              class="base-field__tooltip tooltip"
            >
              <p class="tooltip__text">Поиск сохранён в разделе «Избранное»</p>
              <BaseButton :mode="'text'" class="tooltip__btn"
                >Перейти в избранное</BaseButton
              >
            </div>
          </Transition>
          <slot name="button"></slot>
        </div>
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
import { ref, computed, watch } from "vue";
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
  isSearchField: {
    type: Boolean,
    default: false,
  },
  isSearchFieldBtn: {
    type: Boolean,
    default: false,
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
});

const iconSave = ref("icon-like");

watch(
  () => props.value,
  () => {
    isSaveRequest();
  }
);

const fieldClass = computed(() => {
  return [
    {
      "base-field_is-search": props.isSearchField,
      "base-field_is-readonly": props.isReadonly,
      "base-field_is-password": props.isPassword,
      "base-field_is-center": props.isTextCenter,
      "base-field_like-position": props.isSearchFieldBtn,
      "base-field_not-save-value": iconSave.value,
    },
  ];
});
const passwordFieldIcon = computed(() => {
  return props.type === "password" ? "icon-eye-off" : "icon-eye";
});
const isSave = computed(() => {
  return iconSave.value === "icon-like-active" ? true : false;
});

const isSaveRequest = () => {
  !JSON.parse(localStorage.getItem(props.value))
    ? (iconSave.value = "icon-like")
    : (iconSave.value = "icon-like-active");
};
const getSaveData = () => {
  if (JSON.parse(localStorage.getItem(props.value))) {
    iconSave.value = "icon-like-active";
  }
  if (JSON.parse(localStorage.getItem(props.value))) {
    iconSave.value = "icon-like";
    localStorage.removeItem(props.value);
  } else if (!JSON.parse(localStorage.getItem(props.value))) {
    iconSave.value = "icon-like-active";
    localStorage.setItem(props.value, JSON.stringify(props.value));
  }
  if (!JSON.parse(localStorage.getItem(props.value))) {
    iconSave.value = "icon-like";
  }
};
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
  &_like-position {
    .base-field__tooltip {
      right: 50px;
    }
  }
  &__tooltip {
    position: absolute;
    bottom: -116px;
    right: -125px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: #ffffff;
    padding: 15px;
    max-width: 230px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    z-index: 1000;
    font-size: 16px;
    :before,
    :after {
      content: "";
      position: absolute;
      left: 66px;
      top: -20px;
      border: 10px solid transparent;
      border-bottom: 10px solid rgba(23, 23, 25, 0.1);
      z-index: 1;
      pointer-events: none;
    }
    :after {
      border-bottom: 10px solid white;
      top: -19px;
      z-index: 2;
    }
    .tooltip {
      &__text {
        color: rgba(39, 39, 39, 0.3);
      }
      &__btn {
        font-size: 16px;
      }
    }
  }
  &__save-action {
    display: flex;
  }
  &__save-icon {
    font-size: 26px;
    &_disabled {
      height: 25px;
      width: 26px;
    }
  }
  &__error {
    background: #ff647c;
    margin-top: 2px;
    border-radius: 10px;
    font-size: 12px;
    color: #fff;
    padding: 0 5px;
  }
  &_is-search {
    .base-field {
      &__label {
        display: block;
        font-size: 28px;
        margin-bottom: 12px;
      }
      &__control {
        height: 52px;
        padding: 0 16px 0 16px;
        background: #ffffff;
      }
    }
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
    background: #fafafa;
  }
  &_is-center &__input {
    text-align: center;
  }
  &_is-center {
    min-width: 100px;
  }
  &_not-save-value {
    .icon-like-active {
      pointer-events: none;
    }
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
