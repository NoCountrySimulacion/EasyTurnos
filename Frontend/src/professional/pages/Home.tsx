/* eslint-disable quotes */
import { DateTime } from 'luxon'
import { appointmentsMock } from '../mocks/appointments'
import { AppointmentsList } from '../components/AppointmentsList'
import { WithoutAppointments } from '../components/WithoutAppointments'
import { Search } from '../components/Search'

function Home(): React.ReactElement {
	const now = DateTime.now()
	const formattedDate = now.setLocale('es').toFormat("cccc, dd 'de' LLLL")

	return (
		<section className=' h-full flex flex-col font-montserrat px-10 gap-6 '>
			<Search />
			<section className='flex flex-col items-start gap-[18px]'>
				<h1 className='text-[35px] font-bold leading-[56px]'>
					Bienvenido a tu espacio, Enzo.
				</h1>
				<h2 className='text-[28px] font-bold leading-[56px]'>
					Hoy {formattedDate}.
				</h2>
			</section>
			{appointmentsMock.length ? <AppointmentsList /> : <WithoutAppointments />}
		</section>
	)
}

export default Home
