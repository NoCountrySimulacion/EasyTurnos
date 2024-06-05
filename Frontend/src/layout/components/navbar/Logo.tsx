import { NavLink } from 'react-router-dom'

export default function Logo(): JSX.Element {
	return (
		<div className=' w-44 text-orange-400 text-lg font-medium font-roboto leading-relaxed'>
			<NavLink to={'/'}>
				Easy Turnos
			</NavLink>
		</div>
	)
}
