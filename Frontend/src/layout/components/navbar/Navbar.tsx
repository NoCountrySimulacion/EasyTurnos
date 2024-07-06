import { useMediaQuery } from '../../../shared/hooks/useMediaQuery'
import Logo from './Logo'
import NavbarListItems from './NavbarListItems'
import { NavbarMobile } from './NavbarMobile'

export default function Navbar(): JSX.Element {
	const isMobileScreen = useMediaQuery('(max-width: 1024px)')
	return (
		<>
			{isMobileScreen ? (
				<NavbarMobile />
			) : (
				<header className='flex bg-white bottom-0 right-0 items-center gap-[20px] h-[90px] w-full justify-around px-5 min-w-[900px] '>
					<Logo />
					<NavbarListItems />
				</header>
			)}
		</>
	)
}
