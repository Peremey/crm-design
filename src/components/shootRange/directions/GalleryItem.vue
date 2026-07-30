<script setup lang="ts">
import { CheckMain } from '~/uikit/check';
import { UiIcon } from '~/uikit/icon';
import GalleryItemCell from './GalleryItemCell.vue';
interface IProps {
    color: string
    name: string
}
defineProps<IProps>()

interface IEmits {
    (e: 'openTooltip', selector: string): void
}
const emit = defineEmits<IEmits>()
</script>

<template>
    <div class="gallery">
        <header class="gallery__header">
            <div class="gallery__header_left">
                <CheckMain variant="toggle" />
                <div class="gallery__color" :style="'background-color: ' + color"></div>
                <div class="gallery__title">Галерея №{{ name }}</div>
                <button class="gallery__edit">
                    <UiIcon name="edit" />
                </button>
            </div>
            <div class="gallery__header_right">
                <button class="btn btn_white">
                    <UiIcon name="photos" />
                    Фотоальбом
                </button>
                <button class="btn btn_white">
                    <UiIcon name="map" />
                    Карта целей
                </button>
                <button :id="'gallery-context-' + name" @click="emit('openTooltip', '#gallery-context-' + name)"
                    class="clickabled">
                    <UiIcon name="client-menu" />
                </button>
            </div>
        </header>
        <main class="gallery__main">
            <div class="gallery__descr">
                <div class="gallery__descr_title">Описание</div>
                <div class="gallery__descr_content">В целом, конечно, синтетическое тестирование напрямую зависит от
                    экономической целесообразности решений!</div>
            </div>
            <div class="gallery__table">
                <GalleryItemCell label="Дистанция">
                    100 м
                </GalleryItemCell>
                <GalleryItemCell label="Дистанция от">
                    50 м
                </GalleryItemCell>
                <GalleryItemCell label="Ширина">
                    10 м
                </GalleryItemCell>
                <GalleryItemCell label="Кол-во мест">
                    8
                </GalleryItemCell>
                <GalleryItemCell label="Только с инструктором">
                    Нет
                </GalleryItemCell>
                <GalleryItemCell label="Загруженность в месяц">
                    <div class="gallery__cell gallery__cell_red">30%
                        <button>
                            <UiIcon name="t-info" />
                        </button>
                    </div>
                </GalleryItemCell>
            </div>
        </main>

    </div>
</template>

<style scoped lang="scss">
.gallery {
    background-color: white;
    border-radius: r(20);
    border: solid r(1) $l-gray;


    &__header {
        padding: r(28) r(20);
        border-bottom: solid r(1) $l-gray;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &_left,
        &_right {
            display: flex;
            align-items: center;
            gap: r(16);
        }
    }

    &__color {
        width: r(16);
        height: r(16);
        border-radius: r(4);
    }

    &__title {
        @include m-24;
    }

    &__edit {
        color: $gray;
    }

    .clickabled {
        svg {
            width: r(28);
            height: r(28);
        }
    }

    &__main {
        padding: r(28) r(20);
    }

    &__descr {
        @include m-16;
        margin-bottom: r(20);

        &_title {
            color: $black;
            margin-bottom: r(12);
        }

        &_content {
            color: $gray;
        }
    }

    &__table {
        border-radius: r(12);
        background-color: $bg;
        border: solid r(1) $l-gray;
        display: grid;
        grid-template-columns: repeat(6, 1fr);

        &>div {
            border-right: solid r(1) $l-gray;
        }

        &>div:last-child {
            border-right: none;
        }
    }

    &__cell {
        display: flex;
        gap: r(4);
        align-items: center;

        svg {
            width: r(16);
            height: r(16);
        }

        &_red {
            color: $red;
        }
    }
}
</style>