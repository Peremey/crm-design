<script setup lang="ts">
import { CheckMain } from '~/uikit/check';
import ImgUpload from '~/components/shootRange/parameters/ImgUpload.vue';
</script>

<template>
    <ImgUpload label="Документы">
        <div class="docs">
            <div v-for="i in 3" class="docs__item">
                <img src="/img/document.png" />
                <div class="docs__check">
                    <CheckMain variant="three" />
                </div>
            </div>
        </div>
    </ImgUpload>
</template>

<style scoped lang="scss">
.docs {
    display: flex;
    gap: r(12);

    &__item {
        position: relative;
    }

    &__check {
        position: absolute;
        top: r(6);
        right: r(6);
        width: fit-content;
    }
}
</style>