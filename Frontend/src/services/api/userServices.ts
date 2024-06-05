import {
	LoginResponse,
	LoginCredentials,
	RegisterCredentials
} from '../typescript/interface'

const BASE_URL = 'https://easyturnos.somee.com/api/Account'

export async function logIn(
	credentials: LoginCredentials
): Promise<LoginResponse> {
	try {
		const response = await fetch(`${BASE_URL}/authenticate`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(credentials)
		})
		if (!response.ok) {
			if (response.status === 401) {
				throw new Error('Usuario y/o contraseña incorrectos')
			} else {
				throw new Error(`Error al iniciar sesión: ${response.statusText}`)
			}
		}

		const data = await response.json()

		return data
	} catch (error) {
		console.error('Error logging in:', error)
		throw error
	}
}

export async function register(credentials: RegisterCredentials) {
	try {
		console.log('Sending register request with credentials:', credentials)
		const response = await fetch(
			'https://easyturnos.somee.com/api/Professional/RegisterProfessionalUser',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(credentials)
			}
		)
		if (!response.ok) {
			throw new Error('Failed to register: ' + (await response.text()))
		}
		const data = await response.json()
		return data
	} catch (error) {
		console.error('Error registering:', error)
		throw error
	}
}
