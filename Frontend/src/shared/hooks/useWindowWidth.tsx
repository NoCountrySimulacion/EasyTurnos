import { useEffect, useState } from 'react'

export function useWindowWidth() {
	const [width, setWidth] = useState(window.innerWidth)

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth)

		window.addEventListener('resize', handleResize)

		// Cleanup function
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return width
}
