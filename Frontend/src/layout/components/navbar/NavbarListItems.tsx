// src/components/navbar/NavbarListItems.tsx
import { NavHashLink } from 'react-router-hash-link'
import { NavLink } from 'react-router-dom'
import NavButton from './NavButton'
import LoginModal from '../../../auth/components/form/LoginModal'
import SignUpModal from '../../../auth/components/form/SingUpModal'

export default function NavbarListItems(): JSX.Element {
	return (
		<div className='w-full'>
			<ul className='font-montserrat flex justify-between items-center text-right text-gray-700 text-base ml-[100px] list-none font-semibold'>
				<li className='cursor-pointer hover:text-orange-400'>
					<NavHashLink smooth to='/#comoFunciona'>
						Como Funciona?
					</NavHashLink>
				</li>
				<li className='cursor-pointer hover:text-orange-400'>
					<NavHashLink smooth to='/#planos'>
						Planes
					</NavHashLink>
				</li>
				<li className='cursor-pointer hover:text-orange-400'>
					<NavHashLink smooth to='/#clientes'>
						Clientes
					</NavHashLink>
				</li>
				<li className='cursor-pointer hover:text-orange-400'>
					<NavHashLink smooth to='/#contacto'>
						Contacto
					</NavHashLink>
				</li>
				<li>
					<NavLink to='/register'>
						<NavButton text='Comienza gratis' />
					</NavLink>
				</li>
				<li className='cursor-pointer hover:text-orange-400'>
					<NavLink to='/loginOptions'>Ingresar</NavLink>
				</li>
			</ul>
			<LoginModal />
			<SignUpModal />
		</div>
	)
}
