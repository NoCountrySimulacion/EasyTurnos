// src/layout/pages/Layout.tsx
import { Outlet } from 'react-router-dom'
import { Sidemenu } from '../components/sidemenu/SideMenu'

export default function LayoutApp(): JSX.Element {
	return (
		<div>
			<div className='flex '>
				<aside className='bg-red-400 mr-[19rem] overflow-y-hidden '>
					<Sidemenu />
				</aside>
				<main className=''>
					<Outlet />
				</main>
			</div>
		</div>
	)
}
