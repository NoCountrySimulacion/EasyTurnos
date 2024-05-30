import { logIn, register } from '../../services/api/userServices'
import {
	AuthContextType,
	AuthProviderProps,
	UserLogged
} from '../typescript/interface'
import { createContext, useEffect, useState } from 'react'



export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<UserLogged | null>(null)


	useEffect(() => {
		const storedToken = localStorage.getItem('token')
		if (storedToken) {
			setUser({ id: '', email: '', token: storedToken })
		}
	}, [])

	const loginUser = async (email: string, password: string) => {
		const credentials = {
			email,
			password
		}
		console.log('Logging in with credentials:', credentials)
		const response = await logIn(credentials)
		console.log('Login response:', response)
		setUser({ id: response.id, email: response.email, token: response.token })
		console.log('User set after login:', {
			id: response.id,
			email: response.email,
			token: response.token
		})
		localStorage.setItem('token', response.token)
		
		
	}

	const logout = () => {
		setUser(null)
		localStorage.removeItem('token')
	}

	const registerUser = async (
		firstName: string,
		lastName: string,
		email: string,
		phoneNumber: string,
		password: string,
		confirmPassword: string
	) => {
		const credentials = {
			firstName,
			lastName,
			email,
			phoneNumber,
			password,
			confirmPassword
		}
		console.log('Registering user with credentials:', credentials)
		const response = await register(credentials)
		console.log('Register response:', response)
		setUser({ id: response.userId, email: '', token: response.token })
		localStorage.setItem('token', response.token)

		
	}

	const authContextValue: AuthContextType = {
		user,
		loginUser,
		registerUser,
		logout
	}

	return (
		<AuthContext.Provider value={authContextValue}>
			{children}
		</AuthContext.Provider>
	)
}
