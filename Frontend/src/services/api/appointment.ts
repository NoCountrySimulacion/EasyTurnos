import { DecodedToken } from '../../auth/typescript/interface'
import { AppointmentList } from '../../professional/pages/Home'

const BASE_APPOINTMENT_URL = 'https://easyturnos.somee.com/api/Professional/'
const PATH_GET_BY_ID = 'GetById/'

export async function getProfessionalAppointments(decodedToken: DecodedToken): Promise<AppointmentList> {
	try {
		const response = await fetch(
			`${BASE_APPOINTMENT_URL}${PATH_GET_BY_ID}${decodedToken?.professionalId}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${decodedToken}`
				}
			}
		)
		if (!response.ok) {
			throw new Error(`Error al obtener turnos: ${response.statusText}`)
		}

		const data: AppointmentList = await response.json()
		console.log(data)
		return data
	} catch (error) {
		console.error('Error getting appointments:', error)
		throw error
	}
}
