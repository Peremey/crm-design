<script setup lang="ts">
import { type IconName } from '~/types/icon-names';
import { UiIcon } from '~/uikit/icon';
import CheckAgregabled from '~/components/CheckAgregabled.vue';

interface IProps {
    name: string
    tooltipSelector: string
    itemId: string
    icon: IconName
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
        <button class="clickabled btn-serv">
            <UiIcon :name="icon" />
        </button>
        <div class="item__col item__col_txt">
            {{ name }}
        </div>
        <div class="item__col item__col_txt">
            1 час
        </div>
        <div class="item__col item__col_txt">
            <button class="lnk item__col_blue">Описание</button>
            <button class="item__col_blue">
                <UiIcon name="t-info" />
            </button>
        </div>
        <div class="item__col item__col_end">
            2 000 ₽
        </div>
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

        &_txt {
            @include m-16;
            color: $black;
            display: flex;
            align-items: center;
            gap: r(8);
            padding-left: r(8);
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