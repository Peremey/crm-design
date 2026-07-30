<script setup lang="ts">
import { UiIcon } from '~/uikit/icon'

interface IProps {
    type: 'admin' | 'user'
    avatar: string
    date: string
    message: string
    isRead?: boolean
}
withDefaults(defineProps<IProps>(), {
    isRead: true
})
</script>

<template>
    <div class="message">
        <div class="message__wrapper" :class="{ 'message__wrapper_admin': type == 'admin' }">
            <div class="message__av">
                <img :src="avatar" alt="" class="message__icon" />
            </div>
            <div class="message__content" :class="{ 'message__content_admin': type == 'admin' }">
                <div class="message__text" :class="{ 'message__text_admin': type == 'admin' }">{{ message }}</div>
                <slot></slot>
            </div>
        </div>

        <div class="message__date" :class="{ 'message__date_admin': type == 'admin' }">
            {{ date }}
            <UiIcon :name="isRead ? 'read' : 'unread'" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.message {
    max-width: r(800);
    margin-bottom: r(20);

    &__wrapper {
        display: flex;
        gap: r(12);
        align-items: end;
        margin-bottom: r(8);

        &_admin {
            flex-direction: row-reverse;
        }
    }

    &__av {
        flex: 0 0 auto;
    }

    &__icon {
        width: r(40);
        height: r(40);
        border-radius: 50%;
    }

    &__text {
        max-width: r(580);
        border-radius: r(20) r(20) r(20) 0;
        background-color: white;
        border: solid r(1) $l-gray;
        padding: r(10) r(12);
        @include m-15;
        color: $black;

        &_admin {
            color: white;
            background-color: $red;
            border-radius: r(20) r(20) 0 r(20);
            border: none;
        }
    }

    &__content {
        display: flex;
        flex-direction: column;
        gap: r(8);

        &_admin {
            align-items: end;
        }
    }

    &__date {
        padding-left: r(52);
        @include n-14;
        display: flex;
        gap: r(6);
        align-items: center;

        &_admin {
            justify-content: end;
            padding-right: r(52);
        }

        svg {
            width: r(24);
            height: r(24);
        }
    }
}
</style>