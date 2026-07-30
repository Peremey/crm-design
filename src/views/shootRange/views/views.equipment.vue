<script setup lang="ts">
import { UiIcon } from '~/uikit/icon';
import FilterSearch from '~/components/filters/FilterSearch.vue';
import GroupItem from '~/components/shootRange/GroupItem.vue';
import Item from '~/components/shootRange/equipment/Item.vue';
import TooltipMain from '~/uikit/tooltip/tooltip.main.vue';
import ContextMenu from '~/components/shootRange/equipment/ContextMenu.vue';
import ContextInfo from '~/components/shootRange/equipment/ContextInfo.vue';
import CheckListAgregator from '~/components/CheckListAgregator.vue';
import GroupItemHeader from '~/components/shootRange/equipment/GroupItemHeader.vue';
import EquipmentModal from '~/components/shootRange/equipment/EquipmentModal.vue';
import { CheckMain } from '~/uikit/check';

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
const selectedRows = ref<Set<string>>(new Set())
const selectedRows1 = ref<Set<string>>(new Set())
const selectedRows2 = ref<Set<string>>(new Set())
const selectedRows3 = ref<Set<string>>(new Set())
const selectedRows4 = ref<Set<string>>(new Set())

const isOpenEquipment = ref(false)
const openEquipment = () => {
    isOpenEquipment.value = true
}

</script>

<template>
    <section name="equipment" class="equipment cont">
        <h1>Оборудование</h1>
        <div class="equipment__filters filters">
            <div class="filters__wrapper">
                <FilterSearch />
                <CheckMain variant="sort" />
            </div>
            <div class="filters__wrapper">
                <button @click="openEquipment" class="btn btn_black">
                    <UiIcon name="plus" />
                    <div>Добавить</div>
                </button>
            </div>
        </div>

        <GroupItem color="#FFF1F2" tooltipSelector="FFF1F2" @openTooltip="openTooltip">
            <template #header>
                <GroupItemHeader title="Мишени" :count="4" :maxCount="10" />
                <CheckListAgregator :selectedRows="selectedRows" class="checkListAgregator" />
            </template>

            <div class="equipment__table">
                <Item itemId="1-1" name="Стандартная мишень" tooltipSelector="FFF1F2-1" v-model="selectedRows"
                    @openTooltip="openTooltip">
                    <template #col4>
                        <div class="equipment__col">
                            110 мм
                        </div>
                    </template>
                    <template #col5>
                        <div class="equipment__col">
                            Керамика
                        </div>
                    </template>
                    <template #col6>
                        <div class="equipment__col equipment__col_price">
                            10 000 шт.
                        </div>
                    </template>
                    <template #col7>
                        <div class="equipment__col equipment__col_price">
                            --
                        </div>
                    </template>
                </Item>

                <Item itemId="1-2" name="Мишень бату" tooltipSelector="FFF1F2-2" v-model="selectedRows"
                    @openTooltip="openTooltip">
                    <template #col4>
                        <div class="equipment__col">
                            110 мм
                        </div>
                    </template>
                    <template #col5>
                        <div class="equipment__col">
                            Керамика
                        </div>
                    </template>
                    <template #col6>
                        <div class="equipment__col equipment__col_price">
                            10 000 шт.
                        </div>
                    </template>
                    <template #col7>
                        <div class="equipment__col equipment__col_price">
                            --
                        </div>
                    </template>
                </Item>
                <Item itemId="1-3" name="Заяц" tooltipSelector="FFF1F2-3" v-model="selectedRows"
                    @openTooltip="openTooltip">
                    <template #col4>
                        <div class="equipment__col">
                            110 мм
                        </div>
                    </template>
                    <template #col5>
                        <div class="equipment__col">
                            Керамика
                        </div>
                    </template>
                    <template #col6>
                        <div class="equipment__col equipment__col_price">
                            10 000 шт.
                        </div>
                    </template>
                    <template #col7>
                        <div class="equipment__col equipment__col_price">
                            --
                        </div>
                    </template>
                </Item>
                <Item itemId="1-4" name="Поппер" tooltipSelector="FFF1F2-4" v-model="selectedRows"
                    @openTooltip="openTooltip">
                    <template #col4>
                        <div class="equipment__col">
                            110 мм
                        </div>
                    </template>
                    <template #col5>
                        <div class="equipment__col">
                            Керамика
                        </div>
                    </template>
                    <template #col6>
                        <div class="equipment__col equipment__col_price">
                            10 000 шт.
                        </div>
                    </template>
                    <template #col7>
                        <div class="equipment__col equipment__col_price">
                            <span>Используется:</span> 5 шт.
                        </div>
                    </template>
                </Item>
            </div>
        </GroupItem>

        <GroupItem color="#EBEBEB" tooltipSelector="EBEBEB" @openTooltip="openTooltip">
            <template #header>
                <GroupItemHeader title="Конструкции" :count="3" :maxCount="5" />
                <CheckListAgregator :selectedRows="selectedRows1" class="checkListAgregator" />
            </template>
            <div class="equipment__table">
                <Item itemId="2-1" name="Забор" tooltipSelector="EBEBEB-1" v-model="selectedRows1"
                    @openTooltip="openTooltip">
                    <template #col4>
                        <div class="equipment__col">
                            10х50 м
                        </div>
                    </template>
                    <template #col5>
                        <div class="equipment__col equipment__col_lnk">
                            <button class="lnk lnk_blue">Галерея №1</button>
                        </div>
                    </template>
                    <template #col6>
                        <div class="equipment__col equipment__col_price equipment__col_lnk">
                            <button>
                                <div class="lnk lnk_blue">Описание</div>
                                <UiIcon name="t-info" />
                            </button>
                        </div>
                    </template>
                    <template #col7>
                        <div class="equipment__col equipment__col_price">
                            10 шт.
                        </div>
                    </template>
                </Item>
            </div>
        </GroupItem>

        <GroupItem color="#EDFBFF" tooltipSelector="EDFBFF" @openTooltip="openTooltip">
            <template #header>
                <GroupItemHeader title="Электронное" :count="3" :maxCount="5" />
                <CheckListAgregator :selectedRows="selectedRows2" class="checkListAgregator" />
            </template>
            <div class="equipment__table">
                <Item itemId="3-1" name="Пульт управления освещением" tooltipSelector="EDFBFF-1" v-model="selectedRows2"
                    @openTooltip="openTooltip">
                    <template #col4>
                        <div class="equipment__col">

                        </div>
                    </template>
                    <template #col5>
                        <div class="equipment__col equipment__col_lnk">
                            <button class="lnk lnk_blue">Инструкция</button>
                        </div>
                    </template>
                    <template #col6>
                        <div class="equipment__col equipment__col_price equipment__col_lnk">
                            <button>
                                <div class="lnk lnk_blue">Описание</div>
                                <UiIcon name="t-info" />
                            </button>
                        </div>
                    </template>
                    <template #col7>
                        <div class="equipment__col equipment__col_price">
                            1 шт.
                        </div>
                    </template>
                </Item>
            </div>
        </GroupItem>

        <GroupItem color="#FFF8E9" tooltipSelector="FFF8E9" @openTooltip="openTooltip">
            <template #header>
                <GroupItemHeader title="Арендное" :count="1" :maxCount="1" />
                <CheckListAgregator :selectedRows="selectedRows3" class="checkListAgregator" />
            </template>
            <div class="equipment__table">
                <Item itemId="4-1" name="Арендное оборудование" tooltipSelector="FFF8E9-1" v-model="selectedRows3"
                    @openTooltip="openTooltip">
                    <template #col4>
                        <div class="equipment__col equipment__col_lnk">
                            <button class="lnk lnk_blue">Инструкция</button>
                        </div>
                    </template>
                    <template #col5>
                        <div class="equipment__col equipment__col_lnk">
                            <button>
                                <div class="lnk lnk_blue">Описание</div>
                                <UiIcon name="t-info" />
                            </button>
                        </div>
                    </template>
                    <template #col6>
                        <div class="equipment__col equipment__col_lnk equipment__col_price equipment__col_tooltip">
                            <button id="eq-arenda" @mouseover="openTooltip2('#eq-arenda')">
                                <UiIcon name="history-book" />
                                <div>История</div>
                            </button>
                        </div>
                    </template>

                    <template #col7>
                        <div class="equipment__col equipment__col_price">
                            <span>Доступно:</span> 5 / 7
                        </div>
                    </template>
                </Item>
            </div>
        </GroupItem>

        <GroupItem color="white" tooltipSelector="white" @openTooltip="openTooltip">
            <template #header>
                <div>
                    <h4>Без группы</h4>
                    <div class="checkListAgregator">
                        <CheckListAgregator :selectedRows="selectedRows4" />
                    </div>
                </div>
            </template>
            <div class="equipment__table">
                <Item itemId="5-1" name="Ведро" tooltipSelector="white-1" v-model="selectedRows4"
                    @openTooltip="openTooltip">
                    <template #col4>
                        <div></div>
                    </template>
                    <template #col5>
                        <div></div>
                    </template>
                    <template #col6>
                        <div class="equipment__col equipment__col_lnk equipment__col_price">
                            <button>
                                <div class="lnk lnk_blue">Описание</div>
                                <UiIcon name="t-info" />
                            </button>
                        </div>
                    </template>
                    <template #col7>
                        <div class="equipment__col equipment__col_price">
                            50 шт.
                        </div>
                    </template>
                </Item>
            </div>
        </GroupItem>

        <Teleport to="body">
            <TooltipMain v-model="isOpenTooltip" position="bottom" :hostSelector="tooltipHost">
                <ContextMenu />
            </TooltipMain>
        </Teleport>

        <Teleport to="body">
            <TooltipMain v-model="isOpenTooltip2" type="mouseover" position="bottom" :hostSelector="tooltipHost2">
                <ContextInfo />
            </TooltipMain>
        </Teleport>

        <EquipmentModal v-model:isOpen="isOpenEquipment" />
    </section>
</template>

<style scoped lang="scss">
.equipment {


    &__table {
        display: grid;
        grid-template-columns: r(24) r(72) 1fr r(110) r(110) r(170) r(200) r(32);
        width: 100%;
        gap: r(20);
    }

    &__col {
        color: $gray;
        align-self: center;
        @include n-16;

        &_price {
            color: $green;
            justify-self: end;
            @include sb-16;

            span {
                @include n-16;
                color: $gray;
            }
        }

        &_lnk {
            button {
                display: flex;
                align-items: center;
                gap: r(4);
                color: $blue;
            }
        }

        &_tooltip {
            button {
                color: $red;
            }
        }
    }
}


.checkListAgregator {
    margin-top: r(16);
}
</style>
