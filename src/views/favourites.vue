<template>
  <div class="favourites">
    <div class="favourites__inner">
      <h1 class="favourites__title">Избранное</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.favourites {
  &__inner {
    @include container;
  }
  &__title {
    font-weight: 400;
    font-size: 28px;
    color: #000000;
    margin: 40px 0;
  }
}
</style>
