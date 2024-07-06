import { useEffect, useState } from 'react'

export function useMediaQuery(query: string) {
	const [matches, setMatches] = useState(window.matchMedia(query).matches)

	useEffect(() => {
		const mediaQueryList = window.matchMedia(query)
		const documentChangeHandler = () => setMatches(mediaQueryList.matches)

		mediaQueryList.addEventListener('change', documentChangeHandler)

		return () => {
			mediaQueryList.removeEventListener('change', documentChangeHandler)
		}
	}, [query])

	return matches
}
