import {
	ApiResponseProfesional,
	DecodedToken
} from '../../auth/typescript/interface'
import { FormValuesEdit } from '../../professional/pages/EditProfile'
import {
	ApiResponse,
	ApiUpdateProfessionalData,
	ClientData,
	ProfessionalsByClient
} from '../typescript/interface'

const BASE_UPDATE_PROFESSIONAL =
	'https://easyturnos.somee.com/api/professional/updateprofessionaluser/'
const BASE_PROFESSIONAL_CLIENTS_URL =
	'https://easyturnos.somee.com/GetAllByClientId/'
const BASE_GET_PROFESIONAL =
	'https://easyturnos.somee.com/api/Professional/GetById/'

export async function getProfessionalsByClient(
	decodedToken: DecodedToken
): Promise<ProfessionalsByClient> {
	try {
		const token = localStorage.getItem('token')
		console.log('El id del cliente es: ', decodedToken?.clientId)
		const res = await fetch(
			`${BASE_PROFESSIONAL_CLIENTS_URL}${decodedToken?.clientId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: ` ${token}`
				}
			}
		)
		if (!res.ok)
			throw new Error(`Error getting appointments: ${res.statusText}`)

		const data: ProfessionalsByClient = await res.json()
		return data
	} catch (error) {
		console.error('Error getting appointments:', error)
		throw error
	}
}

export async function updateProfessionalUserService(
	token: string | undefined,
	currentEmail: string | undefined,
	data: FormValuesEdit
) {
	const url = `${BASE_UPDATE_PROFESSIONAL}${currentEmail}`
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

export async function getClientData(
	token: string | undefined,
	clientId: string,
	profesionalId: string | undefined
): Promise<ClientData | null> {
	try {
		const response = await fetch(
			`https://easyturnos.somee.com/api/professionals/${profesionalId}/clients/${clientId}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				}
			}
		)
		const result: ApiResponse = await response.json()
		if (response.ok && result.success) {
			return result.data
		} else {
			throw new Error(result.message || 'Error fetching client data')
		}
	} catch (error) {
		throw new Error((error as Error).message || 'Error fetching client data')
	}
}

export async function getProfessionalData(
	decodedToken: DecodedToken
): Promise<ApiResponseProfesional> {
	try {
		const token = localStorage.getItem('token')
		if (!token) throw new Error('Token not found')

		const res = await fetch(
			`${BASE_GET_PROFESIONAL}${decodedToken.professionalId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			}
		)

		if (!res.ok)
			throw new Error(`Error getting professional data: ${res.statusText}`)

		const apiResponse: ApiResponseProfesional = await res.json()
		if (!apiResponse.success)
			throw new Error(apiResponse.message || 'Unknown error')

		return apiResponse
	} catch (error) {
		console.error('Error getting professional data:', error)
		throw error
	}
}
