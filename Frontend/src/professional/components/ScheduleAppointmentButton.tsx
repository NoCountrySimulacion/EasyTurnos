import { NavLink } from 'react-router-dom'
import { CalendarIcon } from './icons/Icons'
import { useAuth } from '../../auth/hooks/useAuth'

export function ScheduleAppointmentButton(): JSX.Element {
	const { decodedToken } = useAuth()
	const isProfessional = decodedToken?.role === 'Professional'

	const destination = isProfessional ? '/professional/calendar' : '/client/calendar'

	return (
		<button className='bg-[#7445C7] text-[#F8F9FA] flex items-center justify-center gap-[10px] h-[38px] w-[161px] rounded-lg text-[13px] font-bold'>
			<CalendarIcon height={18} width={18} />
			<NavLink to={destination}>
				<span>Agendar Turno</span>
			</NavLink>
		</button>
	)
}
