import './App.css'
import React from 'react'
import ConfettiExplosion from 'react-confetti-explosion';
import tempLogo from '/temp_logo.png'

const IFRAME_CONTAINER_ID = 'sivi-container'

const useTemplateLogic = ({ imageUrl, handleVisualClick, shapes }) => {
	const selectedVisual = React.useRef(null)
	const [visualShapes, setVisualShapes] = React.useState(shapes)

	const handleShapeClick = (event, id) => {
		let width
		let height

		if (event.target.nodeName == 'P') {
			width = event.target.parentElement.offsetWidth
			height = event.target.parentElement.offsetHeight
		} else {
			width = event.target.offsetWidth
			height = event.target.offsetHeight
		}


		selectedVisual.current = id

		handleVisualClick && handleVisualClick({
			width,
			height
		})
	}

	React.useEffect(() => {
		if (imageUrl && selectedVisual.current) {
			setVisualShapes(prev => {
				return {
					...prev,
					[selectedVisual.current]: {
						imageUrl: imageUrl
					}
				}
			})
		}
	}, [imageUrl])

	return {
		visualShapes,
		handleShapeClick
	}
}

const Template1 = ({ handleVisualClick, imageUrl }) => {
	const { visualShapes, handleShapeClick } = useTemplateLogic({
		imageUrl,
		handleVisualClick,
		shapes: {
			shape1: {
				url: null
			},
			shape2: {
				url: null
			}
		}
	})

	return (
		<div className='w-[600px] h-[700px] bg-gray-100 flex flex-col items-center p-4 gap-4'>
			<span className='text-8xl font-bold text-indigo-500 '>
				Momentum Athletics
			</span>
			<div className='w-full h-full flex gap-4 flex-row items-center'>
				<div onClick={(e) => handleShapeClick(e, 'shape1')} className='cursor-pointer w-1/2 h-full bg-green-200 flex flex-col justify-center items-center'>
					{visualShapes.shape1.imageUrl ? <img src={visualShapes.shape1.imageUrl} alt="Extracted Image" className='w-full h-full object-contain' /> : (
						<div className='w-full h-full flex justify-center items-center cursor-pointer'>
							<p className='text-gray-500 text-center'>Click to add visuals</p>
						</div>
					)}
				</div>
				<div className='w-1/2 h-full flex flex-col items-center'>
					<div id="shape2" onClick={(e) => handleShapeClick(e, 'shape2')} className='cursor-pointer w-full h-1/2 bg-blue-200 flex flex-col justify-center items-center'>
						{visualShapes.shape2.imageUrl ? <img src={visualShapes.shape2.imageUrl} alt="Extracted Image" className='w-full h-full object-contain' /> : (
							<div className='w-full h-full flex justify-center items-center cursor-pointer'>
								<p className='text-gray-500 text-center'>Click to add visuals</p>
							</div>
						)}
					</div>
					<div className='w-full h-1/2 flex flex-col justify-center items-center'>
						<span className='text-4xl font-bold text-indigo-500 text-center'>
							Transform your fitness journey with expert tips and guided training.
						</span>
						<span className='text-2xl font-bold text-indigo-500'>
							Ignite your motivation and get stronger every day.
						</span>

					</div>

				</div>
			</div>
		</div>
	)
}

const Template2 = ({ handleVisualClick, imageUrl }) => {
	const { visualShapes, handleShapeClick } = useTemplateLogic({
		imageUrl,
		handleVisualClick,
		shapes: {
			shape1: {
				url: null
			},
			shape2: {
				url: null
			}
		}
	})

	return (
		<div className='w-[600px] h-[700px] bg-gray-100 flex flex-col items-center p-4 gap-4'>
			<span className='text-8xl font-bold text-indigo-500 '>
				Momentum Athletics
			</span>
			<div className='w-full h-full flex gap-4 flex-col items-center'>
				<div onClick={(e) => handleShapeClick(e, 'shape1')} className='cursor-pointer w-full h-1/2 bg-green-200 flex flex-col justify-center items-center'>
					{visualShapes.shape1.imageUrl ? <img src={visualShapes.shape1.imageUrl} alt="Extracted Image" className='w-full h-full object-contain' /> : (
						<div className='w-full h-full flex justify-center items-center cursor-pointer'>
							<p className='text-gray-500 text-center'>Click to add visuals</p>
						</div>
					)}
				</div>
				<div className='w-full h-1/2 flex flex-row items-center'>
					<div id="shape2" onClick={(e) => handleShapeClick(e, 'shape2')} className='cursor-pointer w-1/2 h-full bg-blue-200 flex flex-col justify-center items-center'>
						{visualShapes.shape2.imageUrl ? <img src={visualShapes.shape2.imageUrl} alt="Extracted Image" className='w-full h-full object-contain' /> : (
							<div className='w-full h-full flex justify-center items-center cursor-pointer'>
								<p className='text-gray-500 text-center'>Click to add visuals</p>
							</div>
						)}
					</div>
					<div className='w-1/2 h-full flex flex-col justify-center items-center p-4 gap-4'>
						<span className='text-xl font-bold text-black text-center'>
							Transform your fitness journey with expert tips and guided training.
						</span>
					</div>

				</div>
			</div>
		</div>
	)
}

const Template3 = ({ handleVisualClick, imageUrl }) => {
	const { visualShapes, handleShapeClick } = useTemplateLogic({
		imageUrl,
		handleVisualClick,
		shapes: {
			shape1: {
				url: null
			},
			shape2: {
				url: null
			}
		}
	})

	return (
		<div className='w-[600px] h-[700px] bg-gray-100 flex flex-row items-center p-4 gap-4'>
			<div onClick={(e) => handleShapeClick(e, 'shape1')} className='w-2/6 h-full bg-green-200 flex flex-col justify-center items-center'>
				{visualShapes.shape1.imageUrl ? <img src={visualShapes.shape1.imageUrl} alt="Extracted Image" className='w-full h-full object-contain' /> : (
					<div className='w-full h-full flex justify-center items-center cursor-pointer'>
						<p className='text-gray-500 text-center'>Click to add visuals</p>
					</div>
				)}
			</div>
			<div className='w-full h-full'>
				<div className='w-full h-4/6 flex flex-col justify-center items-center'>
					<span className='text-8xl font-bold text-indigo-500 '>
						Heading2
					</span>
					<span className='text-4xl font-bold text-indigo-500 text-center'>
						This is a paragraph
					</span>
					<span className='text-2xl font-bold text-indigo-500'>
						This is a paragraph
					</span>
					<span className='text-lg font-bold text-indigo-500'>
						This is a paragraph
					</span>
					<span className='text-base font-bold text-indigo-500'>
						This is a paragraph
					</span>
				</div>
				<div onClick={(e) => handleShapeClick(e, 'shape2')} className='w-full h-2/6 bg-blue-200 flex flex-col justify-center items-center'>
					{visualShapes.shape2.imageUrl ? <img src={visualShapes.shape2.imageUrl} alt="Extracted Image" className='w-full h-full object-contain' /> : (
						<div className='w-full h-full flex justify-center items-center cursor-pointer'>
							<p className='text-gray-500 text-center'>Click to add visuals</p>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

const Template4 = ({ handleVisualClick, imageUrl }) => {
	const { visualShapes, handleShapeClick } = useTemplateLogic({
		imageUrl,
		handleVisualClick,
		shapes: {
			shape1: {
				url: null
			},
			shape2: {
				url: null
			}
		}
	})

	return (
		<div className='w-[658px] h-[658px] bg-gray-100 p-4 gap-[20px] flex flex-col'>
			<img src={tempLogo} className='w-[197px]' />
			<div className='w-full flex flex-col h-[88px] bg-pink-100 justify-center items-center'>
				<p className='text-4xl font-bold text-indigo-500 text-center'>
					The Taste of Italy
				</p>
			</div>
			<div onClick={(e) => handleShapeClick(e, 'shape2')} className='w-full h-[215px] bg-blue-200 flex flex-col justify-center items-center'>
				{visualShapes.shape1.imageUrl ? <img src={visualShapes.shape1.imageUrl} alt="Extracted Image" className='w-full h-full object-contain' /> : (
					<div className='w-full h-full flex justify-center items-center cursor-pointer'>
						<p className='text-gray-500 text-center'>Click to add visuals</p>
					</div>
				)}
			</div>
			<div className='w-full flex gap-[20px]'>
				<div onClick={(e) => handleShapeClick(e, 'shape2')} className='w-1/2 h-[170px] bg-blue-200 flex flex-col justify-center items-center'>
					{visualShapes.shape2.imageUrl ? <img src={visualShapes.shape2.imageUrl} alt="Extracted Image" className='w-full h-full object-contain' /> : (
						<div className='w-full h-full flex justify-center items-center cursor-pointer'>
							<p className='text-gray-500 text-center'>Click to add visuals</p>
						</div>
					)}
				</div>
				<div className='w-1/2 h-[170px] flex flex-col justify-center items-center'>
					<p className='text-base font-bold text-indigo-500'>
						A family-owned Italian restaurant and market in Byron Center, Michigan, offering authentic cuisine, fine wines, and curated Mediterranean products since 1922.
					</p>
				</div>
			</div>
		</div>
	)
}

const options = {
	type: "custom",
	subtype: "custom",
	dimension: {
		width: 1080,
		height: 1080
	},
	prompt: "Create a modern social media post about sustainable fashion", // Pre-fill prompt
	language: "english",
	colors: ["#5662EC", "#EF9AB2"],
	numOfVariants: 3,
	outputFormats: "png",
	config: {
		enableLoginUI: true, // For General SDK will be always true
		enableDesignEditor: true,
	}
}

function App() {
	let paramsRef = React.useRef(null)
	const [isExploding, setIsExploding] = React.useState(false);
	const [isVisualOpen, setIsVisualOpen] = React.useState(false)
	const [imageUrl, setImageUrl] = React.useState(null)
	const [currentTemplate, setCurrentTemplate] = React.useState(4)

	const handleVisualClick = ({ width, height }) => {
		if (!isVisualOpen) {
			setIsVisualOpen(true)

			paramsRef.current = {
				width,
				height
			}
		} else {
			window.SIVI?.show(options, IFRAME_CONTAINER_ID)
		}
	}

	React.useEffect(() => {
		if (isVisualOpen) {
			if (paramsRef.current) {
				const params = {
					medium: 'custom',
					mediumType: 'custom',
					width: paramsRef.current.width,
					height: paramsRef.current.height,
					objective: 'promote-product',
				}

				window.SIVI?.show(params, IFRAME_CONTAINER_ID)
				paramsRef.current = null
			} else {
				window.SIVI?.show(false, IFRAME_CONTAINER_ID)
			}
		}
	}, [isVisualOpen])

	const handleRemoveVisual = () => {
		window.SIVI?.hide()
		setIsVisualOpen(false)
	}

	React.useEffect(() => {
		window.SIVI?.events(async (event, responseCallback) => {
			switch (event.type) {
				case 'EXTRACT': {
					const URL = event.data.src + '?timestamp=' + Date.now()
					setIsExploding(true)
					setTimeout(() => {
						setIsExploding(false)
					}, 2000)
					setImageUrl(URL)
					responseCallback("done")
					break
				}
			}
		})
		return () => {
			window.SIVI?.removeEventsCallback()
		}
	}, [])

	const TemplateCmp = ({ 1: Template1, 2: Template2, 3: Template3, 4: Template4 })[currentTemplate]

	return (
		<div className='h-full w-full'>
			<div className='w-full h-16 border-b-2 border-indigo-500 flex flex-row justify-between items-center px-4'>
				<span className='text-2xl font-bold text-indigo-500'>
					Mail Editor
				</span>
				<div>

				</div>
			</div>
			<div className='flex flex-row h-[calc(100%-4rem)] w-full'>
				<div className='w-[400px] h-full border-r-2 border-indigo-500'>
					{isVisualOpen ? (
						<>
							<div id={IFRAME_CONTAINER_ID} className='w-full h-5/6 overflow-hidden'>
								{/* Iframe placeholder */}
							</div>
							<button className='mt-4 w-full h-12 bg-white-500 text-black p-2 rounded-md transition-all duration-300' onClick={handleRemoveVisual}>
								Back to Home
							</button>
						</>
					) : <div className='flex h-full w-full justify-center items-center'>
						<button onClick={() => setIsVisualOpen(true)} className='h-12 w-1/2 bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition-all duration-300'>
							AI Design Studio
						</button>
					</div>}
				</div>
				<div className='h-full flex-1 justify-center items-center'>
					<div className='w-full h-[calc(100%-5rem)] flex justify-center items-center flex-col'>
						{isExploding && <ConfettiExplosion />}
						<TemplateCmp handleVisualClick={handleVisualClick} imageUrl={imageUrl} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default App

