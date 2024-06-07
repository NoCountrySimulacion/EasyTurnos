// src/layout/pages/Layout.tsx
import { Outlet } from 'react-router-dom'
import { Sidemenu } from '../components/sidemenu/SideMenu'
import { Search } from '../components/header/Search'

export default function LayoutApp(): JSX.Element {
	return (
		<div className=''>
			<div className='flex'>
				<aside className=' '>
					<Sidemenu />
				</aside>
				<div className='w-full flex flex-col gap-10'>
					<section className=' px-[30px]'>
						<Search />
					</section>
					<main className='w-full '>
						<Outlet />
					</main>
				</div>
			</div>
		</div>
	)
}
