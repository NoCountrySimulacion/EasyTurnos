import { ScheduleAppointmentButton } from '../../professional/components/ScheduleAppointmentButton'

export function WithoutAppointments(): React.ReactElement {
	return (
		<section className='shadow-search rounded-[15px] flex flex-col justify-center mb-20'>
			<div className='p-10 flex flex-col gap-[60px]'>
				<p className=' w-[950px] h-[191px] text-[35px] leading-[56px] content-center font-montserrat'>
					No tienes turnos agendados. <br /> ¿Te gustaría agendar un turno?
				</p>
				<ScheduleAppointmentButton />
			</div>
		</section>
	)
}
