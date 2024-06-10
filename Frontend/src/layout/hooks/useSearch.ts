import { useContext } from 'react'
import { searchContext } from '../context/searchProvider'

export const useSearch = () => {
	const context = useContext(searchContext)

	if (!context) {
		throw new Error('useSearch must be used within a SearchProvider')
	}
	return context
}
