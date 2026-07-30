<script setup lang="ts">
import { useValidate } from '~/lib/validate';
import { UiIcon } from '~/uikit/icon';
import ClientTable from '~/components/clients/ClientTable.vue';
import FilterCustom from '~/components/filters/FilterCustom.vue';
import FilterSearch from '~/components/filters/FilterSearch.vue';
import ClientModal from '~/components/clients/ClientModal.vue';
import { useFilterData } from '~/store/useFilterData';
import { storeToRefs } from 'pinia';
import ImportExport from '~/components/ImportExport.vue';
import GroupCheckList from '~/components/GroupCheckList.vue';
import GroupDateRange from '~/components/GroupDateRange.vue';
import FilterCustomAgregator from '~/components/filters/FilterCustomAgregator.vue';

const { formErrorState } = useValidate();
const filterCustomSubmit = () => { }

const defaultFilterData = {
    dateReg: ['', ''],
    dateLast: ['', ''],
    status: [
        { value: 'Какой то статус', selected: false },
        { value: 'Какой то статус', selected: false },
        { value: 'Какой то статус', selected: false },
        { value: 'Какой то статус', selected: false }
    ]
}

const store = useFilterData()
store.init(defaultFilterData, 'filter-clients')
const { filterData } = storeToRefs(store)

const dateRegActiveId = ref()
const dateLastActiveId = ref()
const statusActiveId = ref()

type ClientModalType = 'new' | 'edit' | 'history' | 'wearon'
const clientModalType = ref<ClientModalType>('new')

const isOpenClient = ref(false)
const openClient = (type: ClientModalType) => {
    isOpenClient.value = true
    clientModalType.value = type
}

</script>

<template>
    <section name="clients" class="clients cont">
        <h1>Клиенты</h1>
        <div class="clients__filters filters">
            <div class="filters__wrapper">
                <FilterSearch />

                <FilterCustom :formErrorState="formErrorState" :submit="filterCustomSubmit" v-model="filterData">

                    <GroupDateRange _id="dateReg" title="Дата регистрации" v-model:activeId="dateRegActiveId"
                        v-model="filterData.dateReg" />

                    <GroupDateRange _id="dateLast" title="Дата последнего посещения" v-model:activeId="dateLastActiveId"
                        v-model="filterData.dateLast" />

                    <GroupCheckList _id="status" title="Статус" v-model:activeId="statusActiveId"
                        v-model="filterData.status" />
                </FilterCustom>
            </div>
            <div class="filters__wrapper">
                <ImportExport />

                <button @click="openClient('new')" class="btn btn_black">
                    <UiIcon name="plus" />
                    <div>Добавить клиента</div>
                </button>
            </div>
        </div>

        <FilterCustomAgregator v-model="filterData" />

        <ClientTable @history="openClient('history')" @wearon="openClient('wearon')" />

        <ClientModal :type="clientModalType" v-model:isOpen="isOpenClient" />
    </section>
</template>

<style scoped lang="scss"></style>
