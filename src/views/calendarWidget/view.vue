<script setup lang="ts">
import Calendar from '~/components/reservation/Calendar.vue';
import { SelectMain } from '~/uikit/select';
import RegisterModal from '~/components/calendarWidget/RegisterModal.vue';

const options2 = ref([
    { label: 'Галерея №1', value: 'Галерея №1', selected: true },
    { label: 'Галерея №2', value: 'Галерея №2', selected: false },
    { label: 'Галерея №3', value: 'Галерея №3', selected: true },
    { label: 'Галерея №4', value: 'Галерея №4', selected: false },
    { label: 'Галерея №5', value: 'Галерея №5', selected: true },
    { label: 'Галерея №6', value: 'Галерея №6', selected: false },
    { label: 'Галерея №7', value: 'Галерея №7', selected: true },
    { label: 'Галерея №8', value: 'Галерея №8', selected: false }
])

const isOpenReg = ref(true)

</script>

<template>
    <section name="widget" class="cont">
        <Calendar :isCalendarView="true" :isWidget="true">
            <SelectMain :options="options2" defaultOption="Галерея №1" :isMulti="true" class="novalidate" />
        </Calendar>

        <RegisterModal v-model:isOpen="isOpenReg" />
    </section>
</template>

<style scoped lang="scss"></style>
