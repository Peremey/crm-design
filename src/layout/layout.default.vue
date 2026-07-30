<script setup lang="ts">
import { ConfirmDelete } from '~/uikit/confirm';
import LHeader from '~/components/layout/LHeader.vue'
import LMenu from '~/components/layout/LMenu.vue';

const isOpen = ref(false)
onMounted(() => {
  document.addEventListener('deleteConfirm', () => {
    isOpen.value = true
  })
})
</script>

<template>
  <div class="layout">
    <LMenu />
    <div class="layout__content">
      <LHeader />
      <slot />
    </div>
    <ConfirmDelete v-model:isOpen="isOpen" />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  overflow-x: hidden;

  &__content {
    flex: 1 1 auto;
    height: 100dvh;
    overflow-y: auto;
  }
}
</style>
