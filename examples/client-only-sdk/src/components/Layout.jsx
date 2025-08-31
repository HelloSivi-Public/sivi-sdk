import React from 'react'
import layoutDefinitions from './layouts.json'
import './Layout.css'

// Shared Layout State Context
const LayoutStateContext = React.createContext()

// Layout State Provider
const LayoutStateProvider = ({ children, registerEventHandler }) => {
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

// Layout Logic Hook
const useLayoutLogic = ({ onVisualClick, layoutDef }) => {
  const context = React.useContext(LayoutStateContext)
  
  if (!context) {
    throw new Error('useLayoutLogic must be used within LayoutStateProvider')
  }

  const { visualShapes, setSelectedVisual, initializeLayout } = context

  // Initialize layout on mount or when layout changes
  React.useEffect(() => {
    initializeLayout(layoutDef)
  }, [layoutDef, initializeLayout])

  const handleShapeClick = React.useCallback((event, id) => {
    let width = event.target.offsetWidth
    let height = event.target.offsetHeight

    if (event.target.nodeName === 'P') {
      width = event.target.parentElement.offsetWidth
      height = event.target.parentElement.offsetHeight
    }

    setSelectedVisual(id)
    onVisualClick && onVisualClick({ width, height })
  }, [setSelectedVisual, onVisualClick])

  return { visualShapes, handleShapeClick }
}

// Layout Renderer Component
const LayoutRenderer = ({ layoutDef, onVisualClick }) => {
  const { visualShapes, handleShapeClick } = useLayoutLogic({
    onVisualClick,
    layoutDef
  })

  const renderElement = (element, index) => {
    const elementStyle = {
      position: 'absolute',
      left: `${element.position.x}%`,
      top: `${element.position.y}%`,
      width: `${element.position.width}%`,
      height: `${element.position.height}%`
    }
    const visualData = visualShapes[element.id]

    switch (element.type) {
      case 'text':
        return (
          <div
            key={index}
            className={`layout-element text-element ${element.styles}`}
            style={elementStyle}
          >
            {element.content}
          </div>
        )
      
      case 'visual':
        return (
          <div
            key={index}
            className={`layout-element visual-element ${element.styles}`}
            style={elementStyle}
            onClick={(e) => handleShapeClick(e, element.id)}
          >
            {visualData?.imageUrl ? (
              <img 
                src={visualData.imageUrl} 
                alt="Extracted Image" 
                className="visual-image"
              />
            ) : (
              <div className="visual-placeholder">
                <p>{element.placeholder}</p>
              </div>
            )}
          </div>
        )
      
      case 'logo':
        return (
          <div
            key={index}
            className={`layout-element logo-element ${element.styles}`}
            style={elementStyle}
          >
            <img src={element.content} alt="Logo" className="logo-image" />
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className={`layout-container ${layoutDef.layout}`}>
      {layoutDef.elements.map(renderElement)}
    </div>
  )
}

// Layout Selection Component
export const LayoutSelector = ({ currentLayout, onLayoutChange }) => {
  return (
    <div className="layout-selector">
      <label htmlFor="layoutSelect" className="layout-label">Choose Layout</label>
      <select
        id="layoutSelect"
        className="layout-select"
        value={currentLayout}
        onChange={(e) => onLayoutChange(parseInt(e.target.value, 10))}
      >
        {Object.values(layoutDefinitions).map(layout => (
          <option key={layout.id} value={layout.id}>
            {layout.name}
          </option>
        ))}
      </select>
    </div>
  )
}

// Layout Preview Component
export const LayoutPreview = ({ currentLayout, onVisualClick, registerEventHandler }) => {
  const currentLayoutDef = layoutDefinitions[currentLayout]

  return (
    <div className="layout-preview">
      <LayoutStateProvider registerEventHandler={registerEventHandler}>
        <LayoutRenderer
          layoutDef={currentLayoutDef}
          onVisualClick={onVisualClick}
        />
      </LayoutStateProvider>
    </div>
  )
}
