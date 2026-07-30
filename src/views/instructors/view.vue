<script setup lang="ts">
import { useValidate } from '~/lib/validate';
import { UiIcon } from '~/uikit/icon';
import { storeToRefs } from 'pinia';
import FilterCustom from '~/components/filters/FilterCustom.vue';
import FilterCustomAgregator from '~/components/filters/FilterCustomAgregator.vue';
import FilterSearch from '~/components/filters/FilterSearch.vue';
import GroupCheckList from '~/components/GroupCheckList.vue';
import GroupNumberRange from '~/components/GroupNumberRange.vue';
import ImportExport from '~/components/ImportExport.vue';
import InstructorModal from '~/components/instructors/InstructorModal.vue';
import InstructorTable from '~/components/instructors/InstructorTable.vue';
import { useFilterData } from '~/store/useFilterData';

const specialActiveId = ref()
const statusActiveId = ref()
const expActiveId = ref()

const { formErrorState } = useValidate();
const filterCustomSubmit = () => { }

const defaultFilterData = {
    special: [
        { value: 'Пистолет', selected: false },
        { value: 'Карабин', selected: false },
        { value: 'Пистолет, карабин', selected: false },
    ],
    status: [
        { value: 'Какой то статус', selected: false },
        { value: 'Какой то статус', selected: false },
        { value: 'Какой то статус', selected: false },
        { value: 'Какой то статус', selected: false }
    ],
    exp: ['', '']
}
const store = useFilterData()
store.init(defaultFilterData, 'filter-instructors')
const { filterData } = storeToRefs(store)

const isOpenInstr = ref(false)
const openInstr = () => {
    isOpenInstr.value = true
}
</script>

<template>
    <section name="clients" class="clients cont">
        <h1>Инструкторы</h1>
        <div class="clients__filters filters">
            <div class="filters__wrapper">
                <FilterSearch />

                <FilterCustom :formErrorState="formErrorState" :submit="filterCustomSubmit" v-model="filterData">

                    <GroupCheckList _id="special" title="Специализация" v-model:activeId="specialActiveId"
                        v-model="filterData.special" />

                    <GroupCheckList _id="status" title="Статус" v-model:activeId="statusActiveId"
                        v-model="filterData.status" />

                    <GroupNumberRange _id="exp" title="Опыт" v-model:activeId="expActiveId" v-model="filterData.exp" />
                </FilterCustom>
            </div>
            <div class="filters__wrapper">
                <ImportExport />

                <button @click="openInstr" class="btn btn_black">
                    <UiIcon name="plus" />
                    <div>Добавить</div>
                </button>
            </div>
        </div>

        <FilterCustomAgregator v-model="filterData" />

        <InstructorTable />

        <InstructorModal v-model:isOpen="isOpenInstr" />
    </section>
</template>

<style scoped lang="scss"></style>
