<script setup lang="ts">
import { ButtonNotify } from '~/uikit/button';
import LNotifications from './LNotifications.vue';

</script>

<template>
  <header>
    <ButtonNotify icon="chats" :count="99" />

    <LNotifications />
  </header>
</template>

<style scoped lang="scss">
header {
  height: r(72);
  padding-right: r(24);
  display: flex;
  justify-content: flex-end;
  align-items: end;
  gap: r(16);
}
</style>