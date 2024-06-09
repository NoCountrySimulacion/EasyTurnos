export interface LoginResponse {
	userId: string
	email: string
	token: string
	firstName: string
	lastName: string
}

export interface RegisterResponse {
	userId: string
	token: string
}

export interface LoginCredentials {
	email: string
	password: string
}

export interface RegisterCredentials {
	firstName: string
	lastName: string
	email: string
	phoneNumber: string
	password: string
	confirmPassword: string
}

interface ProfessionalClientData {
	id: string
	firstName: string
	lastName: string
	phoneNumber: string
}

export interface ProfessionalClients {
	data: ProfessionalClientData[]
	success: boolean
	message: string
}

interface availableSlot {
	availableSlot: string
}

interface ProfessionalData {
	id: string
	specialty: string
	description: string
	slots: availableSlot[]
	firstName: string
	lastName: string
	phoneNumber: string
}

export interface Professional {
	data: Omit<ProfessionalData[], 'firstName' | 'lastName' | 'phoneNumber'>
	success: boolean
	message: string
}

interface Appointment {
	id: string
	name: string
	startDate: string
	endDate: string
	professionalId: string
	firstName: string
	lastName: string
}

export interface AppointmentList {
	data: Appointment[]
	success: boolean
	message: string
}

export interface AllProfessionals {
	data: Omit<ProfessionalData[], 'slots'>
	success: boolean
	message: string
}
