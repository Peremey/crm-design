<script setup lang="ts">
import CalendarDay from './CalendarDay.vue';
import CalendarCell from './weekly/CalendarCell.vue';
import { TooltipMain } from '~/uikit/tooltip';
import CalendarContextMenu from './weekly/CalendarContextMenu.vue';
import { DAY_LIST } from '~/types/calendar';
import { getDay } from '~/lib/utils';

interface IProps {

}
interface IEmits {
    (e: 'add', startHour: number, endHour?: number): void
    (e: 'selectDate', date: Date): void
}
defineProps<IProps>()
const emit = defineEmits<IEmits>()

const selectedDate = defineModel<Date>({ default: () => new Date() })

const isOpenTooltip = ref(false)
const tooltipHost = ref('')
const openTooltip = (selector: string) => {
    tooltipHost.value = selector
    isOpenTooltip.value = true
}

const selectedCells = ref<{ hour: number, dayOfWeek: string }[]>([])

const selectCell = (hour: number, dayOfWeek: string, type: string) => {
    if (type == 'start') {
        selectedCells.value.length = 0
        selectedCells.value.push({ hour, dayOfWeek })
    } else if (type == 'move') {
        if (selectedCells.value.length && selectedCells.value[0]?.dayOfWeek == dayOfWeek)
            selectedCells.value.push({ hour, dayOfWeek })
    } else if (type == 'end') {
        if (selectedCells.value.length && selectedCells.value[0]?.dayOfWeek == dayOfWeek) {
            selectedCells.value.push({ hour, dayOfWeek })
        }
        emit('add', selectedCells.value[0]!.hour, selectedCells.value[selectedCells.value.length - 1]!.hour)
        selectedCells.value.length = 0
    }
}

const isSelectedCell = (hour: number, dayOfWeek: string) => {
    return !!selectedCells.value.find(cell => cell.hour == hour && cell.dayOfWeek == dayOfWeek)
}
const isDrag = ref(false)

const dateList = computed(() => {
    if (selectedDate.value) {
        const dayOfWeek = getDay(selectedDate.value)
        const dateStart = new Date(selectedDate.value)
        dateStart.setDate(dateStart.getDate() - dayOfWeek)
        const dates = []
        for (let i = 0; i < 7; i++) {
            const date = new Date(dateStart)
            date.setDate(dateStart.getDate() + i)
            dates.push(date)
        }
        return dates
    }
    return []
})

</script>

<template>
    <div class="table-weekly">
        <div class="table-weekly__cell"></div>
        <div v-for="date in dateList" class="table-weekly__cell">
            <CalendarDay :date="date" :currentMonth="selectedDate!.getMonth()" @click.stop="emit('selectDate', date)" />
            <div class="table-weekly__dayOfWeek dayOfWeek">{{ DAY_LIST[getDay(date)] }}</div>
        </div>
        <div>
            <template v-for="i in 22">
                <template v-if="i >= 8">
                    <div class="table-weekly__hour">{{ i }}:00</div>
                </template>
            </template>
        </div>
        <div v-for="dayOfWeek in DAY_LIST" class="table-weekly__cell-group" :class="[
            { 'table-weekly__cell_no-cur': dayOfWeek == 'ПН' },
            { 'table-weekly__cell_blocked': dayOfWeek == 'ВС' }
        ]">
            <template v-for="i in 22">
                <template v-if="i >= 8">
                    <CalendarCell :id="'cell-weekly-' + i + '-' + dayOfWeek" :dayMonth="{ day: 1, month: 1 }"
                        :currentMonth="selectedDate!.getMonth()" :hour="i" :dayOfWeek="dayOfWeek"
                        :isSelected="isSelectedCell(i, dayOfWeek)" v-model:isDrag="isDrag"
                        @edit="openTooltip('#cell-weekly-' + i + '-' + dayOfWeek)" @add="emit('add', i)"
                        @selectCell="selectCell" />
                </template>
            </template>
        </div>

        <Teleport to="body">
            <TooltipMain v-model="isOpenTooltip" position="right" :hostSelector="tooltipHost"
                class="table-weekly__tooltip tooltip">
                <CalendarContextMenu @close="isOpenTooltip = false" />
            </TooltipMain>
        </Teleport>
    </div>
</template>

<style scoped lang="scss">
.table-weekly {
    display: grid;
    grid-template-columns: r(100) repeat(7, 1fr);
    gap: r(1);
    border-top: solid r(1) $l-gray;

    &__cell {
        background-color: white;
        padding: r(16);

        &_no-cur {
            background: $gr-gray;
        }

        &_blocked {
            background: $gr-yellow;
        }
    }

    &__cell-group {
        display: flex;
        flex-direction: column;
        background-color: white;
        min-width: 0;
        overflow: hidden;
    }

    &__dayOfWeek {
        padding-top: r(10);
        text-align: center;

    }

    &__hour {
        @include pos-center;
        @include m-16;
        color: $gray;
        width: r(100);
        height: r(47);
        margin-bottom: r(1);
        background-color: white;

        &:last-child {
            height: r(48);
            margin-bottom: r(0);
        }
    }

    &__tooltip {
        width: r(560);
        height: r(564);
        padding: r(24);
    }
}
</style>