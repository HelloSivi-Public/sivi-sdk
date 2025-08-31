import React from 'react'

const IFRAME_CONTAINER_ID = 'sivi-container'

const useSiviSDK = () => {
  const paramsRef = React.useRef(null)
  const [isAIStudioOpen, setIsAIStudioOpen] = React.useState(false)

  const handleSelectedDesignImage = React.useCallback((imageUrl) => {
    console.log('Selected image URL:', imageUrl)
  }, [])

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
      if (event.type === 'EXTRACT') {
        const URL = event.data.src + '?timestamp=' + Date.now()
        handleSelectedDesignImage(URL),
        responseCallback("done")
      }
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
    IFRAME_CONTAINER_ID
  }
}

export default useSiviSDK
