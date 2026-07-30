<script setup lang="ts">
import { UiIcon } from '~/uikit/icon';
interface IEmits {
    (e: 'close'): void
}
const emit = defineEmits<IEmits>()

</script>

<template>
    <div class="notification">
        <header>
            <h3>Уведомления</h3>
            <button @click="emit('close')">
                <UiIcon name="x" />
            </button>
        </header>
        <main>
            <div class="notification__item notification__item_reading">
                <div class="notification__content">
                    <div class="notification__time">
                        <UiIcon name="clock" />
                        <div>12:00</div>
                    </div>
                    <div class="notification__title">Заголовок</div>
                    <div class="notification__text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus vestibulum hendrerit.
                        Nulla est diam, efficitur eu ullamcorper quis, ultrices nec nisl.
                    </div>
                </div>
                <div class="notification__status">
                    <div class="lnk">
                        <UiIcon name="check" />
                        <div>Прочитано</div>
                    </div>
                </div>
            </div>
            <div v-for="i in 7" class="notification__item">
                <div class="notification__content">
                    <div class="notification__time">
                        <UiIcon name="clock" />
                        <div>12:00</div>
                    </div>
                    <div class="notification__title">Заголовок</div>
                    <div class="notification__text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus finibus vestibulum hendrerit.
                        Nulla est diam, efficitur eu ullamcorper quis, ultrices nec nisl.
                    </div>
                </div>
            </div>
        </main>
        <footer>
            <button class="lnk">
                <div>Показать все</div>
                <UiIcon name="caret-right" />
            </button>
        </footer>
    </div>
</template>

<style scoped lang="scss">
.notification {
    width: r(432);
    height: r(560);

    header {
        height: r(70);
        border-bottom: solid r(1) $l-gray;
        padding: r(24) r(16);
        display: flex;
        justify-content: space-between;
        align-items: center;

        svg {
            width: r(24);
            height: r(24);
        }
    }

    main {
        height: r(428);
        overflow-y: auto;
    }

    footer {
        height: r(62);
        @include pos-center;
        border-top: solid r(1) $l-gray;

        svg {
            width: r(16);
            height: r(16);
        }
    }

    &__item {
        padding: r(16);

        &_reading {
            background-color: $bg-yellow;
        }
    }

    &__time {
        color: $time-gray;
        display: flex;
        align-items: center;
        gap: r(4);
        @include m-12;
        margin-bottom: r(8);

        svg {
            width: r(16);
            height: r(16);
        }
    }

    &__title {
        @include sb-15;
        margin-bottom: r(8);
    }

    &__text {
        @include m-15;
        color: $gray;
    }

    &__status {
        height: r(30);
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
}
</style>