import { ScheduleAppointmentButton } from './ScheduleAppointmentButton'

export function WithoutAppointments(): React.ReactElement {
	return (
		<section className='shadow-search rounded-[15px] flex flex-col  justify-center mb-20 '>
			<div className='p-10 flex flex-col gap-[60px]'>
				<p className='px-20 w-[950px] h-[247px] text-[35px] leading-[56px] content-center'>
					No tienes turnos programados para hoy. <br />
					¿Te gustaría agendar un turno o quieres agregar un cliente?
				</p>
				<ScheduleAppointmentButton />
			</div>
		</section>
	)
}
