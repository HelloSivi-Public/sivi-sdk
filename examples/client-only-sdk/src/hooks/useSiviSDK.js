import React from 'react'

const IFRAME_CONTAINER_ID = 'sivi-container'

const useSiviSDK = () => {
  const paramsRef = React.useRef(null)
  const [isAIStudioOpen, setIsAIStudioOpen] = React.useState(false)
  const eventHandlersRef = React.useRef(new Set())

  const handleVisualClick = React.useCallback(({ width, height }) => {
    if (!isAIStudioOpen) {
      setIsAIStudioOpen(true)
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
  }, [isAIStudioOpen])

  const hideAIDesignStudio = React.useCallback(() => {
    window.SIVI?.hide()
    setIsAIStudioOpen(false)
  }, [])

  const showAIDesignStudio = React.useCallback(() => {
    setIsAIStudioOpen(true)
    paramsRef.current = { width: 1080, height: 1080 }
  }, [])

  const registerEventHandler = React.useCallback((handler) => {
    eventHandlersRef.current.add(handler)
    return () => {
      eventHandlersRef.current.delete(handler)
    }
  }, [])

  const unregisterEventHandler = React.useCallback((handler) => {
    eventHandlersRef.current.delete(handler)
  }, [])

  // Handle SIVI SDK initialization and events
  React.useEffect(() => {
    if (isAIStudioOpen && paramsRef.current) {
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
  }, [isAIStudioOpen])

  // Handle SIVI SDK events
  React.useEffect(() => {
    const handleSiviEvents = async (event, responseCallback) => {
      // Call all registered event handlers
      const handlers = Array.from(eventHandlersRef.current)
      
      // Execute all handlers in parallel
      const handlerPromises = handlers.map(async (handler) => {
        try {
          await handler(event, responseCallback)
        } catch (error) {
          console.error('Error in event handler:', error)
        }
      })
      
      await Promise.all(handlerPromises)
    }

    window.SIVI?.events(handleSiviEvents)
    
    return () => {
      window.SIVI?.removeEventsCallback()
    }
  }, [])

  return {
    isAIStudioOpen,
    handleVisualClick,
    showAIDesignStudio,
    hideAIDesignStudio,
    registerEventHandler,
    unregisterEventHandler,
    IFRAME_CONTAINER_ID
  }
}

export default useSiviSDK
