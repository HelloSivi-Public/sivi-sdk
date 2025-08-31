import React from 'react'
import { LayoutStateContext } from './LayoutStateContext'

// Layout State Provider
export const LayoutStateProvider = ({ children, registerEventHandler }) => {
  const selectedVisualRef = React.useRef(null)
  const [visualShapes, setVisualShapes] = React.useState({})
  const [currentLayoutId, setCurrentLayoutId] = React.useState(null)

  // Initialize visual shapes when layout changes
  const initializeLayout = React.useCallback((layoutDef) => {
    if (layoutDef.id !== currentLayoutId) {
      const shapes = {}
      layoutDef.elements.forEach(element => {
        if (element.type === 'visual') {
          shapes[element.id] = { imageUrl: null }
        }
      })
      setVisualShapes(shapes)
      setCurrentLayoutId(layoutDef.id)
    }
  }, [currentLayoutId])

  // Handle visual selection
  const setSelectedVisual = React.useCallback((visualId) => {
    selectedVisualRef.current = visualId
  }, [])

  // Register SIVI event handler
  React.useEffect(() => {
    if (registerEventHandler) {
      const handleSiviEvents = async (event, responseCallback) => {
        if (event.type === 'EXTRACT' && selectedVisualRef.current) {
          const URL = event.data.src + '?timestamp=' + Date.now()
          setVisualShapes(prev => ({
            ...prev,
            [selectedVisualRef.current]: { imageUrl: URL }
          }))
          responseCallback("done")
        }
      }

      const unregister = registerEventHandler(handleSiviEvents)
      return unregister
    }
  }, [registerEventHandler])

  const contextValue = {
    visualShapes,
    setSelectedVisual,
    initializeLayout
  }

  return (
    <LayoutStateContext.Provider value={contextValue}>
      {children}
    </LayoutStateContext.Provider>
  )
}
