import { useAuth } from '../../auth/hooks/useAuth'
import { Search } from '../../professional/components/Search'
import { AppointmentsList } from '../components/AppointmentsList'
import { WithoutAppointments } from '../components/WhitoutAppointments'
import { appointmentsClientMock } from '../mocks/appointmentsClientMock'

interface NumberDotProps {
	num: string
}

function NumberDot({ num }: NumberDotProps): React.ReactElement {
	return (
		<figure className='w-[24px] h-[24.5px] pb-[0.5px] flex flex-col justify-center items-center rounded-[24px] border border-[#7445C7] bg-[#D3CAFF] text-[#313131] text-[12px] font-semibold leading-[24px]'>
			{num}
		</figure>
	)
}

export function HomeClient(): React.ReactElement {
	const { user } = useAuth()
	return (
		<section className=' h-full flex flex-col px-10  gap-10'>
			<Search />
			<section className='flex flex-col items-start gap-[18px]'>
				<h1 className='text-[35px] font-bold leading-[56px] font-montserrat'>
					Bienvenido a tu espacio,{' '}
					<span className='capitalize'>{user?.firstName}.</span>
				</h1>
				<h3 className='font-roboto text-[#828282] text-[24px]'>
					Para sacar un turno.
				</h3>
				<ol className='font-roboto text-[#828282] flex flex-col gap-[14px] pl-3'>
					<li className='flex items-center gap-2 '>
						<NumberDot num='1' />
						<span>Ingresa a la web.</span>
					</li>
					<li className='flex items-center gap-2 '>
						<NumberDot num='2' />
						<span>Seleccionar al profesional.</span>
					</li>
					<li className='flex items-center gap-2 '>
						<NumberDot num='3' />
						<span>Seleccionar fecha y hora.</span>
					</li>
					<li className='flex items-center gap-2 '>
						<NumberDot num='4' />
						<span>Confirmar.</span>
					</li>
				</ol>
			</section>
			<section className='flex flex-col justify-between items-start gap-[21px]'>
				<h2 className='font-montserrat text-[28px] leading-[42px] font-semibold'>
					Tus turnos
				</h2>
				{appointmentsClientMock.length ? (
					<AppointmentsList />
				) : (
					<WithoutAppointments />
				)}
			</section>
		</section>
	)
}
