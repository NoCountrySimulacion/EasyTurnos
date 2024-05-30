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

		console.log('Login response:', response)

		if (!response.ok) {
			throw new Error(`Failed to log in: ${response.statusText}`)
		}

		const data = await response.json()
		console.log('Login data:', data)

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
			'https://easyturnos.somee.com/api/Account/register',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(credentials)
			}
		)
		console.log('Register response:', response)
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
