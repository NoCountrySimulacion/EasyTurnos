import { ProfessionalClients } from '../typescript/interface'
import { DecodedToken } from '../../auth/typescript/interface'

const BASE_PROFESSIONAL_CLIENTS_URL =
	'https://easyturnos.somee.com/api/professionals/'

export async function getProfessionalClients(
	decodedToken: DecodedToken
): Promise<ProfessionalClients> {
	try {
		const token = localStorage.getItem('token')
		const response = await fetch(
			`${BASE_PROFESSIONAL_CLIENTS_URL}${decodedToken?.professionalId}/clients`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			}
		)
		if (!response.ok) {
			throw new Error('Error getting professional clients')
		}
		const data: ProfessionalClients = await response.json()
		console.log(data)
		return data
	} catch (error) {
		throw new Error('Error getting professional clients')
	}
}

export async function updateProfessionalClients(
	decodedToken: DecodedToken,
	idClient: string,
	professionalClients: ProfessionalClients
): Promise<ProfessionalClients> {
	try {
		const response = await fetch(
			`${BASE_PROFESSIONAL_CLIENTS_URL}${decodedToken?.professionalId}/clients/${idClient}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(professionalClients)
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
