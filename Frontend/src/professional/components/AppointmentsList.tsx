/* eslint-disable indent */
import { Link } from 'react-router-dom'
import { useSearch } from '../../layout/hooks/useSearch'
import { ProfessionalAppointmentList } from '../../services/typescript/interface'
import { AppointmentCard } from '../../shared/components/AppointmentCard'
import { useAppointments } from '../../shared/hooks/useAppointments'
import { CalendarIcon } from './icons/Icons'

function capitalizeName(name: string): string {
	return name.replace(/\b\w/g, char => char.toUpperCase())
}

export function AppointmentsList(): React.ReactElement {
	const { appointmentList } = useAppointments()
	const { filterClientsAppointmentsList, todayAppointmentsCount } = useSearch()

	const filterAppointmentsList: ProfessionalAppointmentList = appointmentList
		? filterClientsAppointmentsList(appointmentList)
		: { data: [], success: false, message: 'No data available' }
	console.log('Today Appointments Count:', todayAppointmentsCount)

	return (
		<section className='w-full flex flex-col gap-[52px] mb-[56px]'>
			<header className='flex justify-between items-center h-[76px]'>
				<Link
					to='/professional/calendar'
					className='w-full text-center shadow-search text-[33px] max-sm:text-[30px] font-bold leading-[56px] rounded-[15px] py-[15px] hover:bg-[#D3CAFF] transition duration-300 hover:border hover:border-[#7445C7]'
				>
					Para el día de hoy tienes {todayAppointmentsCount} citas.
				</Link>
			</header>
			<section>
				{filterAppointmentsList &&
					filterAppointmentsList.data &&
					filterAppointmentsList.data.length > 0 && (
						<ul className='grid grid-cols-2 max-xl:grid-cols-1 gap-[54px] max-sm:gap-10'>
							{filterAppointmentsList.data.map(appointment => (
								<AppointmentCard
									key={appointment.id}
									name={capitalizeName(
										appointment.name
											? appointment.name
											: appointment.firstName + ' ' + appointment.lastName
									)}
									startDate={appointment.startDate}
									endDate={appointment.endDate}
								/>
							))}
						</ul>
					)}
			</section>

			<footer>
				<Link
					to='/professional/calendar'
					className='bg-[#7445C7] text-[#F8F9FA] flex items-center justify-center gap-[10px] h-[38px] w-full rounded-lg text-[13px] font-bold leading-[18.2px] hover:bg-purple-600 transition duration-300 ease-in-out'
				>
					<CalendarIcon height={18} width={18} />
					<span>Agendar Turno</span>
				</Link>
			</footer>
		</section>
	)
}
