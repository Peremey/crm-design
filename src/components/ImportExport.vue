<script setup lang="ts">
import { UiIcon } from '~/uikit/icon';
import ExportModal from '~/components/ExportModal.vue';
import ImportModal from '~/components/ImportModal.vue';

const isOpenExport = ref(false)
const openExport = () => {
    isOpenExport.value = true
}

const isOpenImport = ref(false)
const openImport = () => {
    isOpenImport.value = true
}
</script>

<template>
    <button @click="openExport" class="btn btn_white">
        <UiIcon name="e-cloud" />
        <div>Экспорт</div>
    </button>

    <button @click="openImport" class="btn btn_white">
        <UiIcon name="i-cloud" />
        <div>Импорт</div>
    </button>

    <ExportModal v-model:isOpen="isOpenExport" />
    <ImportModal v-model:isOpen="isOpenImport" />
</template>

<style scoped lang="scss"></style>