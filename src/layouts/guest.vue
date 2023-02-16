<template>
  <div class="guest-layout">
    <RouterView />
  </div>
</template>

<style lang="scss">
.guest-layout {
  background: #fafafa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: $Roboto;
  &__content {
    flex-grow: 1;
  }
}
</style>
