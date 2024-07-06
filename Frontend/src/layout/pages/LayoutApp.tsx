/* eslint-disable indent */
// src/layout/pages/Layout.tsx
import { Outlet, useLocation } from 'react-router-dom'
import { Sidemenu } from '../components/sidemenu/SideMenu'
import { Search } from '../components/header/Search'
import { useMediaQuery } from '../../shared/hooks/useMediaQuery'
import { SideMenuMobile } from '../components/sidemenu/SideMenuMobile'
import { SearchMobile } from '../components/header/SearchMobile'

export default function LayoutApp(): JSX.Element {
	const location = useLocation()
	const isMobileScreen = useMediaQuery('(max-width: 1024px)')

	return (
		<div className='overflow-x-hidden'>
			<div className='flex h-full'>
				<aside className='h-full '>
					{isMobileScreen ? <SideMenuMobile /> : <Sidemenu />}
				</aside>
				<div className='w-full flex flex-col gap-10 lg:ml-[325px]'>
					{location.pathname !== '/profile' &&
						location.pathname !== '/professional/edit-profile-prof' &&
						location.pathname !== '/professional/add-client' && (
							<section className='max-lg:px-2 px-[30px]'>
								{isMobileScreen ? <SearchMobile /> : <Search />}
							</section>
						)}
					<main className='w-full max-md:pb-[88px] '>
						<Outlet />
					</main>
				</div>
			</div>
		</div>
	)
}
