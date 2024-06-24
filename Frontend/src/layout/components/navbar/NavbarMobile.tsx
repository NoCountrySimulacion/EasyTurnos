import { useState } from 'react'
import {
	ArrowRightNavbar,
	HamburguerIcon
} from '../../../shared/components/Icons'
import Logo from './Logo'
import { NavHashLink } from 'react-router-hash-link'
import LoginModal from '../../../auth/components/form/LoginModal'
import SignUpModal from '../../../auth/components/form/SingUpModal'
import { NavLink } from 'react-router-dom'
import NavButton from './NavButton'
import LoginOptionsModal from '../../../auth/components/form/LoginOptionsModal'

export function NavbarMobile(): JSX.Element {
	const [open, setOpen] = useState(false)

	const handleOpen = () => {
		setOpen(!open)
	}

	return (
		<header className='flex fixed z-30 bg-white bottom-0 right-0 w-full'>
			{open && (
				<div>
					<div
						className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10 backdrop-blur-[4px]'
						onClick={handleOpen}
					></div>
				</div>
			)}
			<div className='flex z-40 relative h-[90px] items-center justify-between px-5 pl-10 w-full bg-[#fff]'>
				<Logo />
				<button onClick={handleOpen}>
					<HamburguerIcon />
				</button>
			</div>
			<section
				className={`flex flex-col px-5  justify-center absolute z-20   bottom-0 left-0 h-screen w-[80%] max-w-[344px] bg-[#fff] transform transition-transform duration-700 rounded-tr-xl ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'}`}
			>
				<div className='text-gray-700 font-montserrat text-base font-semibold gap-52 h-full flex flex-col max-h-[600px] pt-2'>
					<div className='flex flex-col gap-14'>
						<h2 className='text-[42px] '>Inicio</h2>
						<ul className='flex flex-col items-start justify-center text-[20px] w-full'>
							<div className='flex flex-col items-start justify-center gap-12 w-full'>
								<li
									className='cursor-pointer hover:text-orange-400 w-full'
									onClick={handleOpen}
								>
									<NavHashLink
										smooth
										to='/#comoFunciona'
										className='flex items-center justify-between w-full'
									>
										Como Funciona?
										<ArrowRightNavbar />
									</NavHashLink>
								</li>
								<li
									className='cursor-pointer hover:text-orange-400 w-full'
									onClick={handleOpen}
								>
									<NavHashLink
										smooth
										to='/#planes'
										className='flex items-center justify-between w-full'
									>
										Planes
										<ArrowRightNavbar />
									</NavHashLink>
								</li>
								<li
									className='cursor-pointer hover:text-orange-400 w-full'
									onClick={handleOpen}
								>
									<NavHashLink
										smooth
										to='/#clientes'
										className='flex items-center justify-between w-full'
									>
										Clientes
										<ArrowRightNavbar />
									</NavHashLink>
								</li>
								<li
									className='cursor-pointer hover:text-orange-400 w-full'
									onClick={handleOpen}
								>
									<NavHashLink
										smooth
										to='/#contacto'
										className='flex items-center justify-between w-full'
									>
										Contacto
										<ArrowRightNavbar />
									</NavHashLink>
								</li>
							</div>
						</ul>
					</div>
					<div
						className='flex flex-col items-center gap-5 text-[20px]'
						onClick={handleOpen}
					>
						<NavLink to='/register'>
							<NavButton text='Comienza gratis' />
						</NavLink>
						<div
							className='cursor-pointer hover:text-orange-400'
							onClick={handleOpen}
						>
							<NavLink to='/loginOptions'>Ingresar</NavLink>
						</div>
					</div>
					<LoginModal />
					<SignUpModal />
					<LoginOptionsModal />
				</div>
			</section>
		</header>
	)
}
