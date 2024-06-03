/* eslint-disable quotes */
import { DateTime } from 'luxon'
import { AddClientIcon, SearchIcon } from '../components/icons/Icons'
import { appointmentsMock } from '../mocks/appointments'
import { AppointmentsList } from '../components/AppointmentsList'
import { WithoutAppointments } from '../components/WithoutAppointments'

function Home(): React.ReactElement {
	const now = DateTime.now()
	const formattedDate = now.setLocale('es').toFormat("cccc, dd 'de' LLLL")

	return (
		<section className=' h-full flex flex-col font-montserrat px-10 gap-6 '>
			<header className='flex gap-[22px] items-center mt-[20px]'>
				<form className='relative w-[833px] h-[65px] gap-[18px] rounded-[26px] shadow-search '>
					<div className='flex items-center h-full ml-[19px] gap-[10px]'>
						<button className='relative' type='submit'>
							<SearchIcon height={34} width={34} />
						</button>
						<input
							id='search'
							type='text'
							placeholder='Buscar cliente'
							className='h-[23px]'
						/>
					</div>
				</form>
				<button className='bg-[#7445C7] text-[#F8F9FA] flex items-center justify-center gap-[10px] h-[38px] w-[161px] rounded-lg text-[13px] font-bold'>
					<AddClientIcon height={18} width={18} />
					<span>Agregar cliente</span>
				</button>
			</header>
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
