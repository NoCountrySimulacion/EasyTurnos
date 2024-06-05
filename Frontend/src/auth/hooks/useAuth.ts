import { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'

export const useAuth = () => {
	const context = useContext(AuthContext)

	if (!context) {
		throw new Error('AuthContext must be used within an AuthProvider')
	}

	return context
}
