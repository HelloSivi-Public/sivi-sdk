import './App.css'
import React from 'react'
import { LayoutSelector, LayoutPreview } from './components/Layout'
import useSiviSDK from './hooks/useSiviSDK'

function App() {
  const [currentLayout, setCurrentLayout] = React.useState(1)
  
  const {
    isVisualOpen,
    imageUrl,
    handleVisualClick,
    handleRemoveVisual,
    openVisualStudio,
    IFRAME_CONTAINER_ID
  } = useSiviSDK()

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
                onClick={openVisualStudio} 
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
          <LayoutPreview 
            currentLayout={currentLayout}
            onVisualClick={handleVisualClick}
            imageUrl={imageUrl}
          />
        </main>
      </div>
    </div>
  )
}

export default App
