import Logo from './Logo'
import NavbarListItems from './NavbarListItems'

export default function Navbar(): JSX.Element {
	return (
		<div className='flex items-center justify-between h-[90px] px-20 '>
			<Logo />
			<NavbarListItems />
		</div>
	)
}
