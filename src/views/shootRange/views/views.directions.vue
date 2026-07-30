<script setup lang="ts">
import { UiIcon } from '~/uikit/icon';
import TooltipMain from '~/uikit/tooltip/tooltip.main.vue';
import FilterCustom from '~/components/filters/FilterCustom.vue';
import FilterSearch from '~/components/filters/FilterSearch.vue';
import GalleryContextMenu from '~/components/shootRange/directions/GalleryContextMenu.vue';
import GalleryItem from '~/components/shootRange/directions/GalleryItem.vue';
import GroupFields from '~/components/GroupFields.vue';
import { useValidate } from '~/lib/validate';
import { CheckMain } from '~/uikit/check';
import NewDirectionModal from '~/components/shootRange/directions/NewDirectionModal.vue';
import SliderDual from '~/components/SliderDual.vue';
import { useFilterData } from '~/store/useFilterData';
import { storeToRefs } from 'pinia';
import GroupCheckList from '~/components/GroupCheckList.vue';
import FilterCustomAgregator from '~/components/filters/FilterCustomAgregator.vue';

const isOpenTooltip = ref(false)
const tooltipHost = ref('')
const openTooltip = (selector: string) => {
    tooltipHost.value = selector
    isOpenTooltip.value = true
}

const { formErrorState } = useValidate();
const filterCustomSubmit = () => { }

const defaultFilterData = {
    special: [
        { value: 'Пистолет', selected: false },
        { value: 'Карабин', selected: false },
        { value: 'Пистолет, карабин', selected: false },
    ],
    parameters: [
        { maxVal: 2000, max: 2000, minVal: 25, min: 25, values: [25, 2000], name: "1" },
        { maxVal: 100, max: 100, minVal: 5, min: 5, values: [5, 100], name: "2" },
        { maxVal: 10, max: 10, minVal: 0, min: 0, values: [0, 10], name: "3" },
    ],
    available: [
        { value: 'Доступно', selected: false },
        { value: 'Только с инструктором', selected: false }
    ]

}
const store = useFilterData()
store.init(defaultFilterData, 'filter-directions')
const { filterData } = storeToRefs(store)


const specialActiveId = ref()
const parametersActiveId = ref('parameters')

const isOpenNewDirection = ref(false)
const openNewDirection = () => {
    isOpenNewDirection.value = true
}
</script>

<template>
    <section name="directions" class="directions cont">
        <h1>Направления</h1>
        <div class="directions__filters filters">
            <div class="filters__wrapper">
                <FilterSearch />

                <FilterCustom :formErrorState="formErrorState" :submit="filterCustomSubmit" v-model="filterData">

                    <GroupCheckList _id="special" title="Специализация" v-model:activeId="specialActiveId"
                        v-model="filterData.special" />

                    <GroupFields _id="parameters" title="Параметры" v-model:activeId="parametersActiveId">
                        <SliderDual label="Дистанция" v-model="filterData.parameters[0].values" :min="25" :max="2000"
                            :step="1" units="м" />

                        <SliderDual label="Ширина" v-model="filterData.parameters[1].values" :min="5" :max="100"
                            :step="1" units="м" />

                        <SliderDual label="Кол-во мест" v-model="filterData.parameters[2].values" :min="0" :max="10"
                            :step="1" />
                    </GroupFields>

                    <CheckMain variant="three" :text="filterData.available[0].value"
                        v-model="filterData.available[0].selected" />
                    <CheckMain variant="three" :text="filterData.available[1].value"
                        v-model="filterData.available[1].selected" />
                </FilterCustom>
            </div>
            <button @click="openNewDirection" class="btn btn_black">
                <UiIcon name="plus" />
                <div>Добавить</div>
            </button>
        </div>

        <FilterCustomAgregator v-model="filterData" />

        <GalleryItem color="yellow" name="1" @openTooltip="openTooltip" />
        <GalleryItem color="green" name="2" @openTooltip="openTooltip" />
        <GalleryItem color="blue" name="3" @openTooltip="openTooltip" />

        <Teleport to="body">
            <TooltipMain v-model="isOpenTooltip" position="bottom" :hostSelector="tooltipHost">
                <GalleryContextMenu />
            </TooltipMain>
        </Teleport>

        <NewDirectionModal v-model:isOpen="isOpenNewDirection" />
    </section>
</template>

<style scoped lang="scss">
.directions {
    &>div {
        margin-bottom: r(24);
    }
}

.slider-theme {
    --slider-connect-bg: #{$red};
    --slider-height: #{r(4)};
    --slider-handle-ring-width: 2px;
    --slider-handle-ring-color: #{$red};
    --slider-handle-shadow: none;
}

:deep(.slider-handle) {
    border: solid r(1) $red;

}

:deep(.slider-handle:focus-visible),
:deep(.slider-handle:active) {
    border: solid r(2) $red;
}
</style>
<style src="@vueform/slider/themes/default.css"></style>
