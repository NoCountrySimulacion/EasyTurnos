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

export interface ClientsByProfessional {
	data: ProfessionalClientData[]
	success: boolean
	message: string
}

interface availableSlot {
	end: string
	startDate: string
	endDate: string
	id: string
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

export interface ProfessionalsByClient {
	data: ProfessionalData[]
	success: boolean
	message: string
}

export interface Appointment {
	id: string
	name: string
	startDate: string
	endDate: string
	professionalId: string
	firstName: string
	lastName: string
	speciality: string
	clientId: string
}

export interface ProfessionalAppointmentList {
	data: Omit<Appointment[], 'speciality'>
	success: boolean
	message: string
}

export interface ClientAppointmentList {
	data: Omit<Appointment[], 'clientId'>
	success: boolean
	message: string
}

export interface ClientData {
	id: string
	birthDate: string
	email: string
	phoneNumber: string
	firstName: string
	lastName: string
}

export interface ApiResponse {
	data: ClientData
	success: boolean
	message: string
}

export interface ApiUpdateProfessionalData {
	firstName: string
	lastName: string
	speciality: string
	description: string
	location: string
	phoneNumber: string
	newEmail: string
}

export interface ApiUpdateClientData {
	firstName: string
	lastName: string
	phoneNumber: string
	email: string
	password: string
	birthDate: Date | null | string
}
