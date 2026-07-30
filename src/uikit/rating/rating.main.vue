<script setup lang="ts">
import { UiIcon } from '../icon';
interface IProps {
    editabled?: boolean
}
withDefaults(defineProps<IProps>(), {
    editabled: false
})
const model = defineModel<number>();

</script>

<template>
    <div v-if="model != undefined" class="stars">
        <template v-for="starNumber in 5" :key="starNumber">
            <label class="stars__btn">
                <input v-if="editabled" v-model="model" :value="starNumber" type="radio" />
                <UiIcon name="star-half-fill" v-if="starNumber > model && starNumber - 1 < model" />
                <UiIcon name="star" v-else-if="starNumber <= model" />
                <UiIcon name="star-empty" v-else />
            </label>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.stars {
    display: flex;
    gap: r(8);

    &__btn {
        position: relative;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        width: r(20);
        height: r(20);
        color: $l-gray;
        transition: color 0.3s ease;

        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;

        &:active {
            background-color: transparent;
        }

        &_act {
            color: $yellow;
        }


        input {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
        }
    }

    svg {
        width: r(20);
        height: r(20);
    }
}
</style>