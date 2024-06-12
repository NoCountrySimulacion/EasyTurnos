import { useAuth } from '../../auth/hooks/useAuth'
import CalendarClient from './CalenadarClient'
import CalendarProfesional from './CalendarProfesional'
import { CalendarProvider } from '../context/CalendarContext' // Importamos el proveedor del contexto

export default function Calendar(): JSX.Element {
	const { decodedToken } = useAuth()

	if (decodedToken?.role === 'Client') {
		return (
			<CalendarProvider>
				{' '}
				{/* Envuelve el componente con el proveedor del contexto */}
				<CalendarClient />
			</CalendarProvider>
		)
	}

	return (
		<CalendarProvider>
			{' '}
			{/* Envuelve el componente con el proveedor del contexto */}
			<CalendarProfesional />
		</CalendarProvider>
	)
}
