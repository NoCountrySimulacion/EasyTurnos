import React, { useState, useEffect, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { formatDate } from '@fullcalendar/react'

interface MiniCalendarProps {
	selectedDays: Date[]
	onDayClick: (date: Date) => void
}

const MiniCalendar: React.FC<MiniCalendarProps> = ({
	selectedDays,
	onDayClick
}) => {
	const calendarRef = useRef<FullCalendar | null>(null)
	const [selectedRange, setSelectedRange] = useState<{
		start: Date | null
		end: Date | null
	}>({
		start: null,
		end: null
	})

	useEffect(() => {
		if (selectedRange.start && selectedRange.end) {
			const startStr = formatDate(selectedRange.start, {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit'
			})
			const endStr = formatDate(selectedRange.end, {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit'
			})
			console.log(`Selected range: ${startStr} - ${endStr}`)
		}
	}, [selectedRange])

	const handleCalendarDayClick = (arg: any) => {
		const clickedDate = arg.date
		if (!selectedRange.start) {
			setSelectedRange({ ...selectedRange, start: clickedDate })
		} else if (!selectedRange.end && clickedDate > selectedRange.start) {
			setSelectedRange({ ...selectedRange, end: clickedDate })
		} else {
			setSelectedRange({ start: clickedDate, end: null })
		}
	}

	const handleEventClick = (arg: any) => {
		const clickedDate = new Date(arg.event.start)
		onDayClick(clickedDate)
	}

	return (
		<div className='mini-calendar'>
			<FullCalendar
				plugins={[dayGridPlugin]}
				initialView='dayGridMonth'
				events={selectedDays.map(day => ({ title: '', date: day }))}
				selectable={true}
				selectMirror={true}
				ref={calendarRef}
				dateClick={handleCalendarDayClick}
				eventClick={handleEventClick}
				aspectRatio={0.75} // Ajusta el tamaño del calendario
				height='auto' // Ajusta la altura automáticamente según el contenido
			/>
			<style>
				{`
        .selected-range {
          background-color: rgba(68, 114, 196, 0.5);
        }
        `}
			</style>
		</div>
	)
}

export default MiniCalendar
