import { AppointmentCard } from '../../shared/components/AppointmentCard'
import { appointmentsClientMock } from '../mocks/appointmentsClientMock'

export function AppointmentsList(): React.ReactElement {
	return (
		<section className='w-full flex flex-col gap-[21px] mb-[56px]'>
			<section>
				<ul className='grid grid-cols-2 gap-[54px]'>
					{appointmentsClientMock.map(appointment => (
						<AppointmentCard
							key={appointment.id}
							name={appointment.name}
							lastName={appointment.lastName}
							date={appointment.date}
							time={appointment.time}
						/>
					))}
				</ul>
			</section>
		</section>
	)
}
