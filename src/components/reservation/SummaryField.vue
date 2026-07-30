<script setup lang="ts">
import { type IconName } from '~/types/icon-names';
import { UiIcon } from '~/uikit/icon';

interface IProps {
    icon: IconName
    value: string
    trend?: 'red' | 'green'
}
defineProps<IProps>()
</script>

<template>
    <div class="summary" :class="[{ 'summary_red': trend == 'red' }, { 'summary_green': trend == 'green' }]">
        <UiIcon :name="icon" class="summary__icon"
            :class="[{ 'summary__icon_red': trend == 'red' }, { 'summary__icon_green': trend == 'green' }]" />
        <div class="summary__value" :class="[{ 'summary_red': trend == 'red' }, { 'summary_green': trend == 'green' }]">
            {{ value }}
        </div>
    </div>
</template>

<style scoped lang="scss">
.summary {
    display: flex;
    align-items: center;
    gap: r(8);


    &__icon {
        width: r(20);
        height: r(20);
        color: $icon-gray;

        &_green {
            color: $green;
            transform: rotateX(180deg);
        }

        &_red {
            color: $red-d;
        }
    }

    &__value {
        color: $black;
        @include n-14;
    }

    &_red {
        color: $red-d;
        @include b-14;
    }

    &_green {
        color: $green;
        @include b-14;
    }

}
</style>