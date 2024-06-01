import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	AdministrarNegocio,
	Agenda,
	Calendario,
	Clientes,
	Configuraciones,
	Home,
	Logout,
	Servicios,
	Usuarios
} from '../../Icons/Icons'
import { useAuth } from '../../../auth/hooks/useAuth'

export function Sidemenu(): JSX.Element {
	const [selectedPage, setSelectedPage] = useState<string>(
		() => localStorage.getItem('selectedPage') || 'Home'
	)
	const { logout } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		localStorage.setItem('selectedPage', selectedPage)
	}, [selectedPage])

	const handlePageChange = (page: string) => {
		setSelectedPage(page)
	}

	const handleLogout = () => {
		logout()
		navigate('/')
	}

	const principalMenu = [
		{ name: 'Home', icon: <Home width={24} height={24} /> },
		{ name: 'Agenda', icon: <Agenda width={24} height={24} /> },
		{ name: 'Clientes', icon: <Clientes width={24} height={24} /> },
		{ name: 'Calendario', icon: <Calendario width={24} height={24} /> }
	]

	const administrador = [
		{ name: 'Servicios', icon: <Servicios width={24} height={24} /> },
		{
			name: 'Administrar Negocio',
			icon: <AdministrarNegocio width={24} height={24} />
		}
	]

	const configuracion = [
		{ name: 'Usuario', icon: <Usuarios width={24} height={24} /> },
		{
			name: 'Configuraciones',
			icon: <Configuraciones width={24} height={24} />
		}
	]

	return (
		<aside className='h-full bg-[#fff] text-[#000] font-mono w-[325px] shadow-md shadow-black'>
			<nav>
				<div id='logo' className='flex flex-col ml-2 pb-[0px]'>
					<h4 className='text-[48px] font-bold'>EasyTurno</h4>
				</div>

				<section className='ml-1 mb-[17.67px]'>
					<p className='text-[18px] pb-3 pl-[10px] font-montserrat text-[#828282]'>
						Nombre del emprendimiento
					</p>
					{principalMenu.map(item => (
						<div
							key={item.name}
							className={`w-[80%] ml-3 rounded-[16px] ${selectedPage === item.name ? 'bg-[#D3CAFF] border border-solid border-[#7445C7] duration-500' : 'hover:bg-purple-100'}`}
						>
							<div
								className='flex flex-row flex-wrap pb-[10px] pt-3 cursor-pointer'
								onClick={() => handlePageChange(item.name)}
							>
								<span className='pl-[5px]'>{item.icon}</span>
								<h4 className='ml-3 text-[18px] font-bold font-montserrat'>
									{item.name}
								</h4>
							</div>
						</div>
					))}
				</section>

				<section className='ml-1 mt-1 mb-[17.67px]'>
					<p className='text-[18px] pb-3 pl-[10px] font-montserrat text-[#828282]'>
						Administrar emprendimiento
					</p>
					{administrador.map(item => (
						<div
							key={item.name}
							className={`w-[80%] ml-3 rounded-[16px] ${selectedPage === item.name ? 'bg-[#D3CAFF] border border-solid border-[#7445C7] duration-500' : 'hover:bg-purple-100'}`}
						>
							<div
								className='flex flex-row flex-wrap pb-[10px] pt-2 cursor-pointer'
								onClick={() => handlePageChange(item.name)}
							>
								<span className='pl-[6px]'>{item.icon}</span>
								<h4 className='ml-3 text-[18px] font-bold font-montserrat'>
									{item.name}
								</h4>
							</div>
						</div>
					))}
				</section>

				<section className='ml-1 mt-1 mb-[17.67px]'>
					<p className='text-[18px] pb-3 pl-[10px] font-montserrat text-[#828282]'>
						Configuraciones
					</p>
					{configuracion.map(item => (
						<div
							key={item.name}
							className={`w-[80%] ml-3 rounded-[16px] ${selectedPage === item.name ? 'bg-[#D3CAFF] border border-solid border-[#7445C7] duration-500' : 'hover:bg-purple-100'}`}
						>
							<div
								className='flex flex-row flex-wrap pb-[10px] pt-2 cursor-pointer'
								onClick={() => handlePageChange(item.name)}
							>
								<span className='pl-[5px]'>{item.icon}</span>
								<h4 className='ml-3 text-[18px] font-bold font-montserrat'>
									{item.name}
								</h4>
							</div>
						</div>
					))}
				</section>

				<div className='flex flex-row justify-center items-center mt-[10px]'>
					<button
						className='flex flex-row justify-center p-1 bg-[#7445C7] rounded-md w-[290px] hover:bg-purple-600'
						onClick={handleLogout}
					>
						<Logout width={24} height={24} />
						<p className='ml-2 text-[#fff] font-montserrat font-[700]'>
							Log out
						</p>
					</button>
				</div>
			</nav>
		</aside>
	)
}
