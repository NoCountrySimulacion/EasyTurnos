import React from 'react'
import { PickersDay } from '@mui/x-date-pickers'
import moment from 'moment' // Agrega Moment desde moment
import 'moment/locale/es'
import mockAppointments from '../mocks/appoinmet'
import { CustomDayProps } from '../typescript/interface'

const CustomDay: React.FC<CustomDayProps> = props => {
	const {
		day,
		selectedDay,
		hoveredDay,
		onPointerEnter,
		onPointerLeave,
		slots,
		...other
	} = props

	const isDayWithSlot = slots.some(slot =>
		moment(slot.startDate).isSame(day, 'day')
	)
	const isDayWithAppointment = mockAppointments.data.some(appointment =>
		moment(appointment.startDate).isSame(day, 'day')
	)

	return (
		<PickersDay
			{...other}
			day={day}
			selected={selectedDay ? selectedDay.isSame(day, 'day') : false}
			onMouseEnter={() => onPointerEnter(day)} // Cambia aquí
			onMouseLeave={onPointerLeave}
			style={{
				...(isDayWithSlot && {
					border: '2px solid #7445C7',
					borderRadius: '50%',
					color: '#7445C7'
				}),
				...(isDayWithAppointment && {
					border: '2px solid #7445C7',
					borderRadius: '50%',
					color: '#7445C7'
				}),
				...(selectedDay && day.isSame(selectedDay, 'day') && { // Añade selectedDay && para evitar errores
					backgroundColor: 'rgba(116, 69, 199, 0.12)',
					color: '#FD8847'
				}),
				...(day.isSame(hoveredDay, 'day') && {
					backgroundColor: 'rgba(116, 69, 199, 0.04)'
				})
			}}
		/>
	)
}

export default CustomDay
