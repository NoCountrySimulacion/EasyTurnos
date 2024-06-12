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
		console.log('La url:', url)
		console.log('El json que se envia:', apiData)
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(apiData)
		})
		console.log('La api respondio: ', response)
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
