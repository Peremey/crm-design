<script setup lang="ts">
interface IProps {
    date: Date
    currentMonth: number
}
defineProps<IProps>()
</script>

<template>
    <div class="cell__day" :class="[
        { 'cell__day_no-cur': currentMonth != date.getMonth() },
        { 'cell__day_fav': date.getDate() == (new Date).getDate() && currentMonth == (new Date).getMonth() }
    ]">{{ date.getDate() }}
    </div>
</template>

<style scoped lang="scss">
.cell {

    &__day {
        width: r(34);
        height: r(34);
        border-radius: 50%;
        margin: 0 auto;
        @include pos-center;
        @include m-15;
        border: solid r(1) $l-gray;
        color: $gray;
        background-color: white;
        margin-bottom: r(18);
        cursor: pointer;

        &_no-cur {
            color: $m-gray;
        }

        &_fav {
            color: white;
            border: none;
            background-color: $red;
        }
    }
}
</style>