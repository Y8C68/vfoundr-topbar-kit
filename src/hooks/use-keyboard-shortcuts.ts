import { useEffect, useCallback } from 'react'

export interface KeyboardShortcut {
  key: string
  ctrl?: boolean
  cmd?: boolean
  shift?: boolean
  alt?: boolean
  handler: () => void
  description?: string
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    for (const shortcut of shortcuts) {
      const { key, ctrl = false, cmd = false, shift = false, alt = false, handler } = shortcut

      const isCtrlPressed = ctrl ? event.ctrlKey : true
      const isCmdPressed = cmd ? event.metaKey : true
      const isShiftPressed = shift ? event.shiftKey : !event.shiftKey
      const isAltPressed = alt ? event.altKey : !event.altKey

      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        isCtrlPressed &&
        isCmdPressed &&
        isShiftPressed &&
        isAltPressed
      ) {
        event.preventDefault()
        handler()
        break
      }
    }
  }, [shortcuts])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}

export function useSearchShortcut(onActivate: () => void) {
  useKeyboardShortcuts([
    {
      key: 'k',
      ctrl: true,
      handler: onActivate,
      description: 'Focus search'
    },
    {
      key: 'k',
      cmd: true,
      handler: onActivate,
      description: 'Focus search'
    }
  ])
}