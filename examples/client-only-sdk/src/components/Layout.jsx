import React from 'react'
import layoutDefinitions from './layouts.json'
import './Layout.css'

// Layout Logic Hook
const useLayoutLogic = ({ imageUrl, onVisualClick, layoutDef }) => {
  const selectedVisual = React.useRef(null)
  const [visualShapes, setVisualShapes] = React.useState(() => {
    const shapes = {}
    layoutDef.elements.forEach(element => {
      if (element.type === 'visual') {
        shapes[element.id] = { imageUrl: null }
      }
    })
    return shapes
  })

  const handleShapeClick = (event, id) => {
    let width = event.target.offsetWidth
    let height = event.target.offsetHeight

    if (event.target.nodeName === 'P') {
      width = event.target.parentElement.offsetWidth
      height = event.target.parentElement.offsetHeight
    }

    selectedVisual.current = id
    onVisualClick && onVisualClick({ width, height })
  }

  React.useEffect(() => {
    if (imageUrl && selectedVisual.current) {
      setVisualShapes(prev => ({
        ...prev,
        [selectedVisual.current]: { imageUrl: imageUrl }
      }))
    }
  }, [imageUrl])

  return { visualShapes, handleShapeClick }
}

// Layout Renderer Component
const LayoutRenderer = ({ layoutDef, onVisualClick, imageUrl }) => {
  const { visualShapes, handleShapeClick } = useLayoutLogic({
    imageUrl,
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
export const LayoutPreview = ({ currentLayout, onVisualClick }) => {
  const currentLayoutDef = layoutDefinitions[currentLayout]

  return (
    <div className="layout-preview">
      <LayoutRenderer
        layoutDef={currentLayoutDef}
        onVisualClick={onVisualClick}
      />
    </div>
  )
}
