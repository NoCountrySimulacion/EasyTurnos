import { useLocation } from 'react-router-dom'
import { Home as HomeIcon, Agenda, Clientes, Usuarios } from '../../Icons/Icons'
import { useAuth } from '../../../auth/hooks/useAuth'
import { Link } from 'react-router-dom'
import { FaUserMd, FaClipboardCheck } from 'react-icons/fa'

export function SideMenuMobile(): JSX.Element {
	const location = useLocation()
	const { decodedToken } = useAuth()

	const getSelectedPage = () => {
		const path = location.pathname
		if (
			path.startsWith('/professional/clients') ||
			path.startsWith('/professional/data-client/')
		) {
			return 'Clientes'
		} else if (
			path.startsWith('/calendar') ||
			path.startsWith('/professional/calendar') ||
			path.startsWith('/client/calendar')
		) {
			return 'Agenda'
		} else if (path.startsWith('/home')) {
			return 'Inicio'
		} else if (path.startsWith('/professionals')) {
			return 'Profesionales'
		} else if (path.startsWith('/my-appointments')) {
			return 'Mis turnos'
		} else if (
			path.startsWith('/profile') ||
			path.startsWith('/professional/edit-profile-prof')
		) {
			return 'Perfil'
		} else {
			return 'Inicio'
		}
	}

	const selectedPage = getSelectedPage()

	const principalMenuProfessional = [
		{ name: 'Inicio', icon: <HomeIcon width={24} height={24} />, to: '/home' },
		{
			name: 'Agenda',
			icon: <Agenda width={24} height={24} />,
			to: '/professional/calendar'
		},
		{
			name: 'Clientes',
			icon: <Clientes width={24} height={24} />,
			to: '/professional/clients'
		},
		{
			name: 'Perfil',
			icon: <Usuarios width={24} height={24} />,
			to: '/profile'
		}
	]

	const principalMenuClient = [
		{ name: 'Inicio', icon: <HomeIcon width={24} height={24} />, to: '/home' },
		{
			name: 'Profesionales',
			icon: <FaUserMd size={24} />,
			to: '/professionals'
		},
		{
			name: 'Mis turnos',
			icon: <FaClipboardCheck size={24} />,
			to: '/my-appointments'
		},
		{
			name: 'Perfil',
			icon: <Usuarios width={24} height={24} />,
			to: '/profile'
		}
	]

	const principalMenu =
		decodedToken?.role === 'Professional'
			? principalMenuProfessional
			: principalMenuClient

	return (
		<section className='w-screen z-30 fixed bottom-0 py-2 bg-[#fff] text-[#000] font-mono shadow-md shadow-black'>
			{/* <div id='logo' className='flex flex-col ml-2 pb-[0px] mb-2 '>
					<img
						src='../../../../public/svgs/Logo_2.svg'
						alt=''
						className='mt-5 mb-2 w-[90%]'
					/>
				</div> */}

			<section className='gap-2 flex justify-between items-center pr-2'>
				<ul className='flex justify-around w-full'>
					{principalMenu.map(item => (
						<li
							key={item.name}
							className={`min-w-[84px] min-h-[72px] rounded-[16px]   ${selectedPage === item.name ? 'bg-[#D3CAFF] border border-solid border-[#7445C7]' : 'hover:bg-purple-100 transition duration-300 ease-in-out'}`}
						>
							<Link
								to={item.to}
								className='flex flex-col items-center flex-wrap py-3 cursor-pointer'
							>
								<span className=''>{item.icon}</span>
								<h4 className='text-[13px] font-bold font-montserrat'>
									{item.name}
								</h4>
							</Link>
						</li>
					))}
				</ul>
			</section>
		</section>
	)
}
