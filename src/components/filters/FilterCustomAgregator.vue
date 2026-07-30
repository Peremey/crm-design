<script setup lang="ts">
import { UiIcon } from '~/uikit/icon';
import { useFilterData } from '~/store/useFilterData';

const filterData = defineModel<Record<string, any>>()

type fField = { key: string, value: string, name?: string }

const filterBreadcrumbs = computed(() => {
    const breadcrumbs: Array<fField> = []
    if (filterData.value)
        for (const [key, value] of Object.entries(filterData.value)) {

            const values = value
            for (const val of values) {

                // списки выбора
                if (typeof val == 'object' && 'selected' in val) {
                    if (val.selected)
                        breadcrumbs.push({ key: key, value: val.value })
                }
                // слайдеры
                else if (typeof val == 'object' && 'max' in val) {
                    if (val.max - val.values[1] || val.values[0] - val.min) {
                        breadcrumbs.push({ key: key, value: val.values[0] + '-' + val.values[1], name: val.name })
                    }
                }
                // прочие диапазоны значений
                else if (val) {
                    if (!breadcrumbs.find(item => item.key == key)) {
                        breadcrumbs.push({ key: key, value: values[0] + '-' + values[1] })
                    }
                }
            }
        }
    return breadcrumbs
})

const reset = () => {
    useFilterData().reset()
}

const resetField = (field: fField) => {
    if (filterData.value) {
        const section = filterData.value[field.key]
        for (const val of section) {
            // списки выбора
            if (typeof val == 'object' && 'selected' in val) {
                if (field.value == val.value)
                    val.selected = false
            }
            // слайдеры
            else if (typeof val == 'object' && 'max' in val) {
                if (val.name == field.name) {
                    val.values[0] = val.min
                    val.values[1] = val.max
                }
            }
            // прочие диапазоны значений
            else {
                filterData.value[field.key] = ['', '']
            }
        }
    }
}
</script>

<template>
    <div class="filter-agr">
        <div v-for="breadcrumb of filterBreadcrumbs" class="filter-agr__item">
            <UiIcon name="tag" />
            {{ breadcrumb.value }}

            <button @click="resetField(breadcrumb)">
                <UiIcon name="x" />
            </button>
        </div>

        <div v-if="filterBreadcrumbs.length">
            <button @click="reset" class="lnk">
                <UiIcon name="x" /> Сбросить
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.filter-agr {
    display: flex;
    margin-bottom: r(16);
    align-items: center;
    gap: r(8);
    @include n-14;

    &__item {
        padding: r(8) r(12);
        display: flex;
        gap: r(4);
        align-items: center;
        border-radius: r(250);
        border: solid r(1) $l-gray;
        background-color: white;
    }
}
</style>