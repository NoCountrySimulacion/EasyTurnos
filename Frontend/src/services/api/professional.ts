import { DecodedToken } from '../../auth/typescript/interface'
import { ProfessionalsByClient } from '../typescript/interface'

const BASE_PROFESSIONAL_CLIENTS_URL =
	'https://easyturnos.somee.com/GetAllByClientId/'

export async function getProfessionalByClient(
	decodedToken: DecodedToken
): Promise<ProfessionalsByClient> {
	try {
		const token = localStorage.getItem('token')
		const res = await fetch(
			`${BASE_PROFESSIONAL_CLIENTS_URL}${decodedToken?.clientId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: ` ${token}`
				}
			}
		)
		if (!res.ok)
			throw new Error(`Error getting appointments: ${res.statusText}`)

		const data: ProfessionalsByClient = await res.json()
		return data
	} catch (error) {
		console.error('Error getting appointments:', error)
		throw error
	}
}
