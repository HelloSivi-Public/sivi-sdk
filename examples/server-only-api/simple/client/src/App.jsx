import './App.css'
import React, { useState } from 'react'
import DesignForm from './components/DesignForm'
import { designPresets } from './presets/designPresets'

function App() {
  const [selectedPreset, setSelectedPreset] = useState('');
  const [formKey, setFormKey] = useState(0);

  const handleFormSubmit = (formData) => {
    console.log('Form submitted with data:', formData);
    // Here you would typically send the data to your API
  };

  const handlePresetChange = (presetKey) => {
    setSelectedPreset(presetKey);
    setFormKey(prev => prev + 1); // Force form re-render with new preset
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Marketing Campaign</h1>
        <div className="preset-selector">
          <label htmlFor="preset-dropdown" className="preset-label">Load Example:</label>
          <select 
            id="preset-dropdown"
            value={selectedPreset}
            onChange={(e) => handlePresetChange(e.target.value)}
            className="preset-dropdown"
          >
            <option value="">Select a preset...</option>
            {Object.entries(designPresets).map(([key, preset]) => (
              <option key={key} value={key}>
                {preset.name}
              </option>
            ))}
          </select>
        </div>
      </header>
      
      <div className="app-content">
        <aside className="sidebar">
          <div className="control-panel">
            <DesignForm 
              key={formKey}
              onSubmit={handleFormSubmit} 
              initialData={selectedPreset ? designPresets[selectedPreset].data : null}
            />
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
