import { DecodedToken } from '../../auth/typescript/interface'
import { AppointmentList } from '../typescript/interface'

const BASE_APPOINTMENT_URL = 'https://easyturnos.somee.com/api/Appointment/'

export async function getProfessionalAppointments(
	decodedToken: DecodedToken
): Promise<AppointmentList> {
	try {
		const token = localStorage.getItem('token')
		const res = await fetch(
			`${BASE_APPOINTMENT_URL}${decodedToken?.professionalId}`,
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

		const data: AppointmentList = await res.json()
		return data
	} catch (error) {
		console.error('Error getting appointments:', error)
		throw error
	}
}
