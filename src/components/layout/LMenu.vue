<script setup lang="ts">
import { UiIcon } from '~/uikit/icon';
import LMenuItem from './LMenuItem.vue';
import { AccordionMain } from '~/uikit/accordion';
import { TooltipMain } from '~/uikit/tooltip';

const CLIENTS_ROUTES = ['clients', 'chats']
const SHOOTS_ROUTES = ['parameters', 'directions', 'services', 'equipment']

const type = ref<'full' | 'small'>('full')
const navActiveId = ref('')
const routeActiveId = ref('')

const route = useRoute()
watch(() => route.name, () => {
    if (route.name) {
        if (CLIENTS_ROUTES.includes(route.name.toString())) {
            navActiveId.value = routeActiveId.value = 'clients'

        } else if (SHOOTS_ROUTES.includes(route.name.toString())) {
            navActiveId.value = routeActiveId.value = 'shoots'
        }
    }
}, { immediate: true })

const toggleTypeMenu = () => {
    type.value = type.value == 'full' ? 'small' : 'full'
}

const isOpenTooltip = ref(false)
const tooltipTitle = ref()
const tooltipHost = ref()
const openTooltip = (title: string) => {
    if (type.value == 'small') {
        tooltipHost.value = "#" + title
        tooltipTitle.value = title
        isOpenTooltip.value = true
    }
}
</script>

<template>
    <div class="menu" :class="{ 'menu_small': type == 'small' }">
        <UiIcon name="Logo" v-show="type == 'full'" />
        <UiIcon name="Logo-small" v-show="type == 'small'" />
        <nav class="menu__nav">
            <LMenuItem id="Главная" icon="m-general" title="Главная" routeName="home" :type="type"
                @mouseover="openTooltip('Главная')" />
            <LMenuItem id="Бронирование" icon="m-reserv" title="Бронирование" routeName="reservation" :type="type"
                @mouseover="openTooltip('Бронирование')" />

            <AccordionMain _id="clients" v-model="navActiveId" :isAccIcon="type == 'full'"
                :class="{ 'menu__nav_act': routeActiveId == 'clients' }">
                <div id="Клиенты" @mouseover="openTooltip('Клиенты')" class="nav-item nav-item_acc"
                    :class="{ 'nav-item_small': type == 'small' }">
                    <UiIcon name="m-clients" class="nav-item__icon" />
                    <div v-if="type == 'full'" class="nav-item__title">Клиенты</div>
                </div>
                <template #body>
                    <nav class="menu__group" :class="{ 'menu__group_small': type == 'small' }">
                        <LMenuItem id="Список" icon="m-clients-list" title="Список" routeName="clients" :count="118"
                            :type="type" @mouseover="openTooltip('Список')" />
                        <LMenuItem id="Обращения" icon="m-clients-chats" title="Обращения" routeName="chats" :count="0"
                            :type="type" @mouseover="openTooltip('Обращения')" />
                    </nav>
                </template>
            </AccordionMain>

            <LMenuItem id="Инструкторы" icon="m-instructors" title="Инструкторы" routeName="instructors" :count="99"
                :type="type" @mouseover="openTooltip('Инструкторы')" />

            <AccordionMain _id="shoots" v-model="navActiveId" :isAccIcon="type == 'full'"
                :class="{ 'menu__nav_act': routeActiveId == 'shoots' }">
                <div id="Стрельбище" @mouseover="openTooltip('Стрельбище')" class="nav-item nav-item_acc"
                    :class="{ 'nav-item_small': type == 'small' }">
                    <UiIcon name="m-shoot" class="nav-item__icon" />
                    <div v-if="type == 'full'" class="nav-item__title">Стрельбище</div>
                </div>
                <template #body>
                    <nav class="menu__group" :class="{ 'menu__group_small': type == 'small' }">
                        <LMenuItem id="Параметры" icon="m-shoot-param" title="Параметры" routeName="parameters"
                            :type="type" @mouseover="openTooltip('Параметры')" />
                        <LMenuItem id="Направления" icon="m-shoot-directions" title="Направления" routeName="directions"
                            :type="type" @mouseover="openTooltip('Направления')" />
                        <LMenuItem id="Услуги" icon="m-shoot-services" title="Услуги" routeName="services" :type="type"
                            @mouseover="openTooltip('Услуги')" />
                        <LMenuItem id="Оборудование" icon="m-shoot-equipment" title="Оборудование" routeName="equipment"
                            :type="type" @mouseover="openTooltip('Оборудование')" />
                    </nav>
                </template>
            </AccordionMain>

            <LMenuItem id="KXO" icon="m-kxo" title="KXO" routeName="kxo" :count="99" :type="type"
                @mouseover="openTooltip('KXO')" />
            <LMenuItem id="Настройки" icon="m-settings" title="Настройки" routeName="settings" :type="type"
                @mouseover="openTooltip('Настройки')" />
        </nav>

        <button @click="toggleTypeMenu" class="menu__toggle btn-icon clicabled"
            :class="{ 'menu__toggle_small': type == 'small' }">
            <UiIcon name="s-open" />
        </button>

        <Teleport to="body">
            <TooltipMain v-model="isOpenTooltip" type="mouseover" position="right" :hostSelector="tooltipHost"
                class="tooltip-lmenu">
                <div>

                    {{ tooltipTitle }}
                </div>
            </TooltipMain>
        </Teleport>
    </div>
</template>

<style scoped lang="scss">
.menu {
    width: r(264);
    height: 100dvh;
    position: relative;
    //background-color: aqua;
    z-index: 100;
    top: 0;
    padding: r(24) r(16);
    flex: 0 0 auto;

    &_small {
        width: r(90);
    }

    svg {
        width: r(232);
        height: r(53);
    }

    nav {
        &>* {
            margin-bottom: r(12);
        }
    }

    &__nav {
        padding-top: r(40);
    }

    &__group {
        padding-left: r(16);

        &_small {
            padding-left: 0;
        }
    }

    &__toggle {
        position: absolute;
        bottom: r(24);
        right: 0;
        transform: rotateZ(90deg);
        transition: all 0.3s ease;

        &_small {
            transform: rotateZ(-90deg) translateY(50%);
            right: 50%;
        }

        svg {
            width: r(24);
            height: r(24);
        }
    }
}

.nav-item {
    &_acc {
        color: $gray;
    }
}

:deep(.nav-item) {
    padding: r(12) r(16);
    display: flex;
    align-items: center;
    gap: r(10);
    width: 100%;
    @include sb-15;

    svg {
        width: r(24);
        height: r(24);
    }
}

:deep(.nav-item_small) {
    width: r(48);
    height: r(48);
    @include pos-center;
    padding: 0;
}

:deep(.nav-item__icon) {
    flex: 0 0 auto;
}

:deep(.nav-item__title) {
    flex: 1 0 auto;
    text-align: left;
}

.tooltip-lmenu {
    color: white;
    background-color: $black;
    transform: translateX(r(8));
    @include n-14;
    height: r(26);
    padding: 0 r(8);
    border-radius: r(4);
    @include pos-center;
    border: none;
    z-index: 100;
}

:deep(.accordion__header) {
    border-radius: $brad;
    margin-bottom: r(4);

    &:hover {
        background-color: $l-gray;
    }
}

:deep(.menu__nav_act .accordion__header) {
    background-color: $l-gray;
}
</style>