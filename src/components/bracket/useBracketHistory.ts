import { useCallback, useRef, useState } from "react"

export type HistoryCommand = {
  label: string
  undo: () => Promise<unknown>
  redo: () => Promise<unknown>
}

const LIMIT = 50

/** Historial para deshacer/rehacer acciones del lienzo (mover, conectar, asignar). */
export function useBracketHistory() {
  const undoStack = useRef<HistoryCommand[]>([])
  const redoStack = useRef<HistoryCommand[]>([])
  const running = useRef(false)
  const [sizes, setSizes] = useState({ undo: 0, redo: 0 })

  const sync = () => setSizes({ undo: undoStack.current.length, redo: redoStack.current.length })

  const push = useCallback((command: HistoryCommand) => {
    undoStack.current = [...undoStack.current, command].slice(-LIMIT)
    redoStack.current = []
    sync()
  }, [])

  const undo = useCallback(async () => {
    const command = undoStack.current.at(-1)
    if (!command || running.current) return
    running.current = true
    try {
      await command.undo()
      undoStack.current = undoStack.current.slice(0, -1)
      redoStack.current = [...redoStack.current, command]
    } catch {
      // el error ya se muestra en el interceptor
    } finally {
      running.current = false
      sync()
    }
  }, [])

  const redo = useCallback(async () => {
    const command = redoStack.current.at(-1)
    if (!command || running.current) return
    running.current = true
    try {
      await command.redo()
      redoStack.current = redoStack.current.slice(0, -1)
      undoStack.current = [...undoStack.current, command]
    } catch {
      // el error ya se muestra en el interceptor
    } finally {
      running.current = false
      sync()
    }
  }, [])

  const clear = useCallback(() => {
    undoStack.current = []
    redoStack.current = []
    sync()
  }, [])

  return { push, undo, redo, clear, canUndo: sizes.undo > 0, canRedo: sizes.redo > 0 }
}
