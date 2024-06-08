import { ProfessionalClients } from '../typescript/interface'
import { DecodedToken } from '../../auth/typescript/interface'

const BASE_PROFESSIONAL_CLIENTS_URL =
	'https://easyturnos.somee.com/api/professionals/'

export async function getProfessionalClients(
	decodedToken: DecodedToken
): Promise<ProfessionalClients | null> {
	try {
		if (!decodedToken?.professionalId) {
			throw new Error('Invalid professional ID')
		}

		const url = `${BASE_PROFESSIONAL_CLIENTS_URL}${decodedToken.professionalId}/clients`

		const res = await fetch(url, {
			method: 'GET'
		})

		if (res.status === 204) {
			console.warn('No content returned from the server')
			return null
		}

		if (!res.ok) {
			throw new Error(`Error getting professional clients: ${res.statusText}`)
		}

		const text = await res.text()
		console.log('Response body:', text)

		if (!text) {
			throw new Error('Empty response body')
		}

		let data: ProfessionalClients
		try {
			data = JSON.parse(text)
		} catch (jsonError) {
			console.error('JSON parse error:', jsonError)
			throw new Error('Invalid JSON response')
		}

		return data
	} catch (error) {
		console.error('Error getting professional clients:', error)
		throw error
	}
}

export async function updateProfessionalClients(
	decodedToken: DecodedToken,
	idClient: string,
	newProfessionalClients: ProfessionalClients
): Promise<ProfessionalClients> {
	try {
		const response = await fetch(
			`${BASE_PROFESSIONAL_CLIENTS_URL}${decodedToken?.professionalId}/clients/${idClient}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newProfessionalClients)
			}
		)
		if (!response.ok) {
			throw new Error('Error updating professional clients')
		}
		const data: ProfessionalClients = await response.json()
		console.log(data)
		return data
	} catch (error) {
		throw new Error('Error updating professional clients')
	}
}
