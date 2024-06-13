/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from 'react'
import {
	getProfessionalData,
	updateProfessionalUserService
} from '../../services/api/professional'
import { logIn, register } from '../../services/api/userServices'
import {
	AuthContextType,
	AuthProviderProps,
	UserLogged,
	DecodedToken,
	ProfessionalData
} from '../typescript/interface'
import { FormValuesEdit } from '../../professional/pages/EditProfile'
import Swal from 'sweetalert2'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<UserLogged | null>(null)
	const [professionalData, setProfessionalData] =
		useState<ProfessionalData | null>(null)
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
			setIsSignIn(true)
		}
	}, [])

	useEffect(() => {
		if (decodedToken?.professionalId) {
			;(async () => {
				try {
					decodedToken.role = 'Professional'
					const response = await getProfessionalData(decodedToken)
					setProfessionalData(response)
					console.log('mis datos guardados:', professionalData)
				} catch (error) {
					console.error('Error fetching professional data:', error)
				}
			})()
		}
	}, [decodedToken, user])

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
		setProfessionalData(null)
		localStorage.removeItem('token')
		localStorage.removeItem('firstName')
		localStorage.removeItem('lastName')
	}

	const isUserSignedIn = (): boolean => {
		return !!localStorage.getItem('token')
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
			confirmPassword,
			isUserSignedIn
		}
		try {
			const response = await register(credentials)
			console.log('Register response:', response)
			setUser({
				token: response.token,
				firstName: response.firstName,
				lastName: response.lastName
			})
			loginUser(email, password)
			decodeAndSetToken(response.token)
			setIsSignIn(true)
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

	const updateProfessionalUser = async (data: FormValuesEdit) => {
		try {
			console.log('Token viejo: ', decodedToken)
			console.log('Actualizando datos...')
			const response = await updateProfessionalUserService(
				user?.token,
				decodedToken?.email,
				data
			)
			console.log('Respuesta del servicio en json:', response)
			Swal.fire({
				icon: 'success',
				title: 'Datos actualizados',
				text: 'Los datos de su perfil han sido actualizados con exito.'
			})

			// Actualiza el localStorage y el estado del usuario
			localStorage.setItem('firstName', data.nombre)
			localStorage.setItem('lastName', data.apellido)
			const storedToken = localStorage.getItem('token')
			if (storedToken) {
				console.log('Actualizando los datos en el local....', data.nombre)
				setUser({
					token: storedToken,
					firstName: data.nombre,
					lastName: data.apellido
				})
			}
		} catch (error) {
			setError('Error updating professional data')
			console.error('Error updating professional data:', error)
		}
	}

	const decodeAndSetToken = (token: string) => {
		try {
			const decoded: DecodedToken & { [key: string]: any } = JSON.parse(
				atob(token.split('.')[1])
			)
			console.log('Decoded token:', decoded)

			const role =
				decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
			setDecodedToken({ ...decoded, role })
		} catch (error) {
			console.error('Error decoding token:', error)
		}
	}



	const authContextValue: AuthContextType = {
		user,
		professionalData,
		isSignIn,
		isUserSignedIn,
		decodedToken,
		error,
		loginUser,
		registerUser,
		logout,
		updateProfessionalUser
	}

	return (
		<AuthContext.Provider value={authContextValue}>
			{children}
		</AuthContext.Provider>
	)
}
