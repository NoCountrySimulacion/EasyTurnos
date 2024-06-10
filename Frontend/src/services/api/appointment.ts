/* eslint-disable @typescript-eslint/no-explicit-any */
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

export async function createAppointment(
	clientId: string,
	professionalId: string,
	appointmentData: any // Ajusta el tipo según los datos necesarios para crear una cita
): Promise<any> {
	try {
		const token = localStorage.getItem('token')
		const res = await fetch(
			`https://easyturnos.somee.com/api/Appointment/${clientId}/${professionalId}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(appointmentData)
			}
		)

		if (!res.ok)
			throw new Error(`Error creating appointment: ${res.statusText}`)

		const data = await res.json()
		return data
	} catch (error) {
		console.error('Error creating appointment:', error)
		throw error
	}
}

export async function deleteAppointment(appointmentId: string): Promise<void> {
	try {
		const token = localStorage.getItem('token')
		const res = await fetch(
			`https://easyturnos.somee.com/api/Appointment/${appointmentId}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			}
		)

		if (!res.ok) {
			throw new Error(`Error deleting appointment: ${res.statusText}`)
		}

		console.log(`Appointment with ID ${appointmentId} deleted successfully.`)
	} catch (error) {
		console.error('Error deleting appointment:', error)
		throw error
	}
}
