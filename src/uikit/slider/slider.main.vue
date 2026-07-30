<script setup lang="ts">

interface IProps {
    label: string
    min: number,
    max: number,
    step?: number,
    units?: string,
    startMinValue: number
    startMaxValue: number
}
const props = withDefaults(defineProps<IProps>(), {
    step: 1,
    units: ''
})

const slider = ref<HTMLDivElement | null>(null);
const minValue = defineModel<number>('minVal')
const maxValue = defineModel<number>('maxVal')

onMounted(() => {
    if (!minValue.value)
        minValue.value = props.startMinValue
    if (!maxValue.value)
        maxValue.value = props.startMaxValue
})

const getPercent = (value: number, min: number, max: number) => {
    return ((value - min) / (max - min)) * 100;
}

const setCSSProps = (left: number, right: number) => {
    if (slider.value) {
        slider.value.style.setProperty("--progressLeft", `${left}%`);
        slider.value.style.setProperty("--progressRight", `${right}%`);
    }
}

watch([minValue, maxValue], () => {
    if (minValue.value != null && maxValue.value) {

        const leftPercent = getPercent(minValue.value, props.min, props.max)
        const rightPercent = getPercent(maxValue.value, props.min, props.max)

        setCSSProps(leftPercent, rightPercent)
    }
}, { immediate: true })

const onInput = (event: Event) => {
    const input = event.currentTarget as HTMLInputElement
    const value = parseFloat(input.value)

    if (input.name === 'min' && maxValue.value != null) {
        minValue.value = value > maxValue.value ? maxValue.value : value
    }

    if (input.name === 'max' && minValue.value != null) {
        maxValue.value = value < minValue.value ? minValue.value : value
    }
}

</script>

<template>
    <div class="slider">
        <div class="slider__header">
            <div class="slider__label">{{ label }}</div>
            <div class="slider__values">{{ minValue }}-{{ maxValue }}{{ units }}</div>
        </div>

        <div ref="slider" class="slider__main">

            <input name="min" type="range" v-model.number="minValue" :min="min" :max="max" :step="step"
                @input="onInput" />
            <div class="slider__min"></div>
            <input name="max" type="range" v-model.number="maxValue" :min="min" :max="max" :step="step"
                @input="onInput" />
        </div>

        <div class="slider__footer">
            <div class="slider__value">{{ min }}{{ units }}</div>
            <div class="slider__value">{{ max }}{{ units }}</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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
        --trackHeight: #{r(4)};
        --thumbRadius: #{r(16)};
        height: r(20);
        position: relative;

        input[type="range"] {
            position: absolute;
            pointer-events: none;
            appearance: none;
            border-radius: 50%;
            z-index: 0;
            width: 100%;
        }


        &::before {
            left: var(--progressLeft);
            right: var(--progressRight);
            width: unset;
        }

        input[type="range"]::before {
            content: "";
            display: block;
            position: absolute;
            width: var(--ProgressPercent, 100%);
            height: 100%;
            background: $red;
            border-radius: 999px;
        }

        input[type="range"]::-webkit-slider-thumb,
        input[type="range"]::-moz-range-thumb {
            position: relative;
            box-sizing: border-box;
            width: var(--thumbRadius);
            height: var(--thumbRadius);
            margin-top: calc((var(--trackHeight) - var(--thumbRadius)) / 2);
            background: white;
            border: 1px solid $red;
            border-radius: 999px;
            pointer-events: all;
            appearance: none;
            z-index: 10000;
        }



        input[name="min"]::-webkit-slider-thumb,
        input[name="min"]::-moz-range-thumb {
            //background: transparent;
            //border: none;
        }

        input[type="range"]:focus-visible::-webkit-slider-thumb,
        input[type="range"]:focus-visible::-moz-range-thumb,
        input[type="range"]:active::-webkit-slider-thumb,
        input[type="range"]:active::-moz-range-thumb {
            outline: 3px solid $red;
        }

        input[name="min"]:focus-visible+.slider__min,
        input[name="min"]:active+.slider__min {
            outline: 3px solid $red;
        }

        input[type="range"]::-moz-range-track,
        input[type="range"]::-webkit-slider-runnable-track {
            position: relative;
            appearance: none;
            background: linear-gradient(to right,
                    #ccc 0%,
                    #ccc var(--progressLeft, 0%),
                    $red var(--progressLeft, 0%) var(--progressRight, 100%),
                    #ccc var(--progressRight, 100%) 100%);
            height: var(--trackHeight);
            border-radius: 999px;
            z-index: 3;
        }


    }

    &__min {
        position: absolute;
        width: var(--thumbRadius);
        height: var(--thumbRadius);
        background: white;
        border: 1px solid $red;
        border-radius: 999px;
        pointer-events: none;
        appearance: none;
        z-index: 1;
        top: r(2);
        left: calc(var(--progressLeft, 0%) - var(--progressLeft) * 0.05);
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
