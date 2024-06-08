import { DecodedToken } from '../../auth/typescript/interface'
import { AppointmentList } from '../typescript/interface'

const BASE_APPOINTMENT_URL = 'https://easyturnos.somee.com/api/Appointment/'

export async function getProfessionalAppointments(
	decodedToken: DecodedToken
): Promise<AppointmentList> {
	try {
		const res = await fetch(
			`${BASE_APPOINTMENT_URL}${decodedToken?.professionalId}`,
			{
				method: 'GET'
			}
		)
		if (!res.ok) throw new Error(`Error al obtener turnos: ${res.statusText}`)

		const data: AppointmentList = await res.json()
		console.log(data)
		return data
	} catch (error) {
		console.error('Error getting appointments:', error)
		throw error
	}
}
