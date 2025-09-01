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
  const [isPolling, setIsPolling] = useState(false);

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setApiLogs(prev => [...prev, { timestamp, message }]);
  };

  const pollDesignStatus = async (requestId, pollCount = 0) => {
    try {
      addLog(`Polling design status (attempt ${pollCount + 1})...`);
      
      const response = await fetch(`http://localhost:4000/get-request-status?requestId=${requestId}`);
      const data = await response.json();
      
      addLog(`Status check response: ${data.body?.status || 'unknown'}`);
      
      // Append all polling responses to track progress
      setApiResponse(prev => {
        if (prev) {
          return {
            ...prev,
            latestResponse: data,
            allResponses: [...(prev.allResponses || [prev]), data]
          };
        }
        return data;
      });
      
      if (data.status === 200 && data.body?.status === 'completed') {
        addLog('Design generation completed!');
        setIsPolling(false);
        setIsLoading(false);
        
        if (data.body.result?.variations) {
          const variants = data.body.result.variations.map(variant => ({
            url: variant.variantImageUrl,
            id: variant.variantId,
            editLink: variant.variantEditLink
          }));
          setDesignVariants(variants);
          addLog(`Found ${variants.length} design variants`);
        }
        
        return;
      }
      
      // Stop polling if there's an error status
      if (data.status !== 200) {
        addLog(`API error: Status ${data.status}. Stopping polling.`);
        setIsPolling(false);
        setIsLoading(false);
        return;
      }
      
      // Stop polling if status indicates failure
      if (data.body?.status === 'failed' || data.body?.status === 'error') {
        addLog(`Design generation failed: ${data.body?.status}. Stopping polling.`);
        setIsPolling(false);
        setIsLoading(false);
        return;
      }
      
      // Continue polling with different intervals
      let nextDelay;
      if (pollCount === 1) {
        nextDelay = 45000; // 20 seconds for second poll
      } else if (pollCount === 2) {
        nextDelay = 20000; // 20 seconds for third poll
      } else {
        nextDelay = 10000; // 10 seconds for subsequent polls
      }
      
      addLog(`Next status check in ${nextDelay/1000} seconds...`);
      
      setTimeout(() => {
        pollDesignStatus(requestId, pollCount + 1);
      }, nextDelay);
      
    } catch (error) {
      addLog(`Polling error: ${error.message}. Stopping polling.`);
      setIsPolling(false);
      setIsLoading(false);
    }
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
      
      setApiResponse(prev => {
        if (prev) {
          return {
            ...prev,
            latestResponse: data,
            allResponses: [...(prev.allResponses || [prev]), data]
          };
        }
        return data;
      });
      
      if (data.status === 200 && data.body?.requestId) {
        addLog(`Design request queued. Request ID: ${data.body.requestId}`);
        addLog(`Queue wait time: ${data.body.queueWaitTime || 0} seconds`);
        
        setIsPolling(true);
        
        // Start polling after initial delay
        addLog('Starting status polling in 5 seconds...');
        setTimeout(() => {
          pollDesignStatus(data.body.requestId, 0);
        }, 5000);
        
      } else {
        addLog('Design generation failed or returned error');
        setIsLoading(false);
      }
    } catch (error) {
      const endTime = Date.now();
      const timeTaken = endTime - startTime;
      addLog(`API call failed after ${timeTaken}ms: ${error.message}`);
      setApiResponse({ error: error.message });
    } finally {
      if (!isPolling) {
        setIsLoading(false);
      }
    }
  };

  const handlePresetChange = (presetKey) => {
    setSelectedPreset(presetKey);
    setFormKey(prev => prev + 1); // Force form re-render with new preset
  };

  const handleClearLogs = () => {
    setApiLogs([]);
    setApiResponse(null);
    setDesignVariants([]);
    setIsPolling(false);
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
            {isLoading || isPolling ? (
              <div className="loading-state">
                {isPolling ? (
                  <p>Design is being generated, please wait... (Checking for status)</p>
                ) : (
                  <p>Generating design...</p>
                )}
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
