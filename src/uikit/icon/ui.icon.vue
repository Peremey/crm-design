<script setup lang="ts">
import { type IconName } from '../../types/icon-names';

interface Props {
  name: IconName;
}

const props = defineProps<Props>();
const resolvedComponent = shallowRef();

watchEffect(async () => {
  // Динамически импортируем компонент
  resolvedComponent.value = (await import(`./icons/${props.name}.svg`)).default;
});
</script>

<template>
  <component :is="resolvedComponent" :alt="name" />
</template>
