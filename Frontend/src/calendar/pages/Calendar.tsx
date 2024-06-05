// src/pages/Calendar.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import {
	Calendar as BigCalendar,
	momentLocalizer,
	Views
} from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import CalendarSlider from '../components/CalendarSlider'
import patients from '../mocks/mock'
import AddEvent from '../components/AddEvent'

moment.locale('es')
const localizer = momentLocalizer(moment)

const messages = {
	allDay: 'Todo el día',
	previous: 'Anterior',
	next: 'Siguiente',
	today: 'Hoy',
	month: 'Mes',
	week: 'Semana',
	day: 'Día',
	agenda: 'Agenda',
	date: 'Fecha',
	time: 'Hora',
	event: 'Evento',
	noEventsInRange: 'No hay eventos en este rango.',
	showMore: (total: any) => `+ Ver más (${total})`
}

// Obtener los días no disponibles dinámicamente para el mes actual
const getUnavailableDates = () => {
	const currentYear = new Date().getFullYear()
	const currentMonth = new Date().getMonth()
	const unavailableDates = []
	for (let day = 10; day <= 15; day++) {
		unavailableDates.push(new Date(currentYear, currentMonth, day))
	}
	return unavailableDates
}

const unavailableDates = getUnavailableDates()

const Calendar: React.FC = () => {
	const [myEvents, setMyEvents] = useState(
		patients.map(patient => ({
			title: patient.title,
			start: patient.start,
			end: patient.end
		}))
	)
	const [timeRange, setTimeRange] = useState([1, 23])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedSlot, setSelectedSlot] = useState<{
		start: Date
		end: Date
	} | null>(null)

	const handleTimeRangeChange = (values: number[]) => {
		setTimeRange(values)
	}

	const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
		const isUnavailable = unavailableDates.some(
			unavailableDate => unavailableDate.toDateString() === start.toDateString()
		)

		if (!isUnavailable) {
			setSelectedSlot({ start, end })
			setIsModalOpen(true)
		}
	}

	const handleAddEvent = (title: string, start: Date, end: Date) => {
		setMyEvents([...myEvents, { title, start, end }])
		setIsModalOpen(false) // Close the modal after adding the event
	}

	const dayPropGetter = (date: Date) => {
		const isUnavailable = unavailableDates.some(
			unavailableDate => unavailableDate.toDateString() === date.toDateString()
		)

		if (isUnavailable) {
			return {
				style: {
					backgroundColor: '#f0d0d0',
					pointerEvents: 'none',
					opacity: 0.5
				}
			}
		}
		return {}
	}

	return (
		<div className='p-4 w-full h-screen flex flex-col gap-5'>
			<CalendarSlider
				timeRange={timeRange}
				onTimeRangeChange={handleTimeRangeChange}
			/>
			<BigCalendar
				localizer={localizer}
				events={myEvents}
				startAccessor='start'
				endAccessor='end'
				defaultView='week'
				views={[Views.AGENDA, Views.WEEK, Views.MONTH]}
				messages={messages}
				min={new Date(2023, 1, 1, timeRange[0], 0)}
				max={new Date(2023, 1, 1, timeRange[1], 0)}
				selectable
				onSelectSlot={handleSelectSlot}
				dayPropGetter={dayPropGetter}
			/>
			{selectedSlot && (
				<AddEvent
					open={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					onAddEvent={handleAddEvent}
					initialStart={selectedSlot.start}
					initialEnd={selectedSlot.end}
				/>
			)}
		</div>
	)
}

export default Calendar
