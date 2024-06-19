import { PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import { Moment } from 'moment'
import {
	Appointment,
	ClientsByProfessional,
	ProfessionalsByClient
} from '../../services/typescript/interface'

export interface ConfigSlot {
	startDate: string
	endDate: string
	id: string
}

export type PointerEnterHandler = (
	event?: React.MouseEvent<HTMLButtonElement>, // Cambié PointerEvent a MouseEvent
	day?: moment.Moment
) => void

export interface CustomDayProps
	extends Omit<
		PickersDayProps<Moment>,
		'onPointerEnter' | 'onPointerLeave' | 'propTypes'
	> {
	selectedDay?: Moment | null
	hoveredDay?: Moment | null
	onPointerEnter?: PointerEnterHandler
	onPointerLeave?: () => void
	slots?: ConfigSlot[]
	appointments?: Appointment[]
}

export interface CalendarContextProps {
	selectedDate: Moment | null
	hoveredDay: Moment | null
	setHoveredDay: (day: Moment | null) => void
	slots: ConfigSlot[]
	selectedSlots: ConfigSlot[]
	selectedSlot: ConfigSlot | null
	showConfirmButton: boolean
	appointmentsForSelectedDate: Appointment[]
	handleDateChange: (date: Moment | null) => void
	handleConfigChange: (newSlots: ConfigSlot[]) => void
	handleSlotClick: (slot: ConfigSlot) => void
	handleDeleteSlot: (id: string) => void
	handleCreateAppointment: (clientId: string, title: string) => void
	appointments: Appointment[]
	handleDeleteAppointment: (id: string) => void
	setClientForAppointment: (clientId: string) => void
	handleCreateClientAppointment: () => void
	professionalClients: ClientsByProfessional | null
	clientProfessional: ProfessionalsByClient | null
	handleClientDeleteAppointment: (id: string) => void
}
