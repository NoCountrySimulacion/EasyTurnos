import { CalendarIcon } from './icons/Icons'

export function ScheduleAppointmentButton(): JSX.Element {
	return (
		<button className='bg-[#7445C7] text-[#F8F9FA] flex items-center justify-center gap-[10px] h-[38px] w-[161px] rounded-lg text-[13px] font-bold'>
			<CalendarIcon height={18} width={18} />
			<span>Agendar Turno</span>
		</button>
	)
}
