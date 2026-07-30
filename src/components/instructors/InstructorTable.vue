<script setup lang="ts">
import { UiIcon } from '~/uikit/icon';
import ColumnPerson from '../ColumnPerson.vue';
import { TooltipMain } from '~/uikit/tooltip';
import StatusPerson from '../StatusPerson.vue';
import ClientContextMenu from '../clients/ClientContextMenu.vue';
import { TablePaginationMain } from '~/uikit/tablePagination';
import CheckListAgregator from '../CheckListAgregator.vue';
import { RatingMain } from '~/uikit/rating';

const headers = ['ФИО / Возраст', 'Опыт (лет)', 'Специализация', 'Статус', 'Рейтинг']

const isOpenTooltip = ref(false)
const tooltipHost = ref('')
const openTooltip = (selector: string) => {
    tooltipHost.value = selector
    isOpenTooltip.value = true
}

const currentPage = ref(7)
const selectedRows = ref<Set<string>>(new Set())
const rating = ref(3.5)
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
            <ColumnPerson :itemId="i.toString()" v-model="selectedRows" class="person">
                <template #name>
                    <a href="#">Иванов Сергей Петрович</a>
                </template>
                <div class="person__age">38 лет</div>
            </ColumnPerson>

            <div class="table__column">12</div>

            <div class="table__column">
                Пистолет, винтовка
            </div>

            <div class="table__column">
                <StatusPerson status="Работает" />
            </div>

            <div class="table__column">
                <RatingMain v-model="rating" />
            </div>

            <div class="table__column">
                <button :id="'inst-context' + i" @click="openTooltip('#inst-context' + i)" class="table__context-menu">
                    <UiIcon name="client-menu" />
                </button>
            </div>
        </div>
        <TablePaginationMain v-model="currentPage" :maxCount="100" :pageCount="10" />

        <Teleport to="body">
            <TooltipMain v-model="isOpenTooltip" position="bottom" :hostSelector="tooltipHost" class="tooltip-menu">
                <ClientContextMenu @close="isOpenTooltip = false" />
            </TooltipMain>
        </Teleport>
    </div>
</template>

<style scoped lang="scss">
.table {
    display: grid;
    grid-template-columns: 2fr r(150) r(220) minmax(r(173), 1fr) minmax(r(167), 1fr) r(72);
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

.person {
    &__age {
        color: $gray;
    }
}

.checkListAgregator {
    margin: r(4) 0 r(24) r(24);
}
</style>