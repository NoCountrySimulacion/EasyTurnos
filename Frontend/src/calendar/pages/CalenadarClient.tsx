import React, { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DateCalendar } from '@mui/x-date-pickers'
import moment from 'moment'
import 'moment/locale/es'
import { Tabs, Tab } from '@mui/material'
import '../styles/calendar.css'
import CustomDay from '../components/CustomDay'
import { useCalendar } from '../hook/useCalendar'
import clsx from 'clsx'

const CalendarClient: React.FC = () => {
	const {
		selectedDate,
		hoveredDay,
		setHoveredDay,
		selectedSlot,
		handleDateChange,
		handleSlotClick,
		handleCreateClientAppointment,
		appointments,
		clientProfessional,
		handleClientDeleteAppointment,
	} = useCalendar()
	const [tabIndex, setTabIndex] = useState(0)
	const [selectedSlotForConfirmation, setSelectedSlotForConfirmation] =
		useState<any | null>(null)

	const handleSlotClickWrapper = (slot: any) => {
		handleSlotClick(slot)
		setSelectedSlotForConfirmation(slot)
	}

	const handleConfirmAppointment = () => {
		if (selectedSlotForConfirmation) {
			handleCreateClientAppointment()
			setSelectedSlotForConfirmation(null)
		}
	}

	const filteredAppointments = appointments
		? appointments.filter(appointment =>
			moment(appointment.startDate).isSame(selectedDate, 'day')
		)
		: []

	// Filtrar slots según la fecha seleccionada
	const availableSlots =
		clientProfessional?.data[0]?.slots.filter(slot =>
			moment(slot.startDate).isSame(selectedDate, 'day')
		) || []

	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<div className='h-screen px-20'>
				<Tabs
					value={tabIndex}
					onChange={(_e, newValue) => setTabIndex(newValue)}
				>
					<Tab label='Calendario' />
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
											onPointerEnter: (day: moment.Moment) =>
												setHoveredDay(day),
											onPointerLeave: () => setHoveredDay(null),
											slots: availableSlots,
											appointments
										})
									}}
								/>
							</div>
							<div className='p-4 flex flex-col gap-2'>
								<div className='flex flex-col gap-2'>
									<h3 className='text-lg font-bold'>Horarios Disponibles</h3>
									{availableSlots.length > 0 ? (
										availableSlots.map((slot, index) => (
											<div
												key={index}
												className={clsx(
													'p-2 border border-gray-300 rounded cursor-pointer relative ',
													{
														'bg-[#7445C7] text-white': selectedSlot === slot,
														'bg-white text-black': selectedSlot !== slot
													}
												)}
												onClick={() => handleSlotClickWrapper(slot)}
											>
												<div>
													{moment(slot.startDate).format('HH:mm')} -{' '}
													{moment(slot.endDate).format('HH:mm')}
												</div>
											</div>
										))
									) : (
										<p>No hay horarios disponibles para este día.</p>
									)}
									<div>
										{selectedSlotForConfirmation && (
											<div className='flex justify-center mt-4'>
												<button
													className='bg-purple-500 text-white p-2 rounded'
													onClick={handleConfirmAppointment}
												>
													Confirmar
												</button>
											</div>
										)}
									</div>
								</div>
								<div className='mt-4'>
									<h3 className='text-lg font-bold'>Turnos del día</h3>
									{filteredAppointments.length > 0 ? (
										filteredAppointments.map((appointment, index) => (
											<div
												key={index}
												className='p-2 border border-gray-300 rounded my-2 flex justify-between items-center'
											>
												<div>
													<p className='font-bold'>
														{appointment.name || appointment.firstName}
													</p>
													<p>
														{moment(appointment.startDate).format('HH:mm')} -{' '}
														{moment(appointment.endDate).format('HH:mm')}
													</p>
												</div>
												<button
													className='p-2 bg-red-500 text-white rounded'
													onClick={() =>
														handleClientDeleteAppointment(appointment.id)
													}
												>
													Delete
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
			</div>
		</LocalizationProvider>
	)
}

export default CalendarClient
