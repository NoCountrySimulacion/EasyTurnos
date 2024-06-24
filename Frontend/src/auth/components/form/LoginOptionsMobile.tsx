import '@material/web/textfield/outlined-text-field.js'
import { useNavigate } from 'react-router-dom'

export default function LoginOptionsMobile(): React.ReactElement {
	const navigate = useNavigate()

	return (
		<section className=' flex flex-col items-center sm:px-10'>
			<header className='pb-2'>
				<h2 className=' text-2xl font-semibold font-montserrat pb-3 text-center'>
					¿Cómo te gustaría Iniciar?
				</h2>
			</header>
			<section className='flex flex-col  items-center'>
				<div
					onClick={() => navigate('/login')}
					className='min-w-[300px] max-w-[300px] min-h-[380px]  flex flex-col items-center gap-4 cursor-pointer'
				>
					<div className='w-full max-w-4xl p-4 bg-white rounded-3xl shadow border border-t-0 flex flex-col  justify-start items-center gap-4 '>
						<div className='flex justify-center items-center w-full'>
							<img
								className='w-full h-auto  rounded-2xl object-cover'
								src='/images/loginoptions-man-work.webp'
								alt='Profesionales'
							/>
						</div>
						<div className='flex flex-col justify-start items-start gap-4  w-full '>
							<div className='text-center'>
								<div className="text-black text-lg font-semibold font-['Montserrat'] leading-tight">
									Soy Profesional
								</div>
							</div>
							<div className='text-center'>
								<ul className="text-black text-base font-normal font-['Roboto'] leading-relaxed list-disc list-inside ml-4 flex flex-col items-start">
									<li>Quiero ofrecer mis servicios.</li>
									<li>Quiero agendar clientes.</li>
									<li>Administrar mi negocio.</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div
					onClick={() => navigate('/login')}
					className='w-full flex flex-col items-center cursor-pointer'
				>
					<div className='min-w-[300px] max-w-[300px] min-h-[200px]  p-4 bg-white rounded-3xl shadow border border-t-0  flex flex-col  justify-start items-center gap-4 '>
						<div className='flex justify-center items-center w-full '>
							<img
								className='w-full h-auto  rounded-2xl object-cover'
								src='/images/loginoptions-screen-hand.webp'
								alt='Clientes'
							/>
						</div>
						<div className='flex flex-col justify-start items-start gap-4  w-full '>
							<div className='text-center'>
								<div className="text-black text-lg font-semibold font-['Montserrat'] leading-tight">
									Soy Cliente
								</div>
							</div>
							<div className='text-center'>
								<ul className="text-black text-base font-normal font-['Roboto'] leading-relaxed list-disc list-inside ml-4">
									<li>Quiero reservar un turno.</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>
		</section>
	)
}
