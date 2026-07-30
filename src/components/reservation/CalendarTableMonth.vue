<script setup lang="ts">
import { TooltipMain } from '~/uikit/tooltip';
import CalendarCell from './month/CalendarCell.vue';
import CalendarContextMenu from './month/CalendarContextMenu.vue';
import { DAY_LIST } from '~/types/calendar';
import { getDay } from '~/lib/utils';

interface IEmits {
    (e: 'add'): void
    (e: 'selectDate', date: Date): void
}
const emit = defineEmits<IEmits>()

const selectedDate = defineModel<Date>({ default: () => new Date() })
const daysMonth = computed(() => {
    return getMonthDays(selectedDate.value!)
})

function getMonthDays(date: Date): Date[] {
    const res: Date[] = [];

    const startDate = new Date(date.getFullYear(), date.getMonth(), 1)
    startDate.setDate(startDate.getDate() - getDay(startDate))

    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    endDate.setDate(endDate.getDate() - getDay(endDate))
    endDate.setDate(endDate.getDate() + 6)

    while (startDate <= endDate) {
        const item_date = new Date(startDate)
        res.push(item_date)
        startDate.setDate(startDate.getDate() + 1)
    }

    return res;
}

const isOpenTooltip = ref(false)
const tooltipHost = ref('')
const openTooltip = (selector: string) => {
    tooltipHost.value = selector
    isOpenTooltip.value = true
}

</script>

<template>
    <div class="table-month">
        <div v-for="dayOfWeek in DAY_LIST" class="table-month__dayOfWeek dayOfWeek">
            {{ dayOfWeek }}
        </div>

        <CalendarCell :id="'cell-' + dayMonth.getDate() + '-' + dayMonth.getMonth() + '-' + dayMonth.getFullYear()"
            v-for="dayMonth in daysMonth" :date="dayMonth" :currentMonth="selectedDate!.getMonth()"
            @click="openTooltip('#cell-' + dayMonth.getDate() + '-' + dayMonth.getMonth())"
            @selectDate="emit('selectDate', dayMonth)" />

        <Teleport to="body">
            <TooltipMain v-model="isOpenTooltip" position="mouse" :hostSelector="tooltipHost"
                class="table-month__tooltip  tooltip">
                <CalendarContextMenu @close="isOpenTooltip = false" @add="emit('add')" />
            </TooltipMain>
        </Teleport>
    </div>
</template>

<style scoped lang="scss">
.table-month {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: r(1);
    border-top: solid r(1) $l-gray;

    &__dayOfWeek {
        @include pos-center;
        height: r(56);
        background-color: white;
    }

    &__tooltip {
        width: r(240);
        height: r(116);
        padding: r(8) r(8);
    }
}
</style>