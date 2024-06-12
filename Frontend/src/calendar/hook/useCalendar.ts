import { useContext } from 'react'
import { CalendarContext, CalendarContextProps } from '../context/CalendarContext'

export const useCalendar = (): CalendarContextProps => {
	const context = useContext(CalendarContext)

	if (!context) {
		throw new Error(
			'useCalendar debe usarse dentro de un proveedor CalendarProvider'
		)
	}

	return context
}
