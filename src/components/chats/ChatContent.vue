<script setup lang="ts">
import { UiIcon } from '~/uikit/icon';
import ChatMessage from './ChatMessage.vue';
import 'photoswipe/style.css'

const openImage = () => {

}

// массив картинок для PhotoSwipe
const lightboxImages = ref<Array<{ src: string; width: number; height: number }>>([])

// открытие PhotoSwipe
const openLightbox = async (index: number) => {
    if (!lightboxImages.value.length) return

    const { default: PhotoSwipe } = await import('photoswipe')
    await import('photoswipe/style.css')

    const pswp = new PhotoSwipe({
        dataSource: lightboxImages.value,
        index
    })
    pswp.init()
}

onMounted(() => {
    lightboxImages.value = [{
        src: '/img/tmp/img.jpg',
        width: 800,
        height: 600
    }, {
        src: '/img/tmp/person.png',
        width: 800,
        height: 600
    }, {
        src: '/img/tmp/img.jpg',
        width: 800,
        height: 600
    }]
})
</script>

<template>
    <div class="messages">
        <!--<div class="messages__wrapper"> -->
        <ChatMessage type="user" avatar="/img/tmp/person.png" date="14 декабря 2025, 11:30"
            message="Снимать и ставить винтовку на предохранитель можно, не отнимая руки?">
            <div class="messages__images">
                <div @click="openImage" v-for="i of 3" class="messages__image">
                    <img src="/img/tmp/img.jpg" @click="() => openLightbox(i - 1)" alt="" />
                </div>
            </div>
        </ChatMessage>

        <ChatMessage type="admin" avatar="/img/av-noimg.png" date="14 декабря 2025, 11:30"
            message="Объем доходов населения сократился">
            <div class="messages__document messages__document_admin">
                <UiIcon name="pdf" />
                <div>
                    <div class="messages__file">File Name.ai</div>
                    <div class="messages__size">300 кб</div>
                </div>
            </div>
        </ChatMessage>

        <ChatMessage type="user" avatar="/img/tmp/person.png" date="14 декабря 2025, 11:30"
            message="Являясь всего лишь частью общей картины, реплицированные с зарубежных источников, современные исследования объективно рассмотрены соответствующими инстанциями." />

        <ChatMessage type="admin" avatar="/img/av-noimg.png" date="14 декабря 2025, 11:30"
            message="Не следует забывать, что объем доходов населения сократился" :isRead="false" />
        <!-- </div> -->
    </div>
</template>

<style scoped lang="scss">
.messages {
    flex: 1 1 auto;
    overflow-y: auto;
    padding: r(24);
    min-height: 0;

    &__images {
        display: flex;
        gap: r(12);
        overflow-x: auto;
    }

    &__image {
        cursor: pointer;
        width: r(64);
        height: r(64);
        border-radius: r(24);
        overflow: hidden;

        img {
            height: 100%;
            object-fit: cover;
        }
    }

    &__document {
        max-width: r(580);
        border-radius: r(20) r(20) r(20) 0;
        background-color: white;
        border: solid r(1) $l-gray;
        padding: r(10) r(12);
        @include m-15;
        color: $black;
        display: flex;
        gap: r(8);

        svg {
            width: r(40);
            height: r(40);
        }

        &_admin {
            color: white;
            background-color: $red;
            border-radius: r(20) r(20) 0 r(20);
            border: none;
        }
    }

    &__size {
        @include m-12;
        color: $l-red;
    }

    &__wrapper {
        //max-height: calc(100dvh - r(170) - r(24) - r(78) - r(80));
        overflow-y: auto;
        padding: r(24);
    }
}
</style>