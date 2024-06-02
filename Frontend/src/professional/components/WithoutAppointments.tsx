import { CalendarIcon } from './icons/Icons'

export function WithoutAppointments(): React.ReactElement {
	return (
		<section className='shadow-search rounded-[15px] flex flex-col  justify-center mb-20 '>
			<div className='p-10 flex flex-col gap-[60px]'>
				<p className='px-20 w-[950px] h-[247px] text-[35px] leading-[56px] content-center'>
					No tienes turnos programados para hoy. <br />
					¿Te gustaría agendar un turno o quieres agregar un cliente?
				</p>
				<button className='bg-[#7445C7] text-[#F8F9FA] flex items-center justify-center gap-[10px] h-[38px] w-[161px] rounded-lg text-[13px] font-bold'>
					<CalendarIcon height={18} width={18} />
					<span>Agendar Turno</span>
				</button>
			</div>
		</section>
	)
}
