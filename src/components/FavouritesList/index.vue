<template>
  <div class="favourite-list">
    <div
      v-for="item in savedRequests"
      class="favourite-list__item item"
      :key="item.searchValue"
    >
      <span class="item__title">{{ item.requestName }}</span>
      <div class="item__action">
        <button></button>
        <button></button>
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
</script>

<style lang="scss" scoped>
.favourite-list {
  margin-bottom: 50px;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    background: #ffffff;
    border-bottom: 1px solid #f1f1f1;
    transition: 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
      background: rgba(197, 228, 249, 0.3);
    }
    &:first-child {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    &:last-child {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    &__title {
      font-weight: 500;
      font-size: 16px;
    }
  }
}
</style>
