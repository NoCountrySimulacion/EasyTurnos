import React, { useState, useEffect } from 'react'
import {
	Calendar as BigCalendar,
	momentLocalizer,
	Views
} from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import patients from '../mocks/mock'
import AddEvent from '../components/AddEvent'
import CalendarConfig from '../components/CalendarConfig'

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
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedSlot, setSelectedSlot] = useState<{
		start: Date
		end: Date
	} | null>(null)
	const [calendarConfig, setCalendarConfig] = useState<any[]>([])

	useEffect(() => {
		const savedConfig = localStorage.getItem('calendarConfig')
		if (savedConfig) {
			setCalendarConfig(JSON.parse(savedConfig))
		}
	}, [])

	const handleConfigChange = (config: any[]) => {
		setCalendarConfig(config)
		localStorage.setItem('calendarConfig', JSON.stringify(config))
	}

	const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
		const isUnavailable = unavailableDates.some(
			unavailableDate => unavailableDate.toDateString() === start.toDateString()
		)
		const isInTimeRange = calendarConfig.some(
			config => start >= new Date(config.initial) && end <= new Date(config.end)
		)

		if (!isUnavailable && isInTimeRange) {
			setSelectedSlot({ start, end })
			setIsModalOpen(true)
		}
	}

	const handleAddEvent = (title: string, start: Date, end: Date) => {
		setMyEvents([...myEvents, { title, start, end }])
		setIsModalOpen(false)
	}

	const slotPropGetter = (date: Date) => {
		const isInTimeRange = calendarConfig.some(
			config => date >= new Date(config.initial) && date < new Date(config.end)
		)

		if (!isInTimeRange) {
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
		<div className='p-4 w-full h-[100%] flex flex-col gap-5'>
			<CalendarConfig onConfigChange={handleConfigChange} />
			<BigCalendar
				localizer={localizer}
				events={myEvents}
				startAccessor='start'
				endAccessor='end'
				defaultView='week'
				views={[Views.AGENDA, Views.WEEK, Views.MONTH]}
				messages={messages}
				min={new Date(2023, 1, 1, 1, 0)} // Mínimo a las 01:00 AM
				max={new Date(2023, 1, 1, 23, 0)} // Máximo a las 11:00 PM
				selectable
				onSelectSlot={handleSelectSlot}
				slotPropGetter={slotPropGetter}
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
