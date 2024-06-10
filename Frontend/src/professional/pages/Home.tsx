/* eslint-disable quotes */
import { DateTime } from 'luxon'
import { AppointmentsList } from '../components/AppointmentsList'
import { WithoutAppointments } from '../components/WithoutAppointments'
import { useAuth } from '../../auth/hooks/useAuth'
import { useAppointments } from '../hooks/useAppointments'

function Home(): React.ReactElement {
	const now = DateTime.now()
	const formattedDate = now.setLocale('es').toFormat("cccc, dd 'de' LLLL")
	const { user } = useAuth()
	const { isThereAppointments } = useAppointments()

	return (
		<section className=' h-full flex flex-col font-montserrat px-10 gap-6 '>
			<section className='flex flex-col items-start gap-[18px]'>
				<h1 className='text-[35px] font-bold leading-[56px]'>
					Bienvenido a tu espacio,{' '}
					<span className='capitalize'>{user?.firstName}.</span>
				</h1>
				<h2 className='text-[28px] font-bold leading-[56px]'>
					Hoy {formattedDate}.
				</h2>
			</section>
			{isThereAppointments ? <AppointmentsList /> : <WithoutAppointments />}
		</section>
	)
}

export default Home
