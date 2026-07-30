<script setup lang="ts">

</script>

<template>
    <template v-for="i in 20">
        <div class="history-cell">
            15.09.2025
        </div>
        <div class="history-cell">
            9:00
        </div>
        <div class="history-cell">
            12:00
        </div>
        <div class="history-cell">
            <div class="history-cell__count">
                1
            </div>
        </div>
        <div class="history-cell">
            <div class="history-cell__price">
                5 000 ₽
            </div>
        </div>
    </template>
</template>

<style scoped lang="scss">
.history-cell {
    background-color: white;
    color: $gray;
    @include m-16;
    min-height: r(48);
    @include pos-center;

    &__count {
        border-radius: 50%;
        background-color: $l-green;
        color: $green;
        @include pos-center;
        @include b-12;
    }

    &__price {
        color: $green;
        @include sb-16;
    }
}
</style>