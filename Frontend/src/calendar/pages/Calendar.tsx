// src/components/Calendar.tsx
import React, { useState } from 'react'
import {
	Calendar as BigCalendar,
	momentLocalizer,
	Views,
	SlotInfo
} from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import AddEvent from '../components/AddEvent'
import CalendarConfig from '../components/CalendarConfig'
import mockConfigSlots from '../mocks/mockConfigSlot'

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

interface Event {
	title: string
	start: Date
	end: Date
}

interface ConfigSlot {
	day: string
	initial: string
	end: string
}

const Calendar: React.FC = () => {
	const [myEvents, setMyEvents] = useState<Event[]>([])
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [selectedSlot, setSelectedSlot] = useState<{
		start: Date
		end: Date
	} | null>(null)
	const [calendarConfig, setCalendarConfig] =
		useState<ConfigSlot[]>(mockConfigSlots)

	const handleSelectSlot = (slotInfo: SlotInfo) => {
		const { start, end } = slotInfo

		const isValidSlot = calendarConfig.some(
			config =>
				new Date(config.initial).getTime() === start.getTime() &&
				new Date(config.end).getTime() === end.getTime()
		)

		if (isValidSlot) {
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
					backgroundColor: '#7445C7',
					pointerEvents: 'none',
					opacity: 0.5
				}
			}
		} else {
			return {
				style: {
					cursor: 'pointer'
				}
			}
		}
	}

	return (
		<div className='p-4 w-full h-[100%] flex flex-col gap-5'>
			<CalendarConfig />
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
