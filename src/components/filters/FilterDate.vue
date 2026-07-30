<script setup lang="ts">
import { UiIcon } from '~/uikit/icon';
import { VueDatePicker } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ru } from 'date-fns/locale'
import { PICKER_TYPE } from '~/types/calendar';

interface IProps {
    type: PICKER_TYPE
}
const props = defineProps<IProps>()

const selectedDate = defineModel<Date>()

const internalModel = computed({
    get() {
        if (props.type == PICKER_TYPE.Month)
            return { month: selectedDate.value!.getMonth(), year: selectedDate.value!.getFullYear() }
        else if (props.type == PICKER_TYPE.Week) {
            const endDate = new Date(selectedDate.value!)
            endDate.setDate(endDate.getDate() + 7)
            return [selectedDate.value!, endDate]
        }
        return selectedDate.value
    },

    set(value: Date | { month: number, year: number } | Date[]) {
        console.log('val:', value)
        if (props.type == PICKER_TYPE.Month) {
            const val = value as { month: number, year: number }
            selectedDate.value = new Date(val.year, val.month)
        }
        else if (props.type == PICKER_TYPE.Week) {
            selectedDate.value = (value as Date[])[0]
        }
        else
            selectedDate.value = (value as Date)
    }
})

const formats = computed(() => {
    const formatOptions: Intl.DateTimeFormatOptions =
        props.type == PICKER_TYPE.Date
            ? { day: 'numeric', month: 'long', year: 'numeric' }
            : { month: 'long' }

    let formatted = new Intl.DateTimeFormat('ru-RU', formatOptions)
        .format(selectedDate.value!)
        .replace(' г.', '')

    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1)

    if (props.type != PICKER_TYPE.Date) {
        formatted += ' ' + selectedDate.value!.getFullYear()
    }

    return { input: formatted }
})

const changePeriod = (diff: number) => {
    const date = new Date(selectedDate.value!)

    if (props.type == PICKER_TYPE.Month) {
        date.setMonth(date.getMonth() + diff)
    }
    else if (props.type == PICKER_TYPE.Week) {
        date.setDate(date.getDate() + diff * 7)
    }
    else {
        date.setDate(date.getDate() + diff)
    }
    selectedDate.value = date
}
</script>

<template>
    <div class="date">
        <button @click="changePeriod(-1)" class="btn-icon clickabled">
            <UiIcon name="f-arrow" />
        </button>

        <VueDatePicker v-model="internalModel" :month-picker="type == PICKER_TYPE.Month"
            :week-picker="type == PICKER_TYPE.Week" :formats="formats" :locale="ru" :action-row="{
                showSelect: true,
                showCancel: true,
                selectBtnLabel: 'Выбрать',
                cancelBtnLabel: 'Отмена'
            }" :input-attrs="{ clearable: false }" class="datePicker">

            <template #dp-input="{ value }">
                <input type="text" :value="value" class="datePicker__input" />
            </template>
        </VueDatePicker>

        <button @click="changePeriod(1)" class="btn-icon clickabled btn-icon_right">
            <UiIcon name="f-arrow" />
        </button>
    </div>
</template>

<style scoped lang="scss">
.date {
    display: flex;
    width: r(280);
}

.datePicker {
    @include m-20;

    &__input {
        text-align: center;
        height: r(48);
        flex: 0 1 auto;
        min-width: 0;
        width: r(184);
    }
}

.btn-icon {
    &_right {
        transform: rotateZ(180deg);
    }
}
</style>