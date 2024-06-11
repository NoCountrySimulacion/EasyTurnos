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
	initial: string
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
	id: string;
	name: string;
	// Otros campos necesarios
  }