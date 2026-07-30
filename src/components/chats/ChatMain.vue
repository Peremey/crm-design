<script setup lang="ts">
import { UiIcon } from '~/uikit/icon';

interface IProps {
    disabled?: boolean
}
interface IEmits {
    (e: 'send', content: string): void
    (e: 'showTemplates'): void
    (e: 'input'): void

}

withDefaults(defineProps<IProps>(), {
    disabled: false
})
const emit = defineEmits<IEmits>()

const send = () => {
    emit('send', model.value)
    alert('send')
}

const model = defineModel<string>({ default: '' });

const editableDiv = ref<HTMLDivElement | null>(null);

const onInput = () => {
    const el = editableDiv.value;
    if (el) {
        model.value = el.innerText.trim();
        adjustHeight();
        emit('input')
    }
}

const adjustHeight = () => {
    const el = editableDiv.value;
    if (el) {
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
    }
}


onMounted(() => {
    const el = editableDiv.value;
    if (el) {
        el.innerText = model.value;
        adjustHeight();
    }
});

</script>

<template>
    <form @submit.prevent="send" class="chat-editor">
        <label ref="chatInput" class="chat-editor__input">
            <div ref="editableDiv" @input="onInput" @keydown.ctrl.enter.prevent="send" contenteditable="true"
                tabindex="0" role="textbox" aria-multiline="true" data-placeholder="Ваше сообщение"
                class="chat-editor__workspace"></div>
        </label>
        <button type="button" class="btn-icon clickabled_gray">
            <UiIcon name="attach" />
        </button>
        <button id="chat-templates" type="button" @click="emit('showTemplates')" class="btn-icon clickabled_gray">
            <UiIcon name="t-chat" />
        </button>
        <button :disabled="disabled" class="btn-icon clickabled_red">
            <UiIcon name="tg" />
        </button>
    </form>
</template>

<style lang="scss" scoped>
.chat-editor {
    --height: #{r(48)};
    flex: 0 0 auto;
    height: fit-content;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: r(8);
    width: 100%;
    background-color: white;
    padding: r(16);

    &__input {
        flex: 1 1 0;
        min-height: var(--height);
        background-color: white;
        border-radius: r(20);
        padding: r(12) r(16);
        position: relative;
        border: solid r(1) $l-gray;
        cursor: text;

        &:has(div:focus-visible) {
            border: solid r(1) $red;
        }
    }

    &__workspace {
        max-height: r(150);
        overflow: auto;
        flex: 1 1 auto;
        min-width: 0;
        overflow-wrap: break-word;
        word-break: break-word;

        &:empty::before {
            content: attr(data-placeholder);
            color: $gray;
            pointer-events: none;
        }


    }
}

:deep(.input-main) {
    max-height: r(150);
    min-height: r(48);
}
</style>