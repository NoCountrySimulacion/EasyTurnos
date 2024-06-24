/* eslint-disable indent */
import { useAuth } from '../../../auth/hooks/useAuth'
import {
	AddClientIcon,
	CalendarIcon,
	SearchIcon
} from '../../../professional/components/icons/Icons'
import { NavLink, useLocation } from 'react-router-dom'
import { useSearch } from '../../hooks/useSearch'
import { useState, useEffect } from 'react'
import { useMediaQuery } from '../../../shared/hooks/useMediaQuery'

export function Search(): React.ReactElement {
	const { decodedToken } = useAuth()
	const location = useLocation()
	const { handleSubmit, query } = useSearch()
	const [searchValue, setSearchValue] = useState<string>('')

	const getTitle = () => {
		switch (location.pathname) {
			case '/home':
				return 'Inicio'
			case '/professional/calendar':
				return 'Agenda'
			case '/professional/clients':
				return 'Clientes'
			case '/professionals':
				return 'Profesionales'
			case '/my-appointments':
				return 'Mis turnos'
			default:
				return ''
		}
	}

	useEffect(() => {
		setSearchValue(query as string)
	}, [location, query])

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value)
	}

	const isMediaScreen = useMediaQuery('(max-width: 1024px)')

	return (
		<header className='flex gap-[22px] items-center pt-[20px] pb-[15px] px-[30px] max-lg:px-2 w-full shadow-search rounded-b-2xl'>
			<h1 className='text-[48px] font-semibold font-montserrat whitespace-nowrap'>
				{isMediaScreen || getTitle()}
			</h1>

			<form
				className='relative w-full h-[65px] gap-[18px] rounded-[26px] shadow-search'
				onSubmit={e => {
					handleSubmit(e)
					setSearchValue('')
				}}
			>
				<div className='flex items-center h-full ml-[19px] gap-[10px]'>
					<button className='relative' type='submit'>
						<SearchIcon height={34} width={34} />
					</button>
					<input
						id='search'
						name='search'
						type='text'
						value={searchValue}
						onChange={handleInputChange}
						placeholder={
							decodedToken?.role === 'Professional'
								? 'Buscar cliente'
								: 'Buscar profesional'
						}
						className='h-[30px] w-full focus-visible:outline-none overflow-ellipsis '
					/>
				</div>
			</form>
			<NavLink
				to={
					decodedToken?.role === 'Professional'
						? '/professional/add-client'
						: '/client/calendar'
				}
				className='bg-[#7445C7] text-[#F8F9FA] flex items-center justify-center gap-[10px] h-[38px] min-w-[161px] rounded-lg text-[13px] font-bold hover:bg-purple-600 transition duration-300 ease-in-out'
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
