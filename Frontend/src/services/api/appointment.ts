import { DecodedToken } from '../../auth/typescript/interface'
import { Professional } from '../typescript/interface'

const BASE_APPOINTMENT_URL = 'https://easyturnos.somee.com/api/Appointmet/'
const BASE_PROFESSIONAL_URL = 'https://easyturnos.somee.com/api/Professional/'

export async function getProfessionalAppointments(
	decodedToken: DecodedToken
): Promise<Professional> {
	try {
		const res = await fetch(
			`${BASE_APPOINTMENT_URL}${decodedToken?.professionalId}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${decodedToken}`
				}
			}
		)
		if (!res.ok) throw new Error(`Error al obtener turnos: ${res.statusText}`)

		const data: Professional = await res.json()
		console.log(data)
		return data
	} catch (error) {
		console.error('Error getting appointments:', error)
		throw error
	}
}

export async function getProfessional(decodedToken: DecodedToken) {
	try {
		const res = await fetch(`${BASE_PROFESSIONAL_URL}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${decodedToken}`
			}
		})
		if (!res.ok)
			throw new Error(`Error al obtener profesional: ${res.statusText}`)
		const data = res.json()
		return data
	} catch (error) {
		console.error('Error getting professional:', error)
		throw error
	}
}
