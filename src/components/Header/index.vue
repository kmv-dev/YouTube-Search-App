<template>
  <header class="header">
    <div class="header__inner">
      <a class="header__logo" href="https://sibdev.pro/">
        <img
          class="header__logo-img"
          src="@/assets/img/sibdev-logo.svg"
          alt="logo"
        />
      </a>
      <div class="nav-bar">
        <div class="nav-bar__inner">
          <div class="nav-bar__items">
            <div
              v-for="(item, index) of links"
              :key="item.title"
              class="nav-bar__item"
            >
              <router-link :to="item.to" @click="setTabIndex(index)">
                <span>{{ item.title }}</span>
              </router-link>
            </div>
            <div class="nav-bar__shape" :style="currentLinkBorderPosition" />
          </div>
        </div>
      </div>
      <div class="header__action">
        <BaseButton class="header__button" :mode="'text'" @click="logOut"
          >Выйти</BaseButton
        >
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const tabIndex = ref(0);

const links = [
  {
    title: "Поиск",
    to: "/",
  },
  {
    title: "Избранное",
    to: "/ui-kit",
  },
];
onMounted(() => {
  router.currentRoute.value.fullPath === "/favourites"
    ? (tabIndex.value = 1)
    : (tabIndex.value = 0);
});
const currentLinkBorderPosition = computed(() => {
  return `left: ${tabIndex.value * 50}%;`;
});

const setTabIndex = (index) => {
  tabIndex.value = index;
};
const logOut = () => {
  console.log("вышел");
};
</script>

<style lang="scss" scoped>
.header {
  background: #ffffff;
  border: 1px solid #f1f1f1;
  &__inner {
    @include container;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .nav-bar {
    width: 100%;
    background: transparent;
    &__inner {
      @include container;
      margin: 0 auto;
      height: 100%;
      display: flex;
      align-items: center;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
        background-color: transparent;
      }
      scrollbar-color: transparent transparent;
      scrollbar-width: none;
    }
    &__items {
      position: relative;
      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-items: center;
      grid-gap: 5px;
    }
    &__item {
      padding: 28px 0;
      color: #1390e5;
      transition: 0.2s ease-in-out;
      a {
        text-decoration: none;
      }
      span {
        display: block;
        color: #1390e5;
        text-decoration: none;
        transition: 0.2s ease-in-out;
        word-break: break-all;
        &:hover {
          opacity: 0.7;
        }
      }
    }
    &__shape {
      $tabsCount: 2;
      $pagePadding: 5px;
      margin: 0 $pagePadding;
      position: absolute;
      height: 2px;
      left: 0;
      bottom: 0;
      width: calc((100% / #{$tabsCount}) - #{$pagePadding * 2});
      background: #1390e5;
      transition: 0.3s ease-in-out;
    }
  }
  &__action {
    display: flex;
  }
  &__button {
    &_left {
      margin-right: 20px;
    }
  }
}
</style>
