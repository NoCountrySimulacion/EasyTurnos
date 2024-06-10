/* eslint-disable @typescript-eslint/no-explicit-any */
// URL base para la API de slots
const BASE_SLOT_URL = 'https://easyturnos.somee.com/api/Slot'

interface SlotResponse {
	data: any[] // Ajusta este tipo según la estructura de tus slots
	success: boolean
	message: string
	id: string
}

// Función para obtener todos los slots
export const getAllSlots = async (): Promise<any[]> => {
	try {
		const token = localStorage.getItem('token')
		const response = await fetch(BASE_SLOT_URL, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		if (!response.ok) {
			throw new Error('Error al obtener los slots')
		}
		const slotsResponse: SlotResponse = await response.json()
		console.log('Slots obtenidos exitosamente:', slotsResponse.data)
		return slotsResponse.data // Retorna solo los datos de los slots
	} catch (error) {
		console.error('Error en getAllSlots:', error)
		throw error
	}
}

export const createSlot = async (newSlot: any): Promise<void> => {
	try {
		const token = localStorage.getItem('token')
		const response = await fetch(BASE_SLOT_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(newSlot)
		})
		if (!response.ok) {
			throw new Error('Error al crear el slot')
		}
		console.log('Slot creado exitosamente:', await response.json())
	} catch (error) {
		console.error('Error en createSlot:', error)
		throw error
	}
}

export const deleteAllSlots = async (): Promise<void> => {
	try {
		const token = localStorage.getItem('token')
		const response = await fetch(`${BASE_SLOT_URL}/DeleteAllByProfessionalId`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		if (!response.ok) {
			throw new Error('Error al eliminar el slot')
		}
		console.log('Slot eliminado exitosamente')
	} catch (error) {
		console.error('Error en deleteSlot:', error)
		throw error
	}
}

export const deleteSlotById = async (id: string): Promise<void> => {
	try {
		const token = localStorage.getItem('token')
		const response = await fetch(BASE_SLOT_URL, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify([id]) // Enviar un array de IDs en el cuerpo de la solicitud
		})
		if (!response.ok) {
			throw new Error('Error al eliminar el slot')
		}
		console.log(`Slot con ID ${id} eliminado exitosamente`)
	} catch (error) {
		console.error('Error en deleteSlotById:', error)
		throw error
	}
}