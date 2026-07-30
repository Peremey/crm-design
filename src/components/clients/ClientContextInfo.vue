<script setup lang="ts">
import { UiIcon } from '~/uikit/icon';


</script>

<template>
    <div class="context-menu">
        <div v-for="i in 3" class="context-menu__item">
            <UiIcon name="t-car" />
            <div>A777AA 69, Audi Q5</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.context-menu {
    width: fit-content;
    height: fit-content;
    padding: r(24);

    &__item {
        display: flex;
        gap: r(12);
        align-items: center;
        margin-bottom: r(16);

        svg {
            width: r(28);
            height: r(28);
        }

        &>div {
            color: $black;
            @include m-16;
        }

        &:last-child {
            margin-bottom: 0;
        }
    }
}
</style>