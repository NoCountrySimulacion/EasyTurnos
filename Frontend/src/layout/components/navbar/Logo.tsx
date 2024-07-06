import { NavLink } from 'react-router-dom'

export default function Logo(): JSX.Element {
	return (
		<div className=' w-44 text-orange-400 text-lg font-medium font-roboto leading-relaxed'>
			<NavLink to={'/'}>
				<img src='/svgs/Logo_2.svg' alt='logo Easy Turnos' id='logo' />
			</NavLink>
		</div>
	)
}
