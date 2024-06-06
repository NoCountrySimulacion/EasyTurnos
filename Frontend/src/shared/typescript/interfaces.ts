export interface AdaptedUser {
	userId: number
	userFirstName: string
	userLastName: string
	userThumbnail: string
}

export interface AppointmentCardProps {
	name: string
	lastName: string
	profession?: string
	date?: string
	time: string
}
