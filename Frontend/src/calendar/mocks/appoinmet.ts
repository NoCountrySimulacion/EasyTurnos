// appointment.ts

interface Appointment {
	id: string
	name: string
	startDate: string
	endDate: string
	professionalId: string
	clientId: string
}

interface AppointmentResponse {
	data: Appointment[]
	success: boolean
	message: string
}

const mockAppointments: AppointmentResponse = {
	data: [
		{
			id: '1',
			name: 'Consulta General',
			startDate: '2024-06-08T09:00:00.000Z',
			endDate: '2024-06-08T10:00:00.000Z',
			professionalId: 'prof-123',
			clientId: 'client-456'
		},
		{
			id: '2',
			name: 'Revisión Anual',
			startDate: '2024-06-08T11:00:00.000Z',
			endDate: '2024-06-08T11:30:00.000Z',
			professionalId: 'prof-123',
			clientId: 'client-789'
		},
		{
			id: '3',
			name: 'Terapia Física',
			startDate: '2024-06-08T14:00:00.000Z',
			endDate: '2024-06-08T15:00:00.000Z',
			professionalId: 'prof-123',
			clientId: 'client-012'
		},
		{
			id: '4',
			name: 'Consulta Dermatológica',
			startDate: '2024-06-09T09:00:00.000Z',
			endDate: '2024-06-09T09:30:00.000Z',
			professionalId: 'prof-123',
			clientId: 'client-345'
		},
		{
			id: '5',
			name: 'Chequeo Cardiológico',
			startDate: '2024-06-05T10:00:00.000Z',
			endDate: '2024-06-09T11:00:00.000Z',
			professionalId: 'prof-123',
			clientId: 'client-678'
		},
		{
			id: '6',
			name: 'Consulta Nutricional',
			startDate: '2024-06-05T12:00:00.000Z',
			endDate: '2024-06-09T12:45:00.000Z',
			professionalId: 'prof-123',
			clientId: 'client-901'
		},
		{
			id: '7',
			name: 'Seguimiento de Tratamiento',
			startDate: '2024-06-10T08:00:00.000Z',
			endDate: '2024-06-10T08:30:00.000Z',
			professionalId: 'prof-123',
			clientId: 'client-234'
		},
		{
			id: '8',
			name: 'Consulta Psicológica',
			startDate: '2024-06-10T09:00:00.000Z',
			endDate: '2024-06-10T10:00:00.000Z',
			professionalId: 'prof-123',
			clientId: 'client-567'
		},
		{
			id: '9',
			name: 'Examen de Laboratorio',
			startDate: '2024-06-10T11:00:00.000Z',
			endDate: '2024-06-10T11:30:00.000Z',
			professionalId: 'prof-123',
			clientId: 'client-890'
		}
	],
	success: true,
	message: 'Datos de turnos obtenidos exitosamente'
}

export default mockAppointments
