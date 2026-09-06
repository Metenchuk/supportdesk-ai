import { useEffect, useRef } from 'react'

interface Options {
    onUp: () => void
    onDown: () => void
    onEnter: () => void
    onNew: () => void
    onCommandPalette: () => void
    enabled?: boolean
}

function isTypingTarget(el: EventTarget | null) {
    if (!(el instanceof HTMLElement)) return false
    const tag = el.tagName.toLowerCase()
    return tag === 'input' || tag === 'textarea' || el.isContentEditable
}

export function useKeyboardNav({ onUp, onDown, onEnter, onNew, onCommandPalette, enabled = true }: Options) {
    const handlersRef = useRef({ onUp, onDown, onEnter, onNew, onCommandPalette })
    handlersRef.current = { onUp, onDown, onEnter, onNew, onCommandPalette }

    useEffect(() => {
        if (!enabled) return
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault()
                handlersRef.current.onCommandPalette()
                return
            }
            if (isTypingTarget(e.target)) return
            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault()
                    handlersRef.current.onUp()
                    break
                case 'ArrowDown':
                    e.preventDefault()
                    handlersRef.current.onDown()
                    break
                case 'Enter':
                    handlersRef.current.onEnter()
                    break
                case 'c':
                case 'C':
                    handlersRef.current.onNew()
                    break
            }
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [enabled])
}
