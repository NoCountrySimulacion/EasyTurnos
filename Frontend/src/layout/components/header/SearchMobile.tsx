/* eslint-disable indent */
import { useAuth } from '../../../auth/hooks/useAuth'
import { SearchIcon } from '../../../professional/components/icons/Icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSearch } from '../../hooks/useSearch'
import { useState, useEffect } from 'react'
import { Logout } from '../../Icons/Icons'

export function SearchMobile(): React.ReactElement {
	const navigate = useNavigate()
	const { decodedToken, logout } = useAuth()
	const location = useLocation()
	const { handleSubmit, query } = useSearch()
	const [searchValue, setSearchValue] = useState<string>('')

	useEffect(() => {
		setSearchValue(query as string)
	}, [location, query])

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value)
	}

	const handleLogout = () => {
		logout()
		navigate('/')
	}

	return (
		<header className='flex  items-center pt-[20px] pb-[15px] gap-5 w-full px-2 shadow-search rounded-b-2xl'>
			<form
				className='relative w-full h-[65px] rounded-[26px] shadow-search'
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
						className='h-[30px] w-full focus-visible:outline-none overflow-ellipsis'
					/>
				</div>
			</form>
			<div className='flex flex-col justify-between items-center gap-1'>
				<button
					className='flex flex-row justify-center  bg-[#7445C7] rounded-md py-2 px-2 '
					onClick={handleLogout}
				>
					<Logout width={22} height={22} />
				</button>
				{/* <span className='text-[14px] font-bold font-montserrat'>Salir</span> */}
			</div>
		</header>
	)
}
