<script setup lang="ts">
import Slider from '@vueform/slider';

interface IProps {
    label: string
    min: number,
    max: number,
    step?: number,
    units?: string
}
const props = withDefaults(defineProps<IProps>(), {
    step: 1,
    units: ''
})

const values = defineModel<[number, number]>()

</script>

<template>
    <div class="slider">
        <div class="slider__header">
            <div class="slider__label">{{ label }}</div>
            <div v-if="values" class="slider__values">{{ values[0] }}-{{ values[1] }}{{ units }}</div>
        </div>

        <div ref="slider" class="slider__main">
            <Slider v-model="values" :min="min" :max="max" :step="step" :tooltips="false" class="slider-theme"></Slider>
        </div>

        <div class="slider__footer">
            <div class="slider__value">{{ min }}{{ units }}</div>
            <div class="slider__value">{{ max }}{{ units }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.slider-theme {
    --slider-connect-bg: #{$red};
    --slider-height: #{r(4)};
    --slider-handle-ring-width: 2px;
    --slider-handle-ring-color: #{$red};
    --slider-handle-shadow: none;
}

:deep(.slider-handle) {
    border: solid r(1) $red;

}

:deep(.slider-handle:focus-visible),
:deep(.slider-handle:active) {
    border: solid r(2) $red;
}

.slider {
    &__header {
        display: flex;
        justify-content: space-between;
        margin-bottom: r(8);
    }

    &__label {
        color: $gray;
        @include m-15;
    }

    &__values {
        color: $black;
    }

    &__main {
        height: r(20);
        position: relative;
        padding: 0 r(8);
    }

    &__footer {
        display: flex;
        justify-content: space-between;
        margin-top: r(4);
        color: $m-gray;
        @include n-10;
    }
}
</style>
<!-- <style src="@vueform/slider/themes/default.css"></style> -->