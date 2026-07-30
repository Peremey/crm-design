<script setup lang="ts">
interface IProps {
    status: string
}
defineProps<IProps>()
</script>

<template>
    <div class="status" :class="[
        { 'status_act': status == 'Активный' || status == 'Работает' },
        { 'status_unact': status == 'Неактивный' || status == 'Не работает' },
        { 'status_pay': status == 'Не оплачено' },
        { 'status_yellow': status == 'Обработка' || status == 'В отпуске' }
    ]">{{ status }}</div>
</template>

<style scoped lang="scss">
.status {
    border-radius: $brad;
    padding: r(4) r(8);
    @include b-12;

    &_act {
        color: $green;
        background-color: $l-green;
    }

    &_unact {
        color: $gray;
        background-color: $l-gray;
    }

    &_pay {
        color: $red;
        background-color: $l-red;
    }

    &_yellow {
        color: $yellow;
        background-color: $bg-yellow;
    }
}
</style>