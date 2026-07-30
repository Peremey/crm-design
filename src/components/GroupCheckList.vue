<script setup lang="ts">
import GroupFields from '~/components/GroupFields.vue';
import { CheckMain } from '~/uikit/check';

interface IProps {
    _id: string
    title: string
    isAccordion?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
    isAccordion: true
})
const data = defineModel<Array<{ value: string, selected: boolean }>>()
const activeId = defineModel<string>('activeId')
</script>

<template>
    <GroupFields :_id="_id" :title="title" :isAccordion="isAccordion" v-model:activeId="activeId" v-model="data">
        <CheckMain v-for="item of data" variant="three" :text="item.value" v-model="item.selected" />
    </GroupFields>
</template>

<style scoped lang="scss"></style>