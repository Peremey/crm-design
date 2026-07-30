<script setup lang="ts">
import GroupFields from '~/components/GroupFields.vue';
import { RadioMain } from '~/uikit/radio';
import { type ISelectOption } from '~/types/ISelectOption';

interface IProps {
    _id: string
    title: string
    data: ISelectOption[]
    name: string
}
defineProps<IProps>()
const activeId = defineModel<string>('activeId')
const selectedItem = defineModel<string>('selected')
</script>

<template>
    <GroupFields :_id="_id" :title="title" :isAccordion="false" v-model:activeId="activeId">
        <RadioMain v-for="item of data" :name="name" :optionValue="item.value.toString()" :optionLabel="item.label"
            v-model="selectedItem" />
    </GroupFields>
</template>

<style scoped lang="scss"></style>