import './App.css'
import React from 'react'
import DesignForm from './components/DesignForm'

function App() {
  const handleFormSubmit = (formData) => {
    console.log('Form submitted with data:', formData);
    // Here you would typically send the data to your API
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Marketing Campaign</h1>
      </header>
      
      <div className="app-content">
        <aside className="sidebar">
          <div className="control-panel">
            <DesignForm onSubmit={handleFormSubmit} />
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
