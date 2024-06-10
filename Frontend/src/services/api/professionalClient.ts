import { DecodedToken } from '../../auth/typescript/interface'
import { ClientsByProfessional } from '../typescript/interface'

const BASE_PROFESSIONAL_CLIENTS_URL =
	'https://easyturnos.somee.com/api/professionals/'

export async function getClientsByProfessional(
	decodedToken: DecodedToken
): Promise<ClientsByProfessional | null> {
	try {
		const token = localStorage.getItem('token')
		if (!decodedToken?.professionalId) {
			throw new Error('Invalid professional ID')
		}

		const url = `${BASE_PROFESSIONAL_CLIENTS_URL}${decodedToken.professionalId}/clients`

		const res = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: ` ${token}`
			}
		})

		if (res.status === 204) {
			console.warn('No content returned from the server')
			return null
		}

		if (!res.ok) {
			throw new Error(`Error getting professional clients: ${res.statusText}`)
		}

		const text = await res.text()

		if (!text) {
			throw new Error('Empty response body')
		}

		let data: ClientsByProfessional
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

export async function updateClientsByProfessional(
	decodedToken: DecodedToken,
	idClient: string,
	newClientsByProfessional: ClientsByProfessional
): Promise<ClientsByProfessional> {
	try {
		const response = await fetch(
			`${BASE_PROFESSIONAL_CLIENTS_URL}${decodedToken?.professionalId}/clients/${idClient}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newClientsByProfessional)
			}
		)
		if (!response.ok) {
			throw new Error('Error updating professional clients')
		}
		const data: ClientsByProfessional = await response.json()
		console.log(data)
		return data
	} catch (error) {
		throw new Error('Error updating professional clients')
	}
}


export async function createClientForProfessional(
	decodedToken: DecodedToken,
	newClientData: any
): Promise<ClientsByProfessional> {
	try {
		const token = localStorage.getItem('token')
		if (!decodedToken?.professionalId) {
			throw new Error('Invalid professional ID')
		}

		const url = `${BASE_PROFESSIONAL_CLIENTS_URL}${decodedToken.professionalId}/clients/RegisterClient`

		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(newClientData)
		})

		if (!res.ok) {
			throw new Error(`Error creating new client: ${res.statusText}`)
		}

		const data: ClientsByProfessional = await res.json()
		return data
	} catch (error) {
		console.error('Error creating new client:', error)
		throw error
	}
}