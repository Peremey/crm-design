<script setup lang="ts">
import { useId, useSlots } from 'vue'

interface IProps {
    //title?: string
    position?: { x: number, y: number }
}
interface IEmits {
    (e: 'close'): void
}
const props = defineProps<IProps>()
const emit = defineEmits<IEmits>()

const titleId = useId()
const hasHeader = computed(() => !!useSlots().header)

const isOpen = defineModel()
const close = () => {
    isOpen.value = false
    emit('close');
}
const positionStr = computed(() => {
    if (props.position)
        return '--modal-pos-x:' + props.position.x + 'px;--modal-pos-y:' + props.position.y + 'px;'
    return ''
})

const contentRef = ref<HTMLElement | null>(null)
let previouslyFocused: HTMLElement | null = null

const lockScroll = () => {
    document.body.style.overflow = 'hidden'
}

const unlockScroll = () => {
    document.body.style.overflow = ''
}

const setInert = (value: boolean) => {
    const children = Array.from(document.body.children)
    children.forEach((el) => {
        if (!el.classList.contains('modal-root')) {
            if (value) {
                el.setAttribute('inert', '')
            } else {
                el.removeAttribute('inert')
            }
        }
    })
}

const trapFocus = (e: KeyboardEvent) => {
    if (e.key !== 'Tab' || !contentRef.value) return

    const focusable = contentRef.value.querySelectorAll<HTMLElement>(
        'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )

    if (!focusable.length) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last?.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first?.focus()
    }
}

const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
        close()
    }
    trapFocus(e)
}

watch(isOpen, async (val) => {
    if (val) {
        previouslyFocused = document.activeElement as HTMLElement
        lockScroll()
        setInert(true)

        await nextTick()

        contentRef.value?.focus()
        document.addEventListener('keydown', handleKeydown)
    } else {
        unlockScroll()
        setInert(false)
        document.removeEventListener('keydown', handleKeydown)

        previouslyFocused?.focus()
    }
})

onBeforeUnmount(() => {
    unlockScroll()
    setInert(false)
    document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
    <Teleport to="body">
        <div v-show="isOpen" class="modal modal-root">
            <div class="modal__backspace" :class="{ 'modal__backspace_position': position }"></div>
            <div @click='close' :style="positionStr" class="modal__wrapper"
                :class="[{ 'modal__wrapper_centered': !position }, { 'modal__wrapper_position': position }]">
                <!-- отключаем @click='close' для конкретного проекта -->
                <!-- <Transition name="fade"> -->
                <div v-if="isOpen" @click.stop class="modal__content" role="dialog" aria-modal="true"
                    :aria-labelledby="hasHeader ? titleId : undefined" tabindex="-1"
                    :class="{ 'modal__content_position': position }">
                    <header class="modal__header" :id="titleId">
                        <slot name="header"></slot>
                    </header>

                    <main class="modal__main" :class="{ 'modal__main_position': position }">
                        <slot></slot>
                    </main>
                    <footer class="modal__footer">
                        <slot name="footer"></slot>
                    </footer>
                </div>
                <!-- </Transition> -->
            </div>
        </div>
    </Teleport>
</template>

<style lang="scss" scoped>
.modal {

    &__backspace,
    &__wrapper {
        position: fixed;
        width: 100vw;
        height: 100dvh;
        top: 0;
        left: 0;
    }

    &__backspace {
        z-index: 10010;
        background-color: $black;
        opacity: 0.5;

        &_position {
            z-index: 1000;
        }
    }

    &__wrapper {
        z-index: 10020;

        &_centered {
            display: flex;
            @include pos-center;
        }

        &_position {
            z-index: 1010;
        }
    }

    &__content {
        border-radius: r(20);
        border: solid r(1) $l-gray;
        background-color: white;
        overflow: hidden;
        min-width: r(400);

        &_position {
            position: absolute;
            top: var(--modal-pos-y);
            left: var(--modal-pos-x);
        }
    }

    &__header {
        border-bottom: solid r(1) $l-gray;
    }

    &__main {
        max-height: calc(100dvh - r(96) - r(78));
        overflow-y: auto;
        overflow-x: hidden;

        &_position {
            max-height: calc(100dvh - r(136) - r(252));
        }
    }

    &__footer {
        border-top: solid r(1) $l-gray;
    }

    &__header,
    &__main,
    &__footer {
        padding: r(20);
    }
}
</style>