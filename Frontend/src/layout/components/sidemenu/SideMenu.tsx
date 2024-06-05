import { useLocation, useNavigate } from 'react-router-dom'
import {
	Home as HomeIcon,
	Agenda,
	Clientes,
	Logout,
	Usuarios
} from '../../Icons/Icons'
import { useAuth } from '../../../auth/hooks/useAuth'
import { Link } from 'react-router-dom'
import { FaCalendarAlt, FaUserMd, FaClipboardCheck } from 'react-icons/fa'

export function Sidemenu(): JSX.Element {
	const { logout } = useAuth()
	const navigate = useNavigate()
	const location = useLocation()
	const { user, decodedToken } = useAuth()

	const getSelectedPage = () => {
		const path = location.pathname
		if (path.startsWith('/clients')) {
			return 'Clientes'
		} else if (path.startsWith('/calendar')) {
			return 'Agenda'
		} else if (path.startsWith('/home')) {
			return 'Inicio'
		} else if (path.startsWith('/profesionales')) {
			return 'Profesionales'
		} else if (path.startsWith('/misTurnos')) {
			return 'MisTurnos'
		} else {
			return 'Home'
		}
	}

	const selectedPage = getSelectedPage()

	const handleLogout = () => {
		logout()
		navigate('/')
	}

	const principalMenuProfessional = [
		{ name: 'Inicio', icon: <HomeIcon width={24} height={24} />, to: '/home' },
		{
			name: 'Agenda',
			icon: <Agenda width={24} height={24} />,
			to: '/calendar'
		},
		{
			name: 'Clientes',
			icon: <Clientes width={24} height={24} />,
			to: '/clients'
		}
	]

	const principalMenuClient = [
		{ name: 'Inicio', icon: <HomeIcon width={24} height={24} />, to: '/home' },
		{
			name: 'Agendar turno',
			icon: <FaCalendarAlt size={24} />,
			to: '/calendar'
		},
		{
			name: 'Profesionales',
			icon: <FaUserMd size={24} />,
			to: '/profesionales'
		},
		{
			name: 'Mis turnos',
			icon: <FaClipboardCheck size={24} />,
			to: '/misTurnos'
		}
	]

	const configuracion = [
		{ name: 'Perfil', icon: <Usuarios width={24} height={24} /> }
	]

	const principalMenu =
		decodedToken?.role === 'Professional'
			? principalMenuProfessional
			: principalMenuClient

	return (
		<aside className='h-[100%] bg-[#fff] text-[#000] font-mono w-[325px] shadow-md shadow-black '>
			<nav className=''>
				<div id='logo' className='flex flex-col ml-2 pb-[0px]'>
					<h4 className='text-[48px] font-bold'>EasyTurno</h4>
				</div>

				<section className='ml-1 mb-[17.67px]'>
					<p className='text-[18px] pb-3 pl-[10px] font-montserrat text-[#828282]'>
						{user?.firstName} {user?.lastName}
					</p>
					{principalMenu.map(item => (
						<div
							key={item.name}
							className={`w-[80%] ml-3 rounded-[16px] ${selectedPage === item.name ? 'bg-[#D3CAFF] border border-solid border-[#7445C7] duration-500' : 'hover:bg-purple-100'}`}
						>
							<Link
								to={item.to}
								className='flex flex-row flex-wrap pb-[10px] pt-3 cursor-pointer'
							>
								<span className='pl-[5px]'>{item.icon}</span>
								<h4 className='ml-3 text-[18px] font-bold font-montserrat'>
									{item.name}
								</h4>
							</Link>
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
							<div className='flex flex-row flex-wrap pb-[10px] pt-2 cursor-pointer'>
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
						<p className='ml-2 text-[#fff] font-montserrat font-[700]'>Salir</p>
					</button>
				</div>
			</nav>
		</aside>
	)
}
