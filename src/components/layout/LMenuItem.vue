<script setup lang="ts">
import { type IconName } from '~/types/icon-names';
import { UiIcon } from '~/uikit/icon';
interface IProps {
    icon: IconName
    title: string
    routeName: string
    count?: number
    type: 'full' | 'small'
}
const props = defineProps<IProps>()
</script>

<template>
    <RouterLink :to="{ name: routeName }" class="nav-item clickabled" active-class="clickabled_act"
        :class="[{ 'nav-item_small': type == 'small' }]">

        <UiIcon :name="icon" class="nav-item__icon" />
        <div v-if="type == 'full'" class="nav-item__title">{{ title }}</div>
        <div v-if="count" class="badge" :class="{ 'badge_small': type == 'small' }">{{ count }}</div>
    </RouterLink>
</template>

<style lang="scss" scoped>
.nav-item {
    position: relative;

    .badge {
        flex: 0 0 auto;

        &_small {
            position: absolute;
            top: 0;
            right: 0;
        }
    }
}

.clickabled_act {
    pointer-events: none;
}
</style>