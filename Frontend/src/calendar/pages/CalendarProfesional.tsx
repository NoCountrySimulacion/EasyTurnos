/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DateCalendar, DateCalendarSlots } from '@mui/x-date-pickers'
import moment, { Moment } from 'moment'
import 'moment/locale/es'
import { FaTrash } from 'react-icons/fa'
import { Tabs, Tab, Typography } from '@mui/material'
import '../styles/calendar.css'
import CustomDay from '../components/CustomDay'
import CalendarConfig from '../components/CalendarConfig'
import clsx from 'clsx'
import SlotModal from '../components/SlotModal'
import { useCalendar } from '../hook/useCalendar' // Importamos el hook useCalendar
import { ConfigSlot } from '../typescript/interface'
import { DayCalendarProps } from '@mui/x-date-pickers/internals'
/* import { useProfessionalClients } from '../../professional/hooks/useProfessionalClients' */
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

const CalendarProfesional: React.FC = () => {
	const {
		selectedDate,
		selectedSlots,
		selectedSlot,
		handleDateChange,
		handleConfigChange,
		handleSlotClick,
		handleCreateAppointment,
		handleDeleteSlot,
		appointments,
		professionalClients,
		handleDeleteAppointment,
		slots,
		setHoveredDay,
		hoveredDay
	} = useCalendar() // Usamos el hook useCalendar para acceder al contexto del calendario

	const [tabIndex, setTabIndex] = useState(0)
	const [isModalOpen, setModalOpen] = useState(false)
	console.log('profesionalClients', professionalClients)
	const handleModalClose = () => {
		setModalOpen(false)
	}

	const handleSlotClickWrapper = (slot: any) => {
		handleSlotClick(slot)
		setModalOpen(true)
	}

	const handleConfirmAppointment = (
		title: string,
		selectedClientID: string
	) => {
		if (selectedSlot) {
			handleCreateAppointment(selectedClientID, title)

			setModalOpen(false)
		}
	}

	// Filtrar los appointments por el día seleccionado
	const filteredAppointments = appointments
		? appointments.filter(appointment =>
				moment(appointment.startDate).isSame(selectedDate, 'day')
			)
		: []
		// Funcion formateadora de dias de la semana
	const customDayOfWeekFormatter = (date: Moment): string => {
		const dayOfWeek = date.format('dd') // Obtener el nombre completo del día de la semana en inglés
		switch (dayOfWeek) {
		case 'Mo':
			return 'L'
		case 'Tu':
			return 'M'
		case 'We':
			return 'M'
		case 'Th':
			return 'J'
		case 'Fr':
			return 'V'
		case 'Sa':
			return 'S'
		case 'Su':
			return 'D'
		default:
			return dayOfWeek
		}
	}

	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<div className='h-screen px-20 max-lg:px-5'>
				<Tabs
					value={tabIndex}
					onChange={(_e, newValue) => setTabIndex(newValue)}
				>
					<Tab label='Calendario' />
					<Tab label='Configuración' />
				</Tabs>
				{tabIndex === 0 && (
					<div className=''>
						<div className='flex flex-col gap-4 h-screen w-3/4'>
							<div className='shadow-md m max-w-[512px] min-h-[550px] rounded-lg p-2'>
								<DateCalendar
									dayOfWeekFormatter={customDayOfWeekFormatter}
									value={selectedDate}
									onChange={handleDateChange}
									showDaysOutsideCurrentMonth
									displayWeekNumber
									slots={{ day: CustomDay } as DateCalendarSlots<Moment>}
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
												slots,
												appointments // Pasamos todos los appointments al componente CustomDay
											}) as unknown as DayCalendarProps<Moment>
									}}
								/>
							</div>
							<div className='pt-4 flex flex-col gap-2  max-w-[512px]'>
								<div className='flex flex-col gap-2'>
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

										<AccordionDetails>
											<Typography>
												<section className='grid w-full my-0 mx-auto grid-cols-responsive gap-5'>
													{selectedSlots.length > 0 ? (
														selectedSlots.map(
															(slot: ConfigSlot, index: number) => (
																<div
																	key={index}
																	className={clsx(
																		'p-2 border border-gray-300 rounded cursor-pointer relative ',
																		{
																			'bg-[#7445C7] text-white':
																				selectedSlot === slot,
																			'bg-white text-black':
																				selectedSlot !== slot
																		}
																	)}
																	onClick={() => handleSlotClickWrapper(slot)}
																>
																	<div>
																		{moment(slot.startDate).format('HH:mm')} -{' '}
																		{moment(slot.endDate).format('HH:mm')}
																	</div>
																	<button
																		className='absolute top-2 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center'
																		onClick={e => {
																			e.stopPropagation()
																			handleDeleteSlot(slot.id)
																		}}
																	>
																		<FaTrash />
																	</button>
																</div>
															)
														)
													) : (
														<p className='min-w-[350px]'>
															No hay horarios disponibles para este día.
														</p>
													)}
												</section>
											</Typography>
										</AccordionDetails>
									</Accordion>
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
																className='p-2 border border-gray-300 rounded my-2 flex justify-between items-center'
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
																		handleDeleteAppointment(appointment.id)
																	}
																>
																	<FaTrash />
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
				{tabIndex === 1 && (
					<CalendarConfig onConfigChange={handleConfigChange} />
				)}
			</div>
			{selectedSlot && (
				<SlotModal
					open={isModalOpen}
					onClose={handleModalClose}
					slot={selectedSlot}
					clients={professionalClients?.data || []}
					onConfirm={handleConfirmAppointment}
				/>
			)}
		</LocalizationProvider>
	)
}

export default CalendarProfesional
