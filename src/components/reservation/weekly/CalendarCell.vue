<script setup lang="ts">
import CalendarBlockedPlate from '../CalendarBlockedPlate.vue';
import CalendarPersonPlate from './CalendarPersonPlate.vue';

interface IProps {
    dayMonth: { day: number, month: number }
    currentMonth: number
    hour: number
    dayOfWeek: string
    isSelected?: boolean
}
interface IEmits {
    (e: 'edit'): void
    (e: 'add', hourStart: number, hourEnd?: number): void
    (e: 'selectCell', hour: number, dayOfWeek: string, type: string): void
}

const props = defineProps<IProps>()
const emit = defineEmits<IEmits>()

const persons = [
    { avatar: '/img/tmp/person.png', name: 'Петров А.В.' },
]

const isDrag = defineModel<boolean>('isDrag')

const isBlockedCell = computed(() => {
    return props.dayOfWeek == 'СР'
})

const add = (hourStart: number, hourEnd?: number) => {
    if (!isBlockedCell.value) {
        emit('add', hourStart, hourEnd)
    }
}

const selectCell = (type: string) => {
    if (!isBlockedCell.value) {
        if (type == 'start') {
            isDrag.value = true
        } else if (type == 'move' && !isDrag.value) {
            return
        } else if (type == 'end') {
            isDrag.value = false
        }
        console.log('type', type)
        emit('selectCell', props.hour, props.dayOfWeek, type)
    }
}

</script>

<template>
    <div @click="add(hour)" @mousedown="selectCell('start')" @mouseenter="selectCell('move')"
        @mouseup="selectCell('end')" class="cell" :class="{ 'cell_selected': isSelected }">

        <CalendarBlockedPlate v-if="dayOfWeek == 'ВС' && hour == 8" title="Выходной"
            style="--height-blocked-plate:100%;" />
        <div class="cell__persons" :class="{ 'cell__persons_one': persons.length <= 1 }">
            <CalendarPersonPlate v-if="dayOfWeek == 'СР'" v-for="(person, index) in persons" :avatar="person.avatar"
                :name="person.name" :isMulti="persons.length > 1" :colorIndex="index" @click="emit('edit')" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.cell {
    width: 100%;
    height: r(48);
    border-bottom: solid r(1) $l-gray;
    padding: r(6) r(14);
    min-width: 0;
    flex: 0 1 auto;
    max-width: 100%;
    overflow-x: auto;
    cursor: pointer;



    &_selected {
        background-color: $yellow;
    }

    &:last-child {
        height: r(48);
        border-bottom: r(0);
    }

    &__persons {
        display: flex;
        gap: r(4);
        width: 100%;
        min-width: 0;
        max-width: 160px;

        &_one {
            max-width: 100%;
        }
    }
}
</style>