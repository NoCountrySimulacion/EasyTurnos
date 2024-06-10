export interface AdaptedUser {
	userId: number
	userFirstName: string
	userLastName: string
	userThumbnail: string
}

export interface AppointmentCardProps {
	name: string
	speciality?: string
	startDate: string
	endDate: string
}
