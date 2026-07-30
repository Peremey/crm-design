<script setup lang="ts">
import CheckAgregabled from './CheckAgregabled.vue';

interface IProps {
    itemId: string
}
const props = defineProps<IProps>()
const selectedRows = defineModel<Set<string>>()

</script>

<template>
    <div class="person" :class="{ 'person_selected': selectedRows?.has(itemId) }">
        <CheckAgregabled :itemId="itemId" v-model="selectedRows" />
        <img src="/img/tmp/person.png" alt="" class="person__avatar" />
        <div>
            <div class="person__name">
                <slot name="name"></slot>
            </div>
            <div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.person {
    padding: r(18) r(22);
    display: flex;
    align-items: center;
    gap: r(8);
    color: $black;
    @include m-15;

    &_selected {
        border-left: solid r(2) $red;
    }

    &__avatar {
        border-radius: 50%;
        width: r(44);
        height: r(44);
    }

    &__name {
        margin-bottom: r(6);
    }
}
</style>