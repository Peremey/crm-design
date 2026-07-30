<script setup lang="ts">
import { ButtonNotify } from '~/uikit/button';
import LNotifyList from './LNotifyList.vue';
import { TooltipMain } from '~/uikit/tooltip';

const isOpenTooltip = ref(false)
</script>

<template>
    <ButtonNotify id="notifications" icon="bell" :count="99" @click="isOpenTooltip = true" :isActive="isOpenTooltip" />

    <Teleport to="body">
        <TooltipMain v-model="isOpenTooltip" position="bottom" hostSelector="#notifications" class="tooltip">
            <LNotifyList @close="isOpenTooltip = false" />
        </TooltipMain>
    </Teleport>
</template>

<style scoped lang="scss"></style>