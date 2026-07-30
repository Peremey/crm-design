<script setup lang="ts">
import { UiIcon } from '~/uikit/icon';
import { InputMain } from '~/uikit/input';

const search = defineModel<string>()
</script>

<template>
    <InputMain v-model="search" placeholder="Найти" class="novalidate filter-search">
        <template #iconLeft>
            <UiIcon name="f-search" />
        </template>
    </InputMain>
</template>

<style scoped lang="scss">
.filter-search {
    margin-bottom: r(16);
    width: r(280);
}
</style>