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

/**
 * To add a mouse hover effect that triggers the same action as the key press "Space='waving'", you can add a mouseover event listener to the element that you want the hover effect to apply to.

Here's how you can modify the code to do this:

Copy code
import { useEffect, useState } from "react"

export const useInput = () => {
    const [input, setInput] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
        shift: false,
        waving: false,
    })

    useEffect(() => {
    const keys: { [key: string]: string } = {
            KeyW: 'forward',
            KeyS: 'backward',
            KeyA: 'left',
            KeyD: 'right',
            ShiftLeft: 'shift',
            Space: 'waving',
        }
        
        const findKey = (key: string) => keys[key]

        const handleKeyDown = (e: { code: string }) => {
            setInput((m) => ({...m, [findKey(e.code)]: true }))
        }
        const handleKeyUp = (e: { code: string }) => {
            setInput((m) => ({...m, [findKey(e.code)]: false }))
        }
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('keyup', handleKeyUp)

      // Add mouseover event listener
      const handleMouseOver = () => {
        setInput((m) => ({...m, waving: true }))
      }
      // Add mouseout event listener
      const handleMouseOut = () => {
        setInput((m) => ({...m, waving: false }))
      }
      // Add event listeners to element
      const element = document.getElementById('my-element');
      element.addEventListener('mouseover', handleMouseOver);
      element.addEventListener('mouseout', handleMouseOut);

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.removeEventListener('keyup', handleKeyUp)
        element.removeEventListener('mouseover', handleMouseOver);
        element.removeEventListener('mouseout', handleMouseOut);
      }
    }, [])
    

    return input
}
In the code above, we added two event listeners for mouseover and mouseout events to the element with the id of my-element. When the mouse is hovering over the element, the waving state will be set to true, and when the mouse moves out of the element, the waving state will be set to false.

Note that you will need to make sure that the element you want to apply the hover effect to has an id attribute so that it can be identified and selected using document.getElementById.
 */