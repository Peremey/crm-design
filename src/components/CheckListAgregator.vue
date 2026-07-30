<script setup lang="ts">
import { UiIcon } from '~/uikit/icon';
interface IProps {
    selectedRows: Set<string>
}
defineProps<IProps>()
</script>

<template>
    <div v-if="selectedRows?.size" class="cpa">
        <div class="cpa__count">
            Выбрано <span>{{ selectedRows.size }}</span>
        </div>
        <button class="cpa__delete lnk">
            <UiIcon name="delete" />
            Удалить
        </button>
    </div>
</template>

<style scoped lang="scss">
.cpa {
    display: flex;
    align-items: center;
    gap: r(8);
    @include m-15;

    &__count {
        color: $gray;
    }

    &__delete {
        display: flex;
        align-items: center;
        color: $red;
        gap: r(4);

        svg {
            width: r(20);
            height: r(20);
        }
    }
}
</style>