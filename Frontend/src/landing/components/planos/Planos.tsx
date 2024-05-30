// src/components/Planos.tsx
import { plans } from '../../../landing/components/planos/constants/infoPlanos'

export default function Planos(): JSX.Element {
	return (
		<div className='flex flex-col items-center py-12'>
			<h2 className='text-5xl font-montserrat font-semibold mb-4'>
				Nuestros Planos
			</h2>
			<p className='text-center mb-12'>
				Diseñamos diferentes planes para que puedas encontrar el que mejor se
				adapte a las necesidades de tu negocio.
			</p>
			<div className='flex flex-col md:flex-row justify-center items-center gap-8'>
				{plans.map(plan => (
					<div
						key={plan.title}
						className='border border-orange-400 rounded-lg p-6 w-80 bg-white h-[450px] flex flex-col'
					>
						<h3 className='text-xl font-semibold mb-4 text-center'>
							{plan.title}
						</h3>
						<p className='text-4xl font-bold text-center text-orange-400 font-roboto mb-4'>
							${plan.price}
							<span className='text-base text-black'>/mes</span>
						</p>
						<ul className='mb-6 flex-grow'>
							{plan.features.map((feature, index) => (
								<li
									key={index}
									className='text-gray-700 mb-2 flex items-center'
								>
									<span className='mr-2 text-orange-400'>•</span> {feature}
								</li>
							))}
						</ul>
						<button
							disabled
							className='w-full py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed'
						>
							{plan.button}
						</button>
					</div>
				))}
			</div>
		</div>
	)
}
