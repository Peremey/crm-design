<script setup lang="ts">
interface IProps {
    position: 'mouse' | 'bottom' | 'right'  // не может меняться динамически во время выполнения
    type?: 'click' | 'mouseover'             // не может меняться динамически во время выполнения
    hostSelector: string
}
const props = withDefaults(defineProps<IProps>(), {
    type: 'click'
})

const isOpen = defineModel<boolean>()

const tooltipRef = ref()

const tooltipPos = ref<{ x: number, y: number }>({ x: 0, y: 0 })
const tooltipPosStyleStr = computed(() => {
    return `--tooltip-pos-x:${tooltipPos.value.x}px;--tooltip-pos-y:${tooltipPos.value.y}px;`
})

const eventType = computed(() => {
    return props.type == 'click' ? 'pointerdown' : 'mouseout'
})

// Расстояния между tooltip и его host для различных режимов. В качестве расширения функционала можно будет сделать передачу этого через свойства. Тогда это можно кастомизировать для каждого tooltip объекта.
const SPACE_RIGHT = {
    RIGHT: 0,
    TOP: 8,
    BOTTOM: 8
}
const SPACE_BOTTOM = {
    RIGHT: 0,
    TOP: 8,
}

const toggleTooltip = (event: MouseEvent) => {
    if (!tooltipRef.value.contains(event.target as Node)) {
        const rect = (tooltipRef.value as HTMLElement).getBoundingClientRect()
        if (props.position == 'mouse') {
            tooltipPos.value = { x: event.pageX, y: event.pageY }
            if (window.innerWidth <= event.pageX + rect.width) {
                tooltipPos.value.x = event.pageX - rect.width
            }
            if (window.innerHeight <= event.pageY + rect.height) {
                tooltipPos.value.y = event.pageY - rect.height
            }
        }
        clickOutside(event)
    }
}

const clickOutside = (event: MouseEvent) => {
    if (props.hostSelector) {
        const hostEl: Element | null = document.querySelector(props.hostSelector)
        if (hostEl)
            if (!tooltipRef.value.contains(event.target as Node) && !hostEl.contains(event.target as Node)) {
                isOpen.value = false
            }
    }
}

const closeTooltip = (event: Event) => {
    if (!tooltipRef.value.contains(event.target as Node)) {
        isOpen.value = false
    }
}

const hostEl = ref<Element | null>()

const initHostSelector = () => {
    if (props.hostSelector) {
        if (hostEl.value) {
            hostEl.value.removeEventListener(eventType.value, setTooltipPos);
        }
        hostEl.value = document.querySelector(props.hostSelector)
        if (hostEl.value) {
            hostEl.value.addEventListener(eventType.value, setTooltipPos);
            setTooltipPos()
        }
    }
}

const setTooltipPos = () => {
    if (hostEl.value) {
        if (props.position == 'right') {
            const hostSelectorRect = hostEl.value.getBoundingClientRect()
            tooltipPos.value = { x: hostSelectorRect.right + SPACE_RIGHT.RIGHT, y: hostSelectorRect.top + SPACE_RIGHT.TOP }
            const rect = (tooltipRef.value as HTMLElement).getBoundingClientRect()
            if (window.innerWidth <= tooltipPos.value.x + rect.width) {
                tooltipPos.value.x = hostSelectorRect.left - SPACE_RIGHT.RIGHT - rect.width
            }
            if (window.innerHeight <= tooltipPos.value.y + rect.height) {
                tooltipPos.value.y = window.innerHeight - SPACE_RIGHT.BOTTOM - rect.height
            }
        } else if (props.position == 'bottom') {
            const hostSelectorRect = hostEl.value.getBoundingClientRect()
            const rect = (tooltipRef.value as HTMLElement).getBoundingClientRect()
            tooltipPos.value = { x: hostSelectorRect.right - rect.width + SPACE_BOTTOM.RIGHT, y: hostSelectorRect.bottom + SPACE_BOTTOM.TOP }

            if (tooltipPos.value.x < 0) {
                tooltipPos.value.x = 5
            }
            if (window.innerWidth <= tooltipPos.value.x + rect.width) {
                tooltipPos.value.x = window.innerWidth - rect.width - 5
            }
            if (window.innerHeight <= tooltipPos.value.y + rect.height) {
                tooltipPos.value.y = hostSelectorRect.top - rect.height - SPACE_BOTTOM.TOP
            }
        }
    }
}

if (props.position == 'right' || props.position == 'bottom') {
    watch(() => props.hostSelector, () => {
        initHostSelector()
    }, { immediate: true })
}

onMounted(() => {
    if (props.position == 'right' || props.position == 'bottom') {
        initHostSelector()
    }
    document.addEventListener(eventType.value, toggleTooltip);
    window.addEventListener('scroll', closeTooltip as EventListener, { capture: true });
})

onBeforeUnmount(() => {
    document.removeEventListener(eventType.value, toggleTooltip)
    window.removeEventListener('scroll', closeTooltip as EventListener, { capture: true })
    if (hostEl.value) {
        hostEl.value.removeEventListener(eventType.value, setTooltipPos);
    }
})
</script>

<template>
    <div ref="tooltipRef" class="tooltip" :class="[{ 'tooltip_open': isOpen }]" :style="tooltipPosStyleStr">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.tooltip {
    position: absolute;
    top: var(--tooltip-pos-y);
    left: var(--tooltip-pos-x);
    opacity: 0;
    //transition: all 0.2s ease;
    z-index: -1;

    &_open {
        opacity: 1;
        z-index: 1;
    }
}
</style>