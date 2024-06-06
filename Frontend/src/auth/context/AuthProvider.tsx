/* eslint-disable @typescript-eslint/no-explicit-any */
import { logIn, register } from '../../services/api/userServices'
import {
	AuthContextType,
	AuthProviderProps,
	UserLogged,
	DecodedToken
} from '../typescript/interface'
import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<UserLogged | null>(null)
	const [isSignIn, setIsSignIn] = useState<boolean>(false)

	const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const storedToken = localStorage.getItem('token')
		if (storedToken) {
			const storedFirstName = localStorage.getItem('firstName')
			const storedLastName = localStorage.getItem('lastName')
			setUser({
				token: storedToken,
				firstName: storedFirstName ?? '',
				lastName: storedLastName ?? ''
			})
			decodeAndSetToken(storedToken)
		}
	}, [])

	const loginUser = async (email: string, password: string) => {
		const credentials = { email, password }
		try {
			const response = await logIn(credentials)
			setUser({
				token: response.token,
				firstName: response.firstName,
				lastName: response.lastName
			})
			localStorage.setItem('token', response.token)
			localStorage.setItem('firstName', response.firstName)
			localStorage.setItem('lastName', response.lastName)
			setIsSignIn(true)
			decodeAndSetToken(response.token)
			setError(null)
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message)
				setIsSignIn(false)
				throw err
			} else {
				setError('Error desconocido durante el inicio de sesión')
				setIsSignIn(false)
				throw new Error('Error desconocido durante el inicio de sesión')
				
			}
		}
	}

	const logout = () => {
		setUser(null)
		setIsSignIn(false)
		setDecodedToken(null)
		localStorage.removeItem('token')
		localStorage.removeItem('firstName')
		localStorage.removeItem('lastName')
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
		try {
			const response = await register(credentials)
			console.log('Register response:', response)
			setUser({
				token: response.token,
				firstName: response.firstName,
				lastName: response.lastName
			})
			localStorage.setItem('token', response.token)
			localStorage.setItem('firstName', response.firstName)
			localStorage.setItem('lastName', response.lastName)
			decodeAndSetToken(response.token)
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message)
				throw err
			} else {
				setError('Error desconocido durante el registro')
				throw new Error('Error desconocido durante el registro')
			}
		}
	}

	const decodeAndSetToken = (token: string) => {
		try {
		  const decoded: DecodedToken & { [key: string]: any } = JSON.parse(atob(token.split('.')[1]))
		  console.log('Decoded token:', decoded)
		  
		  const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
		  setDecodedToken({ ...decoded, role })
		} catch (error) {
		  console.error('Error decoding token:', error)
		}
	  }
	  

	const authContextValue: AuthContextType = {
		user,
		isSignIn,
		decodedToken,
		error,
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
