<script setup lang="ts">
import { AccordionMain } from '~/uikit/accordion';
interface IProps {
    _id: string
    title: string,
    isAccordion?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
    isAccordion: true
})
const activeId = defineModel<string>('activeId')
const data = defineModel<Array<{ value: string, selected: boolean } | string>>()

watch(data, () => {
    if (props.isAccordion) {
        if (data.value)
            for (const item of data.value) {
                if (typeof item == 'object' && 'selected' in item) {
                    if (item.selected) {
                        activeId.value = props._id
                        return
                    }
                }
                else if (item) {
                    activeId.value = props._id
                    return
                }
            }
        activeId.value = ''
    }
}, { deep: true })

watch(() => props.isAccordion, () => {
    if (!props.isAccordion)
        activeId.value = props._id
}, { immediate: true })
</script>


<template>
    <AccordionMain :_id="_id" :isAccIcon="isAccordion" :disabled="!isAccordion" v-model="activeId" class="group">
        <div class="group__title">
            {{ title }}
        </div>
        <template #body>
            <div class="group__content">
                <slot></slot>
            </div>
        </template>
    </AccordionMain>
</template>

<style scoped lang="scss">
.group {
    border: solid r(1) $l-gray;
    border-radius: r(20);
    overflow: hidden;

    &__title {
        @include sb-15;
        color: $black;
    }

    &__content {
        border-top: r(1) solid $l-gray;
        padding: r(16);
        display: flex;
        flex-direction: column;
        gap: r(16);
        max-height: r(266);
        overflow-y: auto;
    }
}

:deep(.accordion__header) {
    padding: r(16) r(0) r(16) r(16);
    background-color: $bg;
}

:deep(.accordion__header_small) {
    width: 100%;
}
</style>