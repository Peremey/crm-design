<script setup lang="ts">
const isOpen = defineModel<boolean>('isOpen')

const selectRef = ref<HTMLElement | null>(null)

const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
        isOpen.value = false
    }
}

onMounted(() => {
    document.addEventListener('pointerdown', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('pointerdown', handleClickOutside)
})
</script>

<template>
    <div ref="selectRef" class="select">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.select {
    position: relative;
}
</style>