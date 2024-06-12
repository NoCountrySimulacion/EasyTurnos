/* eslint-disable @typescript-eslint/no-explicit-any */
import { PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import { Moment } from 'moment'

export interface CustomDayProps extends PickersDayProps<Moment> {
	selectedDay: Moment | null
	hoveredDay: Moment | null
	onPointerEnter: (
		event: React.PointerEvent<HTMLButtonElement>,
		day: Moment
	) => void
	onPointerLeave: () => void
	slots: ConfigSlot[]
	appointments: Appointment[]
}

export interface ConfigSlot {
	end: string
	startDate: string
	endDate: string
	id: string
}

export interface Appointment {
	id: string
	name: string
	startDate: string
	endDate: string
}

export type PointerEnterHandler = (
	event: React.PointerEvent<HTMLButtonElement>,
	day: Moment
) => void

export interface CustomDayProps extends PickersDayProps<Moment> {
	selectedDay: Moment | null
	hoveredDay: Moment | null
	onPointerEnter: PointerEnterHandler
	onPointerLeave: () => void
	slots: ConfigSlot[]
	appointments: Appointment[]
}

export interface ClientsByProfessional {
	id: string
	name: string
	// Otros campos necesarios
}

export interface CalendarContextProps {
	selectedDate: Moment | null
	hoveredDay: Moment | null
	setHoveredDay: (day: Moment | null) => void
	slots: ConfigSlot[]
	selectedSlots: ConfigSlot[]
	selectedSlot: ConfigSlot | null
	showConfirmButton: boolean
	appointmentsForSelectedDate: any[] // Define el tipo correcto de appointmentsForSelectedDate
	handleDateChange: (date: Moment | null) => void
	handleConfigChange: (newSlots: ConfigSlot[]) => void
	handleSlotClick: (slot: ConfigSlot) => void
	handleDeleteSlot: (id: string) => void
	handleCreateAppointment: (clientId: string, title: string) => void
	appointments: any[] // Define el tipo correcto de appointments
	handleDeleteAppointment: (id: string) => void
	setClientForAppointment: (clientId: string) => void
	handleCreateClientAppointment: (title: string) => void
	professionalClients: ClientsByProfessional | null;
}
