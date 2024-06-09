import { FormValuesEdit } from '../../professional/pages/EditProfile'

interface ApiUpdateProfessionalData {
	firstName: string
	lastName: string
	speciality: string
	description: string
	location: string
	phoneNumber: string
	newEmail: string
}

const BASE_URL = 'https://easyturnos.somee.com/api/Professional/'

export async function getProfessionalData(
	professionalId: string,
	token: string
) {
	try {
		const response = await fetch(`${BASE_URL}GetById/${professionalId}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		})

		if (!response.ok) {
			throw new Error('Error fetching professional data')
		}

		const data = await response.json()
		console.log(data)
		return data
	} catch (error) {
		console.error('Error fetching professional data:', error)
		throw error
	}
}

export async function updateProfessionalUserService(
	token: string | undefined,
	currentEmail: string | undefined,
	data: FormValuesEdit
) {
	const url = `${BASE_URL}updateprofessionaluser/${currentEmail}`
	// Mapeamos los datos a la estructura esperada por la API
	const apiData: ApiUpdateProfessionalData = {
		firstName: data.nombre,
		lastName: data.apellido,
		speciality: data.especialidad,
		description: data.descripcion,
		location: data.ubicacion,
		phoneNumber: data.tel,
		newEmail: data.mail
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
			throw new Error('Error al actualizar los datos del profesional')
		}

		const responseData = await response.json()
		return responseData
	} catch (error) {
		console.error('Error al actualizar los datos del profesional:', error)
		throw error
	}
}
