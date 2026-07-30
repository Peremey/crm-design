<script setup lang="ts">
import GroupFields from '~/components/GroupFields.vue';
import { InputMain } from '~/uikit/input';
import { numbersMask } from '~/lib/validate/masks/masks';

interface IProps {
    _id: string
    title: string
}
defineProps<IProps>()
const data = defineModel<Array<string>>({
    default: () => ['', '']
})
const activeId = defineModel<string>('activeId')


</script>

<template>
    <GroupFields :_id="_id" :title="title" v-model:activeId="activeId" v-model="data">
        <InputMain label="от" :mask="numbersMask" v-model="data[0]" class="novalidate" />
        <InputMain label="до" :mask="numbersMask" v-model="data[1]" class="novalidate" />
    </GroupFields>
</template>

<style scoped lang="scss"></style>