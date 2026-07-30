import type { ISelectOption } from "../../../types/ISelectOption";
import { useId } from 'vue'

export const useSelect = (
    options: ISelectOption[],
    isEqual: (val: string | number) => boolean,
    selectOption: (option: { label: string; value: any }) => void
) => {
    const isOpen = ref(false)

    const listboxId = useId()
    const highlightedIndex = ref<number>(-1)

    const openDropdown = () => {
        isOpen.value = true

        const currentIndex = options.findIndex(
            o => isEqual(o.value)
        )

        highlightedIndex.value = currentIndex >= 0 ? currentIndex : 0

        nextTick(() => {
            scrollToActive()
        })
    }

    const closeDropdown = () => {
        isOpen.value = false
        highlightedIndex.value = -1
    }

    const activeDescendant = computed(() => {
        if (!isOpen.value || highlightedIndex.value < 0) return undefined
        return `${listboxId}-option-${highlightedIndex.value}`
    })

    const scrollToActive = () => {
        const el = document.getElementById(activeDescendant.value || '')
        el?.scrollIntoView({ block: 'nearest' })
    }

    const handleKeydown = (e: KeyboardEvent) => {
        const max = options.length - 1

        if (!isOpen.value && ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
            e.preventDefault()
            openDropdown()
            return
        }

        if (!isOpen.value) return

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault()
                highlightedIndex.value =
                    highlightedIndex.value >= max ? 0 : highlightedIndex.value + 1
                scrollToActive()
                break

            case 'ArrowUp':
                e.preventDefault()
                highlightedIndex.value =
                    highlightedIndex.value <= 0 ? max : highlightedIndex.value - 1
                scrollToActive()
                break

            case 'Home':
                e.preventDefault()
                highlightedIndex.value = 0
                scrollToActive()
                break

            case 'End':
                e.preventDefault()
                highlightedIndex.value = max
                scrollToActive()
                break

            case 'Enter':
            case ' ':
                e.preventDefault()
                const option = options[highlightedIndex.value]
                if (option)
                    selectOption(option)
                break

            case 'Escape':
                closeDropdown()
                break
        }

    }
    return { isOpen, listboxId, highlightedIndex, activeDescendant, handleKeydown, openDropdown, closeDropdown }
}