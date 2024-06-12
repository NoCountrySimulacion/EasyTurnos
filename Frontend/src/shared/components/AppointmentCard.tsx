import { ClientImg } from '../../professional/components/icons/Icons'
import { AppointmentCardProps } from '../typescript/interfaces'

function formatDate(dateTime: string): string {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}
	return new Date(dateTime).toLocaleDateString('es-ES', options)
}

function formatTime(dateTime: string): string {
	const options: Intl.DateTimeFormatOptions = {
		hour: '2-digit',
		minute: '2-digit'
	}
	return new Date(dateTime).toLocaleTimeString('es-ES', options)
}

export function AppointmentCard({
	name,
	startDate,
	endDate
}: AppointmentCardProps): React.ReactElement {
	return (
		<li className='flex gap-[20px] p-[15px] shadow-search rounded-[15px] cursor-pointer'>
			<ClientImg width={118} height={118} />
			<div className='h-[129px] flex flex-col justify-between items-start'>
				<span className=' font-semibold text-[28px] leading-[42px]'>
					{name}
				</span>
				<small className='text-base font-normal font-roboto'>
					{formatDate(startDate)}
				</small>
				<small className='text-base font-normal font-roboto'>
					{formatTime(startDate)} - {formatTime(endDate)}
				</small>
			</div>
		</li>
	)
}
