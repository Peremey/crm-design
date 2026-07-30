<script setup lang="ts">
import FilterDate from '~/components/filters/FilterDate.vue';
import { CheckMain } from '~/uikit/check';
import CalendarTableMonth from './CalendarTableMonth.vue';
import CalendarTableWeekly from './CalendarTableWeekly.vue';
import CalendarList from './CalendarList.vue';
import InscribeModal from './InscribeModal.vue';
import { PICKER_TYPE } from '~/types/calendar';

interface IProps {
    isCalendarView: boolean
    isWidget?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
    isWidget: false
})
interface IEmits {
    (e: 'selectDate'): void
}
const emit = defineEmits<IEmits>()
const selectedDate = defineModel<Date>({ default: () => new Date() })
const isCalendarView = defineModel<boolean>('isCalendarView')

const isMonth = ref(true)

const isOpenInscribeModal = ref(false)
const inscribeStartHour = ref<string>()
const inscribeEndHour = ref<string>()
const openInscribeModal = (startHour: number, endHour?: number) => {

    inscribeStartHour.value = String(startHour).padStart(2, '0') + ':00'
    inscribeEndHour.value = endHour ? String(endHour + 1).padStart(2, '0') + ':00' : String(startHour + 1).padStart(2, '0') + ':00'
    isOpenInscribeModal.value = true
}

const pickerType = computed(() => {
    if (props.isCalendarView) {
        if (isMonth.value)
            return PICKER_TYPE.Month
        else
            return PICKER_TYPE.Week
    }
    return PICKER_TYPE.Date
})

const selectDate = (date: Date) => {
    selectedDate.value = date
    emit('selectDate')
}
</script>

<template>
    <div class="calendar">
        <div class="calendar__header">
            <FilterDate v-model="selectedDate" :type="pickerType" />

            <slot></slot>

            <CheckMain v-if="isCalendarView" variant="toggle3" v-model="isMonth" />
        </div>

        <template v-if="isCalendarView">
            <CalendarTableMonth v-if="isMonth" v-model="selectedDate" @selectDate="selectDate" />
            <CalendarTableWeekly v-else v-model="selectedDate" @add="openInscribeModal" @selectDate="selectDate" />
        </template>
        <CalendarList v-else />

        <InscribeModal v-model:isOpen="isOpenInscribeModal" v-model:startHour="inscribeStartHour"
            v-model:endHour="inscribeEndHour" />
    </div>
</template>

<style scoped lang="scss">
.calendar {
    border: solid r(1) $l-gray;
    border-radius: r(20);
    background-color: $l-gray;
    overflow: hidden;

    &__header {
        padding: r(24);
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: r(8);
        background-color: white;
    }


}
</style>