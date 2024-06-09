/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useState, useEffect } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DateCalendar, PickersDay, PickersDayProps } from '@mui/x-date-pickers'
import moment, { Moment } from 'moment'
import 'moment/locale/es'
import { FaTrash } from 'react-icons/fa' // Import the trash icon
import mockConfigSlots from '../mocks/mockConfigSlot'
import clsx from 'clsx'
import '../styles/calendar.css'
import mockAppointments, { Appointment } from '../mocks/appoinmet'



moment.locale('es')



// Agrega la importación de ConfigSlot
import { ConfigSlot } from '../mocks/mockConfigSlot'

// Extrae los días únicos con slots
const getUniqueDaysWithSlots = () => {
	const uniqueDays = new Set<string>()
	mockConfigSlots.forEach(slot => {
		const day = moment(slot.initial).format('YYYY-MM-DD')
		uniqueDays.add(day)
	})
	return Array.from(uniqueDays)
}

// Extrae los días únicos con appointments
const getUniqueDaysWithAppointments = () => {
	const uniqueDays = new Set<string>()
	mockAppointments.data.forEach(appointment => {
		const day = moment(appointment.startDate).format('YYYY-MM-DD')
		uniqueDays.add(day)
	})
	return Array.from(uniqueDays)
}

interface CustomDayProps extends PickersDayProps<Moment> {
	selectedDay: Moment | null
	hoveredDay: Moment | null
	onPointerEnter: (day: Moment) => void
	onPointerLeave: () => void
}

const CustomDay: React.FC<CustomDayProps> = props => {
	const {
		day,
		selectedDay,
		hoveredDay,
		onPointerEnter,
		onPointerLeave,
		...other
	} = props
	const isDayWithSlot = getUniqueDaysWithSlots().includes(
		day.format('YYYY-MM-DD')
	)
	const isDayWithAppointment = getUniqueDaysWithAppointments().includes(
		day.format('YYYY-MM-DD')
	)

	return (
		<PickersDay
			{...other}
			day={day}
			onMouseEnter={() => onPointerEnter(day)}
			onMouseLeave={onPointerLeave}
			style={{
				...(isDayWithSlot && {
					border: '2px solid #7445C7', // Color azul-500 de Tailwind
					borderRadius: '50%',
					color: '#7445C7' // Color azul-500 de Tailwind
				}),
				...(isDayWithAppointment && {
					border: '2px solid #7445C7', // Different color for appointments
					borderRadius: '50%',
					color: '#7445C7' // Different color for appointments
				}),
				...(day.isSame(selectedDay, 'day') && {
					backgroundColor: 'rgba(116, 69, 199, 0.12)', // Fondo azul-500 de Tailwind
					color: '#FD8847' // Color azul-500 de Tailwind
				}),
				...(day.isSame(hoveredDay, 'day') && {
					backgroundColor: 'rgba(116, 69, 199, 0.04)' // Fondo hover azul-500 de Tailwind
				})
			}}
		/>
	)
}

const CalendarProfesional: React.FC = () => {
	const [selectedDate, setSelectedDate] = useState<Moment | null>(moment())
	const [hoveredDay, setHoveredDay] = useState<Moment | null>(null)
	const [selectedSlots, setSelectedSlots] = useState<ConfigSlot[]>([])
	const [selectedSlot, setSelectedSlot] = useState<ConfigSlot | null>(null)
	const [showConfirmButton, setShowConfirmButton] = useState<boolean>(false)
	const [appointmentsForSelectedDate, setAppointmentsForSelectedDate] =
		useState<Appointment[]>([])

	const handleDateChange = (date: Moment | null) => {
		setSelectedDate(date)
	}

	useEffect(() => {
		if (selectedDate) {
			const selectedDaySlots = mockConfigSlots.filter(slot =>
				moment(slot.initial).isSame(selectedDate, 'day')
			)
			setSelectedSlots(selectedDaySlots)
			setSelectedSlot(null)
			setShowConfirmButton(false)

			const appointments = mockAppointments.data.filter(appointment =>
				moment(appointment.startDate).isSame(selectedDate, 'day')
			)
			setAppointmentsForSelectedDate(appointments)
		}
	}, [selectedDate])

	const handleSlotClick = (slot: ConfigSlot) => {
		if (selectedSlot === slot && showConfirmButton) {
			setSelectedSlot(null)
			setShowConfirmButton(false)
		} else {
			setSelectedSlot(slot)
			setShowConfirmButton(true)
		}
	}

	const handleConfirmClick = () => {
		alert(
			`Horario confirmado: ${moment(selectedSlot?.initial).format('HH:mm')} - ${moment(selectedSlot?.end).format('HH:mm')}`
		)
	}

	const handleDeleteAppointment = (appointmentId: number) => {
		// Logic to delete the appointment goes here
		alert(`Eliminar turno con ID: ${appointmentId}`)
		// Update the appointments list after deletion
		setAppointmentsForSelectedDate(
			appointmentsForSelectedDate.filter(
				appointment => appointment.id !== appointmentId
			)
		)
	}

	return (
		<LocalizationProvider dateAdapter={AdapterMoment} >
			<div className='h-screen px-20'>
				<div className=''>
					<div className='flex gap-4 h-screen'>
						<div className='shadow-md w-2/3 h-[550px] rounded-lg p-2'>
							<DateCalendar
								value={selectedDate}
								onChange={handleDateChange}
								showDaysOutsideCurrentMonth
								displayWeekNumber
								slots={{ day: CustomDay }}
								localeText={{
									previousMonth: 'Mes anterior',
									nextMonth: 'Mes siguiente',
									openPreviousView: 'Abrir vista anterior',
									openNextView: 'Abrir vista siguiente',
									cancelButtonLabel: 'Cancelar',
									okButtonLabel: 'Aceptar',
									todayButtonLabel: 'Hoy',
								}}
								sx={{
									'& .MuiPickersDay-root': {
										width: 60,
										height: 60,
										fontSize: 18,
										display: 'flex',
										gap: 5,
										margin: '5px'
									}
								}}
								slotProps={{
									day: ownerState => ({
										selectedDay: selectedDate,
										hoveredDay,
										onPointerEnter: (day: Moment) => setHoveredDay(day),
										onPointerLeave: () => setHoveredDay(null)
									})
								}}
							/>
						</div>
						<div className='p-4 flex flex-col gap-2'>
							{selectedSlots.length > 0 ? (
								selectedSlots.map((slot, index) => (
									<div
										key={index}
										className={clsx(
											'p-2 border border-gray-300 rounded cursor-pointer relative',
											{
												'bg-gray-800 text-white': selectedSlot === slot,
												'bg-white text-black': selectedSlot !== slot
											}
										)}
										onClick={() => handleSlotClick(slot)}
									>
										{moment(slot.initial).format('HH:mm')} -{' '}
										{moment(slot.end).format('HH:mm')}
									</div>
								))
							) : (
								<p>No hay horarios disponibles para este día.</p>
							)}

							<div>
								{showConfirmButton && selectedSlot && (
									<button
										className='p-2 bg-blue-500 text-white rounded'
										onClick={handleConfirmClick}
									>
										Confirmar
									</button>
								)}
							</div>

							<div className='mt-4'>
								<h3 className='text-lg font-bold'>Turnos del día</h3>
								{appointmentsForSelectedDate.length > 0 ? (
									appointmentsForSelectedDate.map((appointment, index) => (
										<div
											key={index}
											className='p-2 border border-gray-300 rounded my-2 flex justify-between items-center'
										>
											<div>
												<p className='font-bold'>{appointment.name}</p>
												<p>
													{moment(appointment.startDate).format('HH:mm')} -{' '}
													{moment(appointment.endDate).format('HH:mm')}
												</p>
											</div>
											<button
												className='p-2 bg-red-500 text-white rounded'
												onClick={() => handleDeleteAppointment(appointment.id)}
											>
												<FaTrash />
											</button>
										</div>
									))
								) : (
									<p>No hay turnos para este día.</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</LocalizationProvider>
	)
}

export default CalendarProfesional
