<template>
  <div class="favourite-list">
    <div
      v-for="item in savedRequests"
      class="favourite-list__item item"
      :key="item.searchValue"
    >
      <div class="item__inner" @click="testRoute">
        <span class="item__title">{{ item.requestName }}</span>
      </div>
      <div class="item__action">
        <button
          class="item__button item__button_edit"
          @click="testEdit"
        ></button>
        <button
          class="item__button item__button_delete"
          @click="testDelete"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  savedRequests: {
    type: Array,
    default: () => [],
  },
});

const testRoute = () => {
  console.log("redirect");
};

const testEdit = () => {
  console.log("edit");
};

const testDelete = () => {
  console.log("delete");
};
</script>

<style lang="scss" scoped>
.favourite-list {
  margin-bottom: 50px;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    border-bottom: 1px solid #f1f1f1;
    transition: 0.3s ease-in-out;
    overflow: hidden;
    &:hover {
      background: rgba(197, 228, 249, 0.3);
    }
    &:hover .item__button {
      display: block;
      transform: translateX(-20px);
    }
    &:first-child {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    &:last-child {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    &__inner {
      padding: 12px 20px;
      cursor: pointer;
      width: 100%;
    }
    &__title {
      font-weight: 500;
    }
    &__action {
      display: flex;
    }
    &__button {
      position: relative;
      height: 20px;
      width: 20px;
      background-size: 20px 20px;
      background-repeat: no-repeat;
      background-position: center;
      transform: translateX(150px);
      transition: 0.2s ease-in-out;
      &_edit {
        background-image: url("../../assets/img/edit.svg");
        opacity: 0.7;
      }
      &_delete {
        background-image: url("../../assets/img/delete.svg");
        margin-left: 10px;
      }
    }
  }
}
</style>
