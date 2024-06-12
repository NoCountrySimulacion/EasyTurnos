/* eslint-disable indent */
import { Link } from 'react-router-dom'
import { useSearch } from '../../layout/hooks/useSearch'
import { ProfessionalAppointmentList } from '../../services/typescript/interface'
import { AppointmentCard } from '../../shared/components/AppointmentCard'
import { useAppointments } from '../../shared/hooks/useAppointments'
import { CalendarIcon } from './icons/Icons'

export function AppointmentsList(): React.ReactElement {
	const { appointmentList } = useAppointments()
	const { filterClientsAppointmentsList } = useSearch()

	const filterAppointmentsList: ProfessionalAppointmentList = appointmentList
		? filterClientsAppointmentsList(appointmentList)
		: { data: [], success: false, message: 'No data available' }

	console.log(filterAppointmentsList)

	return (
		<section className='w-full flex flex-col gap-[52px] mb-[56px]'>
			<header className='flex justify-between items-center h-[76px]'>
				<Link
					to='/professional/calendar'
					className='w-full text-center shadow-search text-[33px] font-bold leading-[56px] rounded-[15px] py-[15px] hover:bg-[#D3CAFF] transition duration-300 hover:border hover:border-[#7445C7]'
				>
					Para el día de hoy tienes{' '}
					{appointmentList && appointmentList.data
						? appointmentList.data.length
						: 0}{' '}
					citas.
				</Link>
			</header>
			<section>
				{filterAppointmentsList &&
					filterAppointmentsList.data &&
					filterAppointmentsList.data.length > 0 && (
						<ul className='grid grid-cols-2 gap-[54px]'>
							{filterAppointmentsList.data.map(appointment => (
								<AppointmentCard
									key={appointment.id}
									name={
										appointment.name
											? appointment.name
											: appointment.firstName + ' ' + appointment.lastName
									}
									startDate={appointment.startDate}
									endDate={appointment.endDate}
								/>
							))}
						</ul>
					)}
			</section>

			<footer>
				<button className='bg-[#7445C7] text-[#F8F9FA] flex items-center justify-center gap-[10px] h-[38px] w-full rounded-lg text-[13px] font-bold leading-[18.2px] hover:bg-purple-600 transition duration-300 ease-in-out'>
					<CalendarIcon height={18} width={18} />
					<span>Agendar Turno</span>
				</button>
			</footer>
		</section>
	)
}
