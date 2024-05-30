// src/layout/pages/Layout.tsx
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer'
import { Sidemenu } from '../components/sidemenu/SideMenu'

export default function LayoutApp(): JSX.Element {
	return (
		<div>
			<div className='flex'>
				<aside className='bg-red-400'>
					<Sidemenu />
				</aside>
				<main>
					<Outlet />
				</main>
			</div>
			<Footer />
		</div>
	)
}
