<script setup lang="ts">
import { FormMain } from '~/uikit/form';
import { UiIcon } from '~/uikit/icon';
import { ModalMain } from '~/uikit/modal';
import { useFilterData } from '~/store/useFilterData';

interface IProps {
    submit?: () => void
    formErrorState: { isError: boolean }
}

const props = withDefaults(defineProps<IProps>(), {
    submit: () => { }
})

const data = defineModel<object>()

const isOpenFilter = ref(false)
const filterModalPos = ref()

const filterRef = ref<HTMLElement | null>(null);
const openFilter = () => {
    const el = filterRef.value
    if (el) {
        const rect = el.getBoundingClientRect();
        filterModalPos.value = { x: rect.left, y: rect.bottom + 8 }
        isOpenFilter.value = true
    }
}

const cancel = () => {
    useFilterData().reset()
    isOpenFilter.value = false
}
const apply = () => {
    isOpenFilter.value = false
}

const reset = () => {
    useFilterData().reset()
}

const filterCount = computed(() => {
    let count = 0
    for (const values of Object.values(data.value!)) {

        for (const value of values) {
            if (typeof value == 'object' && 'max' in value) {
                if (value.max - value.values[1] || value.values[0] - value.min) {
                    count++
                    break
                }
            }
            else if (typeof value == 'object' && 'selected' in value) {
                if (value.selected) {
                    count++
                    break
                }
            }
            else if (value) {
                count++
                break
            }
        }
    }
    return count
})

</script>

<template>
    <div>
        <button ref="filterRef" @click="openFilter" class="filter" :class="{ 'filter_act': filterCount }">
            <UiIcon name="f-filter" class="filter__icon" :class="{ 'filter__icon_act': filterCount }" />
            <div class="filter__label" :class="{ 'filter__label_act': filterCount }">Фильтр</div>
            <div v-if="filterCount" class="badge">{{ filterCount }}</div>
        </button>

        <ModalMain v-model="isOpenFilter" :position="filterModalPos">
            <template #header>
                <div class="f-modal f-modal__header">
                    <div class="f-modal__title">Фильтр</div>
                    <button type="button" @click="reset" class="lnk">
                        <UiIcon name="x" />
                        Сбросить
                    </button>
                </div>
            </template>

            <FormMain id="filters-filterCustom" :submit="submit" :formErrorState="formErrorState"
                class="f-modal f-modal__main">
                <slot></slot>
            </FormMain>

            <template #footer>
                <div class="f-modal f-modal__footer">
                    <button type="button" @click="cancel" class="btn btn_white">Отменить</button>
                    <button form="filters-filterCustom" @click="apply" class="btn btn_black">Применить</button>
                </div>
            </template>
        </ModalMain>
    </div>
</template>

<style scoped lang="scss">
.filter {
    height: r(48);
    border-radius: $brad;
    border: solid r(1) $l-gray;
    @include pos-center;
    gap: r(8);
    flex: 0 0 auto;
    padding: 0 r(16);
    position: relative;
    z-index: 10000;
    background-color: white;

    &:hover,
    &:active {
        border: solid r(1) $gray;
    }

    &_act {
        border: solid r(1) $red;

        &:hover,
        &:active,
        &:focus {
            border: solid r(1) $red;
            outline: none;
            background-color: $l-red;
        }
    }

    &__label {
        color: $black;
        @include m-15;

        &_act {
            @include sb-15;
            color: $red;
        }
    }

    &__icon {
        color: $gray;

        &_act {
            color: $red;
        }
    }
}

.f-modal {
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__title {
        @include sb-16;
    }

    &__footer {
        display: flex;
        justify-content: flex-end;
        gap: r(12);
    }

    &__main {
        display: flex;
        flex-direction: column;
        gap: r(16);
    }
}
</style>