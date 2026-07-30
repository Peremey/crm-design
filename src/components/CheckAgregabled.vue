<script setup lang="ts">
import { CheckMain } from '~/uikit/check';

interface IProps {
    itemId: string
}
const props = defineProps<IProps>()
const selectedRows = defineModel<Set<string>>()

const isCheck = ref(false)
watch(isCheck, () => {
    if (isCheck.value)
        selectedRows.value?.add(props.itemId)
    else
        selectedRows.value?.delete(props.itemId)
})
</script>

<template>
    <CheckMain variant="three" v-model="isCheck" />
</template>

<style scoped lang="scss"></style>