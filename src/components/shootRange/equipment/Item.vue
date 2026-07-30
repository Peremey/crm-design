<script setup lang="ts">
import { UiIcon } from '~/uikit/icon';
import CheckAgregabled from '~/components/CheckAgregabled.vue';

interface IProps {
    name: string
    tooltipSelector: string
    itemId: string
}
interface IEmits {
    (e: 'openTooltip', selector: string): void
}
defineProps<IProps>()
const emit = defineEmits<IEmits>()

const selectedRows = defineModel<Set<string>>()
</script>

<template>
    <div class="item">
        <div class="item__col item__col_centered">
            <button class="dot-btn dot-btn_move">
                <UiIcon name="drop" />
            </button>
        </div>
        <div class="item__col item__col_centered">
            <CheckAgregabled :itemId="itemId" v-model="selectedRows" />
        </div>
        <div class="item__col item__col_name">
            {{ name }}
        </div>
        <slot name="col4"></slot>
        <slot name="col5"></slot>
        <slot name="col6"></slot>
        <slot name="col7"></slot>
        <div class="item__col item__col_centered">
            <button :id="tooltipSelector" @click="emit('openTooltip', '#' + tooltipSelector)"
                class="clickabled dot-btn">
                <UiIcon name="client-menu" />
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.item {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 1 / -1;

    &__col {
        &_centered {
            @include pos-center;
        }

        &_name {
            @include m-16;
            color: $black;
            display: flex;
            align-items: center;
            gap: r(8);
            padding-left: r(8);
            max-width: r(480);
        }

        &_param {
            color: $gray;
            @include n-16;
            display: flex;
            align-items: center;
        }

        &_blue {
            color: $blue;
            @include m-15;
        }

        &_end {
            color: $green;
            @include sb-16;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: r(16);
        }
    }
}
</style>