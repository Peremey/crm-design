<script setup lang="ts">
import { CheckMain } from '~/uikit/check';
import { UiIcon } from '~/uikit/icon';
import FilterSearch from '~/components/filters/FilterSearch.vue';
import GroupItem from '~/components/shootRange/GroupItem.vue';
import Item from '~/components/shootRange/services/Item.vue';
import TooltipMain from '~/uikit/tooltip/tooltip.main.vue';
import ContextMenu from '~/components/shootRange/services/ContextMenu.vue';
import CheckListAgregator from '~/components/CheckListAgregator.vue';
import ServiceModal from '~/components/shootRange/services/ServiceModal.vue';
import { SelectMain } from '~/uikit/select';
import { type ISelectOption } from '~/types/ISelectOption';

const isOpenTooltip = ref(false)
const tooltipHost = ref('')
const openTooltip = (selector: string) => {
    tooltipHost.value = selector
    isOpenTooltip.value = true
}
const selectedRows = ref<Set<string>>(new Set())
const selectedRows1 = ref<Set<string>>(new Set())

const isOpenService = ref(false)
const openService = () => {
    isOpenService.value = true
}

const options = ref<ISelectOption[]>([{ label: 'Статус', value: "Статус", iconName: 'tag' }, { label: 'Стоимость', value: "Стоимость", iconName: 'f-money' }])
</script>

<template>
    <section name="services" class="services cont">
        <h1>Услуги</h1>
        <div class="services__filters filters">
            <div class="filters__wrapper">
                <FilterSearch />
                <SelectMain :options="options" defaultOption="Статус" />
            </div>
            <div class="filters__wrapper">
                <button class="btn btn_white">
                    <UiIcon name="new-group" />
                    <div>Новая группа</div>
                </button>
                <button class="btn btn_black">
                    <UiIcon name="plus" />
                    <div>Добавить</div>
                </button>
            </div>
        </div>
        <GroupItem color="#fff8e9" tooltipSelector="fff8e9" @openTooltip="openTooltip">
            <template #header>
                <div class="services__header">
                    <CheckMain variant="toggle" />
                    <h4>Настройка стрелкового комплекса</h4>
                    <button class="services__header_edit">
                        <UiIcon name="edit" />
                    </button>
                    <div>4 услуги</div>
                    <div class="services__header_price">5 000 ₽</div>
                </div>
                <CheckListAgregator :selectedRows="selectedRows1" class="checkListAgregator" />
            </template>

            <div class="services__table">
                <Item itemId="1-1" name="Приведение к нормальному бою" tooltipSelector="fff8e9-1" icon="serv-1"
                    v-model="selectedRows1" @openTooltip="openTooltip" />
                <Item itemId="1-2" name="Чистка" tooltipSelector="fff8e9-2" v-model="selectedRows1" icon=serv-2
                    @openTooltip="openTooltip" />
                <Item itemId="1-3" name="Полировка" tooltipSelector="fff8e9-3" v-model="selectedRows1" icon="serv-2"
                    @openTooltip="openTooltip" />
                <Item itemId="1-4" name="Что-то еще" tooltipSelector="fff8e9-4" v-model="selectedRows1" icon="serv-3"
                    @openTooltip="openTooltip" />
            </div>
        </GroupItem>

        <GroupItem color="white" tooltipSelector="white" @openTooltip="openTooltip">
            <template #header>
                <div>
                    <h4>Без группы</h4>
                    <div class="checkListAgregator">
                        <CheckListAgregator :selectedRows="selectedRows" />
                        <button class="lnk">
                            <UiIcon name="new-group" />
                            Создать группу
                        </button>
                    </div>
                </div>
            </template>

            <div class="services__table">
                <Item itemId="1" name="Приведение к нормальному бою" tooltipSelector="white-1" v-model="selectedRows"
                    icon="serv-1" @openTooltip="openTooltip" />
                <Item itemId="2" name="Чистка" tooltipSelector="white-2" v-model="selectedRows" icon="serv-2"
                    @openTooltip="openTooltip" />
                <Item itemId="3" name="Полировка" tooltipSelector="white-3" v-model="selectedRows" icon="serv-2"
                    @openTooltip="openTooltip" />
                <Item itemId="4" name="Что-то еще" tooltipSelector="white-4" v-model="selectedRows" icon="serv-3"
                    @openTooltip="openTooltip" />
            </div>
        </GroupItem>

        <Teleport to="body">
            <TooltipMain v-model="isOpenTooltip" position="bottom" :hostSelector="tooltipHost">
                <ContextMenu @edit="openService" />
            </TooltipMain>
        </Teleport>

        <ServiceModal v-model:isOpen="isOpenService" />
    </section>
</template>

<style scoped lang="scss">
.services {
    &__header {
        display: flex;
        gap: r(16);
        align-items: center;

        &_edit {
            color: $gray;

            svg {
                width: r(20);
                height: r(20);
            }
        }

        &_price {
            color: $green;
            @include sb-16;
        }
    }

    &__table {
        display: grid;
        grid-template-columns: r(24) r(44) r(48) 1fr r(86) r(110) r(116) r(32);
        width: 100%;
        row-gap: r(20);
    }
}

.checkListAgregator {
    margin-top: r(16);
    display: flex;
    align-items: center;
    gap: r(16);
}

.lnk {
    color: $gray;
    @include m-15;
}
</style>
