/* eslint-disable indent */
import React, { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DateCalendar, DateCalendarSlots } from '@mui/x-date-pickers'
import moment, { Moment } from 'moment'
import 'moment/locale/es'
import { Tabs, Tab, Typography } from '@mui/material'
import '../styles/calendar.css'
import CustomDay from '../components/CustomDay'
import { useCalendar } from '../hook/useCalendar'
import clsx from 'clsx'
import { ConfigSlot } from '../typescript/interface'
import { DayCalendarProps } from '@mui/x-date-pickers/internals'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

const CalendarClient: React.FC = () => {
	const {
		selectedDate,
		selectedSlot,
		handleDateChange,
		handleSlotClick,
		handleCreateClientAppointment,
		appointments,
		clientProfessional,
		handleClientDeleteAppointment,
		setHoveredDay,
		hoveredDay
	} = useCalendar()
	const [tabIndex, setTabIndex] = useState(0)
	const [selectedSlotForConfirmation, setSelectedSlotForConfirmation] =
		useState<ConfigSlot | null>(null)

	const handleSlotClickWrapper = (slot: ConfigSlot) => {
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
		clientProfessional?.data[0].slots.filter(slot =>
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
						<div className='flex flex-col gap-4 h-screen'>
							<div className='shadow-md w-3/4 max-w-[512px] min-h-[550px] rounded-lg p-2'>
								<DateCalendar
									value={selectedDate}
									onChange={handleDateChange}
									showDaysOutsideCurrentMonth
									displayWeekNumber
									slots={{ day: CustomDay } as DateCalendarSlots<Moment>} //Arreglado a maso meno
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
										day: () =>
											({
												selectedDay: selectedDate,
												hoveredDay,
												onPointerEnter: (day: moment.Moment) =>
													setHoveredDay(day),
												onPointerLeave: () => setHoveredDay(null),
												slots: availableSlots,
												appointments
											}) as unknown as DayCalendarProps<Moment>
									}}
								/>
							</div>
							<div className='pt-4 flex flex-col gap-2 max-w-[512px]'>
								<div className='flex flex-col gap-2 '>
									<Accordion>
										<AccordionSummary
											expandIcon={<ArrowDropDownIcon />}
											aria-controls='panel1-content'
											id='panel1-header'
										>
											<Typography>
												<h3 className='text-lg font-bold'>
													Horarios Disponibles
												</h3>
											</Typography>
										</AccordionSummary>
										ñ
										<AccordionDetails>
											<Typography>
												<section className='grid w-full my-0 mx-auto grid-cols-responsive gap-5'>
													{availableSlots.length > 0 ? (
														availableSlots.map((slot, index) => (
															<div
																key={index}
																className={clsx(
																	'p-2 border border-gray-300 rounded cursor-pointer relative hover:bg-[#D3CAFF] transition duration-300 hover:border hover:border-[#7445C7]',
																	{
																		'bg-[#7445C7] text-white':
																			selectedSlot === slot,
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
														<p className='min-w-[350px]'>
															No hay horarios disponibles para este día.
														</p>
													)}
												</section>
											</Typography>
										</AccordionDetails>
									</Accordion>
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
									<Accordion>
										<AccordionSummary
											expandIcon={<ArrowDropDownIcon />}
											aria-controls='panel1-content'
											id='panel1-header'
										>
											<Typography>
												<h3 className='text-lg font-bold'>Turnos del día</h3>
											</Typography>
										</AccordionSummary>

										<AccordionDetails>
											<Typography>
												<section className='grid w-full my-0 mx-auto grid-cols-responsive gap-5'>
													{filteredAppointments.length > 0 ? (
														filteredAppointments.map((appointment, index) => (
															<div
																key={index}
																className='p-2 border border-gray-300 rounded my-2 flex justify-between items-center hover:bg-[#D3CAFF] transition duration-300 hover:border hover:border-[#7445C7]'
															>
																<div>
																	<p className='font-bold'>
																		{appointment.name || appointment.firstName}
																	</p>
																	<p>
																		{moment(appointment.startDate).format(
																			'HH:mm'
																		)}{' '}
																		-{' '}
																		{moment(appointment.endDate).format(
																			'HH:mm'
																		)}
																	</p>
																</div>
																<button
																	className='p-2 bg-red-500 text-white rounded'
																	onClick={() =>
																		handleClientDeleteAppointment(
																			appointment.id
																		)
																	}
																>
																	Delete
																</button>
															</div>
														))
													) : (
														<p className='min-w-[250px]'>
															No hay turnos para este día.
														</p>
													)}
												</section>
											</Typography>
										</AccordionDetails>
									</Accordion>
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
