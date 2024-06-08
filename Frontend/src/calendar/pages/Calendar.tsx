import { useAuth } from '../../auth/hooks/useAuth'
import CalendarClient from './CalenadarClient'
import CalendarProfesional from './CalendarProfesional'

export default function Calendar(): JSX.Element {
	const { decodedToken } = useAuth()

	if (decodedToken?.role === 'Client') {
		return <CalendarClient />
	}
	return <CalendarProfesional />
}
