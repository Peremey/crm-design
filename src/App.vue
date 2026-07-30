<script lang="ts" setup>
import { LayoutDefault, LayoutEmpty } from '~/layout';

const layouts = {
  default: LayoutDefault,
  empty: LayoutEmpty
};

const route = useRoute();

const computedLayout = computed(() => {
  const layout = route?.meta?.layout as keyof typeof layouts;

  return layouts[layout ?? 'default'];
});
</script>

<template>
  <component :is="computedLayout">
    <router-view />
  </component>
</template>

<style lang="scss"></style>
