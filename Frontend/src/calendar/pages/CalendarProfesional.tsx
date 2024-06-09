import React, { useState, useEffect } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DateCalendar, PickersDay, PickersDayProps } from '@mui/x-date-pickers'
import moment, { Moment } from 'moment'
import 'moment/locale/es'
import { FaTrash } from 'react-icons/fa'
import { getAllSlots, deleteSlot } from '../../services/api/slots'
import CalendarConfig from '../components/CalendarConfig'
import clsx from 'clsx'
import { Tabs, Tab } from '@mui/material'
import '../styles/calendar.css'
import mockAppointments, { Appointment } from '../mocks/appoinmet'

interface ConfigSlot {
	initial: string
	end: string
	startDate: string // Modificado para incluir startDate y endDate
	endDate: string
}

interface CustomDayProps extends PickersDayProps<Moment> {
	selectedDay: Moment | null
	hoveredDay: Moment | null
	onPointerEnter: (day: Moment) => void
	onPointerLeave: () => void
	slots: ConfigSlot[]
}

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
			onMouseEnter={() => onPointerEnter(day)}
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
				...(day.isSame(selectedDay, 'day') && {
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

const CalendarProfesional: React.FC = () => {
	const [selectedDate, setSelectedDate] = useState<Moment | null>(moment())
	const [hoveredDay, setHoveredDay] = useState<Moment | null>(null)
	const [slots, setSlots] = useState<ConfigSlot[]>([])
	const [selectedSlots, setSelectedSlots] = useState<ConfigSlot[]>([])
	const [selectedSlot, setSelectedSlot] = useState<ConfigSlot | null>(null)
	const [showConfirmButton, setShowConfirmButton] = useState<boolean>(false)
	const [appointmentsForSelectedDate, setAppointmentsForSelectedDate] =
		useState<Appointment[]>([])
	const [tabIndex, setTabIndex] = useState(0)

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

			const appointments = mockAppointments.data.filter(appointment =>
				moment(appointment.startDate).isSame(selectedDate, 'day')
			)
			setAppointmentsForSelectedDate(appointments)
		}
	}, [selectedDate, slots])

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

	const handleConfirmClick = () => {
		alert(
			`Horario confirmado: ${moment(selectedSlot?.initial).format('HH:mm')} - ${moment(
				selectedSlot?.end
			).format('HH:mm')}`
		)
	}

	const handleDeleteAppointment = (appointmentId: number) => {
		alert(`Eliminar turno con ID: ${appointmentId}`)
		setAppointmentsForSelectedDate(
			appointmentsForSelectedDate.filter(
				appointment => appointment.id !== appointmentId
			)
		)
	}

	const handleDeleteSlot = async (
		slotStartDate: string,
		slotStartTime: string,
		slotEndTime: string
	) => {
		try {
			// Filtrar la lista de slots para encontrar el slot con la misma fecha, hora de inicio y hora de fin
			const filteredSlots = slots.filter(
				slot =>
					moment(slot.startDate).format('YYYY-MM-DD HH:mm') ===
						`${slotStartDate} ${slotStartTime}` &&
					moment(slot.endDate).format('YYYY-MM-DD HH:mm') ===
						`${slotStartDate} ${slotEndTime}`
			)

			if (filteredSlots.length > 0) {
				const slotToDelete = filteredSlots[0] // Tomar el primer slot que coincida con los criterios

				// Llama a la función para eliminar el slot
				await deleteSlot()
				console.log('Slot eliminado correctamente:', slotToDelete)
				// Actualiza la lista de slots después de eliminar el slot
				setSlots(prevSlots => prevSlots.filter(slot => slot !== slotToDelete))
			} else {
				console.error('No se encontró ningún slot para eliminar')
			}
		} catch (error) {
			console.error('Error al eliminar el slot:', error)
		}
	}

	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<div className='h-screen px-20'>
				<Tabs
					value={tabIndex}
					onChange={(_e, newValue) => setTabIndex(newValue)}
				>
					<Tab label='Calendario' />
					<Tab label='Configuración' />
				</Tabs>
				{tabIndex === 0 && (
					<div className=''>
						<div className='flex gap-4 h-screen'>
							<div className='shadow-md w-3/4 h-[550px] rounded-lg p-2'>
								<DateCalendar
									value={selectedDate}
									onChange={handleDateChange}
									showDaysOutsideCurrentMonth
									displayWeekNumber
									slots={{ day: CustomDay }}
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
										day: _ownerState => ({
											selectedDay: selectedDate,
											hoveredDay,
											onPointerEnter: (day: Moment) => setHoveredDay(day),
											onPointerLeave: () => setHoveredDay(null),
											slots: slots
										})
									}}
								/>
							</div>
							{/* Horarios Libres */}
							<div className='p-4 flex flex-col gap-2'>
								<div className='flex flex-col gap-2'>
									<h3 className='text-lg font-bold'>Horarios Disponibles</h3>
									{selectedSlots.length > 0 ? (
										selectedSlots.map((slot, index) => (
											<div
												key={index}
												className={clsx(
													'p-2 border border-gray-300 rounded cursor-pointer relative ',
													{
														'bg-[#7445C7] text-white': selectedSlot === slot,
														'bg-white text-black': selectedSlot !== slot
													}
												)}
												onClick={() => handleSlotClick(slot)}
											>
												<div>
													{moment(slot.startDate).format('HH:mm')} -{' '}
													{moment(slot.endDate).format('HH:mm')}
												</div>
												<button
													className='absolute top-2 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center'
													onClick={e => {
														e.stopPropagation() // Evita que se propague el evento al hacer clic en el botón
														handleDeleteSlot(
															moment(slot.startDate).format('YYYY-MM-DD'), // Fecha de inicio del slot
															moment(slot.startDate).format('HH:mm'), // Hora de inicio del slot
															moment(slot.endDate).format('HH:mm') // Hora de fin del slot
														) // Llama a la función para eliminar el slot
													}}
												>
													<FaTrash />
												</button>
											</div>
										))
									) : (
										<p>No hay horarios disponibles para este día.</p>
									)}
									<div>
										{showConfirmButton && selectedSlot && (
											<button
												className='p-2 mt-3 bg-purple-700 text-white rounded'
												onClick={handleConfirmClick}
											>
												Confirmar
											</button>
										)}
									</div>
								</div>

								{/* Turnos */}
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
													onClick={() =>
														handleDeleteAppointment(appointment.id)
													}
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
				)}
				{tabIndex === 1 && (
					<CalendarConfig onConfigChange={handleConfigChange} />
				)}
			</div>
		</LocalizationProvider>
	)
}

export default CalendarProfesional
