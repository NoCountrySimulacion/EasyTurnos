// src/layout/pages/Layout.tsx
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'
import Banner from '../../landing/components/banner/Banner'

export default function LayoutLanding(): JSX.Element {
	return (
		<div className='max-lg:pb-[90px]'>
			<Navbar />
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
