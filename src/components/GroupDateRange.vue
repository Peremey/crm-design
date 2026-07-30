<script setup lang="ts">
import { InputMain } from '~/uikit/input';
import GroupFields from '~/components/GroupFields.vue';

interface IProps {
    _id: string
    title: string

}
defineProps<IProps>()
const activeId = defineModel<string>('activeId')
const data = defineModel<Array<string>>({
    default: () => ['', '']
})
</script>

<template>
    <GroupFields :_id="_id" :title="title" v-model:activeId="activeId" v-model="data">
        <InputMain type="date" label="c" class="novalidate" v-model="data[0]" />
        <InputMain type="date" label="до" class="novalidate" v-model="data[1]" />
    </GroupFields>
</template>

<style scoped lang="scss"></style>