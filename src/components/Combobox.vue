<script setup lang="ts">
import Multiselect from '@vueform/multiselect';

interface IProps {
    options: Array<{ label: string, value: string }>
}
defineProps<IProps>()

const value = defineModel<string>()
</script>

<template>
    <Multiselect v-model="value" :options="options" class="select" />
</template>

<style scoped lang="scss">
.select {
    --ms-radius: #{$brad};
}
</style>

<style src="@vueform/multiselect/themes/default.css"></style>