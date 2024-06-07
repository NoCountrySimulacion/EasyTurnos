/* eslint-disable indent */
import { useAuth } from '../../../auth/hooks/useAuth'
import {
	AddClientIcon,
	CalendarIcon,
	SearchIcon
} from '../../../professional/components/icons/Icons'
import { NavLink, useLocation } from 'react-router-dom'

export function Search(): React.ReactElement {
	const { decodedToken } = useAuth()
	const location = useLocation()

	const getTitle = () => {
		switch (location.pathname) {
			case '/home':
				return 'Inicio'
			case '/calendar':
				return 'Calendario'
			case '/clients':
				return 'Clientes'
			case '/professionals':
				return 'Profesionales'
			case '/my-appointments':
				return 'Mis turnos'
			default:
				return ''
		}
	}

	return (
		<header className='flex gap-[22px] items-center pt-[20px] pb-[15px] px-[30px] w-full shadow-search rounded-b-2xl'>
			<h1 className='text-[48px] font-semibold font-montserrat whitespace-nowrap'>
				{getTitle()}
			</h1>
			<form className='relative w-full h-[65px] gap-[18px]  rounded-[26px] shadow-search '>
				<div className='flex items-center h-full ml-[19px] gap-[10px]'>
					<button className='relative' type='submit'>
						<SearchIcon height={34} width={34} />
					</button>
					<input
						id='search'
						type='text'
						placeholder={
							decodedToken?.role === 'Professional'
								? 'Buscar cliente'
								: 'Buscar profesional'
						}
						className='h-[30px] w-full focus-visible: outline-none'
					/>
				</div>
			</form>
			<NavLink
				to={
					decodedToken?.role === 'Professional'
						? '/clients/addClient'
						: '/professionals'
				}
				className='bg-[#7445C7] text-[#F8F9FA] flex items-center justify-center gap-[10px] h-[38px] min-w-[161px] rounded-lg text-[13px] font-bold '
			>
				{decodedToken?.role === 'Professional' ? (
					<AddClientIcon height={18} width={18} />
				) : (
					<CalendarIcon height={18} width={18} />
				)}
				<span>
					{decodedToken?.role === 'Professional'
						? 'Agregar cliente'
						: 'Agendar turno'}
				</span>
			</NavLink>
		</header>
	)
}
