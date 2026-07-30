<script setup lang="ts">
import { UiIcon } from '../icon';

interface IProps {
    maxCount: number
    pageCount: number
}
const props = defineProps<IProps>()

const curPage = defineModel<number>()

const LINE_COUNT = 3
const LINE_COUNT_PART = (LINE_COUNT - 1) / 2

const startRowNumber = computed(() => {
    return curPage.value! * props.pageCount + 1
})
const endRowNumber = computed(() => {
    return Math.min(props.maxCount, startRowNumber.value + props.pageCount - 1)
})
const pageNumberList = computed((): number => {
    return Math.ceil(props.maxCount / props.pageCount)
})
const prevPage = () => {
    if (curPage.value != undefined)
        curPage.value--;
}
const nextPage = () => {
    if (curPage.value != undefined)
        curPage.value++;
}
const setPage = (pageNumber: number) => {
    curPage.value = pageNumber
}
const prevGroupPages = (pageNumber: number) => {
    curPage.value = pageNumber - 1
}
const nextGroupPages = (pageNumber: number) => {
    curPage.value = pageNumber + 1
}
</script>

<template>
    <div v-if="curPage != undefined" class="pag">
        <div class="pag__range">
            Показано <span>{{ startRowNumber }}</span>-<span>{{ endRowNumber }}</span> из <span>{{ maxCount }}</span>
        </div>
        <div class="pag__pages">
            <button :disabled="curPage == 0" @click="prevPage" class="pag__prev btn-icon clickabled">
                <UiIcon name="s-open" />
            </button>
            <button v-if="0 < curPage - LINE_COUNT_PART" @click="prevGroupPages(curPage - LINE_COUNT_PART)"
                class="btn-icon clickabled">
                <UiIcon name="dot" />
            </button>
            <template v-for="pn in Math.max(Math.min(pageNumberList, curPage + LINE_COUNT_PART + 1), LINE_COUNT)">
                <template v-if="pn > Math.min(curPage - LINE_COUNT_PART, pageCount - LINE_COUNT)">
                    <button v-if="curPage != pn - 1" @click="setPage(pn - 1)" class="btn-icon clickabled">
                        {{ pn }}
                    </button>
                    <div v-else class="btn-icon pag__curPage">
                        {{ pn }}
                    </div>
                </template>
            </template>
            <button v-if="pageNumberList > curPage + LINE_COUNT_PART + 1"
                @click="nextGroupPages(curPage + LINE_COUNT_PART)" class="btn-icon clickabled">
                <UiIcon name="dot" />
            </button>
            <button :disabled="curPage == pageCount - 1" @click="nextPage" class="pag__next btn-icon clickabled">
                <UiIcon name="s-open" />
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.pag {
    height: r(92);
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 r(24);

    &__range {
        color: $gray;
        @include m-15;
    }

    &__pages {
        display: flex;
        gap: r(8);
    }

    &__prev {
        transform: rotateZ(90deg);
    }

    &__next {
        transform: rotateZ(-90deg);
    }

    &__curPage {
        color: $red;
        background-color: $l-red;
        border: none;
        @include sb-16;
    }
}
</style>