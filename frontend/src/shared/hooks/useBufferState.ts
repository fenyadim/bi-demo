import { useEffect, useRef, useState } from 'react'

export function useBufferState<T>(
  initialState: T,
  updateInterval: number = 1000,
) {
  const bufferRef = useRef<T>(initialState)
  const [state, setState] = useState<T>(initialState)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setState({ ...bufferRef.current })
    }, updateInterval)

    return () => clearInterval(intervalId)
  }, [updateInterval])

  return {
    state,
    bufferRef,
  }
}
