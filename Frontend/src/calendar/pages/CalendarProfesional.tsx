/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DateCalendar } from '@mui/x-date-pickers'
import moment from 'moment'
import 'moment/locale/es'
import { FaTrash } from 'react-icons/fa'
import { Tabs, Tab } from '@mui/material'
import '../styles/calendar.css'
import CustomDay from '../components/CustomDay'
import useCalendarLogic from '../hook/useCalendarLogic' // Importar el hook personalizado
import CalendarConfig from '../components/CalendarConfig'
import clsx from 'clsx'
import { getProfessionalAppointments } from '../../services/api/appointment'
import { useAuth } from '../../auth/hooks/useAuth'



const CalendarProfesional: React.FC = () => {
	const {
		selectedDate,
		hoveredDay,
		setHoveredDay, // Importa setHoveredDay desde el hook
		slots,
		selectedSlots,
		selectedSlot,
		showConfirmButton,
		appointmentsForSelectedDate,
		handleDateChange,
		handleConfigChange,
		handleSlotClick,
		handleDeleteSlot // Usar la función de eliminación
	} = useCalendarLogic() // Usar el hook personalizado

	const [tabIndex, setTabIndex] = useState(0)

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
														e.stopPropagation()
														handleDeleteSlot(slot.id) // Llama a la función de eliminación
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
											<button className='p-2 mt-3 bg-purple-700 text-white rounded'>
												Confirmar
											</button>
										)}
									</div>
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
												<button className='p-2 bg-red-500 text-white rounded'>
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
