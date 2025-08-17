import './App.css'
import React from 'react'
import layoutDefinitions from './layouts.json'

const IFRAME_CONTAINER_ID = 'sivi-container'

// Layout Logic Hook
const useLayoutLogic = ({ imageUrl, handleVisualClick, layoutDef }) => {
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
    handleVisualClick && handleVisualClick({ width, height })
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
const LayoutRenderer = ({ layoutDef, handleVisualClick, imageUrl }) => {
  const { visualShapes, handleShapeClick } = useLayoutLogic({
    imageUrl,
    handleVisualClick,
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
const LayoutSelector = ({ currentLayout, onLayoutChange }) => {
  return (
    <div className="layout-selector">
      <h3>Choose Layout</h3>
      <div className="layout-grid">
        {Object.values(layoutDefinitions).map(layout => (
          <button
            key={layout.id}
            className={`layout-option ${currentLayout === layout.id ? 'active' : ''}`}
            onClick={() => onLayoutChange(layout.id)}
          >
            {layout.name}
          </button>
        ))}
      </div>
    </div>
  )
}

// Main App Component
function App() {
  const paramsRef = React.useRef(null)
  const [isVisualOpen, setIsVisualOpen] = React.useState(false)
  const [imageUrl, setImageUrl] = React.useState(null)
  const [currentLayout, setCurrentLayout] = React.useState(1)

  const handleVisualClick = ({ width, height }) => {
    if (!isVisualOpen) {
      setIsVisualOpen(true)
      paramsRef.current = { width, height }
    } else {
      const options = {
        type: "custom",
        subtype: "custom",
        dimension: { width: 1080, height: 1080 },
        prompt: "Create a modern social media post",
        language: "english",
        colors: ["#5662EC", "#EF9AB2"],
        numOfVariants: 3,
        outputFormats: "png",
        config: {
          enableLoginUI: true,
          enableDesignEditor: true,
        }
      }
      window.SIVI?.show(options, IFRAME_CONTAINER_ID)
    }
  }

  React.useEffect(() => {
    if (isVisualOpen && paramsRef.current) {
      const params = {
        medium: 'custom',
        mediumType: 'custom',
        width: paramsRef.current.width,
        height: paramsRef.current.height,
        objective: 'promote-product',
      }
      window.SIVI?.show(params, IFRAME_CONTAINER_ID)
      paramsRef.current = null
    }
  }, [isVisualOpen])

  const handleRemoveVisual = () => {
    window.SIVI?.hide()
    setIsVisualOpen(false)
  }

  React.useEffect(() => {
    window.SIVI?.events(async (event, responseCallback) => {
      if (event.type === 'EXTRACT') {
        const URL = event.data.src + '?timestamp=' + Date.now()
        setImageUrl(URL)
        responseCallback("done")
      }
    })
    return () => {
      window.SIVI?.removeEventsCallback()
    }
  }, [])

  const currentLayoutDef = layoutDefinitions[currentLayout]

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Web Editor</h1>
      </header>
      
      <div className="app-content">
        <aside className="sidebar">
          {isVisualOpen ? (
            <div className="visual-panel">
              <div id={IFRAME_CONTAINER_ID} className="iframe-container">
                {/* Iframe placeholder */}
              </div>
              <button className="back-button" onClick={handleRemoveVisual}>
                Back to Home
              </button>
            </div>
          ) : (
            <div className="control-panel">
              <button 
                onClick={() => setIsVisualOpen(true)} 
                className="ai-studio-button"
              >
                AI Design Studio
              </button>
              <LayoutSelector 
                currentLayout={currentLayout}
                onLayoutChange={setCurrentLayout}
              />
            </div>
          )}
        </aside>
        
        <main className="main-content">
          <div className="layout-preview">
            <LayoutRenderer
              layoutDef={currentLayoutDef}
              handleVisualClick={handleVisualClick}
              imageUrl={imageUrl}
            />
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
