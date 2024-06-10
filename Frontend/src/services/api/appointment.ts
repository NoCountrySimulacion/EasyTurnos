import { DecodedToken } from '../../auth/typescript/interface'
import {
	ClientAppointmentList,
	ProfessionalAppointmentList
} from '../typescript/interface'

const BASE_APPOINTMENT_URL =
	'https://easyturnos.somee.com/api/Appointment/user/'

export async function getProfessionalAppointments(
	decodedToken: DecodedToken
): Promise<ClientAppointmentList | ProfessionalAppointmentList> {
	try {
		const token = localStorage.getItem('token')
		const isProfessional = decodedToken?.professionalId
		console.log('El id del cliente es: ', decodedToken?.clientId)

		const res = await fetch(
			`${BASE_APPOINTMENT_URL}${isProfessional ? decodedToken?.professionalId : decodedToken?.clientId}`,
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

		const data: ClientAppointmentList | ProfessionalAppointmentList =
			await res.json()
		return data
	} catch (error) {
		console.error('Error getting appointments:', error)
		throw error
	}
}
