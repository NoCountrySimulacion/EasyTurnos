/* eslint-disable indent */
import { useSearch } from '../../layout/hooks/useSearch'
import { AppointmentCard } from '../../shared/components/AppointmentCard'
import { useAppointments } from '../hooks/useAppointments'
import { appointmentsMock } from '../mocks/appointments'
import { CalendarIcon } from './icons/Icons'

export function AppointmentsList(): React.ReactElement {
	const { appointmentList } = useAppointments()
	const { filterResults } = useSearch()

	const filterAppointmentsList = filterResults(appointmentsMock)

	return (
		<section className='w-full flex flex-col gap-[52px] mb-[56px]'>
			<header className='flex justify-between items-center h-[76px]'>
				<button className='w-full shadow-search text-[33px] font-bold leading-[56px] rounded-[15px] py-[15px] hover:bg-[#D3CAFF] transition duration-300 hover:border hover:border-[#7445C7]'>
					Para el día de hoy tienes {appointmentsMock.length} citas.
				</button>
			</header>
			<section>
				<ul className='grid grid-cols-2 gap-[54px]'>
					{filterAppointmentsList.map(appointment => (
						<AppointmentCard
							key={appointment.id}
							name={appointment.name}
							// startDate={appointment.startDate}
							// endDate={appointment.endDate}
						/>
					))}
				</ul>
			</section>
			<footer>
				<button className='bg-[#7445C7] text-[#F8F9FA] flex items-center justify-center gap-[10px] h-[38px] w-full rounded-lg text-[13px] font-bold leading-[18.2px]'>
					<CalendarIcon height={18} width={18} />
					<span>Agendar Turno</span>
				</button>
			</footer>
		</section>
	)
}
