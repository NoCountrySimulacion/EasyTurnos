import { useAuth } from '../../auth/hooks/useAuth'
import CalendarClient from './CalendarClient'
import CalendarProfesional from './CalendarProfesional'
import { CalendarProvider } from '../context/CalendarContext' // Importamos el proveedor del contexto
import { useMediaQuery } from '../../shared/hooks/useMediaQuery'
import CalendarClientMobile from './CalendarClientMobile'
import CalendarProfesionalMobile from './CalendarProfesionalMobile'

export default function Calendar(): JSX.Element {
	const { decodedToken } = useAuth()
	const isMobileScreen = useMediaQuery('(max-width: 768px)')

	if (decodedToken?.role === 'Client') {
		return (
			<CalendarProvider>
				{' '}
				{/* Envuelve el componente con el proveedor del contexto */}
				{isMobileScreen ? <CalendarClientMobile /> : <CalendarClient />}
			</CalendarProvider>
		)
	}

	return (
		<CalendarProvider>
			{' '}
			{/* Envuelve el componente con el proveedor del contexto */}
			{isMobileScreen ? <CalendarProfesionalMobile /> : <CalendarProfesional />}
		</CalendarProvider>
	)
}
