import './App.css'
import React from 'react'

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Marketing Campaign</h1>
      </header>
      
      <div className="app-content">
        <aside className="sidebar">
           
            <div className="control-panel">
              <div className="control-content">
                <p>How to Run</p>
              </div>
              <button 
                onClick={() => {}} 
                className="ai-studio-button"
              >
                Generate Design
              </button>
            </div>
        </aside>
        
        <main className="main-content">
          <p>Design will be generated here</p>
        </main>
      </div>
    </div>
  )
}

export default App
