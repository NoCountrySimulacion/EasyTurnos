/* eslint-disable indent */
// src/layout/pages/Layout.tsx
import { Outlet, useLocation } from 'react-router-dom'
import { Sidemenu } from '../components/sidemenu/SideMenu'
import { Search } from '../components/header/Search'

export default function LayoutApp(): JSX.Element {
	const location = useLocation()

	return (
		<div className=''>
			<div className='flex '>
				<aside className='relative'>
					<Sidemenu />
				</aside>
				<div className='w-full flex flex-col gap-10'>
					{location.pathname !== '/profile' &&
						location.pathname !== '/professional/edit-profile-prof' && (
							<section className='px-[30px]'>
								<Search />
							</section>
						)}
					<main className='w-full'>
						<Outlet />
					</main>
				</div>
			</div>
		</div>
	)
}
