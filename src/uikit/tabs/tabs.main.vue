<script setup lang="ts">
interface IProps {
    tabs: string[]
}
defineProps<IProps>()
const activeTab = defineModel<string>()

</script>

<template>
    <div class="tabs">
        <button v-for="item of tabs" @click="activeTab = item" class="tabs__btn"
            :class="{ 'tabs__btn_act': item == activeTab }">

            {{ item }}
        </button>
    </div>
</template>

<style scoped lang="scss">
.tabs {
    //display: flex;

    &__btn {
        min-width: r(184);
        padding: r(16) r(20);
        @include sb-15;
        color: $gray;
        //flex: 1 1 auto;

        &_act {
            color: $red;
            border-bottom: solid r(2) $red;
        }
    }
}
</style>