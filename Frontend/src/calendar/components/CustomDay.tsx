import React from 'react'
import { PickersDay } from '@mui/x-date-pickers'
import moment, { Moment } from 'moment'
import { ConfigSlot } from '../mocks/mockConfigSlot'
import { Appointment } from '../mocks/appoinmet'

interface CustomDayProps {
	day: Moment
	selectedDay: Moment | null
	hoveredDay: Moment | null
	slots: ConfigSlot[]
	appointments: Appointment[]
	onPointerEnter: () => void
	onPointerLeave: () => void
}

const CustomDay: React.FC<CustomDayProps> = ({
	day,
	selectedDay,
	hoveredDay,
	slots,
	appointments,
	onPointerEnter,
	onPointerLeave
}) => {
	const isDayWithSlot = slots.some(slot =>
		moment(slot.initial).isSame(day, 'day')
	)

	const isDayWithAppointment = appointments.some(appointment =>
		moment(appointment.startDate).isSame(day, 'day')
	)

	return (
		<PickersDay
			day={day}
			onMouseEnter={onPointerEnter}
			onMouseLeave={onPointerLeave}
			style={{
				...(isDayWithSlot && {
					border: '2px solid #7445C7',
					borderRadius: '50%',
					color: '#7445C7'
				}),
				...(day.isSame(selectedDay, 'day') && {
					backgroundColor: 'rgba(116, 69, 199, 0.12)',
					color: '#FD8847'
				}),
				...(day.isSame(hoveredDay, 'day') && {
					backgroundColor: 'rgba(116, 69, 199, 0.04)'
				}),
				...(isDayWithAppointment && {
					position: 'relative',
					'&:after': {
						content: '""',
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 8,
						height: 8,
						borderRadius: '50%',
						backgroundColor: '#FBBF24'
					}
				})
			}}
		/>
	)
}

export default CustomDay
