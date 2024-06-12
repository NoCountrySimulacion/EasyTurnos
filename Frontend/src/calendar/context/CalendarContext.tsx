/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	createContext,
	useState,
	useEffect,
	ReactNode
} from 'react'
import moment, { Moment } from 'moment'
import Swal from 'sweetalert2'
import { getAllSlots, deleteSlotById } from '../../services/api/slots'
import { ConfigSlot,ClientsByProfessional } from '../typescript/interface'
import { useAuth } from '../../auth/hooks/useAuth'
import { useProfessionalClients } from '../../professional/hooks/useProfessionalClients'
import {
	createAppointment,
	getProfessionalAppointments,
	deleteAppointment
} from '../../services/api/appointment'
import { useClientProfessional } from '../../client/hooks/useClientProfessional'

// Definimos la forma de los valores del contexto


export interface CalendarContextProps {
    selectedDate: Moment | null;
    hoveredDay: Moment | null;
    setHoveredDay: (day: Moment | null) => void;
    slots: ConfigSlot[];
    selectedSlots: ConfigSlot[];
    selectedSlot: ConfigSlot | null;
    showConfirmButton: boolean;
    appointmentsForSelectedDate: any[]; // Define el tipo correcto de appointmentsForSelectedDate
    handleDateChange: (date: Moment | null) => void;
    handleConfigChange: (newSlots: ConfigSlot[]) => void;
    handleSlotClick: (slot: ConfigSlot) => void;
    handleDeleteSlot: (id: string) => void;
    handleCreateAppointment: (clientId: string, title: string) => void;
    appointments: any[]; // Define el tipo correcto de appointments
    handleDeleteAppointment: (id: string) => void;
    professionalClients: ClientsByProfessional | null; // Ajusta el tipo a ClientsByProfessional | null
    setClientForAppointment: (clientId: string) => void;
}


// Creamos el contexto con un valor inicial vacío
export const CalendarContext = createContext<CalendarContextProps | undefined>(
	undefined
)



// Proveedor del contexto que envuelve la aplicación
interface CalendarProviderProps {
	children: ReactNode
}
export const CalendarProvider = ({ children }: CalendarProviderProps) => {
	const [selectedDate, setSelectedDate] = useState<Moment | null>(moment())
	const [hoveredDay, setHoveredDay] = useState<Moment | null>(null)
	const [slots, setSlots] = useState<ConfigSlot[]>([])
	const [selectedSlots, setSelectedSlots] = useState<ConfigSlot[]>([])
	const [selectedSlot, setSelectedSlot] = useState<ConfigSlot | null>(null)
	const [, setSelectedClient] = useState<string | null>(null)
	const [showConfirmButton, setShowConfirmButton] = useState<boolean>(false)
	const [appointmentsForSelectedDate, setAppointmentsForSelectedDate] =
		useState<any[]>([])
	const [appointments, setAppointments] = useState<any[]>([])
	const { decodedToken } = useAuth()
	const { professionalClients } = useProfessionalClients()
	const { clientProfessional } = useClientProfessional()

	
	useEffect(() => {
		const fetchSlots = async () => {
			try {
				const slotsResponse = await getAllSlots()
				console.log(slotsResponse)
				setSlots(slotsResponse)
			} catch (error) {
				console.error('Error fetching slots:', error)
			}
		}

		fetchSlots()
	}, [])

	useEffect(() => {
		if (selectedDate && slots.length > 0) {
			const selectedDaySlots = slots.filter(slot =>
				moment(slot.startDate).isSame(selectedDate, 'day')
			)
			setSelectedSlots(selectedDaySlots)
			setSelectedSlot(null)
			setShowConfirmButton(false)
			setAppointmentsForSelectedDate([])
		}
	}, [selectedDate, slots])

	useEffect(() => {
		const fetchAppointments = async () => {
			try {
				if (decodedToken) {
					const appointmentsData =
						await getProfessionalAppointments(decodedToken)
					setAppointments(appointmentsData.data)
				}
			} catch (error) {
				console.error('Error getting appointments:', error)
			}
		}

		fetchAppointments()
	}, [decodedToken])

	const handleDateChange = (date: Moment | null) => {
		setSelectedDate(date)
	}

	const handleConfigChange = async (newSlots: ConfigSlot[]) => {
		try {
			setSlots(prevSlots => [...prevSlots, ...newSlots])
			Swal.fire({
				icon: 'success',
				title: 'Configuración actualizada',
				text: 'La configuración del calendario se ha actualizado correctamente.'
			})
		} catch (error) {
			console.error('Error enviando configuración:', error)
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Hubo un error al actualizar la configuración del calendario. Por favor, inténtalo de nuevo más tarde.'
			})
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
			Swal.fire({
				icon: 'success',
				title: 'Horario disponible eliminado',
				text: 'El horario disponible se ha eliminado correctamente.'
			})
		} catch (error) {
			console.error(`Error al eliminar el slot con ID ${id}:`, error)
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Hubo un error al eliminar el horario disponible. Por favor, inténtalo de nuevo más tarde.'
			})
		}
	}

	const handleCreateAppointment = async (clientId: string, title: string) => {
		if (selectedSlot && decodedToken && clientId) {
			const appointmentData = {
				name: title,
				startDate: selectedSlot.startDate,
				endDate: selectedSlot.endDate
			}

			try {
				const data = await createAppointment(
					clientId,
					decodedToken.professionalId,
					appointmentData
				)

				// Actualiza el estado de appointments al crear un nuevo turno
				  setAppointments(prevAppointments => [...prevAppointments, data])

				await handleDeleteSlot(selectedSlot.id)

				Swal.fire({
					icon: 'success',
					title: 'Turno creado',
					text: 'El turno se ha creado correctamente.'
				})
			} catch (error) {
				console.error('Error creating appointment:', error)
				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: 'Hubo un error al crear el turno. Por favor, inténtalo de nuevo más tarde.'
				})
			}
		}
	}

	const handleCreateClientAppointment = async (title: string) => {
		if (selectedSlot && decodedToken && clientProfessional) {
			const appointmentData = {
				name: title,
				startDate: selectedSlot.startDate,
				endDate: selectedSlot.endDate
			}

			try {
				const data = await createAppointment(
					decodedToken.clientId,
					clientProfessional.data[0].id, // Asumiendo que clientProfessional.data es una lista y tomamos el primer profesional
					appointmentData
				)

				// Actualiza el estado de appointments al crear un nuevo turno
				  setAppointments(prevAppointments => [...prevAppointments, data])

				await handleDeleteSlot(selectedSlot.id)

				Swal.fire({
					icon: 'success',
					title: 'Turno creado',
					text: 'El turno se ha creado correctamente.'
				})
			} catch (error) {
				console.error('Error creating appointment:', error)
				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: 'Hubo un error al crear el turno. Por favor, inténtalo de nuevo más tarde.'
				})
			}
		}
	}

	const handleDeleteAppointment = async (id: string) => {
		try {
			await deleteAppointment(id)
			setAppointments(appointments.filter(appointment => appointment.id !== id))
			Swal.fire({
				icon: 'success',
				title: 'Turno eliminado',
				text: 'El turno se ha eliminado correctamente.'
			})
			const deletedAppointment = appointments.find(
				appointment => appointment.id === id
			)
			if (deletedAppointment) {
				const newSlot = {
					id: deletedAppointment.slotId,
					startDate: deletedAppointment.startDate,
					endDate: deletedAppointment.endDate
				}
				setSlots(prevSlots => [...prevSlots, newSlot])
			}
		} catch (error) {
			console.error(`Error deleting appointment with ID ${id}:`, error)
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Hubo un error al eliminar el turno. Por favor, inténtalo de nuevo más tarde.'
			})
		}
	}

	const setClientForAppointment = (clientId: string) => {
		setSelectedClient(clientId)
	}

	const contextValue: CalendarContextProps = {
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
		handleCreateClientAppointment,
		appointments,
		handleDeleteAppointment,
		professionalClients,
		setClientForAppointment,
		clientProfessional
	}

	return (
		<CalendarContext.Provider value={contextValue}>
			{children}
		</CalendarContext.Provider>
	)
}

export default CalendarContext
