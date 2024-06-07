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

interface availableSlot {
	availableSlot: string
}

interface ProfessionalData {
	id: string
	specialty: string
	description: string
	slots: availableSlot[]
}

export interface Professional {
	data: ProfessionalData[]
	success: boolean
	message: string
}

interface Apponitment {
	id: string
	name: string
	startDate: string
	endDate: string
	professionalId: string
	clientId: string
}

export interface AppointmentList {
	data: Apponitment[]
	success: boolean
	message: string
}
