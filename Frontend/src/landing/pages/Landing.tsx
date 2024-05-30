import Clientes from '../components/clientes/Clientes'
import ComoFunciona from '../components/comoFunciona/ComoFunciona'
import InfoCardList from '../components/infoCards/InfoCardList'
import Planos from '../components/planos/Planos'
import TestimonialCarousel from '../components/testimonialCards/TestimonialCarousel'

export default function Landing(): JSX.Element {
	return (
		<section className='max-w-[1240px] mx-auto'>
			<section className='px-20 flex flex-col gap-16'>
				<section className='flex flex-col gap-12'>
					<header>
						<h1 className='text-4xl font-semibold font-montserrat'>
							Beneficios de tener Turnos Online
						</h1>
						<small className='font-roboto'>
							Te contamos porque deberías automatizar tu agenda, y como esto
							puede hacer crecer tu negocio.
						</small>
					</header>
					<main>
						<InfoCardList />
					</main>
				</section>
				<section className='mb-12'>
					<header>
						<h1 className='text-montserrat text-3xl mb-0 '>Heading</h1>
						<p className='text-gray-500 text-roboto mt-0'>
							Subheading to introduce testimonials
						</p>
					</header>
					<TestimonialCarousel />
				</section>
				<section>
					<address id='planos'>
						<Planos />
					</address>
				</section>
				<section>
					<address id='clientes'>
						<Clientes />
					</address>
				</section>
				<section className='mb-12'>
					<address id='comoFunciona'>
						<ComoFunciona />
					</address>
				</section>
			</section>
		</section>
	)
}
