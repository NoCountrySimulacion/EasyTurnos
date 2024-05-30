import { User } from '../shared/typescript/types'
import { AdaptedUser } from '../shared/typescript/interfaces'

// Función para adaptar un usuario recibido del backend al formato esperado en tu aplicación
export function adaptUserFromBackend(userFromBackend: AdaptedUser): User {
	return {
		id: userFromBackend.userId,
		name: userFromBackend.userFirstName,
		lastName: userFromBackend.userLastName,
		thumbnail: userFromBackend.userThumbnail
	}
}

// Función para adaptar un usuario de tu aplicación al formato requerido por el backend
export function adaptUserToBackend(user: User): AdaptedUser {
	return {
		userId: user.id,
		userFirstName: user.name,
		userLastName: user.lastName,
		userThumbnail: user.thumbnail
	}
}
