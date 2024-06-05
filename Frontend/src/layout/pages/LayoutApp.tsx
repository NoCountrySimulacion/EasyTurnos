// src/layout/pages/Layout.tsx
import { Outlet } from 'react-router-dom'
import { Sidemenu } from '../components/sidemenu/SideMenu'

export default function LayoutApp(): JSX.Element {
	return (
		<div className=' '>
			<div className='flex'>
				<aside className=' '>
					<Sidemenu />
				</aside>
				<main className='w-full '>
					<Outlet />
				</main>
			</div>
		</div>
	)
}
