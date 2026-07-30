<script setup lang="ts">
import { UiIcon } from '~/uikit/icon';
import ColumnPerson from '../ColumnPerson.vue';
import { TooltipMain } from '~/uikit/tooltip';
import ClientContextInfo from './ClientContextInfo.vue';
import StatusPerson from '../StatusPerson.vue';
import ClientContextMenu from './ClientContextMenu.vue';
import { TablePaginationMain } from '~/uikit/tablePagination';
import CheckListAgregator from '../CheckListAgregator.vue';

interface IEmits {
    (e: 'history'): void
    (e: 'wearon'): void
}
const emit = defineEmits<IEmits>()

const headers = ['ФИО / E-mail', 'Дата регистрации', 'Авто', 'Телефон', 'Статус']

const isOpenTooltip = ref(false)
const tooltipHost = ref('')
const openTooltip = (selector: string) => {
    tooltipHost.value = selector
    isOpenTooltip.value = true
}

const isOpenTooltip2 = ref(false)
const tooltipHost2 = ref('')
const openTooltip2 = (selector: string) => {
    tooltipHost2.value = selector
    isOpenTooltip2.value = true
}

const currentPage = ref(7)
const selectedRows = ref<Set<string>>(new Set())

const deleteConfirm = () => {
    document.dispatchEvent(new CustomEvent('deleteConfirm'))
}
</script>

<template>
    <CheckListAgregator :selectedRows="selectedRows" class="checkListAgregator" />
    <div class="table">
        <button v-for="header of headers" class="table__header">
            <div>{{ header }}</div>
            <UiIcon name="s-open" class="table__header_icon" />
        </button>
        <div class="table__header"></div>
        <div v-for="i in 10" class="table__row" :class="{ 'table__row_selected': selectedRows.has(i.toString()) }">
            <ColumnPerson :itemId="i.toString()" v-model="selectedRows">
                <template #name>
                    Иванов Сергей Петрович
                </template>
                <a href="mailto:sfdfsdfdf@gmail.com">sfdfsdfdf@gmail.com</a>
            </ColumnPerson>

            <div class="table__column">15.09.2025</div>

            <div class="table__column table__column_info">
                <button :id="'client-' + i" @mouseover="openTooltip('#client-' + i)" class="table__info">
                    <UiIcon name="t-info" />
                </button>
            </div>

            <div class="table__column">+7 903 123-45-67</div>

            <div class="table__column">
                <StatusPerson status="Неактивный" />
            </div>

            <div class="table__column">
                <button :id="'client-context' + i" @click="openTooltip2('#client-context' + i)"
                    class="table__context-menu  clickabled">
                    <UiIcon name="client-menu" />
                </button>
            </div>
        </div>
        <TablePaginationMain v-model="currentPage" :maxCount="100" :pageCount="10" />

        <Teleport to="body">
            <TooltipMain v-model="isOpenTooltip" position="bottom" type="mouseover" :hostSelector="tooltipHost"
                class="tooltip-info">
                <ClientContextInfo @close="isOpenTooltip = false" />
            </TooltipMain>
        </Teleport>

        <Teleport to="body">
            <TooltipMain v-model="isOpenTooltip2" position="bottom" :hostSelector="tooltipHost2" class="tooltip-menu">
                <ClientContextMenu @close="isOpenTooltip2 = false" @history="emit('history')" @wearon="emit('wearon')"
                    @delete="deleteConfirm()" />
            </TooltipMain>
        </Teleport>
    </div>
</template>

<style scoped lang="scss">
.table {
    display: grid;
    grid-template-columns: 2fr r(220) r(115) minmax(r(173), 1fr) minmax(r(167), 1fr) r(72);
    border: solid r(1) $l-gray;
    border-radius: r(20);
    background-color: white;

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: r(22);
        border-bottom: solid r(1) $l-gray;

        &>div {
            color: $black;
            @include m-15;
        }


        svg {
            width: r(18);
            height: r(18);
        }

        &_icon {
            color: $gray;
        }
    }

    &__row {
        display: grid;
        grid-template-columns: subgrid;
        grid-column: 1 / -1;
        border-bottom: solid r(1) $l-gray;

        a {
            color: $blue;
            @include m-15;
        }

        &_selected {
            background-color: $bg-yellow;

        }
    }

    &__column {
        display: flex;
        align-items: center;
        padding-left: r(22);
        color: $gray;
        @include m-15;

        &_info {
            justify-content: center;
            color: $blue;

            svg {
                width: r(16);
                height: r(16);
            }
        }
    }

    &__info {
        border-radius: 50%;

        &:hover {
            background-color: $blue;

            svg {
                color: white;
            }
        }
    }

    &__context-menu {
        svg {
            width: r(28);
            height: r(28);
        }

    }
}

.tooltip-info {
    transform: translateX(30%);
}

.checkListAgregator {
    margin: r(4) 0 r(24) r(24);
}
</style>