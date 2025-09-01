import './App.css'
import React, { useState } from 'react'
import DesignForm from './components/DesignForm'
import ApiMonitor from './components/ApiMonitor'
import { designPresets } from './presets/designPresets'

function App() {
  const [selectedPreset, setSelectedPreset] = useState('');
  const [formKey, setFormKey] = useState(0);
  const [apiResponse, setApiResponse] = useState(null);
  const [apiLogs, setApiLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [designVariants, setDesignVariants] = useState([]);

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setApiLogs(prev => [...prev, { timestamp, message }]);
  };

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setApiResponse(null);
    setDesignVariants([]);
    
    const startTime = Date.now();
    addLog('Starting API call to /designs-from-prompt');
    
    try {
      const response = await fetch('http://localhost:4000/designs-from-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const endTime = Date.now();
      const timeTaken = endTime - startTime;
      
      const data = await response.json();
      
      addLog(`API call completed in ${timeTaken}ms`);
      addLog(`Response status: ${response.status}`);
      
      setApiResponse(data);
      
      if (data.status === 200 && data.body?.designId) {
        addLog(`Design generated successfully. Design ID: ${data.body.designId}`);
        // You can add logic here to fetch variants if needed
      } else {
        addLog('Design generation failed or returned error');
      }
    } catch (error) {
      const endTime = Date.now();
      const timeTaken = endTime - startTime;
      addLog(`API call failed after ${timeTaken}ms: ${error.message}`);
      setApiResponse({ error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePresetChange = (presetKey) => {
    setSelectedPreset(presetKey);
    setFormKey(prev => prev + 1); // Force form re-render with new preset
  };

  const handleClearLogs = () => {
    setApiLogs([]);
    setApiResponse(null);
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
          <div className="variants-section">
            <h2>Design Variants</h2>
            {isLoading ? (
              <div className="loading-state">
                <p>Generating design...</p>
              </div>
            ) : designVariants.length > 0 ? (
              <div className="variants-grid">
                {designVariants.map((variant, index) => (
                  <div key={index} className="variant-item">
                    <img src={variant.url} alt={`Variant ${index + 1}`} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>Design variants will appear here after generation</p>
              </div>
            )}
          </div>
          
          <ApiMonitor 
            apiLogs={apiLogs}
            apiResponse={apiResponse}
            onClearLogs={handleClearLogs}
          />
        </main>
      </div>
    </div>
  )
}

export default App
