<script setup lang="ts">

</script>

<template>
    <div class="info">
        <div class="info__item">
            <div class="info__wrapper">
                <img src="/img/tmp/person.png" alt="" />
                <div class="info__title">Петров К.Е.</div>
            </div>
            <div class="info__data">15.09.2025, 12:00 - 14:00</div>
        </div>
        <div class="info__item">
            <div class="info__wrapper">
                <img src="/img/tmp/person.png" alt="" />
                <div class="info__title">Петров К.Е.</div>
            </div>
            <div class="info__data">15.09.2025, 12:00 - 14:00</div>
        </div>
        <div class="info__item">
            <div class="info__wrapper">
                <img src="/img/tmp/person.png" alt="" />
                <div class="info__title">Петров К.Е.</div>
            </div>
            <div class="info__data">15.09.2025, 12:00 - 14:00</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.info {
    width: r(450);

    &__item {
        padding: r(12) r(20);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__wrapper {
        display: flex;
        gap: r(8);
        align-items: center;
    }

    &__title {
        @include sb-16;
        color: $black;
    }

    &__data {
        @include m-15;
        color: $gray;
    }
}
</style>