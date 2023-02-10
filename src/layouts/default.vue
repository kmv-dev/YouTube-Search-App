<template>
  <div class="primary">
    <Header />
    <RouterView class="primary__content" />
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/components/Header/index.vue";
import Footer from "@/components/Footer/index.vue";
</script>

<style lang="scss">
.primary {
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
