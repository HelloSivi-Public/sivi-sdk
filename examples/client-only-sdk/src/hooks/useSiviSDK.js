import React from 'react'

const IFRAME_CONTAINER_ID = 'sivi-container'

const useSiviSDK = () => {
  const paramsRef = React.useRef(null)
  const [isVisualOpen, setIsVisualOpen] = React.useState(false)
  const [imageUrl, setImageUrl] = React.useState(null)

  const handleVisualClick = React.useCallback(({ width, height }) => {
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
  }, [isVisualOpen])

  const handleRemoveVisual = React.useCallback(() => {
    window.SIVI?.hide()
    setIsVisualOpen(false)
  }, [])

  const openVisualStudio = React.useCallback(() => {
    setIsVisualOpen(true)
    paramsRef.current = { width: 1080, height: 1080 }
  }, [])

  // Handle SIVI SDK initialization and events
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

  // Handle SIVI SDK events
  React.useEffect(() => {
    const handleSiviEvents = async (event, responseCallback) => {
      if (event.type === 'EXTRACT') {
        const URL = event.data.src + '?timestamp=' + Date.now()
        setImageUrl(URL)
        responseCallback("done")
      }
    }

    window.SIVI?.events(handleSiviEvents)
    
    return () => {
      window.SIVI?.removeEventsCallback()
    }
  }, [])

  return {
    isVisualOpen,
    imageUrl,
    handleVisualClick,
    handleRemoveVisual,
    openVisualStudio,
    IFRAME_CONTAINER_ID
  }
}

export default useSiviSDK
