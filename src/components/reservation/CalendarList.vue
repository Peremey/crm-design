<script setup lang="ts">
import { UiIcon } from '~/uikit/icon';
import { TooltipMain } from '~/uikit/tooltip';

const isOpenTooltip = ref(false)
const tooltipHost = ref('')
const openTooltip = (selector: string) => {
    tooltipHost.value = selector
    isOpenTooltip.value = true
}
</script>

<template>
    <div class="table-list">
        <div class="table-list__day">
            <div class="table-list__data">
                <div class="table-list__number">12</div>
                <div class="table-list__dayOfWeek">ПН</div>
            </div>
            <div class="table-list__free">
                <div>Свободно:</div>
                <div>3</div>
            </div>
        </div>
        <div class="table-list__subtable">
            <template v-for="i of 5">
                <div class="table-list__time">9:00</div>
                <div class="table-list__time">10:00</div>
                <div class="table-list__person person">
                    <img src="/img/tmp/person.png" alt="" class="person__avatar" />
                    <div class="person__name">Иванов Сергей Петрович</div>
                    <UiIcon name="vip" />
                </div>
                <div class="table-list__services">
                    <button :id="'list-item-cell-' + i" @mouseover="openTooltip('#list-item-cell-' + i)"
                        class="table-list__tooltip-host">2</button>
                </div>
                <div class="table-list__price">
                    5 000 ₽
                </div>
            </template>
        </div>

        <div class="table-list__day">
            <div class="table-list__data">
                <div class="table-list__number">13</div>
                <div class="table-list__dayOfWeek">ВТ</div>
            </div>
            <div class="table-list__free">
                <div>Свободно:</div>
                <div>3</div>
            </div>
        </div>
        <div class="table-list__add">
            <button class="btn btn_white">
                <UiIcon name="user-plus" />
                <div>Добавить запись</div>
            </button>
        </div>

        <Teleport to="body">
            <TooltipMain v-model="isOpenTooltip" position="bottom" :hostSelector="tooltipHost" type="mouseover"
                class="tooltip">
                <div class="tooltip__item tooltip-item">
                    <div class="tooltip-item__label">Пристрелка 1 ед. оружия</div>
                    <div class="tooltip-item__value">1 500 ₽</div>
                </div>
                <div class="tooltip__item tooltip-item">
                    <div class="tooltip-item__label">Чистка 1 ед. оружия</div>
                    <div class="tooltip-item__value">2 500 ₽</div>
                </div>
            </TooltipMain>
        </Teleport>
    </div>
</template>

<style scoped lang="scss">
.table-list {
    display: grid;
    grid-template-columns: r(120) 1fr;
    gap: r(1);
    border-top: r(1) solid $l-gray;

    &__free {
        &>div:first-child {
            @include n-14;
            text-align: center;
            margin-bottom: r(6);
        }

        &>div:last-child {
            @include b-14;
            text-align: center;
        }
    }

    &__day {
        background-color: white;
        @include m-16;
        color: $gray;
        padding: r(16);
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        &>div:first-child {
            display: flex;
            justify-content: center;
            gap: r(10);
            align-items: center;
            margin-bottom: r(24);
        }
    }

    &__number {
        width: r(34);
        height: r(34);
        border-radius: 50%;
        @include pos-center;
        @include m-15;
        border: solid r(1) $l-gray;
        color: $gray;
        background-color: white;
    }

    &__subtable {
        display: grid;
        grid-template-columns: r(100) r(100) 1fr r(113) r(106);
        gap: r(1);
        height: 100%;
    }

    &__time {
        @include m-16;
        color: $gray;
        @include pos-center;
        background-color: white;
        min-height: r(48);
    }

    &__person {
        display: flex;
        align-items: center;
        padding-left: r(8);
        background-color: white;
        min-height: r(48);
        gap: r(8);
    }

    &__services {
        @include pos-center;
        @include b-12;
        background-color: white;
    }

    &__tooltip-host {
        width: r(21);
        height: r(26);
        background-color: $l-green;
        border-radius: $brad;
        color: $green;

        &:hover {
            background-color: $green;
            color: white;
        }
    }

    &__price {
        @include pos-center;
        @include sb-16;
        background-color: white;
        color: $green;
    }

    &__add {
        background-color: white;
        @include pos-center;
    }
}

.person {
    &__avatar {
        width: r(26);
        height: r(26);
    }

    &__name {
        @include sb-16;
        color: $black;
    }
}

.tooltip {
    width: r(378);
    height: fit-content;
    padding: r(20) r(24);

}

.tooltip-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: r(26);

    &:last-child {
        margin-bottom: 0;
    }

    &__label {
        @include sb-15;
        color: $black;
    }

    &__value {
        @include sb-16;
        color: $green;
    }
}
</style>