<template>
  <div class="content">
    <div class="content__inner">main content</div>
  </div>
</template>

<script></script>

<style lang="scss">
.content {
  @include _1024 {
    background-color: aquamarine;
  }
  &__inner {
    @include container;
  }
}
</style>
