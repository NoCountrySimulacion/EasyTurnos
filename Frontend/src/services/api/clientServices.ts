import { FormValuesEditClient } from '../../professional/pages/EditProfileClient'
import { ApiUpdateClientData } from '../typescript/interface'

const BASE_UPDATE_CLIENT = 'https://easyturnos.somee.com/api/professionals/'

export async function updateClient(
	token: string | undefined,
	clientId: string,
	professionalId: string | undefined,
	data: FormValuesEditClient
) {
	const url = `${BASE_UPDATE_CLIENT}${professionalId}/clients/${clientId}`
	// Mapeamos los datos a la estructura esperada por la API
	const apiData: ApiUpdateClientData = {
		firstName: data.nombre,
		lastName: data.apellido,
		phoneNumber: data.tel,
		email: data.mail,
		password: data.contraseñaCliente,
		birthDate: data.birthDate
	}

	try {
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(apiData)
		})
		if (!response.ok) {
			throw new Error('Error al actualizar los datos del cliente')
		}

		const responseData = await response.json()
		return responseData
	} catch (error) {
		console.error('Error al actualizar los datos del cliente:', error)
		throw error
	}
}



export const deleteClient = async (
	token: string | undefined,
	professionalId: string | undefined,
	clientId: string
) => {
	try {
		const response = await fetch(
			`${BASE_UPDATE_CLIENT}${professionalId}/clients/${clientId}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			}
		)

		if (!response.ok) {
			const errorData = await response.json()
			throw new Error(errorData.message || 'Error al eliminar el cliente')
		}

		return true // Retorna verdadero si la solicitud fue exitosa
	} catch (error) {
		console.error('Error al actualizar los datos del cliente:', error)
		throw error	}
}
