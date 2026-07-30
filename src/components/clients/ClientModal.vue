<script setup lang="ts">
import FormModal from '../FormModal.vue';
import { TabsMain } from '~/uikit/tabs';
import ClientTabData from './clientModal/ClientTabData.vue';
import ClientTabAuto from './clientModal/ClientTabAuto.vue';
import ClientTabWearon from './clientModal/ClientTabWearon.vue';
import ClientTabHistory from './clientModal/ClientTabHistory.vue';
import { useId } from 'vue'
import { FormErrorState } from '~/lib/validate';

interface IProps {
    type: 'new' | 'edit' | 'history' | 'wearon'
}
const props = defineProps<IProps>()
const isOpen = defineModel<boolean>('isOpen')

const formErrorState = new FormErrorState()
const submit = () => {

}

const TAB_LABELS = {
    data: 'Данные',
    auto: 'Автомобили',
    wearon: 'Оружие',
    history: 'История посещений'
} as const

type TabLabel = typeof TAB_LABELS[keyof typeof TAB_LABELS]

const activeTab = ref<TabLabel>(TAB_LABELS.data)

const tabs = computed<TabLabel[]>(() => {
    const resultTabs: TabLabel[] = Object.values(TAB_LABELS).filter(tab => tab != TAB_LABELS.history)
    if (props.type != 'new') {
        resultTabs.push(TAB_LABELS.history)
    }
    return resultTabs
})

const CLIENT_TAB_CONTENT = useId()

const errorValidate = () => {
    const elements = document.querySelectorAll('.' + CLIENT_TAB_CONTENT)
    for (let i = 0; i < elements.length; i++) {
        if (elements[i]?.querySelector('[aria-invalid="true"]')) {
            activeTab.value = tabs.value[i]!
            break;
        }
    }
}

watch(() => props.type, () => {

    activeTab.value = TAB_LABELS.data
    if (props.type == 'history' || props.type == 'wearon')
        activeTab.value = TAB_LABELS[props.type]

}, { immediate: true })

const title = computed(() => {
    if (props.type == 'new')
        return "Новый клиент"
    return 'Редактировать клиента'
})
</script>

<template>
    <FormModal v-model:isOpen="isOpen" :title="title" :formErrorState="formErrorState" :submit="submit"
        @error="errorValidate">

        <template #header>
            <TabsMain v-model="activeTab" :tabs="tabs" class="client-tabs" />
        </template>

        <div v-show="activeTab == TAB_LABELS.data" class="client-tab-content" :class="CLIENT_TAB_CONTENT">
            <ClientTabData :formErrorState="formErrorState" />
        </div>

        <div v-show="activeTab == TAB_LABELS.auto" class="client-tab-content" :class="CLIENT_TAB_CONTENT">
            <ClientTabAuto :formErrorState="formErrorState" />
        </div>

        <div v-show="activeTab == TAB_LABELS.wearon" class="client-tab-content" :class="CLIENT_TAB_CONTENT">
            <ClientTabWearon :formErrorState="formErrorState" />
        </div>

        <div v-if="type != 'new'" v-show="activeTab == TAB_LABELS.history"
            class="client-tab-content client-tab-content_history" :class="CLIENT_TAB_CONTENT">
            <div class="client-tab-content__wrapper">
                <div>
                    <ClientTabHistory />
                </div>
            </div>
        </div>
    </FormModal>
</template>

<style scoped lang="scss">
.client-tabs {
    width: 100%;
    transform: translateY(r(20));
}

.client-tab-content {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 1 / -1;
    height: calc(100dvh - r(96) - r(78) - r(88));

    &_history {
        grid-template-columns: 1fr;
        grid-column: span / 2;
        margin-bottom: r(24);
        align-items: start;
    }

    &__wrapper {
        &>div {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: r(1);
            grid-column: auto;
            background-color: $l-gray;
            border: solid r(1) $l-gray;
            margin-bottom: r(24);

        }
    }
}

.field__select_full {
    margin-bottom: r(24);
}

:deep(.lnk) {
    width: fit-content;
    margin-top: r(24);
    margin-bottom: r(24);
}

:deep(.lnk_add) {
    margin-top: 0;
}
</style>