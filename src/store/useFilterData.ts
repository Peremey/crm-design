import { load, save } from '~/lib/storage';
import { copy } from '~/lib/utils';
import { defineStore } from 'pinia';

export const useFilterData = defineStore('filter', () => {
    const filterData = ref()
    const filterLsKey = ref<string>()
    const filterDefaultData = ref()

    const init = (defaultData: object, key: string) => {
        const data = load(key)
        if (data) {
            filterData.value = data
        } else
            filterData.value = copy(defaultData)

        filterLsKey.value = key
        filterDefaultData.value = defaultData
    }

    const reset = () => {
        filterData.value = copy(filterDefaultData.value)
    }

    watch(filterData, () => {
        if (filterLsKey.value)
            save(filterLsKey.value, filterData.value)

    }, { deep: true })

    return { filterData, reset, init }
}) 