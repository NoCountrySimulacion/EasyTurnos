/* eslint-disable quotes */
import { DateTime } from 'luxon'
import {
	AddClientIcon,
	CalendarIcon,
	SearchIcon
} from '../components/icons/Icons'

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
				<h2 className='text-[35px] font-bold leading-[56px]'>
					Bienvenido a tu espacio, Enzo.
				</h2>
				<p className='text-[28px] font-bold leading-[56px]'>
					Hoy {formattedDate}.
				</p>
			</section>
			<section className='shadow-search rounded-[15px] flex flex-col  justify-center mb-20 '>
				<div className='p-10 flex flex-col gap-[60px]'>
					<p className='px-20 w-[950px] h-[247px] text-[35px] leading-[56px] content-center'>
						No tienes turnos programados para hoy. <br />
						¿Te gustaría agendar un turno o quieres agregar un cliente?
					</p>
					<button className='bg-[#7445C7] text-[#F8F9FA] flex items-center justify-center gap-[10px] h-[38px] w-[161px] rounded-lg text-[13px] font-bold'>
						<CalendarIcon height={18} width={18} />
						<span>Agregar Turno</span>
					</button>
				</div>
			</section>
		</section>
	)
}

export default Home
