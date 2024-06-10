import React, { useState, useEffect } from 'react'
import { PickersDay } from '@mui/x-date-pickers'
import moment from 'moment'
import 'moment/locale/es'
import { CustomDayProps } from '../typescript/interface'
import { getProfessionalAppointments } from '../../services/api/appointment'
import { useAuth } from '../../auth/hooks/useAuth'

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

	const [appointments, setAppointments] = useState([]) // Estado para almacenar las citas
	const [isDataLoaded, setIsDataLoaded] = useState(false) // Estado para controlar si los datos ya se cargaron
	const { decodedToken } = useAuth()

	useEffect(() => {
		const fetchAppointments = async () => {
		  try {
			if (decodedToken && !isDataLoaded) {
			  const appointmentsData = await getProfessionalAppointments(decodedToken);
			  setAppointments(appointmentsData.data);
			  setIsDataLoaded(true);
			}
		  } catch (error) {
			console.error('Error getting appointments:', error);
		  }
		};
	  
		fetchAppointments(); // Siempre se ejecuta al inicio
	  
		// Dependencia isDataLoaded agregada para que el efecto se ejecute nuevamente cuando cambie su valor
	  }, [decodedToken, isDataLoaded]);
	  // Dependencias actualizadas

	const isDayWithSlot = slots.some(slot =>
		moment(slot.startDate).isSame(day, 'day')
	)

	const isDayWithAppointment = appointments.some(appointment =>
		moment(appointment.startDate).isSame(day, 'day')
	)

	return (
		<PickersDay
			{...other}
			day={day}
			selected={selectedDay ? selectedDay.isSame(day, 'day') : false}
			onMouseEnter={() => onPointerEnter({ day })}
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
