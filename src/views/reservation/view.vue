<script setup lang="ts">
import { UiIcon } from '~/uikit/icon';
import FilterCustom from '~/components/filters/FilterCustom.vue';
import FilterSearch from '~/components/filters/FilterSearch.vue';
import Calendar from '~/components/reservation/Calendar.vue';
import { useValidate } from '~/lib/validate';
import ReservModal from '~/components/reservation/ReservModal.vue';
import { SelectMain } from '~/uikit/select';
import SummaryField from '~/components/reservation/SummaryField.vue';
import { useFilterData } from '~/store/useFilterData';
import { storeToRefs } from 'pinia';
import GroupCheckList from '~/components/GroupCheckList.vue';
import GroupDateRange from '~/components/GroupDateRange.vue';
import GroupNumberRange from '~/components/GroupNumberRange.vue';
import { SegmentMain } from '~/uikit/segment';
import FilterCustomAgregator from '~/components/filters/FilterCustomAgregator.vue';

const calendarView = ref('calendar')

const { formErrorState } = useValidate();
const filterCustomSubmit = () => { }

const defaultFilterData = {
    services: [
        { value: 'Услуга', selected: false },
        { value: 'Услуга', selected: false },
        { value: 'Услуга', selected: false }
    ],
    date: ['', ''],
    countNotes: ['', ''],
    status: [
        { value: 'Какой то статус', selected: false },
        { value: 'Какой то статус', selected: false },
        { value: 'Какой то статус', selected: false },
        { value: 'Какой то статус', selected: false }
    ],
}

const store = useFilterData()
store.init(defaultFilterData, 'filter-reservation')
const { filterData } = storeToRefs(store)

const servicesActiveId = ref()
const dateActiveId = ref()
const countNotesActivIed = ref()
const statusActiveId = ref()

const isOpenReserv = ref(false)
const openReserv = () => {
    isOpenReserv.value = true
}

const options2 = ref([
    { label: 'Галерея №1', value: 'Галерея №1', selected: true },
    { label: 'Галерея №2', value: 'Галерея №2', selected: false },
    { label: 'Галерея №3', value: 'Галерея №3', selected: true },
    { label: 'Галерея №4', value: 'Галерея №4', selected: false },
    { label: 'Галерея №5', value: 'Галерея №5', selected: true },
    { label: 'Галерея №6', value: 'Галерея №6', selected: false },
    { label: 'Галерея №7', value: 'Галерея №7', selected: true },
    { label: 'Галерея №8', value: 'Галерея №8', selected: false }
])

const selectedDate = ref(new Date())

</script>

<template>
    <section name="reserv" class="reserv cont">
        <h1>Бронирование</h1>
        <div class="reserv__filters filters">
            <div class="filters__wrapper">
                <FilterSearch />

                <FilterCustom v-if="calendarView != 'calendar'" :formErrorState="formErrorState"
                    :submit="filterCustomSubmit" v-model="filterData">

                    <GroupCheckList _id="services" title="Дополнительные услуги" v-model:activeId="servicesActiveId"
                        v-model="filterData.services" />

                    <GroupDateRange _id="date" title="Период" v-model:activeId="dateActiveId"
                        v-model="filterData.date" />

                    <GroupNumberRange _id="countNotes" title="Опыт" v-model:activeId="countNotesActivIed"
                        v-model="filterData.countNotes" />

                    <GroupCheckList _id="status" title="Статус" v-model:activeId="statusActiveId"
                        v-model="filterData.status" />
                </FilterCustom>

                <SegmentMain v-model="calendarView" />
                <SelectMain :options="options2" :isMulti="true" class="reserv__select" />
            </div>
            <button @click="openReserv" class="btn btn_black">
                <UiIcon name="plus" />
                <div>Добавить запись</div>
            </button>
        </div>

        <FilterCustomAgregator v-if="calendarView != 'calendar'" v-model="filterData" />

        <Calendar :isCalendarView="calendarView == 'calendar'" v-model="selectedDate"
            @selectDate="calendarView = 'list'">
            <SummaryField icon="f-users" value="586 записей" />
            <SummaryField icon="f-money" value="1 000 000 ₽" />
            <SummaryField icon="trend" value="900 000 ₽ (-10%)" trend="red" />
        </Calendar>

        <ReservModal v-model:isOpen="isOpenReserv" />
    </section>
</template>

<style scoped lang="scss">
.reserv {
    &__select {
        min-width: r(350);
    }
}
</style>
