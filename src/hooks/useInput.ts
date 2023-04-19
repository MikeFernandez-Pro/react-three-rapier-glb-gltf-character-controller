import { useEffect, useState } from "react"

export const useInput = () => {
  const [input, setInput] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    shift: false,
    idle1: false,
    idle2: false,
    jump: false,
    wave1: false,
  })

  useEffect(() => {
    const keys: { [key: string]: string } = {
      KeyW: 'forward',
      KeyS: 'backward',
      KeyA: 'left',
      KeyD: 'right',
      ShiftLeft: 'shift',
      KeyE: 'idle1',
      ControlLeft: 'idle2',
      Space: 'jump',
      KeyQ: 'wave1',
    }

    const findKey = (key: string) => keys[key]

    const handleKeyDown = (e: { code: string }) => {
      setInput((m) => ({ ...m, [findKey(e.code)]: true }))
    }
    const handleKeyUp = (e: { code: string }) => {
      setInput((m) => ({ ...m, [findKey(e.code)]: false }))
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])


  return input
}
