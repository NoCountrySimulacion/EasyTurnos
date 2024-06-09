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
		console.log('Slots:', slotsResponse.data)
		// Asignar un ID hardcodeado al primer slot si la respuesta está vacía
		if (!slotsResponse.data.length) {
			slotsResponse.data.push({
				id: '3fa85f64-5717-4562-b3fc-2c963f66afa6' // ID hardcodeado para simular un slot
				// Otras propiedades del slot según la estructura de tus slots
			})
		}

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

export const deleteSlot = async (): Promise<void> => {
	try {
		const token = localStorage.getItem('token')
		const idToDelete = '3fa85f64-5717-4562-b3fc-2c963f66afa6' // ID hardcodeado para eliminar
		const response = await fetch(BASE_SLOT_URL, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json' // Agrega el encabezado Content-Type
			},
			body: JSON.stringify([idToDelete]) // Agrega un cuerpo con el ID a eliminar
		})
		if (!response.ok) {
			throw new Error('Error al eliminar los slots')
		}
		console.log('Slots eliminados exitosamente')
	} catch (error) {
		console.error('Error en deleteSlot:', error)
		throw error
	}
}
