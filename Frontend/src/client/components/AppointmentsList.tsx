import { useSearch } from '../../layout/hooks/useSearch'
import { useAppointments } from '../../shared/hooks/useAppointments'
import { ClientAppointmentList } from '../../services/typescript/interface'
import { AppointmentCard } from '../../shared/components/AppointmentCard'

export function AppointmentsList(): React.ReactElement {
	const { appointmentList } = useAppointments()
	const { filterClientsAppointmentsList } = useSearch()

	const filterAppointmentsList: ClientAppointmentList = appointmentList
		? filterClientsAppointmentsList(appointmentList)
		: { data: [], success: false, message: 'No data available' }
	return (
		<section className='w-full flex flex-col gap-[21px] mb-[56px]'>
			<section>
				<ul className='grid grid-cols-2 gap-[54px]'>
					{filterAppointmentsList.data.map(appointment => (
						<AppointmentCard
							key={appointment.id}
							name={appointment.name}
							startDate={appointment.startDate}
							endDate={appointment.endDate}
							speciality={appointment.speciality}
						/>
					))}
				</ul>
			</section>
		</section>
	)
}
