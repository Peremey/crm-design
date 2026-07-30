<script setup lang="ts">
import { UiIcon } from '~/uikit/icon';
import SummaryField from '../SummaryField.vue';
import CalendarBlockedPlate from '../CalendarBlockedPlate.vue';
import CalendarDay from '../CalendarDay.vue';

interface IProps {
    date: Date
    currentMonth: number
}
defineProps<IProps>()

interface IEmits {
    (e: 'selectDate'): void
}
const emit = defineEmits<IEmits>()
</script>

<template>
    <div class="cell" :class="[
        { 'cell_no-cur': currentMonth != date.getMonth() },
        { 'cell_blocked': date.getDate() == 9 },
        { 'cell_buyed': date.getDate() == 11 }
    ]">
        <CalendarDay :date="date" :currentMonth="currentMonth" @click.stop="emit('selectDate')" />

        <SummaryField v-if="date.getDate() == 7" icon="f-users" value="5 записей" class="cell__field" />
        <SummaryField v-if="date.getDate() == 7" icon="f-money" value="10 000 ₽" class="cell__field" />
        <SummaryField v-if="date.getDate() == 7" icon="trend" value="17 000 ₽" trend="green" />

        <CalendarBlockedPlate v-if="date.getDate() == 9" title="Санитарный день" />

        <div v-if="date.getDate() == 11" class="cell__buyed-plate">
            <UiIcon name="f-users" />
            <div>Выкуплен</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.cell {
    height: r(174);
    background-color: white;
    padding: r(16);
    cursor: pointer;

    &_no-cur {
        background: $gr-gray;
    }

    &_blocked {
        background: $gr-yellow;
    }

    &_buyed {
        background-color: $bg;
    }


    &__field {
        margin-bottom: r(6);
    }

    &__buyed-plate {
        height: r(26);
        background-color: $yellow;
        @include pos-center;
        gap: r(8);
        border-radius: r(8);

        &>div {
            @include n-14;
            color: $black;
        }

        svg {
            width: r(20);
            height: r(20);
            color: white;
        }
    }
}
</style>