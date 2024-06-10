import { useState, useEffect } from 'react'
import moment, { Moment } from 'moment'
import { getAllSlots, deleteSlotById } from '../../services/api/slots'
import { ConfigSlot } from '../typescript/interface'
import { useAuth } from '../../auth/hooks/useAuth'
import { useProfessionalClients } from '../../professional/hooks/useProfessionalClients'
import {
	createAppointment,
	getProfessionalAppointments,
	deleteAppointment
} from '../../services/api/appointment' // Ajusta la ruta según la ubicación real de createAppointment

const useCalendarLogic = () => {
	const [selectedDate, setSelectedDate] = useState<Moment | null>(moment())
	const [hoveredDay, setHoveredDay] = useState<Moment | null>(null)
	const [slots, setSlots] = useState<ConfigSlot[]>([])
	const [selectedSlots, setSelectedSlots] = useState<ConfigSlot[]>([])
	const [selectedSlot, setSelectedSlot] = useState<ConfigSlot | null>(null)
	const [showConfirmButton, setShowConfirmButton] = useState<boolean>(false)
	const [appointmentsForSelectedDate, setAppointmentsForSelectedDate] =
		useState([])
	const [appointments, setAppointments] = useState([])
	const { decodedToken } = useAuth()
	const { professionalClients } = useProfessionalClients()

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

	useEffect(() => {
		const fetchAppointments = async () => {
			try {
				if (decodedToken) {
					const appointmentsData =
						await getProfessionalAppointments(decodedToken)
					setAppointments(appointmentsData.data)
					console.log('appointments:', appointmentsData.data)
				}
			} catch (error) {
				console.error('Error getting appointments:', error)
			}
		}

		fetchAppointments()
	}, [decodedToken])

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

	const handleCreateAppointment = async () => {
		if (selectedSlot && decodedToken) {
			const appointmentData = {
				name: '', // Puedes dejar el nombre vacío o agregar lógica para obtenerlo
				startDate: selectedSlot.startDate,
				endDate: selectedSlot.endDate
			}

			try {
				const data = await createAppointment(
					professionalClients?.data[2].id, // O usa decodedToken.professionalId según corresponda
					decodedToken.professionalId, // Puedes ajustar según tu lógica de autenticación
					appointmentData
				)
				console.log('Appointment created:', data)

				// Actualizar el estado de appointments con el nuevo appointment
				setAppointments([...appointments, data])

				// Eliminar el slot seleccionado
				await handleDeleteSlot(selectedSlot.id)

				// Puedes agregar lógica para actualizar el estado de citas si es necesario
			} catch (error) {
				console.error('Error creating appointment:', error)
			}
		}
	}

	const handleDeleteAppointment = async (id: string) => {
		try {
			// Eliminar el appointment
			await deleteAppointment(id)
			setAppointments(appointments.filter(appointment => appointment.id !== id))
			console.log(`Appointment with ID ${id} deleted successfully.`)

			// Obtener el slot correspondiente al appointment eliminado
			const deletedAppointment = appointments.find(
				appointment => appointment.id === id
			)
			if (deletedAppointment) {
				// Crear el nuevo slot con la misma información del appointment eliminado
				const newSlot = {
					id: deletedAppointment.slotId, // Supongo que el slotId está presente en el appointment
					startDate: deletedAppointment.startDate,
					endDate: deletedAppointment.endDate
					// Otras propiedades necesarias del slot
				}

				// Añadir el nuevo slot a la lista de slots
				setSlots(prevSlots => [...prevSlots, newSlot])
				console.log('New slot created:', newSlot)
			}
		} catch (error) {
			console.error(`Error deleting appointment with ID ${id}:`, error)
		}
	}

	return {
		selectedDate,
		hoveredDay,
		setHoveredDay,
		slots,
		selectedSlots,
		selectedSlot,
		showConfirmButton,
		appointmentsForSelectedDate,
		handleDateChange,
		handleConfigChange,
		handleSlotClick,
		handleDeleteSlot,
		handleCreateAppointment,
		setShowConfirmButton,
		appointments,
		handleDeleteAppointment
	}
}

export default useCalendarLogic
