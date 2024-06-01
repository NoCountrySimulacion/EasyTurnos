import { AppointmentCardProps } from '../typescript/interface'
import { ClientImg } from './icons/Icons'

export function AppointmentCard({
	name,
	lastName,
	profession,
	time
}: AppointmentCardProps): React.ReactElement {
	return (
		<li className='flex gap-[20px] p-[15px] shadow-search rounded-[15px] cursor-pointer'>
			<ClientImg width={118} height={118} />
			<div className='h-[129px] flex flex-col justify-between items-start'>
				<small className='text-base font-normal  font-roboto'>{time}</small>
				<span className=' font-semibold text-[28px] leading-[42px]'>
					{name + ' ' + lastName}
				</span>
				<span className='text-[#828282] font-normal font-roboto text-base'>
					{profession}
				</span>
			</div>
		</li>
	)
}
