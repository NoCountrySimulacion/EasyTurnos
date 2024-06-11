import React from 'react'
import { PickersDay } from '@mui/x-date-pickers'
import moment from 'moment'
import 'moment/locale/es'
import { CustomDayProps, PointerEnterHandler } from '../typescript/interface'

const CustomDay: React.FC<CustomDayProps> = props => {
	const {
		day,
		selectedDay,
		hoveredDay,
		onPointerEnter,
		onPointerLeave,
		slots,
		appointments,
		...other
	} = props

	const isDayWithSlot = slots
		? slots.some(slot => moment(slot.startDate).isSame(day, 'day'))
		: false

	const isDayWithAppointment = appointments
		? appointments.some(appointment =>
			moment(appointment.startDate).isSame(day, 'day')
		)
		: false

	const handlePointerEnter: PointerEnterHandler = (event, day) => {
		onPointerEnter(event, day)
	}

	return (
		<PickersDay
			{...other}
			day={day}
			selected={selectedDay ? selectedDay.isSame(day, 'day') : false}
			onMouseEnter={event => handlePointerEnter(event, day)}
			onMouseLeave={onPointerLeave}
			style={{
				...(isDayWithSlot || isDayWithAppointment
					? {
						border: '2px solid #7445C7',
						borderRadius: '50%',
						color: '#7445C7'
					}
					: {}),
				...(selectedDay &&
					day.isSame(selectedDay, 'day') && {
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
