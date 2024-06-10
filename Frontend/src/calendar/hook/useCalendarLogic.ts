import { useState, useEffect } from 'react'
import moment, { Moment } from 'moment'
import { getAllSlots, deleteSlotById } from '../../services/api/slots'
import { ConfigSlot } from '../typescript/interface'

const useCalendarLogic = () => {
	const [selectedDate, setSelectedDate] = useState<Moment | null>(moment())
	const [hoveredDay, setHoveredDay] = useState<Moment | null>(null)
	const [slots, setSlots] = useState<ConfigSlot[]>([])
	const [selectedSlots, setSelectedSlots] = useState<ConfigSlot[]>([])
	const [selectedSlot, setSelectedSlot] = useState<ConfigSlot | null>(null)
	const [showConfirmButton, setShowConfirmButton] = useState<boolean>(false)
	const [appointmentsForSelectedDate, setAppointmentsForSelectedDate] =
		useState<Appointment[]>([])

	useEffect(() => {
		const fetchSlots = async () => {
			try {
				const slotsResponse = await getAllSlots()
				setSlots(slotsResponse)
			} catch (error) {
				console.error('Error fetching slots:', error)
			}
		}

		fetchSlots()
	}, [])

	const handleDateChange = (date: Moment | null) => {
		setSelectedDate(date)
	}

	useEffect(() => {
		if (selectedDate && slots.length > 0) {
			const selectedDaySlots = slots.filter(slot =>
				moment(slot.startDate).isSame(selectedDate, 'day')
			)
			setSelectedSlots(selectedDaySlots)
			setSelectedSlot(null)
			setShowConfirmButton(false)

			// En este punto, no establecemos appointmentsForSelectedDate a partir de ningún mock
			setAppointmentsForSelectedDate([]) // Inicialmente vacío
		}
	}, [selectedDate, slots])

	const handleConfigChange = async (newSlots: ConfigSlot[]) => {
		try {
			setSlots(prevSlots => [...prevSlots, ...newSlots])
			console.log('Configuración enviada al backend:', newSlots)
		} catch (error) {
			console.error('Error enviando configuración:', error)
		}
	}

	const handleSlotClick = (slot: ConfigSlot) => {
		if (selectedSlot === slot && showConfirmButton) {
			setSelectedSlot(null)
			setShowConfirmButton(false)
		} else {
			setSelectedSlot(slot)
			setShowConfirmButton(true)
		}
	}

	const handleDeleteSlot = async (id: string) => {
		try {
			await deleteSlotById(id)
			setSlots(slots.filter(slot => slot.id !== id))
			console.log(`Slot con ID ${id} eliminado exitosamente`)
		} catch (error) {
			console.error(`Error al eliminar el slot con ID ${id}:`, error)
		}
	}

	return {
		selectedDate,
		hoveredDay,
		setHoveredDay, // Asegúrate de exportar setHoveredDay
		slots,
		selectedSlots,
		selectedSlot,
		showConfirmButton,
		appointmentsForSelectedDate, // Asegúrate de exportar esto
		handleDateChange,
		handleConfigChange,
		handleSlotClick,
		handleDeleteSlot // Exportar la función de eliminación
	}
}

export default useCalendarLogic
