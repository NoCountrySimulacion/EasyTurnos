import { appointmentsMock } from '../mocks/appointments'
import { AppointmentCard } from './ApopintmentCard'
import { CalendarIcon } from './icons/Icons'

export function AppointmentsList(): React.ReactElement {
	return (
		<section className='w-full flex flex-col gap-[52px] mb-[56px]'>
			<header className='flex justify-between items-center h-[76px]'>
				<button className='w-full shadow-search text-[33px] font-bold leading-[56px] rounded-[15px] py-[15px] hover:bg-[#D3CAFF] transition duration-300 hover:border hover:border-[#7445C7]'>
					Para el día de hoy tienes {appointmentsMock.length} citas.
				</button>
			</header>
			<section>
				<ul className='grid grid-cols-2 gap-[54px]'>
					{appointmentsMock.map(appointment => (
						<AppointmentCard
							key={appointment.id}
							name={appointment.name}
							lastName={appointment.lastName}
							profession={appointment.profession}
							time={appointment.time}
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
