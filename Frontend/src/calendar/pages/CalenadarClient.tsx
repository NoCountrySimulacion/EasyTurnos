import React, { useState, useEffect } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DateCalendar } from '@mui/x-date-pickers'
import moment, { Moment } from 'moment'
import 'moment/locale/es'
import { Tabs, Tab } from '@mui/material'
import '../styles/calendar.css'
import CustomDay from '../components/CustomDay'
import useCalendarLogic from '../hook/useCalendarLogic'
import CalendarConfig from '../components/CalendarConfig'
import clsx from 'clsx'

const CalendarProfesional: React.FC = () => {
	const {
		selectedDate,
		hoveredDay,
		setHoveredDay,
		slots,
		selectedSlots,
		selectedSlot,
		showConfirmButton,
		appointmentsForSelectedDate,
		handleDateChange,
		handleConfigChange,
		handleSlotClick,
		handleCreateAppointment,
		appointments,
		...otherFunctions
	} = useCalendarLogic()

	const [tabIndex, setTabIndex] = useState(0)

	const handleConfirmAppointment = async () => {
		if (showConfirmButton) {
			await handleCreateAppointment()
			setShowConfirmButton(false)
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
											slots,
											appointments: appointments.filter(appointment =>
												moment(appointment.startDate).isSame(
													selectedDate,
													'day'
												)
											)
										})
									}}
								/>
							</div>
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
											</div>
										))
									) : (
										<p>No hay horarios disponibles para este día.</p>
									)}
									<div>
										{showConfirmButton && selectedSlot && (
											<button
												className='p-2 mt-3 bg-purple-700 text-white rounded'
												onClick={handleConfirmAppointment}
											>
												Confirmar
											</button>
										)}
									</div>
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
