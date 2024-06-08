export interface AdaptedUser {
	userId: number
	userFirstName: string
	userLastName: string
	userThumbnail: string
}

export interface AppointmentCardProps {
	name: string
	profession?: string
	date?: string
	startDate: string
	endDate: string
}
