// src/layout/pages/Layout.tsx
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'
import Banner from '../../landing/components/banner/Banner'

export default function Layout(): JSX.Element {
	return (
		<div>
			<header>
				<Navbar />
			</header>
			<main>
				<section className='mb-12'>
					<Banner />
				</section>
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}
