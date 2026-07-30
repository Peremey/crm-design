<script setup lang="ts">
import { TooltipMain } from '~/uikit/tooltip';
import ChatMain from './ChatMain.vue';

const isOpenTemplatesTooltip = ref(false)
const openTemplatesTooltip = () => {
    isOpenTemplatesTooltip.value = true
}
</script>

<template>
    <ChatMain @showTemplates="openTemplatesTooltip" />
    <TooltipMain v-model="isOpenTemplatesTooltip" position="bottom" hostSelector="#chat-templates">
        <div class="tooltip-templates"></div>
    </TooltipMain>
</template>

<style scoped lang="scss">
.tooltip-templates {
    width: 30vw;
    height: 30dvh;
    overflow-y: hidden;
}
</style>