<script setup lang="ts">
import { UiIcon } from '~/uikit/icon';
interface IEmits {
    (e: 'close'): void
}
const emit = defineEmits<IEmits>()
</script>

<template>
    <div class="context-menu">
        <header class="context-menu__header">
            <button>
                <UiIcon name="edit" />
            </button>
            <button>
                <UiIcon name="delete" />
            </button>
            <button @click="emit('close')">
                <UiIcon name="x" />
            </button>
        </header>

        <h2>
            <div></div> Галерея №1 (100 м) - 1 место
        </h2>

        <div class="context-menu__date">
            <div>Среда, 13 октября</div>
            <div>12:00 - 13:00</div>
        </div>

        <div class="context-menu__item person item">
            <div class="item__icon person__icon">
                <UiIcon name="t-users" />
            </div>
            <div class="person__content">
                <img src="/img/tmp/person.png" alt="" class="person__img" />
                <div class="item__title">Петров Кирилл Евгеньевич</div>
            </div>
        </div>

        <div class="context-menu__item item">
            <div class="item__icon">
                <UiIcon name="f-money" />
            </div>
            <div class="item__content">
                <div class="item__title">Стоимость</div>
                <div class="item__value item__value_green">5 000 ₽</div>
            </div>
        </div>

        <div class="context-menu__item item">
            <div class="item__icon">
                <UiIcon name="t-user-list" />
            </div>
            <div class="item__content">
                <div class="item__title">Дополнительные услуги</div>
                <div class="item__value">Пристрелка 1 ед. оружия</div>
            </div>
        </div>

        <div class="context-menu__item item">
            <div class="item__icon">
                <UiIcon name="t-info" />
            </div>
            <div class="item__content">
                <div class="item__title">Комментарий</div>
                <div class="item__value">В целом, конечно, синтетическое тестирование напрямую зависит от экономической
                    целесообразности решений!</div>
            </div>
        </div>

        <div class="context-menu__contacts contacts">
            <button class="contacts__btn">
                <UiIcon name="t-phone-call" />
                <div class="contacts__label">+7 903 123-45-67</div>
            </button>
            <button class="contacts__btn">
                <UiIcon name="t-chat" />
                <div class="contacts__label">Чат</div>
            </button>
            <button class="contacts__btn">
                <UiIcon name="t-letter" />
                <div class="contacts__label">Письмо</div>
            </button>
        </div>

        <div class="context-menu__item item">
            <div class="item__icon">
                <UiIcon name="t-car" />
            </div>
            <div class="item__content">
                <div class="item__title">Автомобиль</div>
                <div class="item__value">A777AA 69, Audi Q5</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
$gap: 18;

.context-menu {
    width: 100%;


    h2 {
        display: flex;
        gap: r(18);
        align-items: center;

        &>div {
            width: r(16);
            height: r(16);
            background-color: $yellow;
            border-radius: r(4);
        }
    }

    &__header {
        margin-bottom: r($gap);
        display: flex;
        justify-content: flex-end;
        gap: r(20);
        color: $gray;
    }

    &__date {
        padding-left: r(34);
        display: flex;
        gap: r(32);
        @include m-15;
        color: $gray;
        margin-top: r(8);
        margin-bottom: r($gap);
    }

    &__item {
        margin-bottom: r($gap);
    }

    &__contacts {
        display: flex;
        gap: r(16);
    }
}

.item {
    display: flex;
    gap: r(20);
    @include m-16;

    svg {
        width: r(20) !important;
        height: r(20);
    }

    &__title {
        @include sb-16;
        margin-bottom: r(10);
    }

    &__icon {
        color: #69696A;
        flex: 0 0 auto;
    }

    &__value {
        color: $gray;

        &_green {
            color: $green;
        }
    }
}

.person {
    &__content {
        display: flex;
        gap: r(8);
        align-items: center;
    }

    &__img {
        width: r(32);
        height: r(32);
    }

    &__icon {
        margin-top: r(4);
    }
}

.contacts {
    margin-bottom: r($gap);

    &__btn {
        height: r(48);
        @include pos-center;
        padding-right: r(20);
        padding-left: r(4);
        gap: r(8);
        color: $gray;

        svg {
            width: r(24);
            height: r(24);
        }

        &:hover {
            background-color: $l-gray;
        }
    }

    &__label {
        text-decoration: underline;
        color: $red;
        @include sb-15;
    }
}
</style>